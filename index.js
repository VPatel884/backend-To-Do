const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require("./db/db.connect");
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors());

initializeDatabase();

app.use(express.json());
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
