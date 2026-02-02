const mongoose = require("mongoose");
const fs = require("fs");

mongoose.connect("mongodb://localhost/doramaflix", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Item = mongoose.model("Item", new mongoose.Schema({
  title: String,
  description: String,
  cover: String,
  price: Number,
  category: String,
  driveEmbed: String,
  vip: Boolean
}));

const data = JSON.parse(fs.readFileSync("./doramas.json", "utf-8"));

Item.insertMany(data)
  .then(() => {
    console.log("Banco inicial populado com sucesso!");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));