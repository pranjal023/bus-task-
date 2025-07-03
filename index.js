// index.js
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());


(async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        age INT
      );
    `;
    await pool.query(createTableQuery);
    console.log('✅ Students table ensured.');
  } catch (err) {
    console.error('❌ Error creating table:', err);
  }
})();


app.post('/students', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO students (name, email, age) VALUES (?, ?, ?)`,
      [name, email, age]
    );
    console.log('📥 INSERT:', result.insertId, name);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('❌ INSERT ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.get('/students', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM students`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/students/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM students WHERE id = ?`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Student not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/students/:id', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?`,
      [name, email, age, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
    console.log('✏️ UPDATE:', req.params.id);
    res.json({ message: 'Student updated' });
  } catch (err) {
    console.error('❌ UPDATE ERROR:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.delete('/students/:id', async (req, res) => {
  try {
    const [result] = await pool.query(`DELETE FROM students WHERE id = ?`, [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
    console.log('🗑️ DELETE:', req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

