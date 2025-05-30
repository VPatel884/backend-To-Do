const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require("./db/db.connect");
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

initializeDatabase();

app.use(express.json());
app.use('/todos', todoRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
