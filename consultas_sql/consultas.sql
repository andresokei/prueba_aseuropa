-- Consulta 1: Obtener todos los productos cuyo precio sea mayor a 50€ y que tenga stock disponible
SELECT * 
FROM productos24
WHERE precio > 50 
AND stock > 0;

-- Consulta 2: Obtener todos los productos de ambas tablas donde el precio sea menor a 100€, 
-- tenga stock disponible y la fecha de actualización sea superior al 29/02/2024
SELECT * 
FROM productos24
WHERE precio < 100 
AND stock > 0 
AND updated_at > '2024-02-29'

UNION ALL

SELECT * 
FROM productos25
WHERE precio < 100 
AND stock > 0 
AND updated_at > '2024-02-29';

-- Consulta 3: Actualizar el precio de un producto de la tabla productos25 en base a su id
UPDATE productos25
SET precio = 129.99
WHERE id = 5;