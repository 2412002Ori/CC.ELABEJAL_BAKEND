import stadisticsModels from '../models/stadistics.models.js';
// import ExcelJS from 'exceljs';

export const getAlldata = async (req, res) => {
    const year = req.query.year;
    if (!year || isNaN(Number(year))) {
        return res.status(400).json({ error: 'El año debe ser un número válido' });
    }
    console.log('AÑO RECIBIDO EN BACKEND:', year);
    try {
        const result = await stadisticsModels.getAll(year);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos para el año especificado.' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error al obtener resumen de pagos:', error);
        res.status(500).json({ error: 'Error al obtener resumen de pagos' });
    }
};

export const getdataById = async (req, res) => {
    const id = req.params.id;
    const year = req.params.year;
    if (!year || isNaN(Number(year))) {
        return res.status(400).json({ error: 'El año debe ser un número válido' });
    }
    try {
        const result = await stadisticsModels.getById(id, year);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener resumen de pagos:', error);
        res.status(500).json({ error: 'Error al obtener resumen de pagos' });
    }
};

export const getPagosData = async (req, res) => {
    const { year } = req.query;
    try {
        const result = await stadisticsModels.getPagos(year);
        res.json(result);
    } catch (error) {
        console.error('Error al obtener pagos:', error);
        res.status(500).json({ error: 'Error al obtener pagos' });
    }
};

export const exportStadisticsExcel = async (req, res) => {
    const year = req.query.year;
    if (!year || isNaN(Number(year))) {
        console.log('Año inválido:', year);
        return res.status(400).json({ error: 'El año debe ser un número válido' });
    }
    try {
        console.log('Generando Excel para año:', year);
        const data = await stadisticsModels.getAll(year);
        console.log('data:', data);
        console.log('data.rows:', data.rows);
        if (!data.rows || !Array.isArray(data.rows) || data.rows.length === 0) {
            console.log('No hay datos para exportar');
            return res.status(404).json({ error: 'No hay datos para exportar' });
        }
        const ExcelJS = (await import('exceljs')).default;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Estadísticas');

        worksheet.columns = Object.keys(data.rows[0]).map(key => ({
            header: key,
            key: key,
            width: 20
        }));
        data.rows.forEach(row => worksheet.addRow(row));

        const buffer = await workbook.xlsx.writeBuffer();
        console.log('Buffer generado, tamaño:', buffer.length);

        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=estadisticas_${year}.xlsx`);
        res.status(200).send(Buffer.from(buffer));
        console.log('Archivo enviado correctamente');
    } catch (error) {
        console.error('Error exportando Excel:', error);
        res.status(500).json({ error: 'Error exportando Excel' });
    }
};

