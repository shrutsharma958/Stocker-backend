const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema}=require("mongoose");

const UserSchema=new Schema({
    email:{
        type:String,
        required:[true, "Your email address is required"],
        unique:true,
    },
    username:{
        type:String,
        required:[true,"Your username is required"]
    },
    password:{
        type:String,
        required:[true,"Your password is required"]
    },


    holdings:[{type: mongoose.Schema.Types.ObjectId, ref:"HoldingModel"}],
    
    orders:[{type: mongoose.Schema.Types.ObjectId, ref:"OrderModel"}],
    
    positions:[{type: mongoose.Schema.Types.ObjectId, ref:"PositionModel"}],

});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports={UserSchema};

