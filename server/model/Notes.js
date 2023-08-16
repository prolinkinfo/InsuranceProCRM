import mongoose from "mongoose"

const Notes = new mongoose.Schema({
    subject: { type: String, required: true },
    note: { type: String, required: true },
    lead_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Leads",
    },
    contact_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Contacts",
    },
    policy_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Policies",
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

export default mongoose.model('Notes', Notes)