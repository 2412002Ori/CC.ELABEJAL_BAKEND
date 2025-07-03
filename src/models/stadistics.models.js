import prisma from "../lib/prisma.js";

const stadisticsModels = {

    getAll: async (year) => {
        try {
            const meses = await prisma.$queryRaw`SELECT DISTINCT page_month FROM public.payments WHERE year_payment = CAST(${year} AS INTEGER)`;
            console.log('Meses distintos en payments:', meses);
            const result = await prisma.$queryRaw`
                SELECT 
                    c.location_id AS "N° Local",
                    c.business_name AS "Nombre del local",
                    MAX(CASE WHEN p.page_month = 'Enero' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Ene",
                    MAX(CASE WHEN p.page_month = 'Febrero' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Feb",
                    MAX(CASE WHEN p.page_month = 'Marzo' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Mar",
                    MAX(CASE WHEN p.page_month = 'Abril' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Abr",
                    MAX(CASE WHEN p.page_month = 'Mayo' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "May",
                    MAX(CASE WHEN p.page_month = 'Junio' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Jun",
                    MAX(CASE WHEN p.page_month = 'Julio' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Jul",
                    MAX(CASE WHEN p.page_month = 'Agosto' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Ago",
                    MAX(CASE WHEN p.page_month = 'Septiembre' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Sep",
                    MAX(CASE WHEN p.page_month = 'Octubre' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Oct",
                    MAX(CASE WHEN p.page_month = 'Noviembre' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Nov",
                    MAX(CASE WHEN p.page_month = 'Diciembre' AND p.year_payment = CAST(${year} AS INTEGER) THEN '✓' ELSE 'X' END) AS "Dic"
                FROM
                    public.contracts AS c
                LEFT JOIN
                    public.payments AS p ON c.contract_number = p.contract_number
                GROUP BY
                    c.location_id,
                    c.business_name
                ORDER BY
                    c.location_id
            `;
            console.log('Estadísticas enviadas al frontend:', result);
            return { rows: result };
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            throw error;
        }
    },

    getById: async (id, year) => {
        try {
            const result = await prisma.$queryRaw`
                SELECT 
                    c.location_id AS "N° Local",
                    c.business_name AS "Nombre del local",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Enero' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Ene",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Febrero' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Feb",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Marzo' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Mar",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Abril' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Abr",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Mayo' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "May",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Junio' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Jun",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Julio' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Jul",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Agosto' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Ago",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Septiembre' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Sep",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Octubre' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Oct",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Noviembre' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Nov",
                    CASE WHEN SUM(CASE WHEN p.page_month = 'Diciembre' AND p.year_payment = ${year} THEN p.amount ELSE 0 END) > 0 THEN '✓' ELSE 'X' END AS "Dic"
                FROM
                    contracts AS c
                LEFT JOIN
                    payments AS p ON c.contract_number = p.contract_number
                WHERE
                    c.location_id = ${parseInt(id)}
                GROUP BY
                    c.location_id,
                    c.business_name
                ORDER BY
                    c.location_id
            `;
            console.log('Estadísticas enviadas al frontend:', result);
            return { rows: result };
        } catch (error) {
            console.error('Error al obtener estadísticas por ID:', error);
            throw error;
        }
    },

    // Métodos adicionales usando Prisma ORM para consultas más simples
    getSummaryStats: async (year) => {
        try {
            const stats = await prisma.contracts.findMany({
                include: {
                    payments: {
                        where: {
                            year_payment: parseInt(year)
                        }
                    }
                }
            });

            const summary = {
                totalContracts: stats.length,
                totalPayments: stats.reduce((acc, contract) => acc + contract.payments.length, 0),
                totalAmount: stats.reduce((acc, contract) => {
                    return acc + contract.payments.reduce((sum, payment) => {
                        return sum + (payment.amount ? parseFloat(payment.amount) : 0);
                    }, 0);
                }, 0)
            };

            return { rows: [summary] };
        } catch (error) {
            console.error('Error al obtener estadísticas resumidas:', error);
            throw error;
        }
    },

    getMonthlyStats: async (year) => {
        try {
            const monthlyStats = await prisma.payments.groupBy({
                by: ['page_month'],
                where: {
                    year_payment: parseInt(year)
                },
                _sum: {
                    amount: true
                },
                _count: {
                    payment_id: true
                }
            });
            console.log('Estadísticas mensuales enviadas al frontend:', monthlyStats);
            return { rows: monthlyStats };
        } catch (error) {
            console.error('Error al obtener estadísticas mensuales:', error);
            throw error;
        }
    },

    getPagos: async (year) => {
        try {
            const pagos = await prisma.$queryRaw`SELECT * FROM payments WHERE year_payment = CAST(${year} AS INTEGER)`;
            console.log('Pagos visibles desde Node:', pagos);
            return { rows: pagos };
        } catch (error) {
            console.error('Error al obtener pagos:', error);
            throw error;
        }
    }
};

export default stadisticsModels;