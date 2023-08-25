import mongoose from "mongoose"

const EmailTemplate = new mongoose.Schema({
    name: { type: String },
    design: { type: Object },
    html: { type: String },
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

export default mongoose.model('EmailTemplate', EmailTemplate)