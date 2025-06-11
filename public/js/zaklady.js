//Zmienne globalne:  tablica przechowujaca zaklady pobrane z bazy danych i obiekt aktywne filtry
let zaklady = [];
let aktywneFiltry = {
  typ: "",
  miasto: "",
  sortowanie: "ocena_desc",
};
//Pobieranie zakładów z bazy i inicjalizacja filtrów
function pobierzZaklady() {
  fetch("php/get_zaklady.php")
    .then((response) => response.json())
    .then((data) => {
      zaklady = data;
      zastosujFiltryISortowanie();
    })
    .catch((error) => {
      console.error("Błąd przy pobieraniu zakładów:", error);
    });
}

function pobierzKategorie() {
  fetch("php/get_kategorie.php")
    .then((res) => res.json())
    .then((kategorie) => {
      const select = document.getElementById("filtr-usluga");
      select.innerHTML = `<option value="">Wszystkie usługi</option>`;
      kategorie.forEach((kat) => {
        const option = document.createElement("option");
        option.value = kat;
        option.textContent = kat;
        select.appendChild(option);
      });
    });
}
//Wyświetlanie sekcji zakładów i resetowanie filtrów
function pokazZaklady() {
  document.getElementById("mojeWizyty").classList.add("hidden");
  document.getElementById("zaklady-section").classList.remove("hidden");
  document.getElementById("filtr-usluga").value = "";
  document.getElementById("filtr-miasto").value = "";
  aktywneFiltry = { typ: "", miasto: "", sortowanie: "ocena_desc" };
  zastosujFiltryISortowanie();
}
//Obsługa filtrów i sortowania
function filtrujZaklady() {
  aktywneFiltry.typ = document.getElementById("filtr-usluga").value;
  aktywneFiltry.miasto = document
    .getElementById("filtr-miasto")
    .value.trim()
    .toLowerCase();
  zastosujFiltryISortowanie();
}

function sortujZaklady() {
  aktywneFiltry.sortowanie = document.getElementById("sortowanie").value;
  zastosujFiltryISortowanie();
}

function zastosujFiltryISortowanie() {
  let wynik = [...zaklady];

  if (aktywneFiltry.typ) {
    wynik = wynik.filter((z) => z.rodz_uslugi === aktywneFiltry.typ);
  }
  if (aktywneFiltry.miasto) {
    wynik = wynik.filter((z) =>
      (z.miasto || "").toLowerCase().includes(aktywneFiltry.miasto)
    );
  }
  wynik.sort((a, b) =>
    aktywneFiltry.sortowanie === "ocena_desc"
      ? b.ocena - a.ocena
      : a.ocena - b.ocena
  );
  wyswietlZaklady(wynik);
}
//Wyświetlanie listy zakładów na stronie
function wyswietlZaklady(lista) {
  const kontener = document.getElementById("lista-zakladow");
  kontener.innerHTML = "";

  if (lista.length === 0) {
    kontener.innerHTML = "<p>Brak zakładów spełniających kryteria.</p>";
    return;
  }

  lista.forEach((z) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${z.nazwa}</h3>
      <p>Usługa: ${z.rodz_uslugi}</p>
      <p>Średnia ocen: ${z.ocena}</p>
      <p>Adres: ${z.ulica_nr}, ${z.miasto}</p>
      <button onclick="zarezerwuj(${z.id})">Zarezerwuj wizytę</button>
      <button onclick="ocenZaklad(${z.id})">Oceń</button>
    `;
    kontener.appendChild(div);
  });
}
//Inicjalizacja po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
  pobierzZaklady();
  pobierzKategorie();
});
