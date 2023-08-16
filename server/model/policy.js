import mongoose from "mongoose"

const Policy = new mongoose.Schema({
    policyNumber: { type: Number, required: true, unique: true },
    policyType: { type: String, required: true },
    policyStartDate: { type: String, required: true },
    policyEndDate: { type: String, required: true },
    policyStatus: { type: String },
    coverageAmounts: { type: String },
    deductibles: { type: String },
    limits: { type: String },
    insuredPersonName: { type: String },
    insuredPersonDateOfBirth: { type: String },
    phoneNumber: { type: String },
    emailAddress: { type: String },
    instagramProfile: { type: String },
    twitterProfile: { type: String },
    relationshipToTheInsured: { type: String },
    additionalInsuredPersonName: { type: String },
    additionalInsuredDateOfBirth: { type: String },
    additionalRelationshipToTheInsured: { type: String },
    additionalPhoneNumber: { type: String },
    additionalEmailAddress: { type: String },
    additionalInstagramProfile: { type: String },
    additionalTwitterProfile: { type: String },
    premiumAmount: { type: String },
    FrequencyOfPremiumPayments: { type: String },
    underwriterName: { type: String },
    underwriterPhone: { type: String },
    underwriterEmail: { type: String },
    underwriterDecisions: { type: String },
    contact_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Contact",
    },
    assigned_agent: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
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

export default mongoose.model('Policy', Policy)