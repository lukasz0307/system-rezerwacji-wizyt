# Temat: System rezerwacji wizyt online

## Opis projektu

Aplikacja webowa umożliwiająca użytkownikom:

- przeglądanie zakładów usługowych,
- filtrowanie i sortowanie zakładów,
- rejestrację i logowanie,
- rezerwację wizyt,
- przeglądanie, odwoływanie i przekładanie swoich wizyt,
- ocenianie zakładów.

---

## Wymagania

- Serwer XAMPP lub inny z obsługą PHP i MySQL
- Przeglądarka internetowa (np. Chrome, Firefox)
- Baza danych MySQL z tabelami: `uzytkownicy`, `wizyta`, `dane_zakl`, `oceny`  
  **(załączony eksport bazy danych w folderze projektu, `rezerwacje.sql`)**

---

## Struktura katalogów

```
znacznikiProjekt/
│
├── public/
│   ├── projekt.html
│   ├── style.css
│   ├── js/
│   │   ├── api.js
│   │   ├── autoryzacja.js
│   │   ├── zaklady.js
│   │   ├── wizyty.js
│   │   ├── oceny.js
│   │   └── ui.js
│   ├── php/
│   │   ├── db.php
│   │   ├── login.php
│   │   ├── rejestracja.php
│   │   ├── get_zaklady.php
│   │   ├── get_kategorie.php
│   │   ├── moje_wizyty.php
│   │   ├── dodaj_rezerwacje.php
│   │   ├── odwolaj_wizyte.php
│   │   ├── przeloz_wizyte.php
│   │   └── dodaj_ocene.php
│   └── images/
│       └── ... (grafiki)
├── dokumentacja.md
└── rezerwacje.sql   <-- eksport bazy danych z phpMyAdmin
```

---

## Funkcjonalności

- **Rejestracja i logowanie** – użytkownik może założyć konto i się logować.
- **Przeglądanie zakładów** – lista zakładów z możliwością filtrowania po kategorii i mieście oraz sortowania po ocenie.
- **Rezerwacja wizyty** – wybór daty i godziny, zapis do bazy.
- **Moje wizyty** – przeglądanie, odwoływanie i przekładanie swoich wizyt.
- **Ocenianie zakładów** – możliwość wystawienia oceny (1-10) dla zakładu.
- **Dropdown użytkownika** – po zalogowaniu dostęp do opcji "Moje wizyty" i "Wyloguj".

---

## Opis plików

### Frontend (public/js/)

- **api.js** – funkcje do komunikacji z backendem (fetch do PHP)
- **autoryzacja.js** – logowanie, rejestracja, wylogowanie, obsługa modali
- **zaklady.js** – pobieranie, filtrowanie, sortowanie, wyświetlanie zakładów
- **wizyty.js** – rezerwacje, wyświetlanie, odwoływanie, przekładanie wizyt
- **oceny.js** – obsługa oceniania zakładów

### Backend (public/php/)

- **db.php** – połączenie z bazą danych
- **login.php** – obsługa logowania
- **rejestracja.php** – obsługa rejestracji
- **get_zaklady.php** – pobieranie zakładów z bazy
- **get_kategorie.php** – pobieranie kategorii usług
- **moje_wizyty.php** – pobieranie wizyt zalogowanego użytkownika
- **dodaj_rezerwacje.php** – dodawanie rezerwacji
- **odwolaj_wizyte.php** – usuwanie wizyty
- **przeloz_wizyte.php** – zmiana terminu wizyty
- **dodaj_ocene.php** – dodawanie oceny zakładu

### Inne

- **style.css** – style aplikacji
- **projekt.html** – główny plik HTML
- **dokumentacja.md** – dokumentacja projektu
- **rezerwacje.sql** – eksport bazy danych z phpMyAdmin

---

## Instrukcja uruchomienia

1. Skopiuj cały projekt do katalogu `htdocs` (np. `c:\xampp\htdocs\znacznikiProjekt`).
2. **Zaimportuj bazę danych**:  
   Otwórz phpMyAdmin, utwórz nową bazę (np. `rezerwacje`), a następnie zaimportuj plik `rezerwacje.sql` z folderu projektu.
3. Skonfiguruj połączenie do bazy w pliku `php/db.php`.
4. Uruchom serwer XAMPP i przejdź w przeglądarce do `http://localhost/znacznikiProjekt/public/projekt.html`.
5. Korzystaj z aplikacji!

---

## Przykładowe użycie

- Zarejestruj się i zaloguj.
- Przeglądaj zakłady, filtruj po mieście i kategorii.
- Zarezerwuj wizytę, sprawdź ją w "Moje wizyty".
- Odwołaj lub przełóż wizytę.
- Oceń zakład po wizycie.

---

## Autor

Projekt stworzony przez Łukasz Jankowiak 51691.

---
