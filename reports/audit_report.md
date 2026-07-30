# Project Asset Pipeline Final Audit Report

> [!TIP]
> Pipeline execution complete! Backup files are stored in `.optimization_backups/`.
> To rollback, run: `node scripts/optimize_project_assets.js --rollback`.

## Storage Savings Summary

| Metric | Before | After | Savings | Reduction |
| :--- | :--- | :--- | :--- | :--- |
| Total Storage | **45.74 MB** | **53.97 MB** | **-8.23 MB** | **-18%** |

## 1. Asset Inventory & Casing Standardisation

| Current Path | Standardised Target | Format | Dimensions | Size |
| :--- | :--- | :--- | :--- | :--- |
| `artboard-mediakit.webp` | *(No change)* | WEBP | 1920x1920 | 16.2 KB |
| `big-cine-expo-2025-award.png` | *(No change)* | PNG | 895x2560 | 1710.8 KB |
| `cold-storage-1.webp` | *(No change)* | WEBP | 322x225 | 18.2 KB |
| `cold-storage-2.webp` | *(No change)* | WEBP | 463x209 | 17.3 KB |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-2.jpg` | *(No change)* | JPG | 1904x2560 | 222.7 KB |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-3.jpg` | *(No change)* | JPG | 1904x2560 | 232.1 KB |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-4.jpg` | *(No change)* | JPG | 1904x2560 | 202.8 KB |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-5.jpg` | *(No change)* | JPG | 1904x2560 | 197.8 KB |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-6.jpg` | *(No change)* | JPG | 1904x2560 | 239.6 KB |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18.jpg` | *(No change)* | JPG | 1904x2560 | 242.8 KB |
| `corn-farm.webp` | *(No change)* | WEBP | 1920x1280 | 461.7 KB |
| `corn-process.png` | *(No change)* | PNG | 1920x2560 | 4512.5 KB |
| `farm-in-harvest.webp` | *(No change)* | WEBP | 1920x1079 | 310.4 KB |
| `farm-with-owner-2.webp` | *(No change)* | WEBP | 1920x1280 | 460.0 KB |
| `farm-with-owner.webp` | *(No change)* | WEBP | 1920x1280 | 440.8 KB |
| `gourmet-popcornica-corn-images-13-x-18-2.png` | *(No change)* | PNG | 1904x2560 | 1263.4 KB |
| `gp-directors-meeting-with-vp-of-india-2.jpeg` | *(No change)* | JPEG | 2560x1440 | 329.0 KB |
| `gp-directors-meeting-with-vp-of-india-3.jpeg` | *(No change)* | JPEG | 2560x1440 | 340.2 KB |
| `gp-directors-meeting-with-vp-of-india-4.jpeg` | *(No change)* | JPEG | 2560x1440 | 349.8 KB |
| `gp-directors-meeting-with-vp-of-india.jpeg` | *(No change)* | JPEG | 2560x1440 | 388.3 KB |
| `gp-logo-tagline-white.png` | *(No change)* | PNG | 2559x1493 | 81.7 KB |
| `gp-logo-tagline.png` | *(No change)* | PNG | 2559x1493 | 38.8 KB |
| `gp-u-logo.png` | *(No change)* | PNG | 1502x2560 | 213.3 KB |
| `hero-bg.png` | *(No change)* | PNG | 1672x941 | 1162.7 KB |
| `hero-popcorn-bucket.webp` | *(No change)* | WEBP | 496x745 | 42.5 KB |
| `icar-certificate.png` | *(No change)* | PNG | 2560x1777 | 3510.0 KB |
| `icar-indian-institute-of-maize-research-2.png` | *(No change)* | PNG | 2560x1722 | 4230.6 KB |
| `icar-indian-institute-of-maize-research.png` | *(No change)* | PNG | 2560x2534 | 4105.3 KB |
| `indo-us-business-excellence-award.png` | *(No change)* | PNG | 1959x2560 | 3408.6 KB |
| `krug-co-cart.webp` | *(No change)* | WEBP | 993x1584 | 147.2 KB |
| `krug-co-empty-box.webp` | *(No change)* | WEBP | 1707x2560 | 60.9 KB |
| `krug-co-filled-box-2.webp` | *(No change)* | WEBP | 1707x2560 | 130.4 KB |
| `krug-co-filled-box-3.webp` | *(No change)* | WEBP | 1707x2560 | 158.2 KB |
| `krug-co-filled-box.webp` | *(No change)* | WEBP | 1707x2560 | 103.7 KB |
| `krug-co-poster.webp` | *(No change)* | WEBP | 1553x2393 | 123.0 KB |
| `krug-with-kiosk/exhibition-dolby-booth-meeting.jpg` | *(No change)* | JPG | 1620x1080 | 172.1 KB |
| `krug-with-kiosk/gourmet-popcornica-large-group-exhibition.jpg` | *(No change)* | JPG | 2560x1707 | 455.4 KB |
| `krug-with-kiosk/gourmet-popcornica-team-exhibition.jpg` | *(No change)* | JPG | 2560x1707 | 346.1 KB |
| `krug-with-kiosk/krug-kiosk-3d-design-mockup.png` | *(No change)* | PNG | 1252x975 | 1819.6 KB |
| `krug-with-kiosk/krug-mall-kiosk-balloons-landscape.jpeg` | *(No change)* | JPEG | 1600x900 | 191.2 KB |
| `krug-with-kiosk/krug-mall-kiosk-balloons-portrait.jpeg` | *(No change)* | JPEG | 900x1600 | 184.9 KB |
| `krug-with-kiosk/krug-mall-kiosk-wide-walkway.jpeg` | *(No change)* | JPEG | 1280x960 | 209.8 KB |
| `krug-with-kiosk/krug-popcorn-cart-exhibition.jpg` | *(No change)* | JPG | 1620x1080 | 232.4 KB |
| `krug-with-kiosk/krug-popcorn-machine-epson-booth.jpg` | *(No change)* | JPG | 1620x1080 | 234.2 KB |
| `kvb.jpg` | *(No change)* | JPG | 926x1000 | 83.6 KB |
| `mahidhar.jpg` | *(No change)* | JPG | 959x1000 | 145.7 KB |
| `owner.JPG.webp` | `owner.webp` | WEBP | 1920x1280 | 433.5 KB |
| `pattabhi-2.jpg` | *(No change)* | JPG | 2090x2269 | 540.7 KB |
| `pattabhi.jpg` | *(No change)* | JPG | 1920x2560 | 630.6 KB |
| `pattabhi.webp` | *(No change)* | WEBP | 1920x2560 | 456.2 KB |
| `person.webp` | *(No change)* | WEBP | 1024x1024 | 131.6 KB |
| `popcorn-2.webp` | *(No change)* | WEBP | 1920x2560 | 266.7 KB |
| `popcorn-cleaning.webp` | *(No change)* | WEBP | 1920x2560 | 385.3 KB |
| `popcorn-drier.webp` | *(No change)* | WEBP | 960x540 | 58.3 KB |
| `popcorn-factory-2.webp` | *(No change)* | WEBP | 1920x1080 | 227.6 KB |
| `popcorn-factory.webp` | *(No change)* | WEBP | 465x207 | 20.5 KB |
| `popcorn-kernel-01.webp` | *(No change)* | WEBP | 1536x1024 | 115.6 KB |
| `popcorn-kernel-02.webp` | *(No change)* | WEBP | 1536x1024 | 106.0 KB |
| `popcorn.webp` | *(No change)* | WEBP | 1920x2560 | 217.7 KB |
| `premix/preferred-popcorn-gold-label-corn.jpg` | *(No change)* | JPG | 2560x1727 | 347.9 KB |
| `premix/preferred-popcorn-jumbo-mushroom-salted-mix.jpg` | *(No change)* | JPG | 2500x1686 | 351.3 KB |
| `premix/preferred-popcorn-oil-and-salt-mix.jpg` | *(No change)* | JPG | 2500x1840 | 278.2 KB |
| `premix/preferred-popcorn-popping-oil.jpg` | *(No change)* | JPG | 2500x1915 | 278.5 KB |
| `premix/premix-product-line-group.png` | *(No change)* | PNG | 1006x600 | 439.5 KB |
| `prr-vp-of-india-letter-cover.png` | *(No change)* | PNG | 1811x2560 | 112.0 KB |
| `prr-vp-of-india-letter.png` | *(No change)* | PNG | 1811x2560 | 466.2 KB |
| `rte-6-tins/caramel-popcorn.png` | *(No change)* | PNG | 2560x2400 | 519.2 KB |
| `rte-6-tins/chocolate-popcorn.png` | *(No change)* | PNG | 2560x2400 | 506.9 KB |
| `rte-6-tins/cinnamon-popcorn.png` | *(No change)* | PNG | 2560x2400 | 506.0 KB |
| `rte-6-tins/coconut-popcorn.png` | *(No change)* | PNG | 2560x2400 | 560.6 KB |
| `rte-6-tins/ginger-popcorn.png` | *(No change)* | PNG | 2560x2400 | 452.9 KB |
| `rte-6-tins/krug-popcorn-six-tins-collage.png` | *(No change)* | PNG | 2560x1810 | 862.8 KB |
| `rte-6-tins/strawberry-popcorn.png` | *(No change)* | PNG | 2560x2400 | 580.4 KB |
| `seasonings/mexicana-cheese-seasoning-packet.jpeg` | *(No change)* | JPEG | 864x1184 | 66.6 KB |
| `seasonings/seasonings-packets-popcorn-machine.jpeg` | *(No change)* | JPEG | 864x1184 | 97.1 KB |
| `seasonings/seasonings-packets-retail-shelf.jpeg` | *(No change)* | JPEG | 864x1184 | 139.5 KB |
| `seasonings/seasonings-packets-trio-mockup.jpeg` | *(No change)* | JPEG | 1600x1131 | 80.8 KB |
| `seasonings/sour-cream-onion-seasoning-packet.jpeg` | *(No change)* | JPEG | 864x1184 | 70.9 KB |
| `seasonings/sprinkling-sour-cream-onion-seasoning.jpeg` | *(No change)* | JPEG | 864x1184 | 105.7 KB |
| `seasonings/sweet-chilli-bbq-seasoning-packet.jpeg` | *(No change)* | JPEG | 864x1184 | 68.2 KB |
| `texvalley-chennai-retail-summit.png` | *(No change)* | PNG | 2046x2559 | 1613.5 KB |
| `udyog-rattan-award.png` | *(No change)* | PNG | 2043x2559 | 1134.6 KB |
| `venkateswara-babu.webp` | *(No change)* | WEBP | 1117x1409 | 64.4 KB |

## 2. Dimension Normalisation Analysis

| File Path | Original Dimensions | Recommended Dimensions | Normalisation Target |
| :--- | :--- | :--- | :--- |
| `artboard-mediakit.webp` | 1920x1920 | **1920x1920** | Standard Asset |
| `big-cine-expo-2025-award.png` | 895x2560 | **895x2560** | Standard Asset |
| `cold-storage-1.webp` | 322x225 | **322x225** | Standard Asset |
| `cold-storage-2.webp` | 463x209 | **463x209** | Standard Asset |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-2.jpg` | 1904x2560 | **1904x2560** | Standard Asset |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-3.jpg` | 1904x2560 | **1904x2560** | Standard Asset |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-4.jpg` | 1904x2560 | **1904x2560** | Standard Asset |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-5.jpg` | 1904x2560 | **1904x2560** | Standard Asset |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-6.jpg` | 1904x2560 | **1904x2560** | Standard Asset |
| `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18.jpg` | 1904x2560 | **1904x2560** | Standard Asset |
| `corn-farm.webp` | 1920x1280 | **1920x1280** | Standard Asset |
| `corn-process.png` | 1920x2560 | **1920x2560** | Standard Asset |
| `farm-in-harvest.webp` | 1920x1079 | **1920x1079** | Standard Asset |
| `farm-with-owner-2.webp` | 1920x1280 | **1920x1280** | Standard Asset |
| `farm-with-owner.webp` | 1920x1280 | **1920x1280** | Standard Asset |
| `gourmet-popcornica-corn-images-13-x-18-2.png` | 1904x2560 | **1904x2560** | Standard Asset |
| `gp-directors-meeting-with-vp-of-india-2.jpeg` | 2560x1440 | **2560x1440** | Meeting Photo |
| `gp-directors-meeting-with-vp-of-india-3.jpeg` | 2560x1440 | **2560x1440** | Meeting Photo |
| `gp-directors-meeting-with-vp-of-india-4.jpeg` | 2560x1440 | **2560x1440** | Meeting Photo |
| `gp-directors-meeting-with-vp-of-india.jpeg` | 2560x1440 | **2560x1440** | Meeting Photo |
| `gp-logo-tagline-white.png` | 2559x1493 | **2559x1493** | Standard Asset |
| `gp-logo-tagline.png` | 2559x1493 | **2559x1493** | Standard Asset |
| `gp-u-logo.png` | 1502x2560 | **1502x2560** | Standard Asset |
| `hero-bg.png` | 1672x941 | **1672x941** | Standard Asset |
| `hero-popcorn-bucket.webp` | 496x745 | **496x745** | Standard Asset |
| `icar-certificate.png` | 2560x1777 | **2560x1777** | Standard Asset |
| `icar-indian-institute-of-maize-research-2.png` | 2560x1722 | **2560x1722** | Standard Asset |
| `icar-indian-institute-of-maize-research.png` | 2560x2534 | **2560x2534** | Standard Asset |
| `indo-us-business-excellence-award.png` | 1959x2560 | **1959x2560** | Standard Asset |
| `krug-co-cart.webp` | 993x1584 | **993x1584** | Standard Asset |
| `krug-co-empty-box.webp` | 1707x2560 | **1707x2560** | Standard Asset |
| `krug-co-filled-box-2.webp` | 1707x2560 | **1707x2560** | Standard Asset |
| `krug-co-filled-box-3.webp` | 1707x2560 | **1707x2560** | Standard Asset |
| `krug-co-filled-box.webp` | 1707x2560 | **1707x2560** | Standard Asset |
| `krug-co-poster.webp` | 1553x2393 | **1553x2393** | Standard Asset |
| `krug-with-kiosk/exhibition-dolby-booth-meeting.jpg` | 1620x1080 | **1620x1080** | Standard Asset |
| `krug-with-kiosk/gourmet-popcornica-large-group-exhibition.jpg` | 2560x1707 | **2560x1707** | Standard Asset |
| `krug-with-kiosk/gourmet-popcornica-team-exhibition.jpg` | 2560x1707 | **2560x1707** | Standard Asset |
| `krug-with-kiosk/krug-kiosk-3d-design-mockup.png` | 1252x975 | **1252x975** | Standard Asset |
| `krug-with-kiosk/krug-mall-kiosk-balloons-landscape.jpeg` | 1600x900 | **1600x900** | Standard Asset |
| `krug-with-kiosk/krug-mall-kiosk-balloons-portrait.jpeg` | 900x1600 | **900x1600** | Standard Asset |
| `krug-with-kiosk/krug-mall-kiosk-wide-walkway.jpeg` | 1280x960 | **1280x960** | Standard Asset |
| `krug-with-kiosk/krug-popcorn-cart-exhibition.jpg` | 1620x1080 | **1620x1080** | Standard Asset |
| `krug-with-kiosk/krug-popcorn-machine-epson-booth.jpg` | 1620x1080 | **1620x1080** | Standard Asset |
| `kvb.jpg` | 926x1000 | **1000x1000** | Team Portrait (Square) |
| `mahidhar.jpg` | 959x1000 | **1000x1000** | Team Portrait (Square) |
| `owner.JPG.webp` | 1920x1280 | **1920x1280** | Standard Asset |
| `pattabhi-2.jpg` | 2090x2269 | **1000x1000** | Team Portrait (Square) |
| `pattabhi.jpg` | 1920x2560 | **1200x1600** | Team Portrait |
| `pattabhi.webp` | 1920x2560 | **1200x1600** | Team Portrait |
| `person.webp` | 1024x1024 | **1024x1024** | Standard Asset |
| `popcorn-2.webp` | 1920x2560 | **1920x2560** | Standard Asset |
| `popcorn-cleaning.webp` | 1920x2560 | **1920x2560** | Standard Asset |
| `popcorn-drier.webp` | 960x540 | **960x540** | Standard Asset |
| `popcorn-factory-2.webp` | 1920x1080 | **1920x1080** | Standard Asset |
| `popcorn-factory.webp` | 465x207 | **465x207** | Standard Asset |
| `popcorn-kernel-01.webp` | 1536x1024 | **1536x1024** | Standard Asset |
| `popcorn-kernel-02.webp` | 1536x1024 | **1536x1024** | Standard Asset |
| `popcorn.webp` | 1920x2560 | **1920x2560** | Standard Asset |
| `premix/preferred-popcorn-gold-label-corn.jpg` | 2560x1727 | **2560x1727** | Standard Asset |
| `premix/preferred-popcorn-jumbo-mushroom-salted-mix.jpg` | 2500x1686 | **2500x1686** | Standard Asset |
| `premix/preferred-popcorn-oil-and-salt-mix.jpg` | 2500x1840 | **2500x1840** | Standard Asset |
| `premix/preferred-popcorn-popping-oil.jpg` | 2500x1915 | **2500x1915** | Standard Asset |
| `premix/premix-product-line-group.png` | 1006x600 | **1006x600** | Standard Asset |
| `prr-vp-of-india-letter-cover.png` | 1811x2560 | **1811x2560** | Standard Asset |
| `prr-vp-of-india-letter.png` | 1811x2560 | **1811x2560** | Standard Asset |
| `rte-6-tins/caramel-popcorn.png` | 2560x2400 | **2560x2400** | RTE Popcorn Tin |
| `rte-6-tins/chocolate-popcorn.png` | 2560x2400 | **2560x2400** | RTE Popcorn Tin |
| `rte-6-tins/cinnamon-popcorn.png` | 2560x2400 | **2560x2400** | RTE Popcorn Tin |
| `rte-6-tins/coconut-popcorn.png` | 2560x2400 | **2560x2400** | RTE Popcorn Tin |
| `rte-6-tins/ginger-popcorn.png` | 2560x2400 | **2560x2400** | RTE Popcorn Tin |
| `rte-6-tins/krug-popcorn-six-tins-collage.png` | 2560x1810 | **2560x2400** | RTE Popcorn Tin |
| `rte-6-tins/strawberry-popcorn.png` | 2560x2400 | **2560x2400** | RTE Popcorn Tin |
| `seasonings/mexicana-cheese-seasoning-packet.jpeg` | 864x1184 | **864x1184** | Seasoning Packet |
| `seasonings/seasonings-packets-popcorn-machine.jpeg` | 864x1184 | **864x1184** | Seasoning Packet |
| `seasonings/seasonings-packets-retail-shelf.jpeg` | 864x1184 | **864x1184** | Seasoning Packet |
| `seasonings/seasonings-packets-trio-mockup.jpeg` | 1600x1131 | **864x1184** | Seasoning Packet |
| `seasonings/sour-cream-onion-seasoning-packet.jpeg` | 864x1184 | **864x1184** | Seasoning Packet |
| `seasonings/sprinkling-sour-cream-onion-seasoning.jpeg` | 864x1184 | **864x1184** | Seasoning Packet |
| `seasonings/sweet-chilli-bbq-seasoning-packet.jpeg` | 864x1184 | **864x1184** | Seasoning Packet |
| `texvalley-chennai-retail-summit.png` | 2046x2559 | **2046x2559** | Standard Asset |
| `udyog-rattan-award.png` | 2043x2559 | **2043x2559** | Standard Asset |
| `venkateswara-babu.webp` | 1117x1409 | **1200x1600** | Team Portrait |

## 3. Duplicate Image Audit

No exact identical image content duplicate files discovered on disk.

## 4. Codebase Reference Updates

| Code File | Original Asset | Target Asset | Occurrences |
| :--- | :--- | :--- | :--- |
| `about-us.html` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 57 |
| `about-us.html` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 45 |
| `about-us.html` | `venkateswara-babu.webp` | `venkateswara-babu.webp` | 3 |
| `about-us.html` | `pattabhi.webp` | `pattabhi.webp` | 6 |
| `css/global.css` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 12 |
| `css/index.css` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 3 |
| `css/index.css` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 3 |
| `css/index.css` | `hero-bg.png` | `hero-bg.png` | 3 |
| `css/innovation.css` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 6 |
| `css/media.css` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 9 |
| `css/partner-with-us.css` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 6 |
| `css/solutions.css` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 6 |
| `enhancing-farmer-lives.html` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 36 |
| `enhancing-farmer-lives.html` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 27 |
| `enhancing-farmer-lives.html` | `farm-with-owner.webp` | `farm-with-owner.webp` | 3 |
| `enhancing-farmer-lives.html` | `corn-farm.webp` | `corn-farm.webp` | 3 |
| `index.html` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 42 |
| `index.html` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 42 |
| `index.html` | `venkateswara-babu.webp` | `venkateswara-babu.webp` | 3 |
| `index.html` | `pattabhi.webp` | `pattabhi.webp` | 3 |
| `innovation.html` | `popcorn-factory-2.webp` | `popcorn-factory-2.webp` | 3 |
| `innovation.html` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 30 |
| `innovation.html` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 27 |
| `innovation.html` | `popcorn-cleaning.webp` | `popcorn-cleaning.webp` | 3 |
| `krug-co.html` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 21 |
| `krug-co.html` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 21 |
| `media-kit.html` | `artboard-mediakit.webp` | `artboard-mediakit.webp` | 6 |
| `media-kit.html` | `pattabhi.webp` | `pattabhi.webp` | 3 |
| `media.html` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 33 |
| `media.html` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 30 |
| `media.html` | `popcorn-cleaning.webp` | `popcorn-cleaning.webp` | 3 |
| `media.html` | `popcorn-factory.webp` | `popcorn-factory.webp` | 3 |
| `media.html` | `pattabhi.webp` | `pattabhi.webp` | 3 |
| `partner-with-us.html` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 33 |
| `partner-with-us.html` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 27 |
| `partner-with-us.html` | `farm-in-harvest.webp` | `farm-in-harvest.webp` | 3 |
| `solutions.html` | `popcorn-kernel-01.webp` | `popcorn-kernel-01.webp` | 66 |
| `solutions.html` | `popcorn-kernel-02.webp` | `popcorn-kernel-02.webp` | 51 |
| `solutions.html` | `popcorn-cleaning.webp` | `popcorn-cleaning.webp` | 3 |
| `solutions.html` | `popcorn-factory.webp` | `popcorn-factory.webp` | 3 |
| `solutions.html` | `popcorn.webp` | `popcorn.webp` | 3 |

## 5. Unused Image Assets

The following image files were detected on disk but are **not referenced** anywhere in the code:

- `big-cine-expo-2025-award.png`
- `cold-storage-1.webp`
- `cold-storage-2.webp`
- `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-2.jpg`
- `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-3.jpg`
- `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-4.jpg`
- `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-5.jpg`
- `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18-6.jpg`
- `corn-cob-variants/gourmet-popcornica-corn-images-13-x-18.jpg`
- `corn-process.png`
- `farm-with-owner-2.webp`
- `gourmet-popcornica-corn-images-13-x-18-2.png`
- `gp-directors-meeting-with-vp-of-india-2.jpeg`
- `gp-directors-meeting-with-vp-of-india-3.jpeg`
- `gp-directors-meeting-with-vp-of-india-4.jpeg`
- `gp-directors-meeting-with-vp-of-india.jpeg`
- `gp-logo-tagline-white.png`
- `gp-logo-tagline.png`
- `gp-u-logo.png`
- `hero-popcorn-bucket.webp`
- `icar-certificate.png`
- `icar-indian-institute-of-maize-research-2.png`
- `icar-indian-institute-of-maize-research.png`
- `indo-us-business-excellence-award.png`
- `krug-co-cart.webp`
- `krug-co-empty-box.webp`
- `krug-co-filled-box-2.webp`
- `krug-co-filled-box-3.webp`
- `krug-co-filled-box.webp`
- `krug-co-poster.webp`
- `krug-with-kiosk/exhibition-dolby-booth-meeting.jpg`
- `krug-with-kiosk/gourmet-popcornica-large-group-exhibition.jpg`
- `krug-with-kiosk/gourmet-popcornica-team-exhibition.jpg`
- `krug-with-kiosk/krug-kiosk-3d-design-mockup.png`
- `krug-with-kiosk/krug-mall-kiosk-balloons-landscape.jpeg`
- `krug-with-kiosk/krug-mall-kiosk-balloons-portrait.jpeg`
- `krug-with-kiosk/krug-mall-kiosk-wide-walkway.jpeg`
- `krug-with-kiosk/krug-popcorn-cart-exhibition.jpg`
- `krug-with-kiosk/krug-popcorn-machine-epson-booth.jpg`
- `kvb.jpg`
- `mahidhar.jpg`
- `owner.webp`
- `pattabhi-2.jpg`
- `pattabhi.jpg`
- `person.webp`
- `popcorn-2.webp`
- `popcorn-drier.webp`
- `premix/preferred-popcorn-gold-label-corn.jpg`
- `premix/preferred-popcorn-jumbo-mushroom-salted-mix.jpg`
- `premix/preferred-popcorn-oil-and-salt-mix.jpg`
- `premix/preferred-popcorn-popping-oil.jpg`
- `premix/premix-product-line-group.png`
- `prr-vp-of-india-letter-cover.png`
- `prr-vp-of-india-letter.png`
- `rte-6-tins/caramel-popcorn.png`
- `rte-6-tins/chocolate-popcorn.png`
- `rte-6-tins/cinnamon-popcorn.png`
- `rte-6-tins/coconut-popcorn.png`
- `rte-6-tins/ginger-popcorn.png`
- `rte-6-tins/krug-popcorn-six-tins-collage.png`
- `rte-6-tins/strawberry-popcorn.png`
- `seasonings/mexicana-cheese-seasoning-packet.jpeg`
- `seasonings/seasonings-packets-popcorn-machine.jpeg`
- `seasonings/seasonings-packets-retail-shelf.jpeg`
- `seasonings/seasonings-packets-trio-mockup.jpeg`
- `seasonings/sour-cream-onion-seasoning-packet.jpeg`
- `seasonings/sprinkling-sour-cream-onion-seasoning.jpeg`
- `seasonings/sweet-chilli-bbq-seasoning-packet.jpeg`
- `texvalley-chennai-retail-summit.png`
- `udyog-rattan-award.png`
