-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2025 at 04:43 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `watchbox`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(2000) NOT NULL,
  `Img` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `Name`, `Description`, `Img`) VALUES
(1, 'Action', 'Films full of fast-paced sequences, stunts and intense conflict, focused on delivering dynamic excitement.', 0),
(2, 'Comedy', 'Light and humorous films designed to entertain through jokes, irony and funny situations.', 0),
(3, 'Drama', 'Emotionally driven stories exploring human relationships, conflicts and realistic life challenges.', 0),
(4, 'Horror', 'Movies crafted to evoke fear, tension and suspense, often involving supernatural elements or psychological terror.', 0),
(5, 'Sci-Fi', 'Films exploring futuristic concepts, advanced technology, space travel and scientific speculation.', 0),
(6, 'Fantasy', 'Stories set in magical worlds filled with mythical creatures, supernatural powers and epic quests.', 0),
(7, 'Romance', 'Narratives focused on love, emotional connection and the evolving relationships between characters.', 0),
(8, 'Thriller', 'Tense and suspense-filled films centered on high stakes, mystery and unexpected twists.', 0),
(9, 'Adventure', 'Films featuring exploration, discoveries and exciting journeys in exotic or unknown environments.', 0),
(10, 'Animation', 'Movies created using various animation techniques, offering imaginative stories for all age groups.', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `GenreID` int(11) NOT NULL,
  `Description` varchar(2000) NOT NULL,
  `Img` varchar(50) NOT NULL,
  `Accepted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `Title`, `GenreID`, `Description`, `Img`, `Accepted`) VALUES
(1, 'Star Wars III Revange of the Sith', 5, 'As the Clone Wars nears its end, Obi-Wan Kenobi pursues a new threat, while Anakin Skywalker is lured by Chancellor Palpatine into a sinister plot for galactic domination.', 'StarWars3.jpg', 1),
(2, 'Black Hawk Down', 1, 'The story of one hundred and sixty elite U.S. soldiers who dropped into Mogadishu in October 1993 to capture two top lieutenants of a renegade warlord, but found themselves in a desperate battle with a large force of heavily armed Somalis.', 'BlackHawkDown.jpg', 1),
(6, 'La Mans66', 1, 'American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford in order to defeat Ferrari at the 24 Hours of Le Mans in 1966.', 'LaMans.jpg', 1),
(7, 'F1', 1, 'A Formula One driver comes out of retirement to mentor and team up with a younger driver.', 'F1.jpg', 1),
(8, 'Saving Privite Rayan', 1, 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose comrades have been killed in action.', 'Rayan.jpg', 1),
(9, 'Blade Runner 2049', 1, 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.', 'BladeRunner2049.jpg', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `movieslist`
--

CREATE TABLE `movieslist` (
  `Id` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `MovieId` int(11) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `AddDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movieslist`
--

INSERT INTO `movieslist` (`Id`, `UserId`, `MovieId`, `Status`, `AddDate`) VALUES
(9, 11, 1, 0, '2025-12-05'),
(19, 11, 6, 0, '2025-12-05'),
(22, 21, 2, 0, '2025-12-05'),
(23, 21, 8, 0, '2025-12-05'),
(24, 22, 2, 0, '2025-12-05'),
(25, 22, 6, 0, '2025-12-05'),
(26, 22, 7, 0, '2025-12-05');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Surname` varchar(30) NOT NULL,
  `Username` varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `IsAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `Name`, `Surname`, `Username`, `Password`, `IsAdmin`) VALUES
(1, 'AdminName', 'AdminSureName', 'Admin', 'Admin', 1),
(11, 'Emil', 'K', 'EmilK', '123', 0),
(21, 'Adam', 'Kowalski', 'Adam1', 'Tesat', 0),
(22, 'Nowe Konto1', 'Kowalski', 'Nowe', 'Nowe', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Genre-MoviesGenreId` (`GenreID`);

--
-- Indeksy dla tabeli `movieslist`
--
ALTER TABLE `movieslist`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Movies-UserMovieList` (`MovieId`),
  ADD KEY `User-UserMovieList` (`UserId`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `movieslist`
--
ALTER TABLE `movieslist`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `Genre-MoviesGenreId` FOREIGN KEY (`GenreID`) REFERENCES `genre` (`id`);

--
-- Constraints for table `movieslist`
--
ALTER TABLE `movieslist`
  ADD CONSTRAINT `Movies-UserMovieList` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `User-UserMovieList` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
