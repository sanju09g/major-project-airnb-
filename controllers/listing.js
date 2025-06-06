const Listing = require("../models/listing");
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
 module.exports.destroyListing =  async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
 };