import mongoose from "mongoose"

const Meetings = new mongoose.Schema({
    meetingAgenda: { type: String, required: true },
    meetingAttendes: { type: String, required: true },
    meetingLocation: { type: String, required: true },
    meetingDateTime: { type: String, required: true },
    meetingNotes: { type: String, required: true },
    // meetingReminders: { type: String, required: true },
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
        ref: "User"
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date,default: Date.now }
})

export default mongoose.model('Meetings', Meetings)