NTEO — новый независимый двуязычный сайт

Структура: статический сайт, без калькуляторов, личных кабинетов и старой системы заказов.
Языки: /ru/ и /en/. Услуги: /{lang}/services/{slug}/.

Запуск локально: python -m http.server 8000
Затем открыть http://localhost:8000/ru/ или /en/.

ПЕРЕД ПУБЛИКАЦИЕЙ:
1. В assets/config.js укажите whatsapp (международный номер только цифрами) или email. Сейчас значения пустые, форма не отправляет данные, пока контакт не настроен.
2. Замените временный базовый URL https://nteo-visual.onrender.com в HTML, sitemap.xml и robots.txt на фактический Render URL.
3. Настройте Render Static Site: Publish Directory = корень проекта.
4. Подключите Google Search Console и отправьте /sitemap.xml.

SEO: отдельные title/description, canonical, hreflang, Open Graph, Service/LocalBusiness JSON-LD, sitemap и внутренняя перелинковка. Это техническая база, не гарантия конкретной оценки или позиции Google.
