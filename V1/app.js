// import express
import express from "express";
// import bodyParser
import bodyParser from "body-parser";
// cors help with making fetch request
import cors from "cors";
// Import dotenv
import dotenv from 'dotenv';

// import appRouter from './src/dataStructure/routes/request';
// import authRouter from './src/dataStructure/routes/authRoutes';
import authRoutes from './src/DB/routes/authRoutes';
import userRoutes from './src/DB/routes/userRoutes';
import adminRoutes from './src/DB/routes/adminRoutes';


// configure dotenv
dotenv.config();

// initialize express
const app = express();

// middlewares
// app.use(express.json());

// configure body-parser for express
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// configure cors
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).send(
    'home page reached'
  )
})
// for datastructure

// app.use('/api/v1/', appRouter);
// app.use('/api/v1/', authRouter);

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', adminRoutes);

app.all('*', (req, res) => res.status(404).json({
  status: 'error',
  code: 404,
  message: 'Route unavailable on server.',
}));

// PORT
const PORT =process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT} http://localhost:${PORT}`);
})

export default app;