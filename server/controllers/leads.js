import mongoose from "mongoose";
import Lead from "../model/Lead";
import Notes from "../model/Notes";
import Calls from "../model/Calls";
import Meetings from "../model/Meetings";
import Tasks from "../model/Tasks";
import Emails from "../model/emails";

const index = async (req, res) => {
  const query = req.query
  query.deleted = false;
  let allData = await Lead.find(query).populate({
    path: 'createdBy',
    match: { deleted: false } // Populate only if createBy.deleted is false
  }).exec()

  const result = allData.filter(item => item.createdBy !== null);

  let totalRecords = result.length
  
  res.send({ result, total_recodes: totalRecords })
}

const add = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ lead, message: 'Lead saved successfully' });
  } catch (err) {
    console.error('Failed to create Lead:', err);
    res.status(500).json({ error: 'Failed to create Lead' });
  }
}

const edit = async (req, res) => {
  try {

    let result = await Lead.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ result, message: 'Lead updated successfully' });
  } catch (err) {
    console.error('Failed to Update Lead:', err);
    res.status(400).json({ error: 'Failed to Update Lead' });
  }
}

const view = async (req, res) => {
  try {
    let leads = await Lead.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },

      {
        $lookup: {
          from: "notes",
          localField: "_id",
          foreignField: "lead_id",
          as: "notes",
          pipeline: [
            {
              $match: {
                deleted: false, 
              },
            },
          ],
        },
      },

      {
        $lookup: {
          from: "calls",
          localField: "_id",
          foreignField: "lead_id",
          as: "calls",
          pipeline: [
            {
              $match: {
                deleted: false, 
              },
            },
          ],
        },
      },

      {
        $lookup: {
          from: "meetings",
          localField: "_id",
          foreignField: "lead_id",
          as: "meetings",
          pipeline: [
            {
              $match: {
                deleted: false,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "emails",
          localField: "_id",
          foreignField: "lead_id",
          as: "emails",
          pipeline: [
            {
              $match: {
                deleted: false, 
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "lead_id",
          as: "tasks",
          pipeline: [
            {
              $match: {
                deleted: false, 
              },
            },
          ],
        },
      },
    ]);

    if (leads.length === 0) {
      return res.status(404).json({ message: "No data found." });
    }


    let lead = leads[0];
    let populatedLead = await Lead.populate(lead, { path: "assigned_agent", select: ["firstName", "lastName"] });
    res.status(200).json({ lead: populatedLead });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};


const deleteData = async (req, res) => {
  try {
    const leadId = req.params.id;

    // Delete notes related to the lead
    await Notes.updateMany({ lead_id: leadId, deleted: true });

    // Delete calls related to the lead
    await Calls.updateMany({ lead_id: leadId, deleted: true });

    // Delete meetings related to the lead
    await Meetings.updateMany({ lead_id: leadId, deleted: true });

    // Delete emails related to the lead
    await Emails.updateMany({ lead_id: leadId, deleted: true });

    // Delete tasks related to the lead
    await Tasks.updateMany({ lead_id: leadId, deleted: true });

    // Delete the lead itself
    const deletedLead = await Lead.findByIdAndUpdate(leadId, { deleted: true });

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found." });
    }

    res.status(200).json({ message: "Lead and related data deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};


const deleteMany = async (req, res) => {
  try {
    const leadIds = req.body;

    // Delete notes related to the leads
    await Notes.updateMany({ lead_id: { $in: leadIds } }, { $set: { deleted: true } });

    // Delete calls related to the leads
    await Calls.updateMany({ lead_id: { $in: leadIds } }, { $set: { deleted: true } });

    // Delete meetings related to the leads
    await Meetings.updateMany({ lead_id: { $in: leadIds } }, { $set: { deleted: true } });

    // Delete emails related to the leads
    await Emails.updateMany({ lead_id: { $in: leadIds } }, { $set: { deleted: true } });

    // Delete tasks related to the leads
    await Tasks.updateMany({ lead_id: { $in: leadIds } }, { $set: { deleted: true } });

    // Delete the leads themselves
    const deletedLeads = await Lead.updateMany({ _id: { $in: leadIds } }, { $set: { deleted: true } });

    if (deletedLeads.deletedCount === 0) {
      return res.status(404).json({ message: "No leads found." });
    }

    res.status(200).json({ message: "Leads and related data deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export default { index, add, edit, view, deleteData, deleteMany }