
import mongoose from 'mongoose'
import Contact from '../model/Contact'
import Policy from '../model/policy'
import Task from '../model/Tasks'
import Meetings from '../model/Meetings';
import Calls from '../model/Calls';
import Notes from '../model/Notes';
import claim from '../model/claim';
import Lead from '../model/Lead';
import Emails from '../model/emails'

const index = async (req, res) => {
    const query = req.query
    query.deleted = false;
    // let result = await Contact.find(query)
    // let totalRecords = await Contact.find(query).countDocuments()
    let allData = await Contact.find(query).populate({
        path: 'createdBy',
        match: { deleted: false } // Populate only if createBy.deleted is false
    }).exec()

    const result = allData.filter(item => item.createdBy !== null);

    let totalRecords = result.length
    res.send({ result, total_recodes: totalRecords })
}

const add = async (req, res) => {
    try {
        const contactData = req.body;
        const leadIds = contactData.lead;
        delete contactData.lead;

        const contact = new Contact(contactData);
        await contact.save();

        if (leadIds && leadIds.length > 0) {
            const leads = await Contact.find({ _id: { $in: leadIds } });
            contact.lead = leads;
            await contact.save();
        }

        res.status(201).json({ contact, message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
}

const edit = async (req, res) => {
    try {

        let result = await Contact.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json({ result, message: 'Contact updated successfully' });
    } catch (err) {
        console.error('Failed to Update Contact:', err);
        res.status(400).json({ error: 'Failed to Update Contact' });
    }
}


const view = async (req, res) => {
    let Contacts = await Contact.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id),
            },
        },
        {
            $lookup: {
                from: "claims",
                localField: "_id",
                foreignField: "contact_id",
                as: "claims",
                pipeline: [
                    {
                        $match: {
                            deleted: false,
                        },
                    },
                ],
            }
        },
        {
            $lookup: {
                from: "policies",
                localField: "_id",
                foreignField: "contact_id",
                as: "policies",
                pipeline: [
                    {
                        $match: {
                            deleted: false,
                        },
                    },
                ],
            }
        },
        {
            $lookup: {
                from: "leads",
                localField: "_id",
                foreignField: "contact_id",
                as: "leads",
                pipeline: [
                    {
                        $match: {
                            deleted: false,
                        },
                    },
                ],
            }
        },
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "contact_id",
                as: "tasks",
                pipeline: [
                    {
                        $match: {
                            deleted: false,
                        },
                    },
                ],
            }
        },
        {
            $lookup: {
                from: "notes",
                localField: "_id",
                foreignField: "contact_id",
                as: "notes",
                pipeline: [
                    {
                        $match: {
                            deleted: false,
                        },
                    },
                ],
            }
        },
        {
            $lookup: {
                from: "calls",
                localField: "_id",
                foreignField: "contact_id",
                as: "calls",
                pipeline: [
                    {
                        $match: {
                            deleted: false,
                        },
                    },
                ],
            }
        },
        {
            $lookup: {
                from: "meetings",
                localField: "_id",
                foreignField: "contact_id",
                as: "meetings",
                pipeline: [
                    {
                        $match: {
                            deleted: false,
                        },
                    },
                ],
            }
        },
        {
            $lookup: {
                from: "emails",
                localField: "_id",
                foreignField: "contact_id",
                as: "emails",
                pipeline: [
                    {
                        $match: {
                            deleted: false,
                        },
                    },
                ],
            }
        }
    ]);

    let contact = await Contact.findByIdAndUpdate({ _id: req.params.id })
    if (!contact) return res.status(404).json({ message: "no Data Found." })
    res.status(200).json(Contacts)
}

const deleteData = async (req, res) => {
    try {
        const contactId = req.params.id;

        // Delete notes related to the contact
        await Notes.updateMany({ contact_id: contactId, deleted: true });

        // Delete policy related to the contact
        await Policy.updateMany({ contact_id: contactId, deleted: true });

        // Delete task related to the contact
        await Task.updateMany({ contact_id: contactId, deleted: true });

        // Delete claim related to the contact
        await claim.updateMany({ contact_id: contactId, deleted: true });

        // Delete lead related to the contact
        await Lead.updateMany({ contact_id: contactId, deleted: true });

        // Delete calls related to the contact
        await Calls.updateMany({ contact_id: contactId, deleted: true });

        // Delete meetings related to the contact
        await Meetings.updateMany({ contact_id: contactId, deleted: true });

        // Delete emails related to the contact
        await Emails.updateMany({ contact_id: contactId, deleted: true });

        // Delete the contact itself
        const deletedcontact = await Contact.findByIdAndUpdate(contactId, { deleted: true });

        if (!deletedcontact) {
            return res.status(404).json({ message: "Contact not found." });
        }

        res.status(200).json({ message: "Contact and related data deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};
const deleteMany = async (req, res) => {
    try {
        const contactIds = req.body;

        // Delete notes related to the contact
        await Notes.updateMany({ contact_id: contactIds }, { $set: { deleted: true } });

        // Delete policy related to the contact
        await Policy.updateMany({ contact_id: contactIds }, { $set: { deleted: true } });

        // Delete task related to the contact
        await Task.updateMany({ contact_id: contactIds }, { $set: { deleted: true } });

        // Delete claim related to the contact
        await claim.updateMany({ contact_id: contactIds }, { $set: { deleted: true } });

        // Delete lead related to the contact
        await Lead.updateMany({ contact_id: contactIds }, { $set: { deleted: true } });

        // Delete calls related to the contact
        await Calls.updateMany({ contact_id: contactIds }, { $set: { deleted: true } });

        // Delete meetings related to the contact
        await Meetings.updateMany({ contact_id: contactIds }, { $set: { deleted: true } });

        // Delete emails related to the contact
        await Emails.updateMany({ contact_id: contactIds }, { $set: { deleted: true } });

        // Delete the Contacts themselves
        const deletedLeads = await Contact.updateMany({ _id: { $in: contactIds } }, { $set: { deleted: true } });

        if (deletedLeads.deletedCount === 0) {
            return res.status(404).json({ message: "No Contacts found." });
        }

        res.status(200).json({ message: "Contacts and related data deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export default { index, add, edit, view, deleteData, deleteMany }