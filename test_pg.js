const { Client } = require('pg');
const client = new Client({ host: '127.0.0.1', port: 5433, user: 'postgres', password: '1234', database: 'web2_db' });
client.connect(err => { if (err) { console.error('FALHOU:', err); } else { console.log('SUCESSO: Conectou no PostgreSQL!'); client.end(); } });
