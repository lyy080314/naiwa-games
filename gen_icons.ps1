$dir = "c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\assets\img\icons"
New-Item -ItemType Directory -Force -Path $dir | Out-Null

# 奶蛙本体（黄色梨形身体、乳白肚皮、凸起绿眼、一字嘴、细四肢）
$frog = @'
  <!-- 腿 -->
  <ellipse cx="78" cy="160" rx="15" ry="9" fill="#F5B301"/>
  <ellipse cx="122" cy="160" rx="15" ry="9" fill="#F5B301"/>
  <!-- 手臂 -->
  <path d="M58,110 q-18,4 -20,24" stroke="#F5B301" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M142,110 q18,4 20,24" stroke="#F5B301" stroke-width="9" fill="none" stroke-linecap="round"/>
  <!-- 身体（梨形） -->
  <path d="M100,42 C72,42 56,70 56,96 C56,124 60,153 78,163 C86,168 114,168 122,163 C140,153 144,124 144,96 C144,70 128,42 100,42 Z" fill="#FFD93D" stroke="#E9A900" stroke-width="2"/>
  <!-- 肚皮 -->
  <ellipse cx="100" cy="120" rx="33" ry="41" fill="#FFF3CF"/>
  <!-- 凸起的圆眼（眼白泛绿） -->
  <circle cx="80" cy="42" r="17" fill="#E6F7C9" stroke="#E9A900" stroke-width="2"/>
  <circle cx="120" cy="42" r="17" fill="#E6F7C9" stroke="#E9A900" stroke-width="2"/>
  <circle cx="80" cy="44" r="7.5" fill="#2b2b2b"/>
  <circle cx="120" cy="44" r="7.5" fill="#2b2b2b"/>
  <circle cx="77" cy="41" r="2.4" fill="#ffffff"/>
  <circle cx="117" cy="41" r="2.4" fill="#ffffff"/>
  <!-- 一字嘴 -->
  <path d="M84,90 L116,90" stroke="#7a5a00" stroke-width="3" stroke-linecap="round"/>
  <!-- 腮红 -->
  <circle cx="68" cy="80" r="6" fill="#FFB0B0" opacity="0.7"/>
  <circle cx="132" cy="80" r="6" fill="#FFB0B0" opacity="0.7"/>
'@

$icons = @(
  @{ name = "icon-travel";  c1 = "#7ed6b0"; c2 = "#43b97f"; emoji = "🎒"; tag = "旅行" },
  @{ name = "icon-miner";   c1 = "#ffd66b"; c2 = "#f5a623"; emoji = "⛏️"; tag = "矿工" },
  @{ name = "icon-archive"; c1 = "#a9cdff"; c2 = "#5b9bd5"; emoji = "📋"; tag = "档案" },
  @{ name = "icon-app";     c1 = "#d6b3ff"; c2 = "#9b59b6"; emoji = "📱"; tag = "App" },
  @{ name = "icon-dance";   c1 = "#ffb0d6"; c2 = "#ff6fb5"; emoji = "🎧"; tag = "街舞" },
  @{ name = "icon-merge";   c1 = "#ffcf94"; c2 = "#ff9f59"; emoji = "➕"; tag = "合成" },
  @{ name = "icon-run";     c1 = "#9fe9e6"; c2 = "#34c4c4"; emoji = "🏃"; tag = "快跑" },
  @{ name = "icon-drum";    c1 = "#ffb3a0"; c2 = "#ff7043"; emoji = "🥁"; tag = "鼓鼓碰" },
  @{ name = "icon-match";   c1 = "#b6eeb0"; c2 = "#5cb85c"; emoji = "🔷"; tag = "消消乐" }
)

foreach ($it in $icons) {
  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="$($it.c1)"/>
      <stop offset="1" stop-color="$($it.c2)"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="44" fill="url(#bg)"/>
  <circle cx="100" cy="158" r="82" fill="#ffffff" opacity="0.16"/>
  <g transform="translate(0,4)">$frog</g>
  <text x="152" y="60" font-size="44" text-anchor="middle">$($it.emoji)</text>
  <text x="100" y="190" font-size="20" text-anchor="middle" fill="#ffffff" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-weight="700">$($it.tag)</text>
</svg>
"@
  Set-Content -Path "$dir\$($it.name).svg" -Value $svg -Encoding UTF8
  Write-Host "generated $($it.name).svg"
}
