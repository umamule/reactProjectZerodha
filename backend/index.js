require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require('body-parser');
const cors=require('cors');

const {HoldingsModel} =require('./model/HoldingsModel.js'); 
const {PositionsModel} = require('./model/PositionsModel.js');
const {OrdersModel} = require('./model/OrdersModel.js');


const PORT=process.env.PORT || 3002;
const MONGODB_URI = process.env.MANGO_URL;


const app=express();
app.use(cors());
app.use(bodyParser.json());

app.get("/allHoldings",async(req,res)=>{
  let allHoldings=await HoldingsModel.find({});
  res.json(allHoldings);
});
app.get("/allPositions",async(req,res)=>{
  let allPositions=await PositionsModel.find({});
  res.json(allPositions);
});
app.post("/newOrder",async(req,res)=>{
  let newOrder= new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
     price: req.body.price,
      mode: req.body.mode,
  });
  newOrder.save();
  res.send("order send!");
});

app.listen(3002,()=>{
    console.log("app");
    mongoose.connect(MONGODB_URI);
    console.log("db");
        
});