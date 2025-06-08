function ocenZaklad(idZakladu) {
  if (!zalogowanyUzytkownik) {
    Swal.fire({
      icon: "error",
      title: "Błąd",
      text: "Musisz być zalogowany, aby ocenić zakład.",
      confirmButtonColor: "red",
    });
    return;
  }

  // Okienko z formularzem oceny
  Swal.fire({
    title: "Oceń zakład",
    html: `
      <label for="ocenaInput">Wybierz ocenę (1-10):</label>
      <select id="ocenaInput" class="swal2-input">
        <option value="">Wybierz...</option>
        ${[...Array(10)]
          .map((_, i) => `<option value="${i + 1}">${i + 1}</option>`)
          .join("")}
      </select>
    `,
    showCancelButton: true,
    confirmButtonText: "Wyślij ocenę",
    cancelButtonText: "Anuluj",
    preConfirm: () => {
      const ocena = document.getElementById("ocenaInput").value;
      if (!ocena) {
        Swal.showValidationMessage("Wybierz ocenę!");
        return false;
      }
      return ocena;
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      fetch("php/dodaj_ocene.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_zakl: idZakladu,
          ocena: result.value,
          login: zalogowanyUzytkownik.login,
        }),
      })
        .then((res) => res.json())
        .then((odpowiedz) => {
          if (odpowiedz.status === "success") {
            Swal.fire(
              "Dziękujemy!",
              "Twoja ocena została zapisana.",
              "success"
            );
            pobierzZaklady(); // odśwież średnią ocen
          } else {
            Swal.fire(
              "Błąd",
              odpowiedz.message || "Nie udało się zapisać oceny.",
              "error"
            );
          }
        });
    }
  });
}
