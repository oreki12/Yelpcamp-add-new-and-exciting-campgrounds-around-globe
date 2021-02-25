const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*1999)+100
        const camp = new Campground({
            author: '602e8468a0bba6210c9696f0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto error dolor alias quae tenetur deserunt explicabo laborum culpa, laudantium ea?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dllmfo3uc/image/upload/v1613994572/YelpCamp/ggqmdhm0w7szraa9s1na.jpg',
                  filename: 'YelpCamp/ggqmdhm0w7szraa9s1na'
                },
                {
                  url: 'https://res.cloudinary.com/dllmfo3uc/image/upload/v1613994574/YelpCamp/n3ougmfwjinbhn6zeibp.jpg',
                  filename: 'YelpCamp/n3ougmfwjinbhn6zeibp'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})