import Calls from "../model/Calls";

const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
 
    let allData = await Calls.find(query).
        populate("createdBy", ["firstName", "lastName"])
        .populate("lead_id", ["firstName", "lastName"])
        .populate("contact_id", ["firstName", "lastName"])

    let totalRecords = allData.length
    res.send({ result: allData, total_recodes: totalRecords })
}


const add = async (req, res) => {
    try {
        const calls = new Calls(req.body);
        await calls.save();
        res.status(201).json({ calls, message: 'Call saved successfully' });
    } catch (err) {
        console.error('Failed to create Calls:', err);
        res.status(500).json({ error: 'Failed to create Calls' });
    }
}

const view = async (req, res) => {
    try {
        let calls = await Calls.findById(req.params.id)
            .populate("createdBy", ["firstName", "lastName"])
            .populate("lead_id", ["firstName", "lastName"])
            .populate("contact_id", ["firstName", "lastName"])


        if (!calls) {
            return res.status(404).json({ message: "No data found." });
        }
        res.status(200).json({ calls });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

const edit = async (req, res) => {
    try {

        let result = await Calls.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json({ result, message: 'Call updated successfully' });
    } catch (err) {
        console.error('Failed to Update Call:', err);
        res.status(400).json({ error: 'Failed to Update Call' });
    }
}

const deleteData = async (req, res) => {
    try {
        let calls = await Calls.findByIdAndUpdate({ _id: req.params.id }, { deleted: true })
        res.status(200).json({ message: "Call deleted successfully", calls })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}

const deleteMany = async (req, res) => {
    try {
        const callIdsToDelete = req.body; // Assuming the request body contains an array of call IDs

        // Delete the calls
        const deleteManyCalls = await Calls.updateMany({ _id: { $in: callIdsToDelete } }, { deleted: true });

        // Check if any calls were found and deleted
        if (deleteManyCalls.deletedCount === 0) {
            return res.status(404).json({ message: "Calls(s) not found." });
        }

        // If you have related data for calls, delete them here

        res.status(200).json({ message: "Call deleted successfully.", deleteManyCalls });
    } catch (err) {
        res.status(500).json({ message: "Error deleting Calls(s) ", error: err.message });
    }
};

export default { index, add, view, edit, deleteData, deleteMany }