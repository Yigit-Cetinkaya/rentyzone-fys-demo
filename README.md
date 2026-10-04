# Rentyzone FYS demo

Rentyzone Filo Yönetim Sistemi arayüz önizlemesi.

Bu klasör bağımsız bir statik web sitesidir. `index.html`, `assets/`, `robots.txt`, `.nojekyll` ve `CNAME` dosyaları birlikte yayınlanır. Derleme veya bağımlılık kurulumu gerekmez.

Canlı demo: [fys.rentyzone.com](https://fys.rentyzone.com)

4 Ekim 2026 tarihinde GitHub Pages yayını, Cloudflare CNAME kaydı ve HTTPS erişimi doğrulandı. HTTP bağlantıları HTTPS'e yönlendirilir.

Demo gerçek müşteri verisi içermez. Yönetici oturumu, veri tabanı ve kayıt işlemleri henüz bağlı değildir; form alanlarına girilen bilgiler saklanmaz veya sunucuya gönderilmez.

## GitHub Pages

`Yigit-Cetinkaya/rentyzone-fys-demo` deposunun `main` dalı yalnızca bu demo sitesinin yayın dosyalarını içerir. Ana Rentyzone sitesinin kaynakları ve commit geçmişi bu depoya taşınmaz.

GitHub Settings → Pages:

- Source: Deploy from a branch
- Branch: main
- Folder: / (root)
- Custom domain: fys.rentyzone.com
- Enforce HTTPS: Etkin.

Cloudflare, `rentyzone.com` DNS:

- Type: CNAME
- Name: fys
- Target: yigit-cetinkaya.github.io
- Proxy status: DNS only
- TTL: Auto

Önce GitHub Pages üzerinde özel alan adı atanmalı, ardından DNS kaydı oluşturulmalıdır. CNAME dosyasının yüklenmesi tek başına yayını etkinleştirmez.

Demo deposu GitHub Free üzerinde Pages kullanılabilmesi için herkese açıktır. Ana `Yigit-Cetinkaya/rentyzone` deposu özeldir. Bu demo gerçek müşteri verisi veya sunucu kodu içermez.

Yerel önizleme:

```sh
python -m http.server 8766 --bind 127.0.0.1
```
