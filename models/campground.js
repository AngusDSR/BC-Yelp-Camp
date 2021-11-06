const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
	title: String,
	image: String,
	price: Number,
	memberPrice: Number,
	description: String,
	location: String,
	facilities: Array,
	memberFacilities: Array
});

module.exports = mongoose.model('Campground', CampgroundSchema);