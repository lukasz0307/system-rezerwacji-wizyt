let zalogowanyUzytkownik = null;

function pokazModal(typ) {
  document.getElementById("authModal").style.display = "block";
  document.getElementById("loginForm").style.display =
    typ === "login" ? "block" : "none";
  document.getElementById("registerForm").style.display =
    typ === "register" ? "block" : "none";
}

function zamknijModal() {
  document.getElementById("authModal").style.display = "none";
}

function zaloguj() {
  const login = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;

  if (!login || !pass) {
    Swal.fire({
      icon: "warning",
      text: "Uzupełnij dane logowania.",
      confirmButtonColor: "red",
    });
    return;
  }

  fetch("php/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: login, haslo: pass }),
  })
    .then((res) => res.json())
    .then((odpowiedz) => {
      if (odpowiedz.status === "success") {
        zalogowanyUzytkownik = { login: odpowiedz.login };
        document.getElementById("authButtons").style.display = "none";
        document.getElementById("user-button").style.display = "inline-block";
        document.getElementById("zaklady-section").classList.remove("hidden");
        document.getElementById("mojeWizyty").classList.add("hidden");
        zamknijModal();
      } else {
        Swal.fire({
          icon: "error",
          text: odpowiedz.message || "Nieprawidłowy login lub hasło.",
          confirmButtonText: "OK",
          confirmButtonColor: "red",
        });
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        text: "Błąd połączenia z serwerem.",
        confirmButtonColor: "red",
      });
    });
}

function wyloguj() {
  zalogowanyUzytkownik = null;
  document.getElementById("user-button").style.display = "none";
  document.getElementById("authButtons").style.display = "flex";
  const dropdown = document.getElementById("dropdownMenu");
  if (dropdown) dropdown.style.display = "none";
  document.getElementById("mojeWizyty").classList.add("hidden");
  document.getElementById("zaklady-section").classList.remove("hidden");
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
}

function zarejestruj() {
  const login = document
    .querySelector("#registerForm input[placeholder='Login']")
    .value.trim();
  const haslo = document.querySelector(
    "#registerForm input[placeholder='Hasło']"
  ).value;
  const haslo2 = document.querySelector(
    "#registerForm input[placeholder='Powtórz hasło']"
  ).value;

  if (!login || !haslo || !haslo2) {
    Swal.fire({
      icon: "warning",
      text: "Uzupełnij wszystkie pola!",
      confirmButtonColor: "red",
    });
    return;
  }
  if (haslo !== haslo2) {
    Swal.fire({
      icon: "error",
      text: "Hasła się nie zgadzają!",
      confirmButtonColor: "red",
    });
    return;
  }

  fetch("php/rejestracja.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, haslo }),
  })
    .then((res) => res.json())
    .then((odpowiedz) => {
      if (odpowiedz.status === "success") {
        Swal.fire({
          icon: "success",
          text: "Rejestracja udana! Możesz się zalogować.",
          confirmButtonColor: "#3085d6",
        });
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
      } else {
        Swal.fire({
          icon: "error",
          text: odpowiedz.message,
          confirmButtonColor: "red",
        });
      }
    });
}

// Dropdown użytkownika
document.getElementById("user-button").onclick = function () {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
};
