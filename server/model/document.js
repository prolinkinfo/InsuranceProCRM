import mongoose from "mongoose";

const Document = new mongoose.Schema({
    path: { type: String },
    file: { type: String },
    fileName: { type: String },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    },
    downloadLink: { type: String },
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

});


export default mongoose.model('Document', Document);
