# Rentyzone FYS demo

Rentyzone Filo Yönetim Sistemi arayüz önizlemesi.

Bu klasör bağımsız bir statik web sitesidir. `index.html`, `assets/`, `robots.txt`, `.nojekyll` ve `CNAME` dosyaları birlikte yayınlanır. Derleme veya bağımlılık kurulumu gerekmez.

Canlı demo: [fys.rentyzone.com](https://fys.rentyzone.com)

4 Ekim 2026 tarihinde GitHub Pages yayını, Cloudflare CNAME kaydı ve HTTPS erişimi doğrulandı. HTTP bağlantıları HTTPS'e yönlendirilir.

Demo gerçek müşteri verisi içermez. Yönetici oturumu, veri tabanı ve operasyon kayıt işlemleri henüz bağlı değildir; kişi, araç, rezervasyon ve sözleşme formlarındaki bilgiler saklanmaz veya sunucuya gönderilmez. Yalnızca fiyat kodu adı ve araç gruplarının dönem tarifeleri bu tarayıcıda saklanır.

7 Ekim 2026 güncellemesi: Cari İşlemleri altına Teknik bölümü eklendi (Araç Bilgileri Tanımlama, Filo Listesi, Oto Hareket Raporu). Muhasebe menüsü Tahsilat/Tediye Girişi, Masraf Listesi Girişi ve Kasa İşlemleri sırasına getirildi. Ana sayfa ve işlem ekranlarındaki sağ yardımcı bölümler kaldırılarak ana içerikler genişletildi.

Form güncellemesi: Sayfaların üst başlık ve aksiyon alanları kaldırıldı. Rezervasyon ve sözleşmede Gönderen, Sürücü / yolcu ve Ödeyen ayrıldı; ödeme sorumluluğu ödeyen türüne göre gösterilir. Rezervasyon 40 araç grubu ve fiyat kodu ile hazırlanır; plaka yalnızca sözleşmede eşleştirilir. Araç kaydında grup, ayrı marka/model bölümleri ve muayene, kasko, sigorta yapılış/bitiş tarihleri bulunur. Ayarlar → Fiyat Kodu oluşturma ekranında aynı kodun birden fazla grubuna günlük, haftalık, aylık ve yıllık fiyat eklenebilir; kayıtlı kodlar düzenlenebilir ve rezervasyonda gruba göre filtrelenir. Demo tarifeleri tarayıcıya özeldir; ortak sunucu kaydı değildir.

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
