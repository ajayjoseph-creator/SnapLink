import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: ["https://snap-link-sandy.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use('/api', urlRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
