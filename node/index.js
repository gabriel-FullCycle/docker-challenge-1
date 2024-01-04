const express = require('express')
const app = express()
const port = 3000

const dbConfig = {
    host: 'db', //Container running db
    user: 'root',
    password: 'root',
    database: 'nodedb',
    port: 3306
}


const mysql = require('mysql')
const conn = mysql.createConnection(dbConfig)

conn.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });

const insertSQL = `INSERT INTO people(name) values('Gabriel')`
conn.query(insertSQL)
conn.end()

app.get('/', (req, res) => {
    const selectSQL = `SELECT * from PEOPLE`
    const result = conn.query(selectSQL)
    conn.end()
    res.send(`<h1>Full Cycle!<h1/><br/><p>${result}<p/>`)
})

app.listen(port, () => {
    console.log('Running at 3000')
})