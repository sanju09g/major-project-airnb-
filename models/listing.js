const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

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
   }
});

listingSchema.post("findOneAndDelete",async(listing)=>{//un array ko delete karna hai jo listing.reviews wale array me aa rhi h

    if(listing){
 await Review.deleteMany({_id: {$in: listing.reviews}});//listing.ewviews me jitni bhi id h unkilist bana  lenge
    }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;