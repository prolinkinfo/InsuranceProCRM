import Meetings from '../model/Meetings'


const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
    // let result = await Meetings.find(query)
    // let totalRecords = await Meetings.find(query).countDocuments()
    let allData = await Meetings.find(query).
        populate("createdBy", ["firstName", "lastName"])
        .populate("lead_id", ["firstName", "lastName"])
        .populate("contact_id", ["firstName", "lastName"])

    // ).exec()

    // const result = allData.filter(item => console.log(item));

    let totalRecords = allData.length
    res.send({ result: allData, total_recodes: totalRecords })
}

const add = async (req, res) => {
    try {
        const meetings = new Meetings(req.body);
        await meetings.save();
        res.status(201).json({ meetings, message: 'Meeting saved successfully' });
    } catch (err) {
        console.error('Failed to create Meetings:', err);
        res.status(500).json({ error: 'Failed to create Meetings' });
    }
}

const view = async (req, res) => {
    let meetings = await Meetings.findOne({ _id: req.params.id })
        .populate("createdBy", ["firstName", "lastName"])
        .populate("lead_id", ["firstName", "lastName"])
        .populate("contact_id", ["firstName", "lastName"])
    // let populatedmeeting = await Meetings.populate(meetings, { path: "createdBy", select: ["firstName", "lastName"] });

    if (!meetings) return res.status(404).json({ message: "no Data Found." })
    res.status(200).json({ meetings })
}


const edit = async (req, res) => {
    try {

        let result = await Meetings.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json({ result, message: 'Meeting updated successfully' });
    } catch (err) {
        console.error('Failed to Update Lead:', err);
        res.status(400).json({ error: 'Failed to Update Lead' });
    }
}

const deleteData = async (req, res) => {
    try {
        let meetings = await Meetings.findByIdAndUpdate({ _id: req.params.id }, { deleted: true })
        res.status(200).json({ message: "Meeting deleted successfully", meetings })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}

const deleteMany = async (req, res) => {
    try {
        const meetingIdsToDelete = req.body; // Assuming the request body contains an array of meeting IDs

        // Delete the meetings
        const deleteManyMeetings = await Meetings.updateMany({ _id: { $in: meetingIdsToDelete } }, { deleted: true });

        // Check if any meetings were found and deleted
        if (deleteManyMeetings.deletedCount === 0) {
            return res.status(404).json({ message: "Meetings(s) not found." });
        }

        // If you have related data for meetings, delete them here

        res.status(200).json({ message: "Meetings deleted successfully.", deleteManyMeetings });
    } catch (err) {
        res.status(500).json({ message: "Error deleting Meetings(s).", error: err.message });
    }
};
export default { index, add, view, edit, deleteData, deleteMany }