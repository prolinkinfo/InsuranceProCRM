import mongoose from "mongoose";

const User = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, require: true },
    password: { type: String, require: true },
    role: {
        type: String, enum: ['user', 'admin'], default: 'user'
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date ,default: Date.now}
})

export default mongoose.model('User', User);
