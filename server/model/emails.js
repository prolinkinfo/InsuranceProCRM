import mongoose from "mongoose"

const Email = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    html: { type: String },
    lead_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Lead"
    },
    contact_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Contact"
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }

})

export default mongoose.model('Email', Email)