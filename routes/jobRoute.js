const express = require('express');
const Job = require('../models/job.js')
const router = express.Router();


router.get('/', async (req, res) => {
    const jobs = await Job.find()
    res.status(200).json({
        message: 'job route is working fine',
        status: " working  ",
        jobs: jobs
    })

})

router.get('/:id', async (req,res) => {
    const jobId = req.params.id;
    const job = Job.findById(jobId);
    if(job){
    res.status(201).json({
        message: 'job Found  :)',
    })
}
    else{
        res.status(404).json({
            message : ' Job Not Found ',
        })

    }

})

router.post('/add', async (req, res) => {
    const { companyName, logoURL, jobPosition, monthlySalary, jobType, remote, location, jobDescription, aboutCompany, skillsRequired, AdditionalInformation, Author } = req.body;

    const newJob =  new Job({
        companyName,
        logoURL,
        jobPosition, 
        monthlySalary, 
        jobType, 
        remote, 
        location, 
        jobDescription, 
        aboutCompany, 
        skillsRequired, 
        AdditionalInformation, 
        Author
    })
    await newJob.save();
    res.status(200).json({
        message :" new Job  created successfully ",
        jobID : newJob._id,
    })
})


module.exports = router