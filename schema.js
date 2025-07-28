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

module.exports.bookingSchema = Joi.object({
    booking: Joi.object({
      fullName: Joi.string().trim().min(1).required(),
      email: Joi.string().email().required(),
      contact: Joi.string().pattern(/^\d{10}$/).required(),
      NOP: Joi.number().integer().min(1).max(4).required(),
      checkIn: Joi.date().required(),
      checkOut: Joi.date().greater(Joi.ref("checkIn")).required(),
      roomType: Joi.string().valid("Single", "Double", "Deluxe").required(),
      collectionId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
    }).required()
  });