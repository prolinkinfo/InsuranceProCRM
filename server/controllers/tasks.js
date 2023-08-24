import Meetings from "../model/Meetings";
import Tasks from "../model/Tasks";


const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
 
    let allData = await Tasks.find(query).
        populate("createdBy", ["firstName", "lastName"])
        .populate("lead_id", ["firstName", "lastName"])
        .populate("contact_id", ["firstName", "lastName"])

    let totalRecords = allData.length
    res.send({ result: allData, total_recodes: totalRecords })
}

const add = async (req, res) => {
    try {
        const tasks = new Tasks(req.body);
        await tasks.save();
        res.status(201).json({ tasks, message: 'Task saved successfully' });
    } catch (err) {
        console.error('Failed to create Task:', err);
        res.status(500).json({ error: 'Failed to create Task' });
    }
}

const view = async (req, res) => {
    let tasks = await Tasks.findOne({ _id: req.params.id })
        .populate("createdBy", ["firstName", "lastName"])
        .populate("lead_id", ["firstName", "lastName"])
        .populate("assignTo", ["firstName", "lastName"])
        .populate("contact_id", ["firstName", "lastName"])

    // let populatedtask = await Tasks.populate(tasks, { path: "createdBy", select: ["firstName", "lastName"] });
    if (!tasks) return res.status(404).json({ message: "no Data Found." })
    res.status(200).json({ tasks })
}

const edit = async (req, res) => {
    try {

        let result = await Tasks.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json({ result, message: 'Task updated successfully' });
    } catch (err) {
        console.error('Failed to Update Task:', err);
        res.status(400).json({ error: 'Failed to Update Task' });
    }
}

const deleteData = async (req, res) => {
    try {
        let tasks = await Tasks.findByIdAndUpdate({ _id: req.params.id }, { deleted: true })
        res.status(200).json({ message: "Task deleted successfully", tasks })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}

const deleteMany = async (req, res) => {
    try {
        const taskIdsToDelete = req.body; // Assuming the request body contains an array of task IDs

        // Delete the tasks
        const deleteManyTasks = await Tasks.updateMany({ _id: { $in: taskIdsToDelete } }, { deleted: true });

        // Check if any tasks were found and deleted
        if (deleteManyTasks.deletedCount === 0) {
            return res.status(404).json({ message: "Tasks(s) not found." });
        }

        // If you have related data for tasks, delete them here

        res.status(200).json({ message: "Tasks deleted successfully.", deleteManyTasks });
    } catch (err) {
        res.status(500).json({ message: "Error deleting Tasks(s).", error: err.message });
    }
};

export default { index, add, view, edit, deleteData, deleteMany }