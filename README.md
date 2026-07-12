# Soykans Oto Yedek Parça — Kurumsal Web Sitesi

Soykans Oto Araç Yedek Parça Sanayi ve Ticaret Limited Şirketi için hazırlanmış,
modern ve mobil uyumlu tek sayfa (single-page) kurumsal tanıtım sitesi.

## Özellikler

- **Tek sayfa** yapı: Anasayfa, Hakkımızda, Misyonumuz, Vizyonumuz, İletişim bölümleri; yumuşak kaydırmalı menü.
- **Responsive** tasarım (masaüstü / tablet / mobil), mobilde hamburger menü.
- **İletişim formu** — `mailto:info@soykans.com` üzerinden çalışır (backend gerektirmez).
- Footer'da **Google Maps** konum haritası (Kaynarca Mah. E5 Yanyolu Cad. No:34/0 Pendik/İstanbul).
- **Gizlilik Politikası**, **Çerez Politikası**, **Kullanıcı Sözleşmesi** — modal popup olarak açılır.
- **Çerez onay banner'ı** (localStorage ile tercih hatırlanır).
- SEO uyumlu: `lang="tr"`, meta description, Open Graph, `LocalBusiness` JSON-LD şeması; tüm metinler özgün.

## Dosya Yapısı

```
index.html      # Tüm işaretleme (bölümler, modallar, footer)
css/style.css   # Stiller ve responsive kurallar
js/main.js      # Menü, kaydırma, modal, çerez banner, form
```

## Yayınlama

Statik bir sitedir; herhangi bir web sunucusunda `index.html` kök dizine
konularak yayınlanabilir (ör. Netlify, GitHub Pages, paylaşımlı hosting).

## Firma Bilgileri

- **Ünvan:** Soykans Oto Araç Yedek Parça San. ve Tic. Ltd. Şti.
- **Adres:** Kaynarca Mahallesi, E5 Yanyolu Cad. No:34/0 — Pendik / İstanbul 34890
- **E-posta:** info@soykans.com · **Web:** soykans.com
