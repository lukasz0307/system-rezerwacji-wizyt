// Pobierz zakłady z bazy
function pobierzZakladyZBazy() {
  return fetch("php/get_zaklady.php").then((res) => res.json());
}

// Pobierz kategorie z bazy
function pobierzKategorieZBazy() {
  return fetch("php/get_kategorie.php").then((res) => res.json());
}

// Pobierz wizyty zalogowanego użytkownika
function pobierzMojeWizytyZBazy(login) {
  return fetch("php/moje_wizyty.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login }),
  }).then((res) => res.json());
}

// Dodaj rezerwację do bazy
function dodajRezerwacjeDoBazy(dane) {
  return fetch("php/dodaj_rezerwacje.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dane),
  }).then((res) => res.json());
}

// Dodaj ocenę do bazy
function dodajOceneDoBazy(dane) {
  return fetch("php/dodaj_ocene.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dane),
  }).then((res) => res.json());
}

// Odwołaj wizytę w bazie
function odwolajWizyteWBazie(id_wizyty) {
  return fetch("php/odwolaj_wizyte.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_wizyty }),
  }).then((res) => res.json());
}

// Przełóż wizytę w bazie
function przelozWizyteWBazie(dane) {
  return fetch("php/przeloz_wizyte.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dane),
  }).then((res) => res.json());
}
