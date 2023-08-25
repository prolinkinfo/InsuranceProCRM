import emailTemplate from "../model/emailTemplate";

const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
    let allData = await emailTemplate.find(query).populate({
        path: 'createdBy',
        match: { deleted: false } // Populate only if createBy.deleted is false
    }).exec()

    const result = allData.filter(item => item.createdBy !== null);

    let totalRecords = result.length

    res.send({ result, total_recodes: totalRecords })
}

const add = async (req, res) => {
    try {
        const emailtemplate = new emailTemplate({ design: req.body.design, name: req.body.name, html: req.body.html, createdBy: req.body.createdBy, modifiedOn: req.body.modifiedOn });
        await emailtemplate.save();
        res.json({ message: 'Design saved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving design.' });
    }
}

const view = async (req, res) => {
    try {
        const emailtemplate = await emailTemplate.findById({ _id: req.params.id });
        if (!emailtemplate) {
            return res.status(404).json({ message: 'Design not found.' });
        }
        res.json({ emailtemplate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving design.' });
    }
}

const edit = async (req, res) => {
    try {
        let result = await emailTemplate.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json({ result, message: 'Email Template updated successfully' });
    } catch (err) {
        console.error('Failed to Update EmailTemplate:', err);
        res.status(400).json({ error: 'Failed to Update EmailTemplate' });
    }
}

const deleteData = async (req, res) => {
    try {
        let emailtemplate = await emailTemplate.findByIdAndUpdate({ _id: req.params.id }, { deleted: true })
        res.status(200).json({ message: "Email Template deleted successfully", emailtemplate })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}

const deleteMany = async (req, res) => {
    try {
        const emailtemplateIdsToDelete = req.body;

        const deleteManyemailtemplate = await emailTemplate.updateMany({ _id: { $in: emailtemplateIdsToDelete } }, { deleted: true });

        if (deleteManyemailtemplate.deletedCount === 0) {
            return res.status(404).json({ message: "Email Template not found." });
        }

        res.status(200).json({ message: "Email Template deleted successfully.", deleteManyemailtemplate });
    } catch (err) {
        res.status(500).json({ message: "Error deleting Email Template.", error: err.message });
    }
};

export default { index, add, view, edit, deleteData, deleteMany }