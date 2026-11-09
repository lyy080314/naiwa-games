import subprocess, os, sys, time
from PIL import Image

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTDIR = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\assets\img\icons"
TMP = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\.shot_tmp"
os.makedirs(OUTDIR, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

GAMES = [
    ("game1", "奶蛙旅行",     "https://www.bilibili.com/toy/TravelMilkyFrog/index.html"),
    ("game2", "奶蛙矿工",     "https://66970010-boop.github.io/frog-miner"),
    ("game3", "奶蛙档案",     "https://www.naiwa.world/#timeline"),
    ("game4", "奶蛙手机软件", "https://milkyfrog.com/#app"),
    ("game5", "奶蛙街舞",     "https://nailong-dance.pages.dev"),
    ("game6", "合成大奶蛙",   "https://yhsome.github.io/BigNaiWa/"),
    ("game7", "奶蛙快跑",     "https://naiwa-kuaipao.pages.dev/?v"),
    ("game8", "奶蛙鼓鼓碰",   "https://naiwa-gugupeng.pages.dev"),
    ("game9", "奶蛙消消乐",   "https://chenckx0614.github.io/naiwaxxl/"),
]

W, H = 900, 720

for gid, name, url in GAMES:
    raw = os.path.join(TMP, gid + "_raw.png")
    final = os.path.join(OUTDIR, gid + ".png")
    args = [
        EDGE, "--headless", "--disable-gpu", "--no-sandbox",
        "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
        "--user-data-dir=" + os.path.join(TMP, "profile_" + gid),
        "--window-size=%d,%d" % (W, H),
        "--virtual-time-budget=7000",
        "--screenshot=" + raw,
        url,
    ]
    print("▶ 截图:", name, url)
    try:
        subprocess.run(args, timeout=60, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        print("  运行异常:", e)
    if not os.path.exists(raw):
        print("  ✗ 未生成截图:", raw)
        continue
    try:
        im = Image.open(raw).convert("RGB")
        # 裁切为中心方形
        side = min(im.width, im.height)
        left = (im.width - side) // 2
        top = (im.height - side) // 2
        im = im.crop((left, top, left + side, top + side))
        im = im.resize((256, 256), Image.LANCZOS)
        im.save(final)
        print("  ✓ 已保存:", final, os.path.getsize(final), "bytes")
    except Exception as e:
        print("  ✗ 处理失败:", e)

print("完成。")
