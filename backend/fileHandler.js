const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

exports.writeToCSV = (data, columns) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../output/export.csv');
    const ws = fs.createWriteStream(filePath);
    csv.write(data, { headers: columns })
      .pipe(ws)
      .on('finish', () => resolve(filePath))
      .on('error', reject);
  });
};

exports.parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const records = [];
    csv.parseString(file.data.toString(), { headers: true })
      .on('data', row => records.push(row))
      .on('end', () => resolve(records))
      .on('error', reject);
  });
};
