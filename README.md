# Mani uzdevumi

“Mani uzdevumi” ir tīmekļa lietotne ikdienas uzdevumu plānošanai un uzskaitei. Tā veidota ar tīru HTML, CSS un JavaScript, neizmantojot ārējas bibliotēkas.

## Galvenās funkcijas

- Uzdevumu pievienošana, atzīmēšana kā izpildītus un dzēšana.
- Filtrēšana pēc statusa: **Visi**, **Aktīvie** un **Izpildītie**, kā arī aktīvo uzdevumu skaitītājs.
- Uzdevuma teksta un termiņa rediģēšana: dubultklikšķis atver rediģēšanas laukus, Enter saglabā izmaiņas, bet Esc tās atceļ.
- Mainīta termiņa atzīme: **Pagarināts**, ja jaunais datums ir vēlāk, vai **Termiņš labots**, ja tas ir agrāk.
- Neobligāts izpildes termiņš; neizpildīti uzdevumi ar pagājušu termiņu ir atzīmēti sarkanā krāsā ar tekstu **Nokavēts**.
- Automātiska kārtošana: neizpildītie uzdevumi ir pirms izpildītajiem; katrā grupā uzdevumi ar termiņu sakārtoti no agrākā uz vēlāko, bet uzdevumi bez termiņa seko pēc tiem.
- Uzdevumu dati tiek automātiski saglabāti pārlūkprogrammas `localStorage` ar atslēgu `pd1-uzdevumi`.

## Kā palaist

Atveriet failu `index.html` tīmekļa pārlūkā. Instalēšana un papildu serveris nav nepieciešami.

## Projekta struktūra

- `index.html` — lietotnes lapas struktūra un saskarnes elementi.
- `style.css` — lietotnes izskats, tostarp pielāgojumi šaurākiem ekrāniem.
- `app.js` — uzdevumu pievienošana, rediģēšana, kārtošana, filtrēšana un datu saglabāšana.
- `uzvednes.md` — projekta uzdevuma apraksts un ar lietotni saistītās izmaiņu uzvednes.
