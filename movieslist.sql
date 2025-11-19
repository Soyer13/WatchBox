-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Lis 2025, 17:49
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `watchbox`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `movieslist`
--

CREATE TABLE `movieslist` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `MovieId` int(11) NOT NULL,
  `Status` varchar(255) NOT NULL,
  `AddDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `movieslist`
--

INSERT INTO `movieslist` (`Id`, `UserId`, `MovieId`, `Status`, `AddDate`) VALUES
(1, 1, 1, 'ToWatch', '2025-11-19');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `movieslist`
--
ALTER TABLE `movieslist`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `User-UserMovieList` (`UserId`),
  ADD KEY `Movies-UserMovieList` (`MovieId`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `movieslist`
--
ALTER TABLE `movieslist`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `movieslist`
--
ALTER TABLE `movieslist`
  ADD CONSTRAINT `Movies-UserMovieList` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`Id`),
  ADD CONSTRAINT `User-UserMovieList` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
