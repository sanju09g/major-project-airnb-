const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const User = require('./booking.js');
const Booking = require("./booking.js");

const listingSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: {
        type:String,
    },
    image: {
    
        // type: String,
        // default: 
        //   "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v)=> v===""?"https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
        url:String,
        filename:String,
    },
    
    price: {
        type: Number,
    },
    location: {
      type: String,
    },

    country: {
        type:String,
    },
    reviews: [{
        type:Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User" ,
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true,
          },
          coordinates: {
            type: [Number],
            required: true,
          },
    },
    
   category:{
    type:String,
    enum:['Rooms','Iconic cities', 'Mountains','Pools', 'Camping','Farms','Arctic','Domes','House boats']
   },
   isBooked: {
    type: Boolean,
    default: false
  }
});

listingSchema.post("findOneAndDelete", async function (listing) {
    if (!listing) return;

    // 1. Delete related reviews
    if (listing.reviews && listing.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }

    // 2. Find related bookings (if listings have bookings)
    const bookings = await Booking.find({ listingId: listing._id });

    if (bookings.length > 0) {
        // 3. Remove booking IDs from users
        for (const booking of bookings) {
            await User.updateMany(
                { bookings: booking._id },
                { $pull: { bookings: booking._id } }
            );
        }

        // 4. Delete the bookings themselves
        await Booking.deleteMany({ listingId: listing._id });
    }
});


const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;