-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Sep 23, 2024 at 10:28 AM
-- Server version: 10.11.6-MariaDB-1:10.11.6+maria~ubu2204
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tour`
--

-- --------------------------------------------------------

--
-- Table structure for table `agent`
--

CREATE TABLE `agent` (
  `license_id` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `conf_email` text DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `pic_payment_path` text DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agent`
--

INSERT INTO `agent` (`license_id`, `username`, `password`, `email`, `conf_email`, `company_name`, `tel`, `pic_payment_path`, `update_date`) VALUES
('123/23', 'qwert', '$2a$12$WEaVvaXe/914UfKLyGh11.eNJ/jsMQXU.fbKh1ncmJy.E.lukwBaW', 'seawaysia@gmail.com', '37434773', 'qwert Limited.', '0912345678', 'qr-code-payment.jpg', '2567-09-23 16:16:42');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `pic_path` text DEFAULT NULL,
  `type` int(3) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `pic_path`, `type`, `update_date`, `package_id`) VALUES
(1, 'lan_2.webp', 1, '2567-09-23 16:17:41', 1),
(2, 'lanta_1.jpg', 2, '2567-09-23 16:17:41', 1),
(3, 'lan_3.jpg', 3, '2567-09-23 16:17:41', 1),
(4, 'lanta_1.jpg', 1, '2567-09-23 16:18:34', 2),
(5, 'lanta_3.jpg', 3, '2567-09-23 16:18:34', 2),
(6, 'lanta_2.jpg', 2, '2567-09-23 16:18:34', 2);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `uid` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `conf_email` text DEFAULT NULL,
  `update_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`uid`, `email`, `password`, `conf_email`, `update_date`) VALUES
(1, 'bank_777_777@hotmail.com', '$2a$12$1rDJNjw/MB6orysGoWaskOlwFf/3xtRIts3Y0Vyt1zA0YAUb2WjMa', '33662716', '2567-09-23 16:26:54');

-- --------------------------------------------------------

--
-- Table structure for table `packageTour`
--

CREATE TABLE `packageTour` (
  `package_id` int(11) NOT NULL,
  `package_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `days_trip` int(2) DEFAULT NULL,
  `max_amount` int(4) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `price_person` decimal(7,2) DEFAULT NULL,
  `discount` int(3) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `username` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packageTour`
--

INSERT INTO `packageTour` (`package_id`, `package_name`, `description`, `days_trip`, `max_amount`, `company_name`, `price_person`, `discount`, `start_date`, `end_date`, `status`, `update_date`, `username`) VALUES
(1, 'เกาะลันตา (Ko Lanta District)', 'เป็นเกาะขนาดใหญ่ที่มีผู้คนอาศัยต่อเนื่องมายาวนานกว่าร้อยปี ประกอบด้วย เกาะลันตาใหญ่ และ เกาะลันตาน้อย แหล่งท่องเที่ยวส่วนใหญ่อยู่บน เกาะลันตาใหญ่ ขณะที่ เกาะลันตาน้อย เป็นที่ตั้งของที่ว่าการอำเภอเกาะ', 3, 100, 'qwert Limited.', 1500.00, 10, '2024-09-23 00:00:00', '2024-09-30 00:00:00', 'active', '2567-09-23 16:17:41', 'qwert'),
(2, 'เกาะล้าน (Koh Lan Pattaya)', 'เป็นแขวงหนึ่งในเมืองพัทยา จังหวัดชลบุรี โดยเป็นเกาะขนาด 4.7 ตารางกิโลเมตร กลางอ่าวไทย[1] มีเกาะครกและเกาะสากเป็นบริวาร ใน พ.ศ. 2562 มีประชากร 2,958 คน[2] เกาะล้านห่างจากเมืองพัทยาเพียง 7.5 กิโลเมตร มี', 3, 100, 'qwert Limited.', 2000.00, 5, '2024-09-23 00:00:00', '2024-09-30 00:00:00', 'active', '2567-09-23 16:18:34', 'qwert');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `booking_id` varchar(30) NOT NULL,
  `amount` int(3) DEFAULT NULL,
  `price_person` decimal(7,2) DEFAULT NULL,
  `discount` int(3) DEFAULT NULL,
  `check_in_date` datetime(6) DEFAULT NULL,
  `check_out_date` datetime(6) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `pic_receipt_path` text DEFAULT NULL,
  `since_date` datetime(6) DEFAULT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`license_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `license_id` (`license_id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `package_id` (`package_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `packageTour`
--
ALTER TABLE `packageTour`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `package_id` (`package_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `packageTour`
--
ALTER TABLE `packageTour`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `packageTour` (`package_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `member` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packageTour` (`package_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
