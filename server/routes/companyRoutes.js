import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companycontroller.js';
import upload from '../config/multer.js'
const router = express.Router();

//Register a company
router.post('/register',upload.single('image'),registerCompany)

// company login
router.post('/login',loginCompany)

// get company data
router.get('/company',getCompanyData)

//Post a job
router.post('/post-job',postJob)

//get applicants data of company
router.get('/applicants',getCompanyJobApplicants)

// Get company job list
router.get('/list-jobs',getCompanyPostedJobs)

// change application status
router.post('/change-status',changeJobApplicationStatus)

// change application visibility
router.post('/change-visibility',changeVisibility)

export default router