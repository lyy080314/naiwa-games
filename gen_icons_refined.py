import subprocess, os
from PIL import Image, ImageDraw, ImageFont

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTDIR = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\assets\img\icons"
TMP = r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\.shot_tmp"
os.makedirs(OUTDIR, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

# 字体（支持中文）
FONT_PATH = r"C:\Windows\Fonts\msyh.ttc"
if not os.path.exists(FONT_PATH):
    FONT_PATH = r"C:\Windows\Fonts\simhei.ttf"
FONT = ImageFont.truetype(FONT_PATH, 30)

# (文件名, 游戏名, url) —— 需要重做的 PNG 图标
GAMES = [
    ("game1", "奶蛙旅行",   "https://www.bilibili.com/toy/TravelMilkyFrog/index.html"),
    ("game2", "奶蛙矿工",   "https://66970010-boop.github.io/frog-miner"),
    ("game3", "奶蛙档案",   "https://www.naiwa.world/#timeline"),
    ("game5", "奶蛙街舞",   "https://nailong-dance.pages.dev"),
    ("game6", "合成大奶蛙", "https://yhsome.github.io/BigNaiWa/"),
    ("game9", "奶蛙消消乐", "https://chenckx0614.github.io/naiwaxxl/"),
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

def make_icon(raw_path, final_path, name):
    im = Image.open(raw_path).convert("RGB")
    # 居中裁切 88% 聚焦玩法区，去掉边缘导航/留白
    side = int(min(im.width, im.height) * 0.88)
    l = (im.width - side)//2; t = (im.height - side)//2
    im = im.crop((l, t, l+side, t+side)).resize((256, 256), Image.LANCZOS)
    # 底部标题条（稍加改动）
    draw = ImageDraw.Draw(im)
    bar = 52
    draw.rectangle([0, 256-bar, 256, 256], fill=(0, 0, 0, 150))
    # 文字自适应缩放
    fnt = FONT
    text = name
    while fnt.size > 16:
        bbox = draw.textbbox((0, 0), text, font=fnt)
        if bbox[2] - bbox[0] <= 244:
            break
        fnt = ImageFont.truetype(FONT_PATH, fnt.size - 2)
    bbox = draw.textbbox((0, 0), text, font=fnt)
    tw = bbox[2] - bbox[0]
    draw.text(((256 - tw)//2, 256 - bar + (bar - (bbox[3]-bbox[1]))//2 - 2),
              text, font=fnt, fill=(255, 255, 255, 255))
    im.save(final_path)

for fid, name, url in GAMES:
    raw = os.path.join(TMP, fid + "_raw.png")
    final = os.path.join(OUTDIR, fid + ".png")
    if os.path.exists(raw): os.remove(raw)
    args = [
        EDGE, "--headless", "--disable-gpu", "--no-sandbox",
        "--no-first-run", "--no-default-browser-check", "--hide-scrollbars",
        "--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader",
        "--user-data-dir=" + os.path.join(TMP, "p_" + fid),
        "--window-size=%d,%d" % (W, H),
        "--virtual-time-budget=6000",
        "--screenshot=" + raw, url,
    ]
    try:
        subprocess.run(args, timeout=50, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass
    if os.path.exists(raw):
        try:
            make_icon(raw, final, name)
            ok += 1
        except Exception as e:
            fail.append(fid + "(proc:" + str(e) + ")")
    else:
        fail.append(fid + "(no-shot)")
    print("已处理 %s %s （成功 %d/%d）" % (fid, name, ok, len(GAMES)), flush=True)

print("\n完成：成功 %d，失败 %d -> %s" % (ok, len(fail), ",".join(fail) if fail else "无"))
