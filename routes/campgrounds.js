const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isloggedIn, validateCampground, isAuthor } = require('../middleware')
const multer = require('multer')
// storage
const { storage } = require('../cloudinary/cloudinary');
const upload = multer({ storage });
// controller routes
const campgrounds = require('../controllers/campgrounds')

// *****************************************************************



// router.get('/', catchAsync(campgrounds.index));
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isloggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    

// this is to create new campground. order matters
// it was down after the get with the id route
router.get('/new', isloggedIn, campgrounds.renderNewForm) 

// get form data throu post request and write on campgrounds page
// router.post('/', isloggedIn, validateCampground, catchAsync(campgrounds.createCampground));


// start get route by id to get corresponding campgrounds
// this below funciton also populates reviews
// router.get('/:id', catchAsync(campgrounds.showCampground));

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isloggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isloggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


// Edit the campgrounds
router.get('/:id/edit', isloggedIn, isAuthor, catchAsync(campgrounds.renderEditForm)); // this will take value of campground and put in the value fields

// When the above get submited the put below will take that value
// and save it to db. This happened through method-override
// router.put('/:id', isloggedIn,isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

// Delete campground
// router.delete('/:id', isloggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


module.exports = router;