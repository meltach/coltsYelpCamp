const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    autoIndex: false,
  })
  .catch((err) => {
    console.log("There is an error");
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

// make random number and pass it to a fucntion to peak places in the seedHelper array

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your user id
      author: "600644fa0016f601c4a60b99",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deleniti quos magni suscipit hic autem? sit amet consectetur adipisicing",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/dsz9wkhc6/image/upload/v1613446041/YelpCamp/f1q4szh2pila7ctfxq3d.jpg",
          filename: "YelpCamp/f1q4szh2pila7ctfxq3d",
        },
      ],
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
