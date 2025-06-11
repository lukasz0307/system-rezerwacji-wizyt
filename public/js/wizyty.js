// Zmienna globalna do przechowywania aktualnie wybranego zakładu
let aktualnyZakladId = null;
// Funkcja otwierająca modal rezerwacji dla wybranego zakładu
function zarezerwuj(id) {
  id = parseInt(id);
  aktualnyZakladId = id;
  const zaklad = zaklady.find((z) => parseInt(z.id) === id);

  if (!zaklad) {
    Swal.fire({
      icon: "error",
      title: "Błąd!",
      text: "Nie udało się znaleźć zakładu. Spróbuj ponownie później.",
      confirmButtonColor: "red",
    });
    return;
  }
  document.getElementById("rezerwacjaZaklad").textContent = zaklad.nazwa;
  document.getElementById("rezerwacjaModal").style.display = "block";

  const jutro = new Date();
  jutro.setDate(jutro.getDate() + 1);
  const minDate = jutro.toISOString().split("T")[0];
  const dataInput = document.getElementById("rezerwacjaData");
  dataInput.value = "";
  dataInput.min = minDate;

  const select = document.getElementById("rezerwacjaGodzina");
  select.innerHTML = `<option value="">Najpierw wybierz datę</option>`;

  // Po wybraniu daty generuj dostępne godziny (bez fetch!)
  dataInput.onchange = function () {
    const wybranaData = dataInput.value;
    if (!wybranaData) return;

    // Sprawdź czy nie niedziela
    const dzienTyg = new Date(wybranaData).getDay();
    if (dzienTyg === 0) {
      Swal.fire({
        icon: "error",
        title: "Niedziela",
        text: "Zakład nie pracuje w niedzielę.",
        confirmButtonColor: "red",
      });
      dataInput.value = "";
      select.innerHTML = `<option value="">Najpierw wybierz datę</option>`;
      return;
    }

    select.innerHTML = `<option value="">Wybierz godzinę</option>`;
    for (let h = 9; h < 18; h++) {
      const godzina = `${h.toString().padStart(2, "0")}:00`;
      const option = document.createElement("option");
      option.value = godzina;
      option.textContent = godzina;
      select.appendChild(option);
    }
  };
}
// Zamknięcie modala rezerwacji
function zamknijRezerwacje() {
  document.getElementById("rezerwacjaModal").style.display = "none";
}
// Wyświetlanie wizyt zalogowanego użytkownika
function pokazMojeWizyty() {
  if (!zalogowanyUzytkownik) {
    Swal.fire({
      icon: "error",
      text: "Musisz być zalogowany by przeglądać wizyty",
      confirmButtonText: "OK",
      confirmButtonColor: "red",
    });
    return;
  }

  document.getElementById("zaklady-section").classList.add("hidden");
  document.getElementById("mojeWizyty").classList.remove("hidden");

  const kontener = document.getElementById("listaRezerwacji");
  kontener.innerHTML = "<p>Ładowanie wizyt...</p>";

  fetch("php/moje_wizyty.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: zalogowanyUzytkownik.login }),
  })
    .then((res) => res.json())
    .then((dane) => {
      kontener.innerHTML = "";
      if (dane.status !== "success" || !dane.wizyty.length) {
        kontener.innerHTML = "<p>Brak wizyt.</p>";
        return;
      }

      dane.wizyty.forEach((w) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${w.nazwa}</h3>
          <p>Data: ${w.data_wizyty}</p>
          <p>Godzina: ${w.godzina_wizyty}</p>
          <button onclick="odwolajWizyte(${w.id_wizyty})">Odwołaj</button>
          <button onclick="przelozWizyte(${w.id_wizyty}, '${w.data_wizyty}', '${w.godzina_wizyty}')">Przełóż</button>
        `;
        kontener.appendChild(card);
      });
    })
    .catch(() => {
      kontener.innerHTML = "<p>Błąd ładowania wizyt.</p>";
    });
}
// Potwierdzanie rezerwacji i zapis do bazy
function potwierdzRezerwacje() {
  const data = document.getElementById("rezerwacjaData").value;
  const godzina = document.getElementById("rezerwacjaGodzina").value;

  if (!data || !godzina) {
    Swal.fire({
      icon: "warning",
      title: "Uzupełnij wszystkie pola!",
      text: "Aby zarezerwować wizytę, wypełnij wszystkie pola formularza.",
      confirmButtonColor: "red",
    });
    return;
  }

  if (!zalogowanyUzytkownik) {
    Swal.fire({
      icon: "error",
      title: "Błąd",
      text: "Musisz być zalogowany, aby rezerwować wizyty.",
      confirmButtonColor: "red",
    });
    return;
  }

  fetch("php/dodaj_rezerwacje.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: data,
      godzina: godzina,
      login: zalogowanyUzytkownik.login,
      zakladId: aktualnyZakladId,
    }),
  })
    .then((res) => res.json())
    .then((odpowiedz) => {
      if (odpowiedz.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Rezerwacja potwierdzona!",
          text: `Twoja wizyta została zarezerwowana na ${data} o ${godzina}.`,
          confirmButtonColor: "#3085d6",
        });
        document.getElementById("rezerwacjaModal").style.display = "none";
      } else {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: odpowiedz.message || "Nie udało się zarezerwować wizyty.",
          confirmButtonColor: "red",
        });
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Błąd",
        text: "Wystąpił problem z połączeniem z serwerem.",
        confirmButtonColor: "red",
      });
    });
}
// Odwoływanie wizyty
function odwolajWizyte(idWizyty) {
  Swal.fire({
    icon: "question",
    title: "Czy na pewno odwołać wizytę?",
    showCancelButton: true,
    confirmButtonText: "Tak, odwołaj",
    cancelButtonText: "Anuluj",
    confirmButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      // Tu wywołaj fetch do php/odwolaj_wizyte.php
      fetch("php/odwolaj_wizyte.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_wizyty: idWizyty }),
      })
        .then((res) => res.json())
        .then((odpowiedz) => {
          if (odpowiedz.status === "success") {
            Swal.fire("Odwołano!", "Wizyta została odwołana.", "success");
            pokazMojeWizyty();
          } else {
            Swal.fire(
              "Błąd",
              odpowiedz.message || "Nie udało się odwołać wizyty.",
              "error"
            );
          }
        });
    }
  });
}
// Przekładanie wizyty na inny termin
function przelozWizyte(idWizyty, staraData, staraGodzina) {
  const modalHtml = `
    <div style="display:flex; flex-direction:column; gap:10px; text-align:left;">
      <label for="nowaData">Nowa data:</label>
      <input type="date" id="nowaData" value="${staraData}" class="swal2-input" min="${
    new Date().toISOString().split("T")[0]
  }">
      <label for="nowaGodzina">Nowa godzina:</label>
      <select id="nowaGodzina" class="swal2-input">
        <option value="">Wybierz godzinę</option>
        ${[...Array(9)]
          .map((_, i) => {
            const h = 9 + i;
            const godz = `${h.toString().padStart(2, "0")}:00`;
            return `<option value="${godz}" ${
              godz === staraGodzina ? "selected" : ""
            }>${godz}</option>`;
          })
          .join("")}
      </select>
    </div>
  `;

  Swal.fire({
    title: "Przełóż wizytę",
    html: modalHtml,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Przełóż",
    cancelButtonText: "Anuluj",
    preConfirm: () => {
      const nowaData = document.getElementById("nowaData").value;
      const nowaGodzina = document.getElementById("nowaGodzina").value;
      if (!nowaData || !nowaGodzina) {
        Swal.showValidationMessage("Podaj nową datę i godzinę");
        return false;
      }
      // Sprawdź niedzielę
      const dzienTyg = new Date(nowaData).getDay();
      if (dzienTyg === 0) {
        Swal.showValidationMessage("Zakład nie pracuje w niedzielę");
        return false;
      }
      return { nowaData, nowaGodzina };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      fetch("php/przeloz_wizyte.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_wizyty: idWizyty,
          nowa_data: result.value.nowaData,
          nowa_godzina: result.value.nowaGodzina,
        }),
      })
        .then((res) => res.json())
        .then((odpowiedz) => {
          if (odpowiedz.status === "success") {
            Swal.fire("Przełożono!", "Wizyta została przełożona.", "success");
            pokazMojeWizyty();
          } else {
            Swal.fire(
              "Błąd",
              odpowiedz.message || "Nie udało się przełożyć wizyty.",
              "error"
            );
          }
        });
    }
  });
}
