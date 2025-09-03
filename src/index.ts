import express from 'express';
import userRoutes from './routes/userRoutes';
import { PORT } from './config/env';

const app = express();
app.use(express.json());

app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});