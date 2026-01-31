require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
console.log("MONGO_URI: ", process.env.MONGO_URI);
const {MercadoPagoConfig, preference, Preference } = require("mercadopago");
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_TOKEN
});

mongoose.connect(process.env.MONGO_URI)
  .then( () => console.log("Mongodb conected"))
  .catch(err => console.log("erro Mongodb : ", err));

const Item = mongoose.model("Item", new mongoose.Schema({
 title:String,
 description:String,
 cover:String,
 price:Number,
 category:String,
 driveEmbed:String
}));

const app = express();
app.use(express.json());

app.get("/api/catalog", async (req,res)=>{
 res.json(await Item.find());
});

app.get("/api/item/:id", async (req,res)=>{
 res.json(await Item.findById(req.params.id));
});

app.get("/api/stream/:id", async (req,res)=>{
 const item = await Item.findById(req.params.id);
 res.json({ driveEmbed: item.driveEmbed });
});

app.post("/api/create_payment", async (req,res)=>{
 const item = await Item.findById(req.body.item_id);

 const pref = {
   items:[{
     title:item.title,
     quantity:1,
     currency_id:"BRL",
     unit_price:item.price
   }],
   back_urls:{ success:"https://SEU_SITE/success" },
   auto_return:"approved"
 };
 const preference = new Preference(client);
 const result = await preference.create({body: pref});
});
app.use(express.static("miniapp"));
app.use("/assets", express.static("assets"));
app.use("/admin", express.static("admin"));
app.listen(3000);