import zipfile

z = zipfile.ZipFile(r"c:\Users\Lenovo\CodeBuddy\20261028181912\玩转奶蛙\naiwa-games.zip")
names = z.namelist()
print("entries:", len(names))
for n in names[:15]:
    print(repr(n))

illegal = set('\\/:*?"<>|')
bad = [n for n in names if any(c in n for c in illegal)]
print("含非法字符条目数:", len(bad))
for n in bad[:15]:
    print("BAD", repr(n))
