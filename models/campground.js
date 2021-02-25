const mongoose = require('mongoose');
const Review = require('./review');

// lesson 405
const Schema = mongoose.Schema;
// Schema = mongoose.schema , so i donn't have to add mongoose bellow.

// https://res.cloudinary.com/dllmfo3uc/image/upload/w_150/v1614008320/YelpCamp/e83m28d5sojwyc8rwpkn.jpg

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('upload', 'upload/w_150');
})

const opst = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title:{
        type: String
    },
    images: [ImageSchema],
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    price:{
        type: Number
    },
    description:{
        type: String
    },
    location:{
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opst);

CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<a href="/campgrounds/${this._id}">${this.title}</a>
    <p>${this.description.substring(0, 20)}...</P>`
})

CampgroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground