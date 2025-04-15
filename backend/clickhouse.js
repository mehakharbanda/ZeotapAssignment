const { ClickHouse } = require('clickhouse');

function createClient(config) {
  return new ClickHouse({
    url: config.url,
    port: config.port,
    basicAuth: { username: config.user, password: config.jwtToken },
    isUseGzip: false,
    format: 'json',
    config: { session_timeout: 60 },
  });
}

exports.exportData = async (config, table, columns) => {
  const ch = createClient(config);
  const query = `SELECT ${columns.join(',')} FROM ${table}`;
  const rows = await ch.query(query).toPromise();
  return rows;
};

exports.importData = async (config, table, records) => {
  const ch = createClient(config);
  const columns = Object.keys(records[0]);
  const values = records.map(row => `(${columns.map(col => `'${row[col]}'`).join(',')})`).join(',');
  const query = `INSERT INTO ${table} (${columns.join(',')}) VALUES ${values}`;
  await ch.query(query).toPromise();
  return records.length;
};