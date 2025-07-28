const Listing = require("../models/listing");
const Booking = require("../models/booking");
const User = require("../models/user");
const Review = require("../models/review");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req,res)=>{ 
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
  };

  module.exports.renderNewForm = (req,res)=>{
    // console.log(req.user);

      res.render("listings/new.ejs");
  };

  module.exports.switchCategory = async(req,res)=>{
    let{categoryName} = req.params;
    let allListings = await Listing.find({category:categoryName});
    if(!(allListings && allListings.length))
    {
      req.flash("error","No match found!");
      return res.redirect("/listings");
    }
    res.render("listings/index.ejs",{allListings});
  }


  module.exports.showListing = async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",
     populate: {
      path:"author",
     },
    }).populate("owner");
   
    if(!listing){
      req.flash("error","Listing doesn't exist!");
      res.redirect("/listings");
    }
    else{
      res.render("listings/show.ejs",{listing});
    }
   
};
 module.exports.createListing = async (req,res,next)=>{

  let response = await geocodingClient.forwardGeocode({ //returns coordinate
    query: req.body.listing.location,
    limit: 1
  })
    .send();
    
  // console.log(req.body.features[0 ].geometry);//returns an object consists a geometry key where you find coordinates array
    let url = req.file.path;
    let filename = req.file.filename;
    
     const newListing = new Listing(req.body.listing);
     newListing.owner = req.user._id;
     newListing.image = {url,filename};
     newListing.geometry = response.body.features[0].geometry;//coordinates 
     await newListing.save();
     
     req.flash("success","New Listing Created!");
     res.redirect("/listings");
  };

  module.exports.renderEditForm = async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing doesn't exist!");
      res.redirect("/listings");
    }
      let originalImageUrl = listing.image.url;
      originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
      // /e_blur:300
      res.render("listings/edit.ejs",{listing, originalImageUrl});
    
  
};

 module.exports.updateListing = async (req,res)=>{

    let {id}= req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file!== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
   }
     
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;

  // 1. Find all bookings related to this listing
  const bookings = await Booking.find({ listingId: id });
  console.log(bookings);

  // 2. Remove booking IDs from all users
  for (const booking of bookings) {
      await User.updateMany(
          { bookings: booking._id },
          { $pull: { bookings: booking._id } }
      );
  }

  // 3. Delete all related bookings
  await Booking.deleteMany({ listingId: id });

  // 4. Delete all related reviews
  const listing = await Listing.findById(id);
  if (listing && listing.reviews && listing.reviews.length > 0) {
      await Review.deleteMany({ _id: { $in: listing.reviews } });
  }

  // 5. Finally, delete the listing itself
  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing, its bookings, and reviews deleted!");
  res.redirect("/listings");
};

module.exports.renderBookingForm = async (req, res) => {
  let { id } = req.params;
  const bookingListing = await Listing.findById(id);

  res.render("listings/booking.ejs", { bookingListing });
};

// 4. Book Listing
module.exports.bookListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const user = await User.findById(res.locals.currUser);
  const booking = new Booking(req.body.booking);

  booking.listingId = listing._id;
  user.bookings.push(booking._id);
  listing.isBooked = true;

  await booking.save();
  await user.save();
  await listing.save();

  req.flash("success", "Listing booked!");
  res.redirect(`/listings/${id}`);
};

// 5. Cleanup Expired Bookings
const cleanupExpiredBookings = async () => {
  const expiredBookings = await Booking.find({
      checkOut: { $lt: new Date() }
  });

  console.log("Expired Bookings:", expiredBookings);

  for (const booking of expiredBookings) {
      const users = await User.find({ bookings: booking.listingId });

      for (const user of users) {
          user.bookings.pull(booking.listingId);
          await user.save();
      }

      // Optional: mark listing as available again
      const listing = await Listing.findById(booking.listingId);
      if (listing) {
          listing.isBooked = false;
          await listing.save();
      }

      // Optional: delete the booking itself
      // await Booking.findByIdAndDelete(booking._id);
  }
};

// 6. Show Bookings
module.exports.showBookings = async (req, res) => {
  let user = await User.findById(res.locals.currUser).populate({
      path: "bookings",
      populate: { path: "listingId" }
  });

  res.render("listings/mybookings.ejs", { user });
};

module.exports.cleanupExpiredBookings = cleanupExpiredBookings;