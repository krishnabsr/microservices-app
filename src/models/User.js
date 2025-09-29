var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var userSchema = new Schema({
    fullName : {
        type: String,
        required: [true, "Full name is required"]
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: [true, "Email already exists"],
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Not a valid email"
        }
    },
    role : {
        type: String,
        required: [true, "Role is required"],
        enum : ["normal", "admin"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    created: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("User", userSchema);