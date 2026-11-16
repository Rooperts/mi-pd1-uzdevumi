# Uzdevuma apraksts

Loma: Tu esi pieredzējis tīmekļa lietotņu izstrādātjs.
Mērķis: izveidot uzdevumu saraksta tīmekļa lietotni "Mani uzdevumi".
Tehnoloģijas: tīrs HTML, CSS un JavaScript, bez bibliotēkām.
Lietotnes trīs koda faili: index.html, style.css, app.js.
Funkcijas:
1. Pievienot uzdevumu ar pogu vai Enter. Tukšu uzdevumu nepievienot.
2. Atzīmēt uzdevumu kā izpildītu (izsvītrots teksts).
3. Dzēst uzdevumu.
4. Filtrs: Visi / Aktīvie / Izpildītie.
5. Skaitītājs "Atlikuši N uzdevumi".
6. Dati saglabājas localStorage ar atslēgu "pd1-uzdevumi".
Elementu ID: task-input, add-btn, task-list, counter; filtru pogām atribūts data-filter.
Datu struktūra: masīvs ar objektiem { id, text, done }; id ir unikāls.
Ierobežojumi: saskarne un komentāri latviešu valodā, teksta attēlošanai lieto textContent, neviena funkcija nav garāka par 30 rindām.
Izvades formāts: katrs fails atsevišķā koda blokā ar faila nosaukumu.
Pēc koda 3 teikumos paskaidro, kā palaist.
Ja kaut kas nav skaidrs, pirms koda uzdod man jautājumus.

# Kļūdas nodošana

Lietotnē ir kļūda.
Darbības: 1) ... 2) ...
Gaidītais rezultāts: ...
Faktiskais rezultāts: ...
Konsoles kļūda (ja ir): <pilns kļūdas teksts>
Fails un funkcija: app.js, <funkcijas nosaukums>
// SĀKUMS
<ievieto tikai šo funkciju>
// BEIGAS
Izlabo tikai šo funkciju. Ja vajadzīgas izmaiņas citur, vispirms paskaidro, kāpēc.
Atgriez tikai izlaboto funkciju un vienā teikumā paskaidro cēloni.

# Papildfunkcija A

Pievieno funkciju: Rediģēšana — dubultklikšķis uz uzdevuma teksta ļauj to mainīt, Enter saglabā, Esc atceļ.
Vispirms parādi plānu: kuras funkcijas mainīsi un kuras pievienosi.
Jaunu loģiku liec atsevišķā funkcijā (neviena funkcija nav garāka par 30 rindām).
Atgriez tikai mainītās un jaunās funkcijas.

# Kļūdas labojums 1

Lietotnē ir kļūda uzdevuma rediģēšanā.
Darbības: 1) Dubultklikšķinu uz uzdevuma teksta 2) Izmainu tekstu un nospiežu Enter (vai noklikšķinu ārpus lauka).
Gaidītais rezultāts: Rediģēšanas ievades lauks aizveras, teksts saglabājas un atkal tiek attēlots kā parasts uzdevuma teksts bez rāmja. Vienlaikus var rediģēt tikai vienu uzdevumu.
Faktiskais rezultāts: Rediģēšanas lauks paliek atvērts zilā rāmī arī pēc saglabāšanas, un vienlaikus var atvērt vairākus rediģēšanas laukus.
Konsoles kļūda (ja ir): nav
Izlabo rediģēšanas funkcijas failā app.js (ievērojot 30 rindu limitu funkcijai) un vienā teikumā paskaidro cēloni.

# Kļūdas labojums 2

Lietotnē ir kļūda uzdevuma rediģēšanā pēc jauna uzdevuma pievienošanas.
Darbības: 1) Pievienoju jaunu uzdevumu sarakstam 2) Mēģinu ar dubultklikšķi rediģēt kādu citu uzdevumu (arī pēc lapas pārlādes).
Gaidītais rezultāts: Dubultklikšķis uz jebkura uzdevuma teksta atver tā rediģēšanas lauku, un to var izlabot un saglabāt.
Faktiskais rezultāts: Pēc jauna uzdevuma pievienošanas citu uzdevumu rediģēšana vairs nedarbojas.
Konsoles kļūda (ja ir): nav
Izlabo šo kļūdu failā app.js (ievērojot 30 rindu limitu funkcijai) un vienā teikumā paskaidro cēloni.

# Papildfunkcija B

Pievieno funkciju: Termiņš — pie uzdevuma pievienošanas var norādīt izpildes datumu (neobligāts), tas tiek attēlots pie uzdevuma, un neizpildītie uzdevumi ar pagājušu datumu ir iezīmēti sarkanā krāsā un ar vārdu "Nokavēts".
Ierobežojumi: saskarne un komentāri latviešu valodā, teksta attēlošanai lieto textContent, neviena funkcija nedrīkst būt garāka par 30 rindām.
Vispirms parādi plānu: kuras funkcijas mainīsi un kuras pievienosi.
Jaunu loģiku liec atsevišķā funkcijā.
Atgriez tikai mainītās un jaunās funkcijas.

# Papildfunkciju A un B apvienošana (termiņa rediģēšana)

Papildini uzdevuma rediģēšanas un termiņa funkcionalitāti:
1. Veicot dubultklikšķi uz uzdevuma (vai tā datuma), atveras rediģēšanas režīms gan uzdevuma tekstam, gan datuma laukam (<input type="date">), kur var mainīt vai pievienot izpildes datumu.
2. Enter saglabā gan tekstu, gan jauno datumu; Esc atceļ izmaiņas.
3. Ja uzdevumam jau bija termiņš un tas tiek mainīts uz citu datumu, uzdevuma objektā saglabā karodziņu (piemēram, dueDateEdited: true) un pie uzdevuma blakus datumam parādi nelielu vizuālu iezīmi (čipsi) ar tekstu "Termiņš labots" (vai "Pagarināts", ja jaunais datums ir vēlāks par iepriekšējo).
Ierobežojumi: neviena funkcija nedrīkst būt garāka par 30 rindām (ja nepieciešams, sadali rediģēšanas sākšanu un saglabāšanu atsevišķās palīgfunkcijās), saskarne un komentāri latviešu valodā, teksta attēlošanai lieto textContent.
Vispirms parādi plānu un atgriez tikai mainītās un jaunās funkcijas.

