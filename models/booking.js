const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique:true
  },
  contact: {
    type: String,  // Changed from Number to String
    required: true,
    match: [/^\d{10}$/, 'Invalid contact number'],
    unique:true
  },
  NOP: { // Number of Persons
    type: Number,
    min: 1,
    max: 4,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.checkIn < value;
      },
      message: "Check-out must be after check-in"
    }
  },
  roomType: {
    type: String,
    enum: ["Single", "Double", "Deluxe"],
    required: true
  },
  listingId: {
    type: Schema.Types.ObjectId,
    ref: "Listing"
    
  }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
