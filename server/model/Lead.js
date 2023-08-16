import mongoose from "mongoose"

const Lead = new mongoose.Schema({
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    address: { type: String, required: true },
    leadSource: { type: String },
    leadStatus: { type: String, default: 'New' },
    leadScore: { type: Number, default: 2 },
    alternatePhoneNumber: { type: String },
    additionalEmailAddress: { type: String },
    instagramProfile: { type: String },
    twitterProfile: { type: String },
    assigned_agent: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    typeOfInsurance: { type: String },
    desiredCoverageAmount: { type: Number },
    specificPolicyFeatures: { type: String },
    QualificationStatus: { type: String },
    policyType: { type: String },
    policyNumber: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    coverageAmount: { type: Number },
    termLength: { type: String },
    conversionReason: { type: String },
    conversionDateTime: { type: String },
    leadCategory: { type: String },
    leadPriority: { type: String },
    contact_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Contacts",
        require: true
    },
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

})
 
export default mongoose.model('Lead', Lead)