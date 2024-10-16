-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 14, 2024 at 06:05 PM
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
('123/23', 'qwert', '$2a$12$.elfC5igUbV7yJUXSRefhuHI1Z84EiQRHY9nKYUjfPKFk3pHrSCru', 'seawaysia@gmail.com', '78174548', 'Qwert Limited', '0912345678', 'qr-code-payment.jpg', '2024-10-14 12:59:56');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `pic_path` text DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `pic_path`, `update_date`, `package_id`) VALUES
(1, 'lanta_1.jpg', '2024-10-14 13:03:53', 1),
(2, 'lanta_2.jpg', '2024-10-14 13:03:53', 1),
(3, 'lanta_3.jpg', '2024-10-14 13:03:53', 1),
(4, 'lan_1.webp', '2024-10-14 13:05:44', 2),
(5, 'lan_2.webp', '2024-10-14 13:05:44', 2),
(6, 'lan_3.jpg', '2024-10-14 13:05:44', 2),
(7, 'lepe_1.jpg', '2024-10-14 13:07:22', 3),
(8, 'lepe_2.jpg', '2024-10-14 13:07:22', 3),
(9, 'lepe_3.jpg', '2024-10-14 13:07:22', 3),
(10, 'pp_1.jpg', '2024-10-14 13:08:48', 4),
(11, 'pp_2.jpg', '2024-10-14 13:08:48', 4),
(12, 'pp_3.jpeg', '2024-10-14 13:08:48', 4),
(13, 'kood_1.jpg', '2024-10-14 13:17:57', 5),
(14, 'kood_2.jpg', '2024-10-14 13:17:57', 5),
(15, 'kood_3.jpg', '2024-10-14 13:17:57', 5),
(16, 'tao_1.jpg', '2024-10-14 13:20:03', 6),
(17, 'tao_2.jpg', '2024-10-14 13:20:03', 6),
(18, 'tao_3.jpg', '2024-10-14 13:20:03', 6),
(19, 'tao_4.jpg', '2024-10-14 13:20:03', 6);

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
(1, 'bank_777_777@hotmail.com', '$2a$12$8t2p32SPiADSB236MQvAXuTkGLF8GLUveyabLv3ZsH8btqx2hPFBu', '83174635', '2024-10-15 00:47:28');

-- --------------------------------------------------------

--
-- Table structure for table `package_tour`
--

CREATE TABLE `package_tour` (
  `package_id` int(11) NOT NULL,
  `package_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `days_trip` int(11) DEFAULT NULL,
  `max_amount` int(11) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `price_person` decimal(7,2) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `username` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package_tour`
--

INSERT INTO `package_tour` (`package_id`, `package_name`, `description`, `days_trip`, `max_amount`, `company_name`, `price_person`, `discount`, `start_date`, `end_date`, `status`, `update_date`, `username`) VALUES
(1, 'เกาะลันตา (Ko Lanta District)', 'เป็นเกาะขนาดใหญ่ที่มีผู้คนอาศัยต่อเนื่องมายาวนานกว่าร้อยปี ประกอบด้วย เกาะลันตาใหญ่ และ เกาะลันตาน้อย แหล่งท่องเที่ยวส่วนใหญ่อยู่บน เกาะลันตาใหญ่ ขณะที่ เกาะลันตาน้อย เป็นที่ตั้งของที่ว่าการอำเภอเกาะ', 3, 30, 'Qwert Limited', 500.00, 5, '2024-10-14 00:00:00', '2024-11-30 00:00:00', 'active', '2024-10-14 13:03:53', 'qwert'),
(2, 'เกาะล้าน (Koh Lan Pattaya)', 'เป็นแขวงหนึ่งในเมืองพัทยา จังหวัดชลบุรี โดยเป็นเกาะขนาด 4.7 ตารางกิโลเมตร กลางอ่าวไทย มีเกาะครกและเกาะสากเป็นบริวาร ใน พ.ศ. 2562 มีประชากร 2,958 คน เกาะล้านห่างจากเมืองพัทยาเพียง 7.5 กิโลเมตร', 3, 50, 'Qwert Limited', 1000.00, 15, '2024-10-14 00:00:00', '2024-11-30 00:00:00', 'active', '2024-10-14 13:05:44', 'qwert'),
(3, 'เกาะหลีเป๊ะ (koh lipe)', 'เกาะหลีเป๊ะ หรือ เกาะลีเป๊ะ เป็นเกาะกลางทะเลอยู่ในเขตตำบลเกาะสาหร่าย อำเภอเมืองสตูล จังหวัดสตูล อยู่ทางตอนใต้ของเกาะอาดัง ห่างจากแผ่นดินของจังหวัดสตูล 85 กิโลเมตร เขตอำนาจการควบคุมของอุทยานแห่งชาติ', 3, 40, 'Qwert Limited', 1500.00, 20, '2024-10-14 06:08:00', '2024-11-20 22:59:00', 'active', '2024-10-14 13:07:22', 'qwert'),
(4, 'หมู่เกาะพี พี (koh phi phi)', 'หมู่เกาะพี พี อยู่ห่างจากจังหวัดกระบี่ราว 40 กิโลเมตร หมู่เกาะพีพี เป็นส่วนหนึ่งของอุทยานแห่งชาติ หาดนพรัตน์ธารา-หมู่เกาะพีพี เดิมชาวทะเลเรียก หมู่เกาะนี้ว่า ปูเลาปิอาปิ คำว่า ปูเลา แปลว่าเกาะ', 2, 20, 'Qwert Limited', 2000.00, 0, '2024-10-14 07:15:00', '2024-11-30 08:08:00', 'active', '2024-10-14 13:08:48', 'qwert'),
(5, 'เกาะกูด (koh kood)', 'ที่นี่คือเกาะสุดท้ายทางทิศตะวันออกของประเทศไทยในน่านน้ำทะเลตราด และยังมีขนาดใหญ่เป็นอันดับสองรองจากเกาะช้าง และเป็นเกาะที่มีขนาดใหญ่เป็นอันดับ 4 ของประเทศเลยทีเดียว ', 3, 20, 'Qwert Limited', 1000.00, 0, '2024-10-14 00:00:00', '2024-11-30 00:00:00', 'active', '2024-10-14 13:17:57', 'qwert'),
(6, 'เกาะเต่า (koh Tao)', 'เกาะเต่า เป็นเกาะในอ่าวไทย อยู่ในตำบลเกาะเต่า อำเภอเกาะพะงัน จังหวัดสุราษฎร์ธานี เกาะมีรูปร่างโค้งเว้าเหมือนกับเมล็ดถั่ว เกาะตั้งอยู่ทางทิศตะวันตกเฉียงเหนือของเกาะพะงัน ห่างประมาณ 45 กิโลเมตร', 2, 50, 'Qwert Limited', 1500.00, 5, '2024-10-14 15:16:00', '2024-11-30 04:04:00', 'active', '2024-10-14 13:20:03', 'qwert');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id_paid` varchar(30) NOT NULL,
  `amount` decimal(7,2) DEFAULT NULL,
  `currency` varchar(15) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `paid_at` datetime(6) DEFAULT NULL,
  `update_date` datetime NOT NULL,
  `method` varchar(20) DEFAULT NULL,
  `pic_receipt_path` text DEFAULT NULL,
  `booking_id` varchar(30) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id_paid`, `amount`, `currency`, `status`, `paid_at`, `update_date`, `method`, `pic_receipt_path`, `booking_id`, `uid`) VALUES
('1728893447382', 475.00, 'thb', 'successful', '2024-10-14 15:10:47.000000', '0000-00-00 00:00:00', 'e_slip', 'slip-history-05.jpg', '1728893447385xJkua', 1),
('chrg_test_61euitgot3ur9krubdo', 475.00, 'THB', 'successful', '2024-10-15 01:02:14.000000', '2024-10-15 01:02:14', 'credit_card', NULL, '1728928931614voyJM', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `booking_id` varchar(30) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `price_person` decimal(7,2) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `since_date` datetime(6) DEFAULT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`booking_id`, `amount`, `price_person`, `discount`, `check_in_date`, `check_out_date`, `status`, `since_date`, `update_date`, `uid`, `package_id`) VALUES
('1728893447385xJkua', 1, 500.00, 5, '2024-10-14', '2024-10-16', 'pending', '2024-10-14 15:10:47.000000', '2024-10-14 15:10:47.000000', 1, 1),
('1728928931614voyJM', 1, 500.00, 5, '2024-10-15', '2024-10-17', 'confirmed', '2024-10-15 01:02:11.000000', '2024-10-15 01:02:11.000000', 1, 1);

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
-- Indexes for table `package_tour`
--
ALTER TABLE `package_tour`
  ADD PRIMARY KEY (`package_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id_paid`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `uid` (`uid`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `package_tour`
--
ALTER TABLE `package_tour`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `package_tour` (`package_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `reservation` (`booking_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `member` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `member` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `package_tour` (`package_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
