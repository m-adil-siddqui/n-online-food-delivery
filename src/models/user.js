import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    social_id           : {type:String},
    full_name           : {type:String},
    phone_number        : {type:String},
    address             : {type:String},
    email               : {type:String, required:true},
    password            : {type:String},
    thumbnail           : {type:String},
    is_profile_complete : {type:Boolean, default:false}
})

userSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}


userSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

userSchema.plugin(timestamps,{
    'createdAt' : 'created_at',  
    'updatedAt' : 'updated_at'
})
const User = mongoose.model('User', userSchema);

export default User;

