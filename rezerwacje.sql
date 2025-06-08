-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 08 Cze 2025, 22:03
-- Wersja serwera: 10.4.14-MariaDB
-- Wersja PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `rezerwacje`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dane_zakl`
--

CREATE TABLE `dane_zakl` (
  `id_zakl` int(11) NOT NULL,
  `nazwa` varchar(50) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica_nr` varchar(50) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `miasto` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `rodz_uslugi` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `godzina_otwarcia` time DEFAULT '08:00:00',
  `godzina_zamkniecia` time DEFAULT '18:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dane_zakl`
--

INSERT INTO `dane_zakl` (`id_zakl`, `nazwa`, `ulica_nr`, `miasto`, `rodz_uslugi`, `godzina_otwarcia`, `godzina_zamkniecia`) VALUES
(1, 'Salon Fryzjerski Bella', 'Kwiatowa 12', 'Warszawa', 'Fryzjer', '08:00:00', '18:00:00'),
(2, 'Auto Serwis Max', 'Warszawska 45', 'Kraków', 'Mechanik', '08:00:00', '18:00:00'),
(3, 'Gabinet Dentystyczny Uśmiech', 'Leśna 8', 'Gdańsk', 'Dentysta', '08:00:00', '18:00:00'),
(4, 'Studio Tatuażu InkMaster', 'Mickiewicza 23', 'Wrocław', 'Tatuażysta', '10:00:00', '20:00:00'),
(5, 'Studio Paznokci Glam', 'Łąkowa 3', 'Łódź', 'Kosmetyczka', '09:00:00', '17:00:00'),
(6, 'Serwis Komputerowy BitFix', 'Polna 11', 'Poznań', 'IT / Serwis', '08:30:00', '16:30:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `oceny`
--

CREATE TABLE `oceny` (
  `nr_oceny` int(11) NOT NULL,
  `id_zakl` int(11) DEFAULT NULL,
  `ocena` int(11) DEFAULT NULL CHECK (`ocena` between 1 and 10),
  `login` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `id_wizyty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `oceny`
--

INSERT INTO `oceny` (`nr_oceny`, `id_zakl`, `ocena`, `login`, `id_wizyty`) VALUES
(1, 1, 9, NULL, NULL),
(2, 1, 8, NULL, NULL),
(3, 1, 10, NULL, NULL),
(4, 2, 7, NULL, NULL),
(5, 2, 6, NULL, NULL),
(6, 2, 9, NULL, NULL),
(7, 3, 10, NULL, NULL),
(8, 3, 9, NULL, NULL),
(9, 3, 8, NULL, NULL),
(10, 1, 7, 'klient1', NULL),
(11, 1, 10, 'klient1', NULL),
(12, 2, 1, 'klient1', NULL),
(13, 3, 9, 'klient1', NULL),
(14, 1, 6, 'klient1', NULL),
(15, 4, 9, 'klient2', NULL),
(16, 4, 10, 'klient3', NULL),
(17, 4, 8, 'klient1', NULL),
(18, 5, 7, 'testowy1', NULL),
(19, 5, 8, 'klient3', NULL),
(20, 5, 9, 'klient2', NULL),
(21, 6, 10, 'klient2', NULL),
(22, 6, 9, 'uslug2', NULL),
(23, 6, 8, 'uslug3', NULL);

-- --------------------------------------------------------

--
-- Zastąpiona struktura widoku `srednia_ocen_zakl`
-- (Zobacz poniżej rzeczywisty widok)
--
CREATE TABLE `srednia_ocen_zakl` (
`id_zakl` int(11)
,`nazwa` varchar(50)
,`srednia` decimal(14,4)
);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `login` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `haslo` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`login`, `haslo`) VALUES
('klient1', 'haslo1'),
('klient10', 'haslo10'),
('klient2', 'haslo2'),
('klient3', 'haslo3'),
('testowy1', 'test1'),
('uslug2', 'haslo5'),
('uslug3', 'haslo6');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wizyta`
--

CREATE TABLE `wizyta` (
  `id_wizyty` int(11) NOT NULL,
  `data_wizyty` date DEFAULT NULL,
  `godzina_wizyty` time DEFAULT NULL,
  `login` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `id_zakl` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `wizyta`
--

INSERT INTO `wizyta` (`id_wizyty`, `data_wizyty`, `godzina_wizyty`, `login`, `id_zakl`) VALUES
(1, '2025-05-01', '10:00:00', 'klient1', 1),
(2, '2025-05-02', '11:00:00', 'klient2', 2),
(4, '2025-06-10', '12:00:00', 'testowy1', 3),
(5, '2025-06-01', '10:00:00', 'klient1', 4),
(6, '2025-06-02', '14:00:00', 'klient1', 5),
(7, '2025-06-03', '09:00:00', 'klient2', 6),
(8, '2025-06-04', '12:00:00', 'klient2', 5),
(9, '2025-06-05', '15:30:00', 'klient3', 4),
(10, '2025-06-06', '13:30:00', 'klient3', 6),
(11, '2025-06-07', '16:00:00', 'testowy1', 4),
(12, '2025-06-08', '11:30:00', 'testowy1', 6),
(13, '2025-06-09', '10:00:00', 'uslug2', 5),
(14, '2025-06-10', '14:30:00', 'uslug3', 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wizyty_odwolane`
--

CREATE TABLE `wizyty_odwolane` (
  `id_wizyty` int(11) NOT NULL,
  `data_wizyty` date DEFAULT NULL,
  `godzina_wizyty` time DEFAULT NULL,
  `login` varchar(50) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `id_zakl` int(11) DEFAULT NULL,
  `data_odwolania` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura widoku `srednia_ocen_zakl`
--
DROP TABLE IF EXISTS `srednia_ocen_zakl`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `srednia_ocen_zakl`  AS SELECT `dz`.`id_zakl` AS `id_zakl`, `dz`.`nazwa` AS `nazwa`, avg(`o`.`ocena`) AS `srednia` FROM (`oceny` `o` left join `dane_zakl` `dz` on(`dz`.`id_zakl` = `o`.`id_zakl`)) GROUP BY `dz`.`id_zakl` ORDER BY avg(`o`.`ocena`) DESC ;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dane_zakl`
--
ALTER TABLE `dane_zakl`
  ADD PRIMARY KEY (`id_zakl`);

--
-- Indeksy dla tabeli `oceny`
--
ALTER TABLE `oceny`
  ADD PRIMARY KEY (`nr_oceny`),
  ADD UNIQUE KEY `unikalna_ocena_na_wizyte` (`id_wizyty`),
  ADD KEY `fk_oceny_zakl` (`id_zakl`),
  ADD KEY `fk_oceny_login` (`login`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`login`);

--
-- Indeksy dla tabeli `wizyta`
--
ALTER TABLE `wizyta`
  ADD PRIMARY KEY (`id_wizyty`),
  ADD KEY `login` (`login`),
  ADD KEY `id_zakl` (`id_zakl`);

--
-- Indeksy dla tabeli `wizyty_odwolane`
--
ALTER TABLE `wizyty_odwolane`
  ADD PRIMARY KEY (`id_wizyty`),
  ADD KEY `login` (`login`),
  ADD KEY `id_zakl` (`id_zakl`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `dane_zakl`
--
ALTER TABLE `dane_zakl`
  MODIFY `id_zakl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `oceny`
--
ALTER TABLE `oceny`
  MODIFY `nr_oceny` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT dla tabeli `wizyta`
--
ALTER TABLE `wizyta`
  MODIFY `id_wizyty` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `oceny`
--
ALTER TABLE `oceny`
  ADD CONSTRAINT `fk_oceny_login` FOREIGN KEY (`login`) REFERENCES `uzytkownicy` (`login`),
  ADD CONSTRAINT `fk_oceny_wizyta` FOREIGN KEY (`id_wizyty`) REFERENCES `wizyta` (`id_wizyty`),
  ADD CONSTRAINT `fk_oceny_zakl` FOREIGN KEY (`id_zakl`) REFERENCES `dane_zakl` (`id_zakl`);

--
-- Ograniczenia dla tabeli `wizyta`
--
ALTER TABLE `wizyta`
  ADD CONSTRAINT `wizyta_ibfk_1` FOREIGN KEY (`login`) REFERENCES `uzytkownicy` (`login`),
  ADD CONSTRAINT `wizyta_ibfk_2` FOREIGN KEY (`id_zakl`) REFERENCES `dane_zakl` (`id_zakl`);

--
-- Ograniczenia dla tabeli `wizyty_odwolane`
--
ALTER TABLE `wizyty_odwolane`
  ADD CONSTRAINT `wizyty_odwolane_ibfk_1` FOREIGN KEY (`login`) REFERENCES `uzytkownicy` (`login`),
  ADD CONSTRAINT `wizyty_odwolane_ibfk_2` FOREIGN KEY (`id_zakl`) REFERENCES `dane_zakl` (`id_zakl`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
