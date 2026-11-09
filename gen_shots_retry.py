import subprocess, os
from PIL import Image

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTDIR = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\assets\img\icons"
TMP = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\.shot_tmp"
os.makedirs(TMP, exist_ok=True)

GAMES = [
    ("game5", "奶蛙街舞",     "https://nailong-dance.pages.dev"),
    ("game7", "奶蛙快跑",     "https://naiwa-kuaipao.pages.dev/?v"),
    ("game8", "奶蛙鼓鼓碰",   "https://naiwa-gugupeng.pages.dev"),
]

W, H = 900, 720
for gid, name, url in GAMES:
    raw = os.path.join(TMP, gid + "_raw.png")
    final = os.path.join(OUTDIR, gid + ".png")
    if os.path.exists(raw): os.remove(raw)
    args = [
        EDGE, "--headless=new", "--disable-gpu", "--no-sandbox",
        "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
        "--user-data-dir=" + os.path.join(TMP, "profile_" + gid),
        "--window-size=%d,%d" % (W, H),
        "--virtual-time-budget=4000",
        "--screenshot=" + raw, url,
    ]
    print("▶ 重试截图:", name)
    try:
        subprocess.run(args, timeout=120, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        print("  超时/异常:", e)
    if os.path.exists(raw):
        try:
            im = Image.open(raw).convert("RGB")
            side = min(im.width, im.height)
            l = (im.width - side)//2; t = (im.height - side)//2
            im = im.crop((l, t, l+side, t+side)).resize((256,256), Image.LANCZOS)
            im.save(final)
            print("  ✓ 已保存:", final, os.path.getsize(final), "bytes")
        except Exception as e:
            print("  ✗ 处理失败:", e)
    else:
        print("  ✗ 仍未生成截图")
print("重试完成。")
