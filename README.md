# ZeotapAssignment
This project is designed to facilitate the ingestion of data into ClickHouse, both from flat CSV files and from ClickHouse to CSV. The backend is implemented using Node.js and Express, while the frontend consists of an HTML interface for interacting with the system.
Project Structure
- backend/
  - server.js
  - clickhouse.js
  - fileHandler.js
- frontend/
  - index.html
  - style.css
  - script.js
- .env
- README.md
  
Prerequisites
Node.js (version 12 or higher)

ClickHouse instance (you need the host, port, database, username, and JWT token to connect)

Basic knowledge of CSV files and ClickHouse

Setup and Installation
Follow these steps to set up and run the project locally:

1. Clone the Repository
2. Install Dependencies
In the project root directory, run the following command to install the necessary dependencies for both frontend and backend:
npm install

3. Set Up Configuration
Create a .env file in the root directory with the following configuration options:
CLICKHOUSE_URL=your-clickhouse-host-url
CLICKHOUSE_PORT=your-clickhouse-port
CLICKHOUSE_USER=your-clickhouse-username
CLICKHOUSE_JWT=your-clickhouse-jwt-token
CLICKHOUSE_DB=your-clickhouse-database

4. Running the Application
Once the dependencies are installed and the configuration is set up, you can run the application:
npm start
This will start the server on http://localhost:3000. The frontend will be accessible through your browser at http://localhost:3000.

Frontend Usage
On the frontend, you'll find the following features:

Data Source Selection
You can choose between exporting data from ClickHouse or importing a CSV file into ClickHouse.

ClickHouse: Allows you to export data from ClickHouse into a CSV file.

Flat File: Allows you to import a CSV file into ClickHouse.

ClickHouse Data Export
Host: The ClickHouse server URL (e.g., http://localhost:8123).

Port: The port on which ClickHouse is running (usually 8123).

Database: The ClickHouse database name where the data resides.

User: Your ClickHouse username.

JWT Token: The authentication token for accessing ClickHouse.

Table: The table from which you want to export data.

Columns: A comma-separated list of columns you want to export.

Click the "Export to Flat File" button to export the selected data from ClickHouse into a CSV file.

Flat File Import to ClickHouse
File Selection: Choose a CSV file from your local system to upload.

Table Name for ClickHouse: Specify the name of the table in ClickHouse where the data will be inserted.

Click the "Import to ClickHouse" button to import the selected CSV file into the specified ClickHouse table.

Backend Overview
The backend consists of the following key files:

server.js
This is the main entry point for the application. It sets up the server, middleware, and API routes to handle the data export and import requests.

/export-clickhouse: Exports data from ClickHouse into a CSV file.

/import-file: Imports data from a CSV file into ClickHouse.

clickhouse.js
This file handles all interactions with the ClickHouse database. It includes functions to:

Export data from ClickHouse.

Import data into ClickHouse.

fileHandler.js
This file manages reading and writing CSV files. It provides functions to:

Write data to a CSV file.

Parse a CSV file into records.

Sample CSV Format
Here is an example of how a CSV file should be formatted for importing into ClickHouse:
id,name,email
1,John Doe,john@example.com
2,Jane Smith,jane@example.com
3,Bob Stone,bob@example.com

Troubleshooting
If you encounter any issues, here are some common troubleshooting steps:

ClickHouse connection errors: Verify that the ClickHouse server is running and accessible. Double-check the configuration in your .env file.

File format errors: Ensure the CSV file is correctly formatted with proper column headers and values.

CORS issues: If the frontend can't communicate with the backend due to CORS, ensure that cors middleware is properly configured on the server.

License
This project is licensed under the MIT License - see the LICENSE file for details.
