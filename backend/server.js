const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const clickhouseClient = require('./clickhouse');
const fileHandler = require('./fileHandler');
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// ClickHouse -> Flat File
app.post('/export-clickhouse', async (req, res) => {
  try {
    const { config, columns, table } = req.body;
    const data = await clickhouseClient.exportData(config, table, columns);
    const filePath = await fileHandler.writeToCSV(data, columns);
    res.json({ success: true, filePath, count: data.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Flat File -> ClickHouse
app.post('/import-file', async (req, res) => {
  try {
    const file = req.files.file;
    const { config, table } = req.body;
    const records = await fileHandler.parseCSV(file);
    const count = await clickhouseClient.importData(config, table, records);
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));