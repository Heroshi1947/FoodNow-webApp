const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/FoodNow";

const connectionToDB = async () => {
  try {
    const conn = await mongoose.connect(URI, { useNewUrlParser: true });
    console.log(`Connected to DB: ${conn.connection.host}`);

    const fetchedData = mongoose.connection.db.collection("FoodData");
    const foodCategory = mongoose.connection.db.collection("food_category");

    const [data, catData] = await Promise.all([
      fetchedData.find({}).toArray(),
      foodCategory.find({}).toArray(),
    ]);

    global.food_items = data;
    global.food_category = catData;

    console.log("Data fetched successfully.");
  } catch (err) {
    console.error("Error connecting to DB:", err.message);
  }
};

module.exports = connectionToDB;
