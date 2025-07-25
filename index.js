require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const app=express();
const {HoldingModel}=require("./models/HoldingModel");
const {PositionModel}=require("./models/PositionModel");
const {OrderModel}=require("./models/OrderModels");
const bodyParser = require("body-parser");
const cors=require("cors")





const PORT=process.env.PORT || 3002;
const url=process.env.MONGO_URL;

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173",                        // for local dev
    "https://stocker-dashboard.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
app.use(cookieParser());

app.use("/", authRoute);

mongoose.set('strictQuery', false);

app.get("/allHoldings",async(req,res)=>{

   let allHoldings=await HoldingModel.find({});
   res.json(allHoldings);
});




app.get("/allPositions",async(req,res)=>{
    let allPositions= await PositionModel.find({});
    res.json(allPositions)
})



app.get("/allOrders",async(req,res)=>{
    let allOrders= await OrderModel.find({});
    res.json(allOrders)
})

app.post("/newOrder",async (req,res)=>{
  const order= new OrderModel({
     name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode:  req.body.mode,
    time:  req.body.time,
  })
  order.save();
})



app.get("/addData",async(req,res)=>{

    const{HoldingModel}=require("./models/HoldingModel");

  let tempHolding= [
  {
    name: "BHARTIARTL",
    qty: 2,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%",
  },
   {
    name: "SHRUTPVT",
    qty: 100,
    avg: 538.05,
    price: 541.15,
    net: "+0.58%",
    day: "+2.99%",
  },
  {
    name: "HDFCBANK",
    qty: 2,
    avg: 1383.4,
    price: 1522.35,
    net: "+10.04%",
    day: "+0.11%",
  },
  {
    name: "HINDUNILVR",
    qty: 1,
    avg: 2335.85,
    price: 2417.4,
    net: "+3.49%",
    day: "+0.21%",
  },
  {
    name: "INFY",
    qty: 1,
    avg: 1350.5,
    price: 1555.45,
    net: "+15.18%",
    day: "-1.60%",
    isLoss: true,
  },
  {
    name: "ITC",
    qty: 5,
    avg: 202.0,
    price: 207.9,
    net: "+2.92%",
    day: "+0.80%",
  },
  {
    name: "KPITTECH",
    qty: 5,
    avg: 250.3,
    price: 266.45,
    net: "+6.45%",
    day: "+3.54%",
  },
  {
    name: "M&M",
    qty: 2,
    avg: 809.9,
    price: 779.8,
    net: "-3.72%",
    day: "-0.01%",
    isLoss: true,
  },
  {
    name: "RELIANCE",
    qty: 1,
    avg: 2193.7,
    price: 2112.4,
    net: "-3.71%",
    day: "+1.44%",
  },
  {
    name: "SBIN",
    qty: 4,
    avg: 324.35,
    price: 430.2,
    net: "+32.63%",
    day: "-0.34%",
    isLoss: true,
  },
  {
    name: "SGBMAY29",
    qty: 2,
    avg: 4727.0,
    price: 4719.0,
    net: "-0.17%",
    day: "+0.15%",
  },
  {
    name: "TATAPOWER",
    qty: 5,
    avg: 104.2,
    price: 124.15,
    net: "+19.15%",
    day: "-0.24%",
    isLoss: true,
  },
  {
    name: "TCS",
    qty: 1,
    avg: 3041.7,
    price: 3194.8,
    net: "+5.03%",
    day: "-0.25%",
    isLoss: true,
  },
  {
    name: "WIPRO",
    qty: 4,
    avg: 489.3,
    price: 577.75,
    net: "+18.08%",
    day: "+0.32%",
  },
];

tempHolding.map((item)=>{
    let newHolding=new HoldingModel({
        name: item.name,
    qty:  item.qty,
    avg:  item.avg,
    price: item.price,
    net: item.net,
    day: item.day,
    });
     newHolding.save().then((res)=>{
       console.log(res)
    })
     
  
});

  res.send("Done");
});
//adding dummy data using get request 


mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");

    // now start the server only when DB is ready
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });


