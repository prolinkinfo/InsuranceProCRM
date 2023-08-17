import policyDocument from "../model/policyDocument";


const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
    // let result = await policyDocument.find(query)
    // let totalRecords = await policyDocument.find(query).countDocuments()
    let allData = await policyDocument.find(query).populate({
        path: 'createdBy',
        match: { deleted: false } // Populate only if createBy.deleted is false
    }).exec()

    const result = allData.filter(item => item.createdBy !== null);

    let totalRecords = result.length
    res.send({ result, total_recodes: totalRecords })
}

const fileUpload = async (req, res) => {

    const fileName = req.body.fileName

    try {
        const file = await policyDocument.create({ path: req.file.path, file: req.file.originalname, fileName: fileName, policy_id: req.body.policy_id, createdBy: req.body.created_by });
        res.status(200).json({ file, message: "File uploaded successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}


const downloadFile = async (req, res) => {
    try {
        const file = await policyDocument.findById(req.params.fileId);
        file.downloadCount++;

        await file.save();

        res.download(file.path, file.name);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: error.message });
    }
}

const deleteData = async (req, res) => {
    try {
        let document = await policyDocument.findByIdAndUpdate({ _id: req.params.id }, { deleted: true })
        res.status(200).json({ message: "File deleted successfully", document })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}
export default { index, fileUpload, downloadFile, deleteData }