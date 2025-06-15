import pool from "../db.js";

const stadisticsModels = {

    getAll: async (year) => {
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
                payments AS p ON c.contract_number = p.contract_number AND p.year_payment = $1 -- Agrega la condición p.year_payment = $1
            GROUP BY
                c.location_id,
                c.business_name
            ORDER BY
                c.location_id`,
            [year]
        );
            return result;
        } catch (error) {
            console.error('Error al obtener pagos:', error);
            throw error;
        }
    },

    getById: async ( id , year) => {
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
            return result;
        } catch (error) {
            console.error('Error al obtener el inquilino :', error);
            throw error;
        }
    },

  
};

export default stadisticsModels;