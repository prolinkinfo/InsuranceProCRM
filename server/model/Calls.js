import mongoose from "mongoose"

const Calls = new mongoose.Schema({
    callType: { type: String, required: true },
    callDuration: { type: String, required: true },
    callOutcome: { type: String, required: true },
    callDateTime: { type: String, required: true },
    callNotes: { type: String, required: true },
    callerName: { type: String, required: true },
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