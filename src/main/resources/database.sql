-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint NOT NULL,
  `nombre` varchar(256) COLLATE utf32_unicode_ci NOT NULL,
  `apellido1` varchar(256) COLLATE utf32_unicode_ci NOT NULL,
  `apellido2` varchar(256) COLLATE utf32_unicode_ci NOT NULL,
  `username` varchar(256) COLLATE utf32_unicode_ci NOT NULL,
  `password` varchar(256) COLLATE utf32_unicode_ci NOT NULL,
  `fecha_alta` datetime NOT NULL,
  `genero` tinyint NOT NULL,
  `id_tipousuario` bigint NOT NULL,
  `id_club` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;