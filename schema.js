const Joi = require("joi");

//Validation of server side
module.exports.listingSchema = Joi.object({
    listing: Joi.object({//listing nam ki object honi hi chahiye with below fields
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
       image: Joi.string().allow("",null),
       category: Joi.string().valid('Rooms','Iconic cities', 'Mountains','Pools', 'Camping','Farms','Arctic','Domes','House boats').required()
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});