const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
    
        title: Joi.string()
	        .required(),

        location: Joi.string()
	        .required(),
        
        price: Joi.number()
	        .min(0)
		    .required(),
        
        memberPrice: Joi.optional(),
    
        image: Joi.string()
	        .required(),
        
        description: Joi.string()
	        .min(25)
		    .max(500)
    		.required(),

	}).required() 
});