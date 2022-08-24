import mongoose from 'mongoose';
import timestamps from "mongoose-timestamp";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({

    title       : {type : String, required : true},
    slug        : {type : String, slug: "title"},
    tagline     : {type : String, required : true},
    desc        : {type : String},
    category_id : {type : mongoose.Schema.Types.ObjectId, ref:'Category'},
    images      : [],
    price       : {type : Number},
    discount    : {type : Number},
})

productSchema.plugin(timestamps,{
   'createdAt' : 'created_at',  
   'updatedAt' : 'updated_at'
})

const Product = mongoose.model('Product', productSchema);

export default Product;

