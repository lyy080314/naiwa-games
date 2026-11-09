import subprocess, os, urllib.request
from PIL import Image, ImageDraw, ImageFont

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
ROOT = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙"
OUTDIR = os.path.join(ROOT, "assets", "img", "icons")
TMP = os.path.join(ROOT, ".shot_tmp")
os.makedirs(OUTDIR, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

FONT_PATH = r"C:\Windows\Fonts\msyh.ttc"
if not os.path.exists(FONT_PATH):
    FONT_PATH = r"C:\Windows\Fonts\simhei.ttf"
FONT = ImageFont.truetype(FONT_PATH, 30)

# (文件, 游戏名, 游戏真实地址, 官方封面兜底图, 本地兜底图)
GAMES = [
    ("n1",  "奶蛙狂笑",     None, None, r"C:\Users\Lenovo\Pictures\奶蛙\66301933768feaf0f3ffd402e9c98a6e.jpg"),
    ("n2",  "合成大奶蛙",   "https://yhsome.github.io/BigNaiWa/v1/", "https://milkyfrog.com/assets/games/bignaiwa-6842bd8f.webp", None),
    ("n3",  "奶蛙神跑",     "https://naiwa.me", "https://milkyfrog.com/assets/games/shenpao-b6f09eb4.webp", None),
    ("n4",  "奶蛙羽毛球",   "https://www.bilibili.com/toy/naiwa-badminton/index.html", "https://milkyfrog.com/assets/games/badminton-670db478.webp", None),
    ("n5",  "奶蛙jump",     "https://naiwai-jump.github.io/", "https://milkyfrog.com/assets/games/njump-fc87c08a.webp", None),
    ("n6",  "奶蛙的小窝",   "https://naiwaxiaowu.pages.dev/", "https://milkyfrog.com/assets/games/xiaowu-1ee8e93c.webp", None),
    ("n7",  "召唤神龙",     "https://naiwa.games/", "https://milkyfrog.com/assets/games/shenlong-452d32f1.webp", None),
    ("n8",  "奶蛙放屁",     "https://naiwa-fart.pages.dev/", "https://milkyfrog.com/assets/games/fart-3c0de11a.webp", None),
    ("n9",  "奶蛙贪吃蛙",   "https://milkyfrogs.toolsbox.vip/", "https://milkyfrog.com/assets/games/snake-5af57c95.webp", None),
    ("n10", "奶蛙跳一跳",   "https://naiba-jump.pages.dev/", "https://milkyfrog.com/assets/games/tyt-72cb528b.webp", None),
    ("n11", "奶蛙奶茶铺",   "https://naiwanaichadian.pages.dev/", "https://milkyfrog.com/assets/games/naicha-00939e7c.webp", None),
    ("n12", "奶蛙挠痒",     "https://naiwa.bocchi.website/", "https://milkyfrog.com/assets/games/naoyang-b5a4603b.webp", None),
    ("n13", "奶蛙2048",     "https://yhsome.github.io/Nai2048/", "https://milkyfrog.com/assets/games/nai2048-425bbec5.webp", None),
    ("n14", "合成小奶蛙",   "https://yhsome.github.io/SmallNaiWa/", "https://milkyfrog.com/assets/games/smallnaiwa-6784681f.webp", None),
    ("n15", "奶蛙爱洗澡",   "https://milkfrog-bath.pages.dev/", "https://milkyfrog.com/assets/games/bath-f8951ee5.webp", None),
    ("n16", "奶蛙踢馆",     "https://night-market-rumble-54328.app.workbuddy.host/", "https://milkyfrog.com/assets/games/tiguan-10ddd09b.webp", None),
    ("n17", "奶蛙推奶块",   "https://sparkly-macaron-5c86c7.netlify.app/", "https://milkyfrog.com/assets/games/naidan-f85cfae5.webp", None),
    ("n18", "俄罗斯奶块",   "https://milkcubebycyanchan1eiann.netlify.app/", "https://milkyfrog.com/assets/games/naikuai-e172b2fa.webp", None),
    ("n19", "奶蛙的奶块雨", "https://naiwa-milk-rain.pages.dev/", "https://milkyfrog.com/assets/games/milkrain-39b11ae5.webp", None),
    ("n20", "奶蛙打砖块",   "https://niuniu513-ask.github.io/milky-breakout/?v=1deb2eb", "https://milkyfrog.com/assets/games/breakout-0cc61239.webp", None),
    ("n21", "抓奶蛙",       "https://machinelearningexpertqihang.github.io/zhua-nai-wa-/", "https://milkyfrog.com/assets/games/zhua-8e6124f2.webp", None),
    ("n22", "勇者奶蛙传",   "https://e.233ly.com/yDkGpm", "https://milkyfrog.com/assets/games/yongzhe-eb5776b8.webp", None),
    ("n23", "奶国物语",     "https://e.233ly.com/bn1yRe", "https://milkyfrog.com/assets/games/naiguo-27c1bcf9.webp", None),
    ("n24", "奶蛙雷霆小队", "https://e.233ly.com/v65Ihd", "https://milkyfrog.com/assets/games/leiting-9ccdb00e.webp", None),
    ("n25", "奶蛙2048超级版", "https://game.0z.hk/game/2048/", "https://milkyfrog.com/assets/games/n2048-c0aec0b7.webp", None),
    ("n26", "奶蛙五子棋",   "https://wudibaolongzhanshi1234.github.io/1335689.giyhub.io/", "https://milkyfrog.com/assets/games/wuziqi-4448549f.webp", None),
    ("n27", "奶了个蛙",     "https://junjunya2020.github.io/nailegewa", "https://milkyfrog.com/assets/games/nailegewa-2d7c51f8.webp", None),
    ("n28", "奶蛙一跳",     "https://naiwa-jump.pages.dev/", "https://milkyfrog.com/assets/games/jump-cff9b51d.webp", None),
    ("n29", "奶蛙颜色大挑战", "https://milkyfrog.toolsbox.vip/", "https://milkyfrog.com/assets/games/colors-1954f53c.webp", None),
    ("n30", "旅行奶蛙",     "https://www.bilibili.com/toy/TravelMilkyFrog/index.html", "https://milkyfrog.com/assets/games/travel-f03a164c.webp", None),
    ("n31", "奶蛙快跑",     "https://e.233ly.com/1ABrH3", "https://milkyfrog.com/assets/games/kuaipao-81820335.webp", None),
    ("n32", "奶蛙工厂",     "https://66970010-boop.github.io/frog-miner", "https://milkyfrog.com/assets/games/factory-506f7bb8.webp", None),
    ("n33", "奶蛙街舞",     "https://nailong-dance.pages.dev", "https://milkyfrog.com/assets/games/dance-7812a8b8.webp", None),
    ("n34", "奶蛙消消乐",   "https://chenckx0614.github.io/naiwaxxl/", "https://milkyfrog.com/assets/games/xxl-5d3adaa0.webp", None),
]

W, H = 900, 720

def add_title(im, name, final_path):
    im = im.convert("RGB")
    side = int(min(im.width, im.height) * 0.88)
    l = (im.width - side)//2; t = (im.height - side)//2
    im = im.crop((l, t, l+side, t+side)).resize((256, 256), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    bar = 52
    d.rectangle([0, 256-bar, 256, 256], fill=(0, 0, 0, 150))
    fnt = FONT
    while fnt.size > 16:
        bb = d.textbbox((0, 0), name, font=fnt)
        if bb[2]-bb[0] <= 244: break
        fnt = ImageFont.truetype(FONT_PATH, fnt.size-2)
    bb = d.textbbox((0, 0), name, font=fnt); tw = bb[2]-bb[0]
    d.text(((256-tw)//2, 256-bar+(bar-(bb[3]-bb[1]))//2-2), name, font=fnt, fill=(255,255,255,255))
    im.save(final_path)

def shot(url, raw):
    if os.path.exists(raw): os.remove(raw)
    args = [EDGE, "--headless", "--disable-gpu", "--no-sandbox",
            "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
            "--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader",
            "--user-data-dir=" + os.path.join(TMP, "q_" + os.path.basename(raw)),
            "--window-size=%d,%d" % (W, H), "--virtual-time-budget=6000",
            "--screenshot=" + raw, url]
    try:
        subprocess.run(args, timeout=70, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass
    return os.path.exists(raw)

def download(url, path):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r, open(path, "wb") as f:
            f.write(r.read())
        return os.path.exists(path) and os.path.getsize(path) > 0
    except Exception:
        return False

ok = 0; fail = []
for fid, name, url, cover, local in GAMES:
    final = os.path.join(OUTDIR, fid + ".png")
    raw = os.path.join(TMP, fid + "_raw.png")
    done = False
    # 本地兜底图（如 n1）
    if local and os.path.exists(local):
        try:
            add_title(Image.open(local), name, final); done = True; ok += 1
        except Exception as e:
            fail.append(fid + "(local:" + str(e) + ")")
    # 游戏本体截图
    if not done and url:
        if shot(url, raw):
            try:
                add_title(Image.open(raw), name, final); done = True; ok += 1
            except Exception as e:
                fail.append(fid + "(proc:" + str(e) + ")")
    # 官方封面兜底
    if not done and cover:
        cp = os.path.join(TMP, fid + "_cover.webp")
        if download(cover, cp):
            try:
                add_title(Image.open(cp), name, final); done = True; ok += 1
            except Exception as e:
                fail.append(fid + "(cover:" + str(e) + ")")
    if not done:
        fail.append(fid + "(all-fail)")
    print("已处理 %s %s （成功 %d/%d）" % (fid, name, ok, len(GAMES)), flush=True)

print("\n完成：成功 %d，失败 %d -> %s" % (ok, len(fail), ",".join(fail) if fail else "无"))
