import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserModel } from './models/UserModel.js';
import { HoldingsModel } from './models/HoldingsModel.js';
import { OrderModel } from './models/OrderModel.js';
import { WatchListModel } from './models/WatchListModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';





const app = express();
const PORT = 8080;
const url = 'mongodb://localhost:27017/Finstox';
const JWT_SECRET ='hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe'

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async(req,res)=>{
  console.log(req.body);  
    const {name, email, password} = req.body;
    const existingUser = await UserModel.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({message: "User registered successfully",status: "ok"});
});

app.post('/login', async(req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    const user= await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        if(res.status(201)){
          // console.log('User logged in successfully');
          return res.send({
            status: 'ok',
            data: token,
          });
        }else{
          return res.send({status: 'error', error: 'Invalid credentials'});
        }
    }
});

app.post('/updateuser', async (req, res) => {
  const { name, email } = req.body;
  try {
    await UserModel.updateOne(
      { email: email },
      { $set: { name: name } }
    );
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// app.get('/addholdings', async (req, res) => {
//     let tempHoldings = [
//         {
//             name: "BHARTIARTL",
//             qty: 2,
//             avg: 538.05,
//             price: 541.15,
//             net: "+0.58%",
//             day: "+2.99%",
//         },
//         {
//             name: "HDFCBANK",
//             qty: 2,
//             avg: 1383.4,
//             price: 1522.35,
//             net: "+10.04%",
//             day: "+0.11%",
//         },
//         {
//             name: "HINDUNILVR",
//             qty: 1,
//             avg: 2335.85,
//             price: 2417.4,
//             net: "+3.49%",
//             day: "+0.21%",
//         },
//         {
//             name: "INFY",
//             qty: 1,
//             avg: 1350.5,
//             price: 1555.45,
//             net: "+15.18%",
//             day: "-1.60%",
//             isLoss: true,
//         },
//         {
//             name: "ITC",
//             qty: 5,
//             avg: 202.0,
//             price: 207.9,
//             net: "+2.92%",
//             day: "+0.80%",
//         },
//         {
//             name: "KPITTECH",
//             qty: 5,
//             avg: 250.3,
//             price: 266.45,
//             net: "+6.45%",
//             day: "+3.54%",
//         },
//         {
//             name: "M&M",
//             qty: 2,
//             avg: 809.9,
//             price: 779.8,
//             net: "-3.72%",
//             day: "-0.01%",
//             isLoss: true,
//         },
//         {
//             name: "RELIANCE",
//             qty: 1,
//             avg: 2193.7,
//             price: 2112.4,
//             net: "-3.71%",
//             day: "+1.44%",
//         },
//         {
//             name: "SBIN",
//             qty: 4,
//             avg: 324.35,
//             price: 430.2,
//             net: "+32.63%",
//             day: "-0.34%",
//             isLoss: true,
//         },
//         {
//             name: "SGBMAY29",
//             qty: 2,
//             avg: 4727.0,
//             price: 4719.0,
//             net: "-0.17%",
//             day: "+0.15%",
//         },
//         {
//             name: "TATAPOWER",
//             qty: 5,
//             avg: 104.2,
//             price: 124.15,
//             net: "+19.15%",
//             day: "-0.24%",
//             isLoss: true,
//         },
//         {
//             name: "TCS",
//             qty: 1,
//             avg: 3041.7,
//             price: 3194.8,
//             net: "+5.03%",
//             day: "-0.25%",
//             isLoss: true,
//         },
//         {
//             name: "WIPRO",
//             qty: 4,
//             avg: 489.3,
//             price: 577.75,
//             net: "+18.08%",
//             day: "+0.32%",
//         },
//     ]

//     tempHoldings.forEach((item) => {
//         let newHolding = new HoldingsModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         });
//         newHolding.save();
//         // console.log('Database Saved');
//     })
//         res.send('Database Saved');
// });

app.get('/allholdings', async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get('/allOrders', async(req, res) => {
  const {name, owner} = req.body;
  let allOrders = await OrderModel.findOne({owner});
  res.json(allOrders);
});

app.post('/newOrder', async (req, res) => {
    let newOrder = new OrderModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        avg: req.body.avg,
        owner: req.body.owner,
    });
    newOrder.save();
});

app.listen(PORT, () => {
  console.log(`App is listening at PORT:${PORT}`);
  mongoose.connect(url);
  console.log('Connected to MongoDB');
});