"""Descarga las fotos enlazadas en assets/js/data/menu.js a assets/img/fotos/
y cambia las URLs del menú por rutas locales.

Uso (con internet), desde la carpeta del proyecto:
    python herramientas/descargar-fotos.py
"""
import os, re, urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MENU = os.path.join(RAIZ, "assets", "js", "data", "menu.js")
DESTINO = os.path.join(RAIZ, "assets", "img", "fotos")
os.makedirs(DESTINO, exist_ok=True)

texto = open(MENU, encoding="utf-8").read()
for url in sorted(set(re.findall(r'"foto": "(https?://[^"]+)"', texto))):
    nombre = url.rsplit("/", 1)[-1]
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r, open(os.path.join(DESTINO, nombre), "wb") as f:
            f.write(r.read())
        texto = texto.replace(url, "assets/img/fotos/" + nombre)
        print("OK   ", nombre)
    except Exception as e:
        print("ERROR", nombre, e)

open(MENU, "w", encoding="utf-8").write(texto)
print("Listo. Las fotos descargadas se usan desde assets/img/fotos/.")
