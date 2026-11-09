/* ============================================================
 * 玩转奶蛙 · 账号 / 好友 / 游戏评论（本地版）
 * 数据保存在浏览器 localStorage，同一浏览器内可完整演示。
 * 后续接云端数据库时，只需替换本文件里的读写实现。
 * ============================================================ */
(function () {
  "use strict";

  const K_USERS = "naiwa_users_v1";
  const K_SESSION = "naiwa_session_v1";
  const K_REQ = "naiwa_friend_req_v1";
  const K_CMT = "naiwa_comments_v1";
  const COLORS = ["#f5b301", "#7bc74d", "#4aa3df", "#b07cf0", "#f06fa0", "#f0805a", "#c9a227"];

  const $ = id => document.getElementById(id);

  /* ---------------- 基础工具 ---------------- */
  function read(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function write(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function colorOf(name) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return COLORS[h % COLORS.length];
  }
  function initial(name) { return name ? name.slice(0, 1).toUpperCase() : "?"; }
  function relTime(ts) {
    const d = Date.now() - ts;
    if (d < 60000) return "刚刚";
    if (d < 3600000) return Math.floor(d / 60000) + " 分钟前";
    if (d < 86400000) return Math.floor(d / 3600000) + " 小时前";
    if (d < 604800000) return Math.floor(d / 86400000) + " 天前";
    const t = new Date(ts);
    return (t.getMonth() + 1) + "月" + t.getDate() + "日";
  }
  function tip(msg) { if (typeof toast === "function") toast(msg); }

  async function hashPass(salt, pass) {
    const text = salt + "::" + pass;
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
    // 非安全上下文兜底（仅演示用）
    let h = 5381;
    for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
    return "f" + h.toString(16);
  }

  /* ---------------- 账号 ---------------- */
  const Auth = {
    tab: "login",

    current() {
      const s = read(K_SESSION, null);
      if (!s) return null;
      const users = read(K_USERS, []);
      const u = users.find(x => x.id === s.id);
      return u || null;
    },
    setSession(user) { write(K_SESSION, { id: user.id, name: user.name }); },

    open(tab) {
      this.switchTab(tab || "login");
      $("authErr").classList.add("hidden");
      $("authUser").value = "";
      $("authPass").value = "";
      $("authPass2").value = "";
      $("authModal").classList.remove("hidden");
      setTimeout(() => $("authUser").focus(), 60);
    },
    close() { $("authModal").classList.add("hidden"); },

    switchTab(tab) {
      this.tab = tab;
      $("tabLogin").classList.toggle("active", tab === "login");
      $("tabRegister").classList.toggle("active", tab === "register");
      $("authPass2Label").classList.toggle("hidden", tab !== "register");
      $("authPass2").classList.toggle("hidden", tab !== "register");
      $("authErr").classList.add("hidden");
    },
    err(msg) {
      const el = $("authErr");
      el.textContent = msg;
      el.classList.remove("hidden");
    },

    async submit() {
      const tab = this.tab;
      const name = $("authUser").value.trim();
      const pass = $("authPass").value;
      const pass2 = $("authPass2").value;

      if (!/^[\w\u4e00-\u9fa5·]{2,12}$/.test(name)) return this.err("昵称需 2-12 个字符，仅支持中英文、数字、下划线");
      if (pass.length < 4) return this.err("密码至少 4 位");

      const users = read(K_USERS, []);
      const exists = users.find(u => u.name.toLowerCase() === name.toLowerCase());

      if (tab === "register") {
        if (exists) return this.err("这个昵称已被占用，换一个吧");
        if (pass !== pass2) return this.err("两次输入的密码不一致");
        const salt = uid();
        const user = {
          id: uid(), name, salt,
          hash: await hashPass(salt, pass),
          createdAt: Date.now()
        };
        users.push(user);
        write(K_USERS, users);
        this.setSession(user);
        this.afterAuth("注册成功，欢迎加入奶蛙家族 🐸");
      } else {
        if (!exists) return this.err("昵称或密码不正确");
        const hash = await hashPass(exists.salt, pass);
        if (hash !== exists.hash) return this.err("昵称或密码不正确");
        this.setSession(exists);
        this.afterAuth("登录成功 🐸");
      }
    },

    afterAuth(msg) {
      this.close();
      this.renderUser();
      tip(msg);
    },

    logout() {
      localStorage.removeItem(K_SESSION);
      this.renderUser();
      tip("已退出登录");
    },

    renderUser() {
      const u = this.current();
      if (u) {
        $("loginBtn").classList.add("hidden");
        $("userInfo").classList.remove("hidden");
        const av = $("ubAvatar");
        av.textContent = initial(u.name);
        av.style.background = colorOf(u.name);
        $("ubName").textContent = u.name;
      } else {
        $("loginBtn").classList.remove("hidden");
        $("userInfo").classList.add("hidden");
      }
      if (window.Social && Social.game) Social.renderComments();
    }
  };

  /* ---------------- 好友 ---------------- */
  const Friends = {
    open() {
      if (!Auth.current()) { Auth.open("login"); return; }
      $("friendErr").classList.add("hidden");
      this.render();
      $("friendsModal").classList.remove("hidden");
    },
    close() { $("friendsModal").classList.add("hidden"); },
    err(msg) {
      const el = $("friendErr");
      el.textContent = msg;
      el.classList.remove("hidden");
    },

    request() {
      const me = Auth.current();
      if (!me) { Auth.open("login"); return; }
      $("friendErr").classList.add("hidden");
      const name = $("friendInput").value.trim();
      if (!name) return this.err("请输入对方昵称");

      const users = read(K_USERS, []);
      const target = users.find(u => u.name.toLowerCase() === name.toLowerCase());
      if (!target) return this.err("没有找到这个奶蛙用户");
      if (target.id === me.id) return this.err("不能加自己为好友哦");

      const reqs = read(K_REQ, []);
      const isFriend = reqs.some(r => r.status === "accepted" &&
        ((r.from === me.id && r.to === target.id) || (r.from === target.id && r.to === me.id)));
      if (isFriend) return this.err("你们已经是好友啦");

      const incoming = reqs.find(r => r.status === "pending" && r.from === target.id && r.to === me.id);
      if (incoming) {
        incoming.status = "accepted";
        write(K_REQ, reqs);
        $("friendInput").value = "";
        this.render();
        tip("已互相添加为好友 🐸");
        return;
      }
      if (reqs.some(r => r.status === "pending" && r.from === me.id && r.to === target.id)) {
        return this.err("请求已发送，等待对方同意");
      }

      reqs.push({ id: uid(), from: me.id, to: target.id, status: "pending", time: Date.now() });
      write(K_REQ, reqs);
      $("friendInput").value = "";
      this.render();
      tip("好友请求已发送 🐸");
    },

    accept(id) {
      const reqs = read(K_REQ, []);
      const r = reqs.find(x => x.id === id);
      if (r) {
        r.status = "accepted";
        write(K_REQ, reqs);
        this.render();
        tip("已同意好友请求 🎉");
      }
    },
    reject(id) {
      write(K_REQ, read(K_REQ, []).filter(x => x.id !== id));
      this.render();
    },

    render() {
      const me = Auth.current();
      if (!me) return;
      const users = read(K_USERS, []);
      const reqs = read(K_REQ, []);
      const nameOf = id => (users.find(u => u.id === id) || {}).name || "未知用户";

      const incoming = reqs.filter(r => r.status === "pending" && r.to === me.id);
      const friends = reqs.filter(r => r.status === "accepted" && (r.from === me.id || r.to === me.id));

      $("reqCount").textContent = incoming.length;
      $("friendCount").textContent = friends.length;

      $("reqList").innerHTML = incoming.length
        ? incoming.map(r => {
            const n = nameOf(r.from);
            return `<div class="friend-item">
              <span class="fi-avatar" style="background:${colorOf(n)}">${esc(initial(n))}</span>
              <span class="fi-name">${esc(n)}</span>
              <button class="fi-accept" onclick="Friends.accept('${r.id}')">同意</button>
              <button class="fi-reject" onclick="Friends.reject('${r.id}')">拒绝</button>
            </div>`;
          }).join("")
        : '<p class="friend-empty">暂无待处理请求</p>';

      $("friendList").innerHTML = friends.length
        ? friends.map(r => {
            const n = nameOf(r.from === me.id ? r.to : r.from);
            return `<div class="friend-item">
              <span class="fi-avatar" style="background:${colorOf(n)}">${esc(initial(n))}</span>
              <span class="fi-name">${esc(n)}</span>
              <span class="fi-done">好友</span>
            </div>`;
          }).join("")
        : '<p class="friend-empty">还没有好友，去添加一个吧～</p>';
    }
  };

  /* ---------------- 游戏评论 ---------------- */
  const Social = {
    game: null,
    commentsOpen: false,

    list() { return read(K_CMT, []); },
    count(gameId) { return this.list().filter(c => c.gameId === gameId).length; },

    toggleComments() {
      if (!this.game) return;
      const panel = $("commentPanel");
      const willOpen = panel.classList.contains("hidden");
      panel.classList.toggle("hidden", !willOpen);
      this.commentsOpen = willOpen;
      if (willOpen) this.renderComments();
    },
    closeComments() {
      $("commentPanel").classList.add("hidden");
      this.commentsOpen = false;
    },

    renderComments() {
      if (!this.game) return;
      const me = Auth.current();
      const all = this.list()
        .filter(c => c.gameId === this.game.id)
        .sort((a, b) => b.time - a.time);

      $("playCommentCount").textContent = all.length;
      $("commentList").innerHTML = all.length
        ? all.map(c => `
          <div class="cp-item">
            <div class="cp-meta">
              <span class="cp-avatar" style="background:${colorOf(c.user)}">${esc(initial(c.user))}</span>
              <span class="cp-name">${esc(c.user)}</span>
              <span class="cp-time">${relTime(c.time)}</span>
              ${me && me.id === c.userId ? `<button class="cp-del" onclick="Social.del('${c.id}')">删除</button>` : ""}
            </div>
            <div class="cp-text">${esc(c.text)}</div>
          </div>`).join("")
        : '<p class="cp-empty">还没有评论，来做第一个呱～</p>';

      if (me) {
        $("cpForm").classList.remove("hidden");
        $("cpLoginTip").classList.add("hidden");
      } else {
        $("cpForm").classList.add("hidden");
        $("cpLoginTip").classList.remove("hidden");
      }
    },

    sendComment() {
      const me = Auth.current();
      if (!me) { Auth.open("login"); return; }
      if (!this.game) return;
      const text = $("commentText").value.trim();
      if (!text) { tip("说点什么再发送吧～"); return; }

      const all = this.list();
      all.push({
        id: uid(),
        gameId: this.game.id,
        userId: me.id,
        user: me.name,
        text: text.slice(0, 200),
        time: Date.now()
      });
      write(K_CMT, all);
      $("commentText").value = "";
      this.renderComments();
      tip("评论成功 🐸");
    },

    del(id) {
      const me = Auth.current();
      if (!me) return;
      const all = this.list();
      const c = all.find(x => x.id === id);
      if (!c || c.userId !== me.id) return;
      write(K_CMT, all.filter(x => x.id !== id));
      this.renderComments();
      tip("已删除评论");
    },

    openFriends() { Friends.open(); }
  };

  /* ---------------- 接入试玩弹窗 ---------------- */
  function hookPlayer() {
    if (typeof Player === "undefined") return;
    const origOpen = Player.open.bind(Player);
    const origClose = Player.close.bind(Player);

    Player.open = function (game) {
      origOpen(game);
      Social.game = game;
      Social.commentsOpen = false;
      $("commentPanel").classList.add("hidden");
      $("commentText").value = "";
      $("playCommentCount").textContent = Social.count(game.id);
      Social.renderComments();
    };

    Player.close = function () {
      origClose();
      Social.game = null;
      Social.closeComments();
    };
  }

  /* ---------------- 事件绑定 ---------------- */
  function bind() {
    $("authModal").addEventListener("click", e => { if (e.target === $("authModal")) Auth.close(); });
    $("friendsModal").addEventListener("click", e => { if (e.target === $("friendsModal")) Friends.close(); });

    $("authPass").addEventListener("keydown", e => { if (e.key === "Enter") Auth.submit(); });
    $("authPass2").addEventListener("keydown", e => { if (e.key === "Enter") Auth.submit(); });
    $("authUser").addEventListener("keydown", e => { if (e.key === "Enter") $("authPass").focus(); });
    $("friendInput").addEventListener("keydown", e => { if (e.key === "Enter") Friends.request(); });

    $("commentText").addEventListener("keydown", e => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) Social.sendComment();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") { Auth.close(); Friends.close(); }
    });
  }

  /* ---------------- 启动 ---------------- */
  window.Auth = Auth;
  window.Friends = Friends;
  window.Social = Social;

  hookPlayer();
  Auth.renderUser();
  bind();
  document.documentElement.dataset.social = "ready";
})();
