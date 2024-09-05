import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import { login, register } from './User/user.js';
import usersRouter from './User/user.js';
import productRouter from './product/product.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js';
import reviewRouter from './Review/review.js';
import { follow, unFollow } from './Followers/followers.js';
import orderRouter from './order/order.js';
import MpesaRouter from './Mpesa/mpesa.js';
import { payment, callBackUrl } from './Mpesa/mpesa.js';
export const app = express();

const port = process.env.PORT || 4200;

//* creating default middleware for the app
app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(function (_req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//remove cors error while postong data
app.options('*', cors());
// app.use(bodyParser.urlencoded({ extended: false }));

//* routes
app.all('/', (_req, res) => {
  res.send('welcome to usella, where send hand good has value');
});

app.use('/login', login);
app.use('/register', register);
app.use('/product', productRouter);
app.use('/users', usersRouter);
app.use('/review', reviewRouter);
app.use('/follow', follow);
app.use('/unfollow', unFollow);
app.use('/order', orderRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/mpesa', MpesaRouter);
app.use('/pay/callback', callBackUrl);
app.use('/pay', payment);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//* create listen app
app.listen(port, () => {
  console.log(`Server is listening in port : ${port}`);
});
