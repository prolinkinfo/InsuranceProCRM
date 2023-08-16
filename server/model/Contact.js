import mongoose from "mongoose";

const Contact = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
    phoneNumber: { type: String },
    emailAddress: { type: String },
    address: { type: String },
    alternatePhoneNumber: { type: String },
    additionalEmailAddress: { type: String },
    instagramProfile: { type: String },
    twitterProfile: { type: String },
    preferredContactMethod: { type: String },
    referralSource: { type: String },
    referralContactName: { type: String },
    relationshipToReferrer: { type: String },
    preferencesForMarketingCommunications: { type: String },
    preferredLanguage: { type: String },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});


export default mongoose.model('Contact', Contact);
