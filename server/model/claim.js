import mongoose from "mongoose";

const Claims = new mongoose.Schema({
    policyNumber: { type: String, required: true },
    claimType: { type: String, required: true },
    claimAmount: { type: Number, required: true },
    claimDate: { type: String, required: true },
    claimStatus: { type: String, required: true },
    claimNotes: { type: String, required: true },
    contact_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Contacts",
        required: true
    },
    policy_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Policies",
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
})

export default mongoose.model('Claims', Claims)