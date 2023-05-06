const mongoose = require("mongoose");
const descriptors = require("./fortDescriptors");
const forts = require("./forts");
const fortImages = require("./fortImages");
const Campground = require("../models/campground");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken =
  "pk.eyJ1IjoiYXVtOTkiLCJhIjoiY2xlZmtrdzYyMDh5YzNya3N2NWo5NjhmcSJ9.ftyBeM9UH7AXSx8vHze6bg";
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const dbUrl = process.env;

console.log(dbUrl.DB_URL);
mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb://tcoer:aum1234aum@ac-n6ajhsp-shard-00-00.nij5pig.mongodb.net:27017,ac-n6ajhsp-shard-00-01.nij5pig.mongodb.net:27017,ac-n6ajhsp-shard-00-02.nij5pig.mongodb.net:27017/?ssl=true&replicaSet=atlas-heizd1-shard-0&authSource=admin&retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  // await Campground.deleteMany({});
  for (let i = 0; i < 78; i++) {
    const random10 = Math.floor(Math.random() * 10);
    const randomImage1 = Math.floor(Math.random() * 11);
    const randomImage2 = Math.floor(Math.random() * 11);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "64560d9ee374a6e56f9fd025",
      location: `${forts[i].fort}, Maharashtra`,
      title: `${forts[i].fort}`,
      description: descriptors[random10].info,
      price,
      geometry: {
        type: "Point",
        coordinates: [forts[i].Longitude, forts[i].Latitude],
      },
      images: [
        {
          url: fortImages[randomImage1].image.url,
          filename: fortImages[randomImage1].image.filename,
        },
        {
          url: fortImages[randomImage2].image.url,
          filename: fortImages[randomImage2].image.filename,
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
