import mongoose from "mongoose"

const Tasks = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    start: { type: String },
    end: { type: String },
    assignTo: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    backgroundColor: { type: String },
    textColor: { type: String },
    display: { type: String },
    url: { type: String },
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


