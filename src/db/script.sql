-- -- Criação do banco de dados
-- CREATE DATABASE IF NOT EXISTS `expo-mural`;

-- -- Seleciona o banco de dados
-- USE `expo-mural`;

-- -- Criação da tabela mural
-- CREATE TABLE IF NOT EXISTS `mural` (
--     `id` INT NOT NULL AUTO_INCREMENT,
--     `column-num` INT NOT NULL,
--     `row-num` INT NOT NULL,
--     `type` VARCHAR(255) NOT NULL,
--     `styles` VARCHAR(255),
--     `content_url` VARCHAR(1024),
--     PRIMARY KEY (`id`)
-- );

-- -- Inserção inicial para matriz 4x4 com campos nulos

-- -- INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`) VALUES
-- -- (0, 0, NULL, NULL, NULL),
-- -- (1, 0, NULL, NULL, NULL),
-- -- (2, 0, NULL, NULL, NULL),
-- -- (3, 0, NULL, NULL, NULL),

-- -- (0, 1, NULL, NULL, NULL),
-- -- (1, 1, NULL, NULL, NULL),
-- -- (2, 1, NULL, NULL, NULL),
-- -- (3, 1, NULL, NULL, NULL),

-- -- (0, 2, NULL, NULL, NULL),
-- -- (1, 2, NULL, NULL, NULL),
-- -- (2, 2, NULL, NULL, NULL),
-- -- (3, 2, NULL, NULL, NULL),

-- -- (0, 3, NULL, NULL, NULL),
-- -- (1, 3, NULL, NULL, NULL),
-- -- (2, 3, NULL, NULL, NULL),
-- -- (3, 3, NULL, NULL, NULL);

-- -- Procedure para inserção inicial

-- DELIMITER $$

-- CREATE PROCEDURE inserir_matriz_mural(IN num_colunas INT, IN num_linhas INT)
-- BEGIN
--     DECLARE r INT DEFAULT 0;
--     DECLARE c INT;

--     WHILE r < num_linhas DO
--         SET c = 0;
--         WHILE c < num_colunas DO
--             INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
--             VALUES (c, r, NULL, NULL, NULL);
--             SET c = c + 1;
--         END WHILE;
--         SET r = r + 1;
--     END WHILE;
-- END //

-- DELIMITER ;

-- --Chamar expandir_matriz_mural

-- CALL inserir_matriz_mural(4, 4);

-- --procedure para expandir mural

-- DELIMITER $$

-- CREATE PROCEDURE expandir_matriz_mural()
-- BEGIN
--     DECLARE min_col INT;
--     DECLARE max_col INT;
--     DECLARE min_row INT;
--     DECLARE max_row INT;

--     -- Obter os limites atuais da matriz
--     SELECT MIN(`column-num`), MAX(`column-num`), MIN(`row-num`), MAX(`row-num`)
--     INTO min_col, max_col, min_row, max_row
--     FROM `mural`;

--     -- Inserir nova coluna à esquerda
--     INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
--     SELECT min_col - 1, `row-num`, NULL, NULL, NULL
--     FROM (SELECT DISTINCT `row-num` FROM `mural`) AS rows;

--     -- Inserir nova coluna à direita
--     INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
--     SELECT max_col + 1, `row-num`, NULL, NULL, NULL
--     FROM (SELECT DISTINCT `row-num` FROM `mural`) AS rows;

--     -- Inserir nova linha acima
--     INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
--     SELECT `column-num`, min_row - 1, NULL, NULL, NULL
--     FROM (SELECT DISTINCT `column-num` FROM `mural`) AS cols;

--     -- Inserir nova linha abaixo
--     INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
--     SELECT `column-num`, max_row + 1, NULL, NULL, NULL
--     FROM (SELECT DISTINCT `column-num` FROM `mural`) AS cols;
-- END //

-- DELIMITER ;

-- --Chamar expandir_matriz_mural

-- -- CALL expandir_matriz_mural();

-- --Procedure para expandir a matriz apenas se necessario

-- DELIMITER //

-- CREATE PROCEDURE expandir_se_necessario()
-- BEGIN
--     DECLARE total INT;
--     DECLARE preenchidos INT;
--     DECLARE percentual DECIMAL(5,2);

--     -- Contar total de células na matriz
--     SELECT COUNT(*) INTO total FROM mural;

--     -- Contar células com content_url preenchido
--     SELECT COUNT(*) INTO preenchidos FROM mural WHERE content_url IS NOT NULL;

--     -- Calcular percentual de preenchimento
--     IF total > 0 THEN
--         SET percentual = (preenchidos / total) * 100;
--     ELSE
--         SET percentual = 0;
--     END IF;

--     -- Chamar expansão apenas se mais de 90% estiver preenchido
--     IF percentual > 90 THEN
--         CALL expandir_matriz_mural();
--     END IF;
-- END //

-- DELIMITER ;

-- -- Chamar expandir se necessário

-- -- CALL expandir_se_necessario();

-- -- Procedure para update de content url

-- DELIMITER //

-- CREATE PROCEDURE preencher_aleatorio_e_expandir(
--     IN p_type VARCHAR(255),
--     IN p_styles VARCHAR(255),
--     IN p_content_url VARCHAR(1024)
-- )
-- BEGIN
--     DECLARE random_id INT;

--     -- Seleciona aleatoriamente uma célula com content_url NULL
--     SELECT id INTO random_id
--     FROM mural
--     WHERE content_url IS NULL
--     ORDER BY RAND()
--     LIMIT 1;

--     -- Se encontrou uma célula, preenche os campos com os valores passados
--     IF random_id IS NOT NULL THEN
--         UPDATE mural
--         SET
--             `type` = p_type,
--             `styles` = p_styles,
--             `content_url` = p_content_url
--         WHERE id = random_id;
--     END IF;

--     -- Verifica se precisa expandir a matriz
--     CALL expandir_se_necessario();
-- END //

-- DELIMITER ;


-- -- Chamar procedure

-- -- CALL preencher_aleatorio_e_expandir(
-- --     'video',
-- --     'background-color: #eee; border-radius: 8px;',
-- --     'https://meusite.com/media/video42.mp4'
-- -- );

-- --Select

-- SELECT *
-- FROM mural
-- ORDER BY `row-num`, `column-num`;

-- Seleciona o banco de dados
USE `dev_api`;

-- Criação da tabela mural
CREATE TABLE IF NOT EXISTS `mural` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `column-num` INT NOT NULL,
    `row-num` INT NOT NULL,
    `type` VARCHAR(255) ,
    `styles` VARCHAR(255),
    `content_url` VARCHAR(1024),
    PRIMARY KEY (`id`)
);

DELIMITER $$

CREATE PROCEDURE inserir_matriz_mural(IN num_colunas INT, IN num_linhas INT)
BEGIN
    DECLARE r INT DEFAULT 0;
    DECLARE c INT;

    WHILE r < num_linhas DO
        SET c = 0;
        WHILE c < num_colunas DO
            INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
            VALUES (c, r, NULL, NULL, NULL);
            SET c = c + 1;
        END WHILE;
        SET r = r + 1;
    END WHILE;
END $$

DELIMITER ;

CALL inserir_matriz_mural(4, 4);

DELIMITER //

CREATE PROCEDURE expandir_matriz_mural()
BEGIN
    DECLARE min_col INT;
    DECLARE max_col INT;
    DECLARE min_row INT;
    DECLARE max_row INT;

    -- Obter os limites atuais da matriz
    SELECT MIN(`column-num`), MAX(`column-num`), MIN(`row-num`), MAX(`row-num`)
    INTO min_col, max_col, min_row, max_row
    FROM `mural`;

    -- Inserir nova coluna à esquerda
    INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
    SELECT min_col - 1, `row-num`, NULL, NULL, NULL
    FROM (SELECT DISTINCT `row-num` FROM `mural`) AS r;

    -- Inserir nova coluna à direita
    INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
    SELECT max_col + 1, `row-num`, NULL, NULL, NULL
    FROM (SELECT DISTINCT `row-num` FROM `mural`) AS r;

    -- Inserir nova linha acima
    INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
    SELECT `column-num`, min_row - 1, NULL, NULL, NULL
    FROM (SELECT DISTINCT `column-num` FROM `mural`) AS cols;

    -- Inserir nova linha abaixo
    INSERT INTO `mural` (`column-num`, `row-num`, `type`, `styles`, `content_url`)
    SELECT `column-num`, max_row + 1, NULL, NULL, NULL
    FROM (SELECT DISTINCT `column-num` FROM `mural`) AS cols;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE expandir_se_necessario()
BEGIN
    DECLARE total INT;
    DECLARE preenchidos INT;
    DECLARE percentual DECIMAL(5,2);

    -- Contar total de células na matriz
    SELECT COUNT(*) INTO total FROM mural;

    -- Contar células com content_url preenchido
    SELECT COUNT(*) INTO preenchidos FROM mural WHERE content_url IS NOT NULL;

    -- Calcular percentual de preenchimento
    IF total > 0 THEN
        SET percentual = (preenchidos / total) * 100;
    ELSE
        SET percentual = 0;
    END IF;

    -- Chamar expansão apenas se mais de 90% estiver preenchido
    IF percentual > 90 THEN
        CALL expandir_matriz_mural();
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE preencher_aleatorio_e_expandir(
    IN p_type VARCHAR(255),
    IN p_styles VARCHAR(255),
    IN p_content_url VARCHAR(1024)
)
BEGIN
    DECLARE random_id INT;

    -- Seleciona aleatoriamente uma célula com content_url NULL
    SELECT id INTO random_id
    FROM mural
    WHERE content_url IS NULL
    ORDER BY RAND()
    LIMIT 1;

    -- Se encontrou uma célula, preenche os campos com os valores passados
    IF random_id IS NOT NULL THEN
        UPDATE mural
        SET
            `type` = p_type,
            `styles` = p_styles,
            `content_url` = p_content_url
        WHERE id = random_id;
    END IF;

    -- Verifica se precisa expandir a matriz
    CALL expandir_se_necessario();
END //

DELIMITER ;

