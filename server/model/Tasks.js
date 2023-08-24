import mongoose from "mongoose"

const Tasks = new mongoose.Schema({
    subject: { type: String, required: true },
    relatedTo: { type: String },
    status: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    assignTo: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    backgroundColor: { type: String },
    textColor: { type: String },
    priority: { type: String },
    note: { type: String },

    // TaskAssignee: { type: String required: true },
    // TaskReminders: { type: String, required: true },
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
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('Tasks', Tasks)


