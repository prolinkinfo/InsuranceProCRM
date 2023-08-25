import express from "express";
const router = express.Router();

import LeadRoute from "./leadRoutes";
import ContactRoute from "./contactRoutes"
import ClaimRoute from './claimRoutes'
import NoteRoute from "./noteRoutes"
import CallRoute from "./callRoutes";
import MeetingRoute from "./meetingRoutes"
import EmailRoute from './EmailRoutes'
import TaskRoute from "./taskRoutes"
import UserRoute from "./userRoutes"
import PolicyRoute from "./policyRoutes"
import DocumentRoute from './documentRoutes'
import PolicyDocumentRoute from './policyDocumentRoutes'
import emailTemmplateRoute from './emailTemplateRoutes'

router.use('/lead', LeadRoute);
router.use('/contact', ContactRoute);
router.use('/claim', ClaimRoute);
router.use('/note', NoteRoute);
router.use('/call', CallRoute)
router.use('/meeting', MeetingRoute)
router.use('/email', EmailRoute)
router.use('/task', TaskRoute)
router.use('/user', UserRoute)
router.use('/policy', PolicyRoute)
router.use('/document', DocumentRoute)
router.use('/policydocument', PolicyDocumentRoute)
router.use('/emailtemplate', emailTemmplateRoute)

export default router;
