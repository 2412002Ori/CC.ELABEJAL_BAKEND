import pool from "../src/db.js";

export const getAlldata = async (req, res) => {
    const { year } = req.query;
    try {
        const result = await pool.query(
            `SELECT 
                c.location_id AS "N° Local",
                c.business_name AS "Nombre del local",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Enero' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Ene",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Febrero' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Feb",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Marzo' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Mar",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Abril' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Abr",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Mayo' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "May",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Junio' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Jun",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Julio' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Jul",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Agosto' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Ago",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Septiembre' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Sep",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Octubre' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Oct",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Noviembre' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Nov",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Diciembre' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Dic"
            FROM
                contracts AS c
            LEFT JOIN
                payments AS p ON c.contract_number = p.contract_number
            GROUP BY
                c.location_id,
                c.business_name
            ORDER BY
                c.location_id`,
            [year]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener resumen de pagos:', error);
        res.status(500).json({ error: 'Error al obtener resumen de pagos' });
    }
};

export const getdataById = async (req, res) => {
    const { id } = req.params; 
    const { year } = req.query;
    try {
        const result = await pool.query(
            `SELECT 
                c.location_id AS "N° Local",
                c.business_name AS "Nombre del local",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Enero' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Ene",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Febrero' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Feb",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Marzo' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Mar",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Abril' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Abr",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Mayo' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "May",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Junio' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Jun",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Julio' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Jul",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Agosto' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Ago",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Septiembre' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Sep",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Octubre' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Oct",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Noviembre' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Nov",
                CASE WHEN SUM(CASE WHEN p.page_month = 'Diciembre' AND p.year_payment = $1 THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Dic"
            FROM
                contracts AS c
            LEFT JOIN
                payments AS p ON c.contract_number = p.contract_number
            WHERE
                c.location_id = $2
            GROUP BY
                c.location_id,
                c.business_name
            ORDER BY
                c.location_id`,
            [year, id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener resumen de pagos:', error);
        res.status(500).json({ error: 'Error al obtener resumen de pagos' });
    }
};

/* LLAMADAS PARA ESTADISTICAS SELECT
    c.location_id,
    c.contract_number,
    SUM(p.amount) AS total_pagado_por_contrato
FROM
    contracts AS c
INNER JOIN
    payments AS p ON c.contract_number = p.contract_number
GROUP BY
    c.location_id, c.contract_number
ORDER BY
    c.location_id, c.contract_number;*/
