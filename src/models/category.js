import mongoose from 'mongoose';
import timestamps from "mongoose-timestamp";

const categorySchema = new mongoose.Schema({

    title :{type:String, required:true},
    desc  :{type:String},
    image :{type:String},
    // user_id:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

})

categorySchema.plugin(timestamps,{
  'createdAt' : 'created_at',  
  'updatedAt' : 'updated_at'
})

const Category = mongoose.model('Category', categorySchema);

export default Category;

