/* ==========================================================
 * 玩转奶蛙 - 主逻辑
 * ========================================================== */

/* ---------- 默认游戏列表 ---------- */
const DEFAULT_GAMES = [
  { id: "g1",  name: "奶蛙旅行",     url: "https://www.bilibili.com/toy/TravelMilkyFrog/index.html", cover: "assets/img/frog-cloud.jpg",  icon: "assets/img/icons/game1.png",
    desc: "背上小书包环游世界，一路邂逅奇妙风景与惊喜小彩蛋。" },
  { id: "g2",  name: "奶蛙矿工",     url: "https://66970010-boop.github.io/frog-miner",              cover: "assets/img/frog-side.jpg",   icon: "assets/img/icons/game2.png",
    desc: "戴上安全帽挥起小镐头，挖呀挖呀挖出闪闪发光的宝石。" },
  { id: "g3",  name: "奶蛙档案",     url: "https://www.naiwa.world/#timeline",                       cover: "assets/img/frog-model.jpg",  icon: "assets/img/icons/game3.png",
    desc: "翻开奶蛙成长时光机，按时间线重温每一个呱呱名场面。" },

  { id: "n1",  name: "奶蛙狂笑",     url: "https://milkyfrog.com/",                cover: "assets/img/frog-laugh.jpg",  icon: "assets/img/icons/n1.png",  desc: "点一下就捧腹狂笑，停不下来的魔性名场面。" },
  { id: "n2",  name: "合成大奶蛙",   url: "https://milkyfrog.com/hecheng",         cover: "assets/img/frog-laugh.jpg",  icon: "assets/img/icons/n2.png",  desc: "两只小奶蛙碰一碰，越合越大蹦出巨蛙。" },
  { id: "n3",  name: "奶蛙神跑",     url: "https://milkyfrog.com/shenpao",         cover: "assets/img/frog-stand.jpg",  icon: "assets/img/icons/n3.png",  desc: "风一样的奶蛙，神级走位一路狂奔。" },
  { id: "n4",  name: "奶蛙羽毛球",   url: "https://milkyfrog.com/yumaoqiu",        cover: "assets/img/frog-dance.jpg",  icon: "assets/img/icons/n4.png",  desc: "挥拍对决，和奶蛙来一场羽毛球大战。" },
  { id: "n5",  name: "奶蛙jump",     url: "https://milkyfrog.com/jump",            cover: "assets/img/frog-stand.jpg",  icon: "assets/img/icons/n5.png",  desc: "一跳再一跳，踩准节奏向上蹦。" },
  { id: "n6",  name: "奶蛙的小窝",   url: "https://milkyfrog.com/xiaowo",          cover: "assets/img/frog-cloud.jpg",  icon: "assets/img/icons/n6.png",  desc: "布置奶蛙温馨小窝，装扮专属空间。" },
  { id: "n7",  name: "召唤神龙",     url: "https://milkyfrog.com/shenlong",        cover: "assets/img/frog-model.jpg",  icon: "assets/img/icons/n7.png",  desc: "集齐碎片召唤神龙，开启惊喜。" },
  { id: "n8",  name: "奶蛙放屁",     url: "https://milkyfrog.com/fangpi",          cover: "assets/img/frog-laugh.jpg",  icon: "assets/img/icons/n8.png",  desc: "魔性放屁音效，笑到停不下来的恶搞。" },
  { id: "n9",  name: "奶蛙贪吃蛙",   url: "https://milkyfrog.com/tanchiwa",        cover: "assets/img/frog-side.jpg",   icon: "assets/img/icons/n9.png",  desc: "张嘴吞豆豆，贪吃的奶蛙停不下嘴。" },
  { id: "n10", name: "奶蛙跳一跳",   url: "https://milkyfrog.com/tiaoyitiao",      cover: "assets/img/frog-stand.jpg",  icon: "assets/img/icons/n10.png", desc: "方块之间连续起跳，别掉下去。" },
  { id: "n11", name: "奶蛙奶茶铺",   url: "https://milkyfrog.com/naicha",          cover: "assets/img/frog-hat.jpg",    icon: "assets/img/icons/n11.png", desc: "经营奶蛙奶茶铺，调出甜蜜一杯。" },
  { id: "n12", name: "奶蛙挠痒",     url: "https://milkyfrog.com/naoyang",         cover: "assets/img/frog-laugh.jpg",  icon: "assets/img/icons/n12.png", desc: "挠挠痒痒，看奶蛙笑到打滚。" },
  { id: "n13", name: "奶蛙2048",     url: "https://milkyfrog.com/nai2048",         cover: "assets/img/frog-model.jpg",  icon: "assets/img/icons/n13.png", desc: "经典2048，合出你的超级奶蛙。" },
  { id: "n14", name: "合成小奶蛙",   url: "https://milkyfrog.com/xiaonaiwa",       cover: "assets/img/frog-laugh.jpg",  icon: "assets/img/icons/n14.png", desc: "萌系合成，凑出最矮萌的小奶蛙。" },
  { id: "n15", name: "奶蛙爱洗澡",   url: "https://milkyfrog.com/xizao",           cover: "assets/img/frog-cloud.jpg",  icon: "assets/img/icons/n15.png", desc: "帮奶蛙泡泡浴，洗得香喷喷。" },
  { id: "n16", name: "奶蛙踢馆",     url: "https://milkyfrog.com/tiguan",          cover: "assets/img/frog-dance.jpg",  icon: "assets/img/icons/n16.png", desc: "踢馆挑战，勇闯各路高手。" },
  { id: "n17", name: "奶蛙推奶块",   url: "https://milkyfrog.com/naidan",          cover: "assets/img/frog-side.jpg",   icon: "assets/img/icons/n17.png", desc: "推动奶块解谜，规划每一步。" },
  { id: "n18", name: "俄罗斯奶块",   url: "https://milkyfrog.com/naikuai",         cover: "assets/img/frog-model.jpg",  icon: "assets/img/icons/n18.png", desc: "俄罗斯方块 × 奶块，经典新玩法。" },
  { id: "n19", name: "奶蛙的奶块雨", url: "https://milkyfrog.com/naikuaiyu",       cover: "assets/img/frog-hat.jpg",    icon: "assets/img/icons/n19.png", desc: "奶块从天而降，接稳别堆满。" },
  { id: "n20", name: "奶蛙打砖块",   url: "https://milkyfrog.com/dazhuankuai",     cover: "assets/img/frog-dance.jpg",  icon: "assets/img/icons/n20.png", desc: "弹球打砖块，击穿层层奶砖。" },
  { id: "n21", name: "抓奶蛙",       url: "https://milkyfrog.com/zhua",            cover: "assets/img/frog-stand.jpg",  icon: "assets/img/icons/n21.png", desc: "眼疾手快，把奶蛙一个个抓回家。" },
  { id: "n22", name: "勇者奶蛙传",   url: "https://milkyfrog.com/yongzhe",         cover: "assets/img/frog-cloud.jpg",  icon: "assets/img/icons/n22.png", desc: "勇者冒险，开启奶蛙的史诗旅程。" },
  { id: "n23", name: "奶国物语",     url: "https://milkyfrog.com/naiguo",          cover: "assets/img/frog-model.jpg",  icon: "assets/img/icons/n23.png", desc: "经营奶国，书写你的蛙生物语。" },
  { id: "n24", name: "奶蛙雷霆小队", url: "https://milkyfrog.com/leiting",         cover: "assets/img/frog-dance.jpg",  icon: "assets/img/icons/n24.png", desc: "组队出击，雷霆万钧闯关卡。" },
  { id: "n25", name: "奶蛙2048超级版", url: "https://milkyfrog.com/2048",          cover: "assets/img/frog-model.jpg",  icon: "assets/img/icons/n25.png", desc: "进阶版2048，更刺激更上头。" },
  { id: "n26", name: "奶蛙五子棋",   url: "https://milkyfrog.com/wuziqi",          cover: "assets/img/frog-side.jpg",   icon: "assets/img/icons/n26.png", desc: "黑白对弈，和奶蛙五子连珠。" },
  { id: "n27", name: "奶了个蛙",     url: "https://milkyfrog.com/nailegewa",       cover: "assets/img/frog-laugh.jpg",  icon: "assets/img/icons/n27.png", desc: "谐音玩梗，欢乐消遣小游戏。" },
  { id: "n28", name: "奶蛙一跳",     url: "https://milkyfrog.com/tiao",            cover: "assets/img/frog-stand.jpg",  icon: "assets/img/icons/n28.png", desc: "单键一跳，越跳越上瘾。" },
  { id: "n29", name: "奶蛙颜色大挑战", url: "https://milkyfrog.com/yanse",         cover: "assets/img/frog-hat.jpg",    icon: "assets/img/icons/n29.png", desc: "辨色反应大挑战，眼力大比拼。" },
  { id: "n30", name: "旅行奶蛙",     url: "https://milkyfrog.com/lvxing",         cover: "assets/img/frog-cloud.jpg",  icon: "assets/img/icons/n30.png", desc: "背上书包去旅行，收集沿途风景。" },
  { id: "n31", name: "奶蛙快跑",     url: "https://milkyfrog.com/kuaipao",         cover: "assets/img/frog-stand.jpg",  icon: "assets/img/icons/n31.png", desc: "躲避障碍全力冲刺，看谁跑得快。" },
  { id: "n32", name: "奶蛙工厂",     url: "https://milkyfrog.com/gongchang",       cover: "assets/img/frog-side.jpg",   icon: "assets/img/icons/n32.png", desc: "开动奶蛙工厂，流水线造蛙。" },
  { id: "n33", name: "奶蛙街舞",     url: "https://milkyfrog.com/jiewu",           cover: "assets/img/frog-dance.jpg",  icon: "assets/img/icons/n33.png", desc: "戴耳机摇摆，秀最潮奶蛙街舞。" },
  { id: "n34", name: "奶蛙消消乐",   url: "https://milkyfrog.com/xiaoxiaole",      cover: "assets/img/frog-hat.jpg",    icon: "assets/img/icons/n34.png", desc: "三三相连消除，越消越上头。" },

  { id: "g5",  name: "奶蛙街舞",     url: "https://nailong-dance.pages.dev",                         cover: "assets/img/frog-dance.jpg",  icon: "assets/img/icons/game5.png",
    desc: "戴上耳机摇摆起来，跟着节奏秀一段最潮的奶蛙街舞。" },
  { id: "g6",  name: "合成大奶蛙",   url: "https://yhsome.github.io/BigNaiWa/",                      cover: "assets/img/frog-laugh.jpg",  icon: "assets/img/icons/game6.png",
    desc: "两只小奶蛙碰一碰越合越大，最后蹦出超级巨蛙。" },
  { id: "g7",  name: "奶蛙快跑",     url: "https://naiwa-kuaipao.pages.dev/?v",                      cover: "assets/img/frog-stand.jpg",  icon: "assets/img/icons/icon-run.svg",
    desc: "前方有障碍！操控奶蛙一路狂奔，比谁跑得更快更稳。" },
  { id: "g8",  name: "奶蛙鼓鼓碰",   url: "https://naiwa-gugupeng.pages.dev",                        cover: "assets/img/frog-dance.jpg",  icon: "assets/img/icons/icon-drum.svg",
    desc: "敲起小鼓咚咚咚，让奶蛙在节奏碰撞中嗨翻全场。" },
  { id: "g9",  name: "奶蛙消消乐",   url: "https://chenckx0614.github.io/naiwaxxl/",                 cover: "assets/img/frog-hat.jpg",    icon: "assets/img/icons/game9.png",
    desc: "三个相连的奶蛙一起消失，消得越多分数越高越上头。" }
];

const STORE_GAMES  = "naiwa_games_v1";   // 用户游戏（含导入）
const STORE_PWD    = "naiwa_admin_pwd";  // 管理员密码（本地配置可覆盖）
const DEFAULT_PWD  = (window.NAIWA_CONFIG && window.NAIWA_CONFIG.adminPassword) || "naiwa666";
const CATEGORIES   = (window.NAIWA_CONFIG && window.NAIWA_CONFIG.categories) || ["全部", "动作", "益智", "经营", "休闲"];
const STORE_LOGIN  = "naiwa_admin_login";
const COVER_POOL = [
  "assets/img/frog-stand.jpg", "assets/img/frog-side.jpg",
  "assets/img/frog-laugh.jpg", "assets/img/frog-dance.jpg",
  "assets/img/frog-hat.jpg",   "assets/img/frog-cloud.jpg"
];

/* ---------- 存储工具 ---------- */
const Store = {
  /* 原始存储读出的管理员条目，顺序即导入先后（旧 → 新） */
  getExtra() {
    try {
      const extra = JSON.parse(localStorage.getItem(STORE_GAMES) || "[]");
      return Array.isArray(extra) ? extra.filter(g => g && g.url) : [];
    } catch (e) { return []; }
  },
  getGames() {
    const presets = DEFAULT_GAMES.map(g => ({
      ...g,
      intro: g.intro || g.desc || "",
      addedBy: "preset",
      createdAt: g.createdAt || 0
    }));
    const ids = new Set(presets.map(g => g.id));
    const customs = this.getExtra()
      .filter(g => !ids.has(g.id))
      .map(g => ({
        ...g,
        intro: g.intro || g.desc || "",
        addedBy: "admin",
        createdAt: g.createdAt || 0
      }));
    // 存储顺序保持导入先后，展示时新导入的排在最前
    return [...customs.slice().reverse(), ...presets];
  },
  saveExtra(list) {
    localStorage.setItem(STORE_GAMES, JSON.stringify(list));
  },
  removeGame(id) {
    this.saveExtra(this.getExtra().filter(g => g.id !== id));
  },
  getPassword() { return localStorage.getItem(STORE_PWD) || DEFAULT_PWD; },
  setPassword(p) { localStorage.setItem(STORE_PWD, p); }
};

/* ---------- 工具 ---------- */
const $ = id => document.getElementById(id);
function toast(msg, ms = 2200) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add("hidden"), ms);
}
function normalizeUrl(u) {
  u = (u || "").trim();
  if (!u) return "";
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  try {
    const url = new URL(u);
    if (!/^https?:$/.test(url.protocol)) return "";
    const host = url.hostname;
    if (!host || /\s/.test(host)) return "";
    const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
    if (!isIp && host !== "localhost" && !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host)) return "";
    return url.href;
  } catch (e) { return ""; }
}

/* ---------- 游戏列表渲染 ---------- */
let keyword = "";
let activeCategory = "全部";

function categoryOf(g) {
  if (g.category) return g.category;
  const n = g.name;
  if (/跑|踢馆|雷霆|勇者|羽毛球|街舞|jump/i.test(n)) return "动作";
  if (/2048|消消乐|五子棋|推奶块|俄罗斯|打砖块|颜色|合成|消除|跳/.test(n)) return "益智";
  if (/奶茶|工厂|小窝|奶国|旅行|档案|神龙|铺/.test(n)) return "经营";
  return "休闲";
}

function renderFilter() {
  const row = $("filterRow");
  if (!row) return;
  row.innerHTML = CATEGORIES.map(c =>
    `<button class="filter-chip${c === activeCategory ? " active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
  row.onclick = e => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    renderGames();
  };
}

function renderGames() {
  const grid = $("gameGrid");
  const games = Store.getGames().filter(g => {
    const hitKw = !keyword || g.name.toLowerCase().includes(keyword);
    const hitCat = activeCategory === "全部" || categoryOf(g) === activeCategory;
    return hitKw && hitCat;
  });
  grid.innerHTML = "";
  games.forEach((g, i) => {
    const isAdmin = Admin.isLogin;
    const card = document.createElement("div");
    card.className = "game-card";
    card.style.animationDelay = (i * 0.05) + "s";
    const cover = g.icon || g.cover || COVER_POOL[i % COVER_POOL.length];
    const addedByAdmin = g.addedBy === "admin" || g.custom;
    card.innerHTML = `
      <div class="card-cover">
        <img src="${cover}" alt="${escapeHtml(g.name)}" loading="lazy"
             onerror="this.src='${COVER_POOL[i % COVER_POOL.length]}'">
        ${addedByAdmin ? '<span class="card-badge new">管理员添加</span>' : '<span class="card-badge">官方精选</span>'}
        ${isAdmin && addedByAdmin ? `<button class="card-del" title="下架该游戏" data-del="${g.id}">🗑</button>` : ""}
      </div>
      <div class="card-body">
        <h3>${escapeHtml(g.name)}</h3>
        <p>${escapeHtml(g.intro || g.desc || g.url)}</p>
        <button class="card-play" data-play="${g.id}">▶ 开始游戏</button>
      </div>`;
    grid.appendChild(card);
  });
  $("gameCount").textContent = `共 ${games.length} 款游戏`;
  $("emptyTip").classList.toggle("hidden", games.length > 0);
  renderFilter();

  grid.onclick = e => {
    const del = e.target.closest("[data-del]");
    if (del) {
      const g = Store.getGames().find(x => x.id === del.dataset.del);
      if (g && confirm(`确定下架《${g.name}》吗？`)) {
        Store.removeGame(g.id);
        renderGames();
        toast("已下架 🐸");
      }
      return;
    }
    const play = e.target.closest("[data-play]");
    if (play) {
      const g = Store.getGames().find(x => x.id === play.dataset.play);
      if (g) Player.open(g);
    }
  };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

/* ---------- 试玩弹窗 ---------- */
const Player = {
  currentUrl: "",
  _loaded: false,
  _loadTimer: null,

  open(game) {
    $("playTitle").textContent = game.name + " 🐸";
    this.currentUrl = game.url;
    $("embedWarn").classList.add("hidden");
    const frame = $("playFrame");
    this._loaded = false;
    frame.onload = () => { this._loaded = true; };
    frame.src = game.url;
    $("playModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    clearTimeout(this._loadTimer);
    this._loadTimer = setTimeout(() => {
      if (!this._loaded) $("embedWarn").classList.remove("hidden");
    }, 4000);
  },

  reload() { $("playFrame").src = this.currentUrl; },

  fullscreen() {
    const el = document.querySelector(".modal-play");
    if (!document.fullscreenElement) {
      const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (req) req.call(el);
      else toast("当前浏览器不支持全屏");
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
      if (exit) exit.call(document);
    }
  },

  openNewTab() { window.open(this.currentUrl, "_blank"); },

  close() {
    clearTimeout(this._loadTimer);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    $("playFrame").src = "about:blank";
    $("playModal").classList.add("hidden");
    $("embedWarn").classList.add("hidden");
    document.body.style.overflow = "";
  }
};

/* ---------- 管理员 ---------- */
const Admin = {
  isLogin: sessionStorage.getItem(STORE_LOGIN) === "1",

  askPassword() {
    if (this.isLogin) { this.toggleAdminUI(true); return; }
    $("pwdErr").classList.add("hidden");
    $("pwdInput").value = "";
    $("pwdModal").classList.remove("hidden");
    setTimeout(() => $("pwdInput").focus(), 50);
  },
  closePwd() { $("pwdModal").classList.add("hidden"); },
  login() {
    const v = $("pwdInput").value;
    if (v === Store.getPassword()) {
      this.isLogin = true;
      sessionStorage.setItem(STORE_LOGIN, "1");
      this.closePwd();
      this.toggleAdminUI(true);
      renderGames();
      toast("欢迎回来，管理员 🐸👑");
      this.openAdd();
      } else {
      $("pwdErr").classList.remove("hidden");
      }
  },
  logout() {
    this.isLogin = false;
    sessionStorage.removeItem(STORE_LOGIN);
    this.toggleAdminUI(false);
    renderGames();
    toast("已退出管理模式");
  },
  toggleAdminUI(on) {
    $("adminAddBtn").classList.toggle("hidden", !on);
    $("adminExitBtn").classList.toggle("hidden", !on);
  },
  addTab(tab) {
    this._tab = tab;
    $("addTabOne").classList.toggle("active", tab === "one");
    $("addTabBatch").classList.toggle("active", tab === "batch");
    $("addOne").classList.toggle("hidden", tab !== "one");
    $("addBatch").classList.toggle("hidden", tab !== "batch");
    $("addSubmitBtn").textContent = tab === "batch" ? "批量导入" : "导入";
    $("addErr").classList.add("hidden");
  },
  openAdd() {
    this._tab = "one";
    this._coverData = "";
    $("gameName").value = "";
    $("gameUrl").value = "";
    $("gameIntro").value = "";
    $("gameCover").value = "";
    $("batchInput").value = "";
    $("gameCoverPreview").classList.add("hidden");
    $("gameCoverPreview").removeAttribute("src");
    $("addErr").classList.add("hidden");
    this.addTab("one");
    $("addModal").classList.remove("hidden");
    setTimeout(() => $("gameName").focus(), 50);
  },
  closeAdd() { $("addModal").classList.add("hidden"); },
  addErr(msg) {
    const el = $("addErr");
    el.textContent = msg;
    el.classList.remove("hidden");
  },

  pickCover(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const max = 320;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const cw = Math.max(1, Math.round(img.width * scale));
        const ch = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        canvas.getContext("2d").drawImage(img, 0, 0, cw, ch);
        this._coverData = canvas.toDataURL("image/jpeg", 0.82);
        const prev = $("gameCoverPreview");
        prev.src = this._coverData;
        prev.classList.remove("hidden");
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  },

  submitAdd() {
    if (this._tab === "batch") this.importBatch();
    else this.saveGame();
  },

  saveGame() {
    const name = $("gameName").value.trim();
    const rawUrl = $("gameUrl").value.trim();
    if (!name) return this.addErr("请填写游戏名称");
    if (!rawUrl) return this.addErr("请填写游戏链接");
    const url = normalizeUrl(rawUrl);
    if (!url) return this.addErr("链接格式不正确，请检查后重试");
    // 已有条目（含预设）的链接先规范化再比较，避免 / 结尾差异漏判
    if (Store.getGames().some(g => normalizeUrl(g.url) === url)) return this.addErr("这个游戏已经在乐园上啦～");

    const extras = Store.getExtra();
    extras.push({
      id: "c" + Date.now(),
      name,
      url,
      intro: $("gameIntro").value.trim().slice(0, 60),
      cover: this._coverData || $("gameCover").value.trim() || COVER_POOL[extras.length % COVER_POOL.length],
      addedBy: "admin",
      createdAt: Date.now()
    });
    Store.saveExtra(extras);
    this.closeAdd();
    renderGames();
    toast(`《${name}》上架成功 🎉`);
  },

  importBatch() {
    const text = $("batchInput").value.trim();
    if (!text) return this.addErr("请先粘贴要导入的游戏列表");
    const lines = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    const extras = Store.getExtra();
    const exists = new Set(Store.getGames().map(g => normalizeUrl(g.url)));
    let added = 0, skipped = 0;
    lines.forEach(line => {
      const parts = line.split(/[,，\t]/);
      if (parts.length < 2) { skipped++; return; }
      const name = parts[0].trim();
      const url = normalizeUrl(parts.slice(1).join("").trim());
      if (!name || !url || exists.has(url)) { skipped++; return; }
      extras.push({
        id: "c" + Date.now() + "-" + added,
        name, url, intro: "",
        cover: COVER_POOL[(extras.length + added) % COVER_POOL.length],
        addedBy: "admin",
        createdAt: Date.now()
      });
      exists.add(url);
      added++;
    });
    if (!added) return this.addErr("没有解析到有效条目，请检查格式（名称,链接）");
    Store.saveExtra(extras);
    this.closeAdd();
    renderGames();
    toast(`批量导入完成：成功 ${added} 款${skipped ? `，跳过 ${skipped} 条` : ""}`);
  },
  resetGames() {
    if (!confirm("恢复默认游戏列表？导入的游戏将被移除。")) return;
    localStorage.removeItem(STORE_GAMES);
    renderGames();
    toast("已恢复默认游戏列表");
  }
};

/* ---------- 事件绑定 ---------- */
function bindEvents() {
  const doSearch = () => {
    keyword = $("searchInput").value.trim().toLowerCase();
    renderGames();
  };
  $("searchBtn").onclick = doSearch;
  $("searchInput").addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });

  $("pwdInput").addEventListener("keydown", e => { if (e.key === "Enter") Admin.login(); });

  // 点击遮罩关闭弹窗
  [["playModal", () => Player.close()],
   ["pwdModal",  () => Admin.closePwd()],
   ["addModal",  () => Admin.closeAdd()]].forEach(([id, fn]) => {
    $(id).addEventListener("click", e => { if (e.target === $(id)) fn(); });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      Player.close(); Admin.closePwd(); Admin.closeAdd();
    }
  });

  // 彩蛋：连续点击页脚奶蛙 5 次直达管理员入口
  let hits = 0, timer = null;
  document.querySelector(".footer-frog").addEventListener("click", () => {
    hits++;
    clearTimeout(timer);
    timer = setTimeout(() => hits = 0, 1500);
    if (hits >= 5) { hits = 0; Admin.askPassword(); }
  });
}

/* ---------- 启动 ---------- */
window.Store = Store;
window.Player = Player;
window.Admin = Admin;
window.renderGames = renderGames;
window.categoryOf = categoryOf;

Admin.toggleAdminUI(Admin.isLogin);
renderGames();
bindEvents();
