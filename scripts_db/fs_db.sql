-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2022 a las 02:11:13
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

DROP DATABASE IF EXISTS fs_db;
CREATE DATABASE fs_db;
USE fs_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fs_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `url`) VALUES
(1, 'genericUser.jpeg'),
(90, 'avatar-1647214206933.jpg'),
(91, 'avatar-1647214235583.jpg'),
(244, 'avatar-1647387828634.jpg'),
(487, 'image-1647734178750.jpg'),
(488, 'image-1647734179258.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagesproduct`
--

CREATE TABLE `imagesproduct` (
  `id` int(11) NOT NULL,
  `imageId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagesproduct`
--

INSERT INTO `imagesproduct` (`id`, `imageId`, `productId`) VALUES
(182, 487, 304),
(183, 488, 304);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `ofert` tinyint(1) DEFAULT 0,
  `discount` int(11) DEFAULT NULL,
  `category` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `description`, `ofert`, `discount`, `category`) VALUES
(304, 'Campera Wave', 1850, 'Campera azul, muy fachera.', 1, 10, 'hombre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `units` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `size_id`, `product_id`, `units`) VALUES
(495, 1, 304, 5),
(496, 2, 304, 8),
(497, 3, 304, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `sizes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `size`
--

INSERT INTO `size` (`id`, `sizes`) VALUES
(1, 'extra small'),
(2, 'small'),
(3, 'medium'),
(4, 'large'),
(5, 'extra large');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `isAdmin`, `isActive`, `image_id`) VALUES
(6, 'Bernardo', 'Arrechea', 'bernardo@fashionsale.com', '$2b$10$9f8fpZmwUPdX4DaMjhzVaOLZXWSLh3kSlFkvcRiwaTAA8JRLg7RFa', 1, 1, 91),
(7, 'Bernardo', 'Arrechea', 'berna@mail.com', '$2b$10$B33BfnWXKWF1PVDY91wg/eAvy.Xpky6.yxALpMVVNA1uVf0sMiIY2', 0, 1, 90),
(8, 'asd', 'dsa', 'mail@mail.com', '$2b$10$GYLbpgoE6hIRR8YakvWdFu1FvOBWVWYXJaWLcKuCMeySvPDyaxuWq', 0, 1, 244);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagesproduct`
--
ALTER TABLE `imagesproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`productId`),
  ADD KEY `image` (`imageId`) USING BTREE;

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `size` (`size_id`),
  ADD KEY `product` (`product_id`);

--
-- Indices de la tabla `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_id` (`image_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=502;

--
-- AUTO_INCREMENT de la tabla `imagesproduct`
--
ALTER TABLE `imagesproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=197;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=316;

--
-- AUTO_INCREMENT de la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=504;

--
-- AUTO_INCREMENT de la tabla `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagesproduct`
--
ALTER TABLE `imagesproduct`
  ADD CONSTRAINT `imagesproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `imagesproduct_ibfk_3` FOREIGN KEY (`imageId`) REFERENCES `images` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `product_sizes_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
