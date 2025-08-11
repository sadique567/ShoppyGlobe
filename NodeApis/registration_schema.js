import mongoose from "mongoose";

const registrationSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
userEmail : {
    type : String,
    required : true
}
,
userPassword : {
    type : String,
    required : true
}
} 
,{ timestamps: true }

);
const RegistrationModel = mongoose.model("registrationSchema" , registrationSchema , "login_user");
export default RegistrationModel;