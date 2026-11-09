import subprocess, os
from PIL import Image

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTDIR = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\assets\img\icons"
TMP = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\.shot_tmp"
os.makedirs(OUTDIR, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

GAMES = [
    ("n1",  "奶蛙狂笑",     "https://milkyfrog.com/"),
    ("n2",  "合成大奶蛙",   "https://milkyfrog.com/hecheng"),
    ("n3",  "奶蛙神跑",     "https://milkyfrog.com/shenpao"),
    ("n4",  "奶蛙羽毛球",   "https://milkyfrog.com/yumaoqiu"),
    ("n5",  "奶蛙jump",     "https://milkyfrog.com/jump"),
    ("n6",  "奶蛙的小窝",   "https://milkyfrog.com/xiaowo"),
    ("n7",  "召唤神龙",     "https://milkyfrog.com/shenlong"),
    ("n8",  "奶蛙放屁",     "https://milkyfrog.com/fangpi"),
    ("n9",  "奶蛙贪吃蛙",   "https://milkyfrog.com/tanchiwa"),
    ("n10", "奶蛙跳一跳",   "https://milkyfrog.com/tiaoyitiao"),
    ("n11", "奶蛙奶茶铺",   "https://milkyfrog.com/naicha"),
    ("n12", "奶蛙挠痒",     "https://milkyfrog.com/naoyang"),
    ("n13", "奶蛙2048",     "https://milkyfrog.com/nai2048"),
    ("n14", "合成小奶蛙",   "https://milkyfrog.com/xiaonaiwa"),
    ("n15", "奶蛙爱洗澡",   "https://milkyfrog.com/xizao"),
    ("n16", "奶蛙踢馆",     "https://milkyfrog.com/tiguan"),
    ("n17", "奶蛙推奶块",   "https://milkyfrog.com/naidan"),
    ("n18", "俄罗斯奶块",   "https://milkyfrog.com/naikuai"),
    ("n19", "奶蛙的奶块雨", "https://milkyfrog.com/naikuaiyu"),
    ("n20", "奶蛙打砖块",   "https://milkyfrog.com/dazhuankuai"),
    ("n21", "抓奶蛙",       "https://milkyfrog.com/zhua"),
    ("n22", "勇者奶蛙传",   "https://milkyfrog.com/yongzhe"),
    ("n23", "奶国物语",     "https://milkyfrog.com/naiguo"),
    ("n24", "奶蛙雷霆小队", "https://milkyfrog.com/leiting"),
    ("n25", "奶蛙2048超级版", "https://milkyfrog.com/2048"),
    ("n26", "奶蛙五子棋",   "https://milkyfrog.com/wuziqi"),
    ("n27", "奶了个蛙",     "https://milkyfrog.com/nailegewa"),
    ("n28", "奶蛙一跳",     "https://milkyfrog.com/tiao"),
    ("n29", "奶蛙颜色大挑战", "https://milkyfrog.com/yanse"),
    ("n30", "旅行奶蛙",     "https://milkyfrog.com/lvxing"),
    ("n31", "奶蛙快跑",     "https://milkyfrog.com/kuaipao"),
    ("n32", "奶蛙工厂",     "https://milkyfrog.com/gongchang"),
    ("n33", "奶蛙街舞",     "https://milkyfrog.com/jiewu"),
    ("n34", "奶蛙消消乐",   "https://milkyfrog.com/xiaoxiaole"),
]

W, H = 900, 720
ok = 0
fail = []
for gid, name, url in GAMES:
    raw = os.path.join(TMP, gid + "_raw.png")
    final = os.path.join(OUTDIR, gid + ".png")
    if os.path.exists(raw): os.remove(raw)
    args = [
        EDGE, "--headless", "--disable-gpu", "--no-sandbox",
        "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
        "--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader",
        "--user-data-dir=" + os.path.join(TMP, "p_" + gid),
        "--window-size=%d,%d" % (W, H),
        "--virtual-time-budget=3500",
        "--screenshot=" + raw, url,
    ]
    try:
        subprocess.run(args, timeout=50, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass
    if os.path.exists(raw):
        try:
            im = Image.open(raw).convert("RGB")
            side = min(im.width, im.height)
            l = (im.width - side)//2; t = (im.height - side)//2
            im = im.crop((l, t, l+side, t+side)).resize((256,256), Image.LANCZOS)
            im.save(final)
            ok += 1
        except Exception:
            fail.append(gid)
    else:
        fail.append(gid)
    print("已处理 %s %s （成功 %d/34）" % (gid, name, ok), flush=True)

print("\n完成：成功 %d 张，失败 %d 张 -> %s" % (ok, len(fail), ",".join(fail) if fail else "无"))
