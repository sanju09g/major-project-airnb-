const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
// const upload = multer({dest: "uploads/"}); to store files in uploads folder
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});// multer now store files in cloudinary's storage

router
    .route("/")
    .get(isLoggedIn, wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing)
    );


  //New Route
  router.get("/new",isLoggedIn,listingController.renderNewForm);

  //Category
  router.get("/category/:categoryName", wrapAsync(listingController.switchCategory));

  router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner, upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

  

  

  
  //Edit Route
  
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
  
  


  module.exports = router;