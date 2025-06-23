import {v2 as cloudinary} from 'cloudinary'
import bcrypt from 'bcrypt'
import Company from '../models/company.js'
// Register a new company
export const registerCompany = async (req,res) => {
    const [name , email , password] = req.body;
    
    const imageFile = req.file

    if(!name || !email || !password || !imageFile){
        return res.json({success : false,message : "Missing Details"})
    }

    try{
        const companyExists = await Company.findOne({email})

        if(companyExists){
            return res.json({success : false,message: "Company already registered"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password : hashPassword,
            image : imageUpload.secure_url
        })

        res.json({
            success : true,
            company : {
                _id : company._id,
                name : company.name,
                email : company.email,
                image : company.image
            },
            token : generateToken(company._id)
        })


    }
    catch(error){
        res.json({success : false, message : error.message})
    }
}

// Company Login
export const loginCompany = async (req,res) => {

}

// Get company data
export const getCompanyData = async (req,res) => {

}

// Post a new job
export const postJob = async (req,res) => {

}

// Get company job applicant
export const getCompanyJobApplicants = async (req,res) => {

}

// Get company posted jobs
export const getCompanyPostedJobs = async (req,res) => {

}

// change job application status
export const changeJobApplicationStatus = async (req,res) => {

}

// change job visibility

export const changeVisibility = async (req,res) => {

}
