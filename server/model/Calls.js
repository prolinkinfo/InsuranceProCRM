import mongoose from "mongoose"

const Calls = new mongoose.Schema({
    subject: { type: String, required: true },
    status: { type: String, required: true },
    startDateTime: { type: String, required: true },
    duration: { type: String, required: true },
    relatedTo: { type: String, required: true },
    note: { type: String, required: true },
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

export default mongoose.model('Calls', Calls)