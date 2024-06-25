const mongoose = require('mongoose')

//company name, logo URL , job position/title 
// monthly salary,  job type, remote, location 
//job description ,about company, skills required, Additional information

const jobSchema =  new mongoose.Schema({
    companyName : {
        type : String,
        required : true,
    },
    logoURL : {
        type : String,
        required : true,
    },
    jobPosition : {
        type : String,
        required : true,
    },
    monthlySalary : {
        type : String,
        required : true,
    },
    jobType : {
        type : String,
        required : true,
    },
    remote : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    jobDescription : {
        type : String,
        required : true,
    },
    aboutCompany : {
        type : String,
        required : true,
    },
    skillsRequired : [{
        type : String,
        required : true,
    }],
    AdditionalInformation : {
        type : String,
        required : true,
    },

    
})

module.exports =  mongoose.model('Job', jobSchema);