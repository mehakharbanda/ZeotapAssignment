async function exportClickhouse() {
    const config = {
      url: document.getElementById('chHost').value,
      port: document.getElementById('chPort').value,
      database: document.getElementById('chDB').value,
      user: document.getElementById('chUser').value,
      jwtToken: document.getElementById('chJWT').value,
    };
    const table = document.getElementById('chTable').value;
    const columns = document.getElementById('chCols').value.split(',');
    const res = await fetch('http://localhost:3000/export-clickhouse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config, table, columns })
    });
    const data = await res.json();
    document.getElementById('result').innerText = `Exported ${data.count} records.`;
  }
  
  async function importFile() {
    const fileInput = document.getElementById('csvFile');
    const table = document.getElementById('targetTable').value;
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('table', table);
    formData.append('config', JSON.stringify({
      url: document.getElementById('chHost').value,
      port: document.getElementById('chPort').value,
      database: document.getElementById('chDB').value,
      user: document.getElementById('chUser').value,
      jwtToken: document.getElementById('chJWT').value,
    }));
    const res = await fetch('http://localhost:3000/import-file', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    document.getElementById('result').innerText = `Imported ${data.count} records.`;
  }
  