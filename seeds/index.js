const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const {facilities, memberFacilities} = require('./facilities');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const rand1000 = Math.floor(Math.random() * 1000);
		const priceCents = [0, .01, .02, 5];
		const discounts = [0.8, 0.75, 0.7, 0.65, 0.6];
		const price = ((Math.floor(Math.random() * 16 + 1)) * 10) - sample(priceCents);
		const camp = new Campground({
			title: `${sample(descriptors)} ${sample(places)}`,
			location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
			image: 'https://source.unsplash.com/collection/483251',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur faucibus ante, id commodo enim sollicitudin non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec quis elit euismod, gravida nisl placerat, malesuada tortor. Cras quis mauris vel nibh consectetur tristique. Duis ullamcorper odio leo, in semper lacus pulvinar hendrerit. Maecenas sit amet ligula leo. Vivamus auctor purus quis justo placerat, sed maximus lorem finibus.',
			price,
			memberPrice: (price * sample(discounts)).toFixed(2), 
			facilities: [sample(facilities), sample(facilities), sample(facilities)],
			memberFacilities: [sample(memberFacilities), sample(memberFacilities), sample(memberFacilities)]
		});
	await camp.save();
	}
};

seedDb().then(() => {
	mongoose.connection.close()
});