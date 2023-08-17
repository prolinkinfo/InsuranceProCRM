import Notes from '../model/Notes'


const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
    // let result = await Notes.find(query)
    // let totalRecords = await Notes.find(query).countDocuments()
    let allData = await Notes.find(query).populate({
        path: 'createdBy',
        match: { deleted: false } // Populate only if createBy.deleted is false
    }).exec()

    const result = allData.filter(item => item.createdBy !== null);

    let totalRecords = result.length
    res.send({ result, total_recodes: totalRecords })
}

const add = async (req, res) => {
    try {
        const notes = new Notes(req.body);
        await notes.save();
        res.status(201).json({ notes, message: 'Note saved successfully' });
    } catch (err) {
        console.error('Failed to create Note:', err);
        res.status(500).json({ error: 'Failed to create Note' });
    }
}

const view = async (req, res) => {

    let notes = await Notes.findOne({ _id: req.params.id })

    if (!notes) return res.status(404).json({ message: "no Data Found." })
    res.status(200).json(notes)
}

const edit = async (req, res) => {
    try {

        let result = await Notes.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json({ result, message: 'Note updated successfully' });
    } catch (err) {
        console.error('Failed to Update Note:', err);
        res.status(400).json({ error: 'Failed to Update Note' });
    }
}

const deleteData = async (req, res) => {
    try {
        let lead = await Notes.findByIdAndUpdate({ _id: req.params.id }, { deleted: true })
        res.status(200).json({ message: "Note deleted successfully", lead })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}

export default { index, add, view, edit, deleteData }