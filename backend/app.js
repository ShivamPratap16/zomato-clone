import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
dotenv.config({ path: "./config/.env" });

// Config files
import { googleAuthConfig } from './config/google.config.js';
import routeConfig from './config/route.config.js';

// Routes
import Auth from './API/Auth/index.js';
import Restaurant from './API/Restaurant/index.js';
import Food from './API/Foods/index.js';
import Menu from './API/Menu/index.js';
import Image from './API/Images/index.js';
import Order from './API/Orders/index.js';
import Review from './API/Reviews/index.js';
import User from './API/User/index.js';
import MailService from './API/Mail/index.js';
import { otpRoutes } from './Routes/Otp.js';

const zomato = express();

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors({ origin: 'http://localhost:5173' }));

// Express Session Setup: Ensure that `express-session` is set up first
zomato.use(
  session({
    secret: "3f3d9a6b5a1b4fce905c8a3e79f21a65b1228cb02899469c4da4f23b5dc03798"
, 
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false } // Set `secure: true` if using HTTPS
  })
);

// Initialize passport after session middleware
zomato.use(passport.initialize());
zomato.use(passport.session());

// Passport configuration
googleAuthConfig(passport);
routeConfig(passport);

// Routes setup
zomato.use('/auth', Auth);
zomato.use('/restaurant', Restaurant);
zomato.use('/food', Food);
zomato.use('/menu', Menu);
zomato.use('/image', Image);
zomato.use('/order', Order);
zomato.use('/review', Review);
zomato.use('/user', User);
zomato.use('/mail', MailService);
zomato.use("/api", otpRoutes); 
zomato.use(cors());

// Parse incoming JSON requests
// zomato.use(bodyParser.json());


let userPreferences = [];

zomato.post("/api/notifications/preferences", (req, res) => {
  userPreferences = req.body.data;
  res.status(200).send({ message: "Preferences updated successfully!" });
});

zomato.get("/api/notifications/preferences", (req, res) => {
  res.status(200).send({ data: userPreferences });
});



// Root route
zomato.get('/', (req, res) => {
  res.json({ message: 'Setup successful' });
});

// Start the server
const startServer = async () => {
  await connectDB();  // Ensure DB connection is established before starting the server

  zomato.listen(4000, () => {
    console.log('Server is up and running 🚀');
  });
};

startServer();
