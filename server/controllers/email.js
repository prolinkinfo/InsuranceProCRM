import Emails from '../model/emails'
import SendMail from '../middlewares/sendMail'

const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
    // let result = await Emails.find(query).populate("createdBy", ["firstName", "lastName"])
    // let totalRecords = await Emails.find(query).countDocuments()
    let allData = await Emails.find(query).populate({
        path: 'createdBy',
        match: { deleted: false }, // Populate only if createBy.deleted is false
        select: 'firstName lastName'
    }).exec()

    const result = allData.filter(item => item.createdBy !== null);

    let totalRecords = result.length
    res.send({ result, total_recodes: totalRecords })
}

const add = async (req, res) => {
    try {

        const emails = new Emails(req.body);
        // SendMail(emails.receiver, emails.subject, emails.message)

        await emails.save();
        res.status(201).json({ emails, message: 'Email saved successfully' });
    } catch (err) {
        console.error('Failed to create Email:', err);
        res.status(500).json({ error: 'Failed to create Email' });
    }
}

const view = async (req, res) => {
    let emails = await Emails.findOne({ _id: req.params.id })
        .populate("createdBy", ["firstName", "lastName"])
        .populate("lead_id", ["firstName", "lastName"])
        .populate("contact_id", ["firstName", "lastName"])

    if (!emails) return res.status(404).json({ message: "no Data Found." })
    res.status(200).json({ emails })
}

const deleteData = async (req, res) => {
    try {
        let emails = await Emails.findByIdAndUpdate({ _id: req.params.id }, { deleted: true })
        res.status(200).json({ message: "Email deleted successfully", emails })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}

const deleteMany = async (req, res) => {
    try {
        const emailIdsToDelete = req.body;

        const deleteManyEmails = await Emails.updateMany({ _id: { $in: emailIdsToDelete } }, { deleted: true });

        if (deleteManyEmails.deletedCount === 0) {
            return res.status(404).json({ message: "Emails(s) not found." });
        }

        res.status(200).json({ message: "Emails deleted successfully", deleteManyEmails });
    } catch (err) {
        res.status(500).json({ message: "Error deleting Emails ", error: err.message });
    }
}

export default { index, add, view, deleteData, deleteMany }