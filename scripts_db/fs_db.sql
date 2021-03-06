-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-04-2022 a las 19:48:01
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
(2, 'avatar-1647214235583.jpg'),
(5, 'image-1649038728916.jpg'),
(6, 'image-1649038728917.jpg'),
(7, 'image-1649038786417.jpeg'),
(8, 'image-1649038879695.jpg'),
(9, 'image-1649038879741.jpg'),
(10, 'image-1649038959408.jpeg'),
(11, 'image-1649039004794.jpeg'),
(12, 'avatar-1649039613831.jpg'),
(13, 'avatar-1649039673518.jpg'),
(14, 'avatar-1649039738295.jpeg'),
(15, 'image-1649299816138.jpg'),
(16, 'image-1649299816139.jpg'),
(17, 'image-1649299816142.jpg');

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
(3, 5, 2),
(4, 6, 2),
(5, 7, 3),
(6, 8, 4),
(7, 9, 4),
(8, 10, 5),
(9, 11, 6),
(10, 15, 1),
(11, 16, 1),
(12, 17, 1);

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
(1, 'Campera Wave', 2850, 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.', 1, 25, 'hombre'),
(2, 'Campera', 3500, 'Molestias unde facilis quis qui sed dolorem animi accusamus fugiat.', 0, 0, 'mujer'),
(3, 'Jeans', 890, 'Aliquid tempora iure eius ducimus voluptatum.', 1, 10, 'hombre'),
(4, 'Piloto Lights', 5650, 'Nemo dolorum, aut ea mollitia quis odit pariatur vitae alias.', 0, 0, 'mujer'),
(5, 'Collar Prisma', 2800, 'Temporibus enim, molestiae eaque, nobis labore vel iusto ut!', 0, 0, 'accesorio'),
(6, 'Mochila', 6300, 'Amet consectetur adipisicing elit temporibus, iure nulla id totam dicta.', 1, 35, 'accesorio');

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
(1, 2, 1, 4),
(2, 3, 1, 6),
(3, 4, 1, 8),
(4, 1, 2, 15),
(5, 2, 2, 10),
(6, 3, 3, 15),
(7, 4, 3, 10),
(8, 1, 4, 15),
(9, 2, 4, 4),
(10, 1, 5, 10),
(11, 3, 6, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `sizes` varchar(255) NOT NULL,
  `sizes_short` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `size`
--

INSERT INTO `size` (`id`, `sizes`, `sizes_short`) VALUES
(1, 'extra small', 'XS'),
(2, 'small', 'S'),
(3, 'medium', 'M'),
(4, 'large', 'L'),
(5, 'extra large', 'XL');

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
(1, 'Bernardo', 'Arrechea', 'bernardo@fashionsale.com', '$2b$10$9f8fpZmwUPdX4DaMjhzVaOLZXWSLh3kSlFkvcRiwaTAA8JRLg7RFa', 1, 1, 2),
(2, 'Milton', 'Mourao', 'milton@fashionsale.com', '$2b$10$MDRXsZIL4fW5Cc606cwRI.JonPQdfcwHqjlZ6SrVYWEy/MCZWy5lS', 1, 1, 12),
(3, 'Nicolas', 'Cid', 'nico@fashionsale.com', '$2b$10$By4ZKekls674plf9ZmIUoOzbeTNC8VsgO61cCyvwFpsyuEgSm0g0S', 1, 1, 13),
(4, 'Matias', 'Juaquin', 'matias@fashionsale.com', '$2b$10$svxMqloi8GB0Vx.yZXZSM.LSygbT8YQyWhU2C5yMaKvSZxJDTezYW', 1, 1, 14);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT de la tabla `imagesproduct`
--
ALTER TABLE `imagesproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagesproduct`
--
ALTER TABLE `imagesproduct`
  ADD CONSTRAINT `imagesproduct_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `imagesproduct_ibfk_3` FOREIGN KEY (`imageId`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sizes_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`image_id`) REFERENCES `images` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
