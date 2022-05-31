const router = require('express').Router();

const Project = require('../../models/project')

const { permit } = 1

const mongoose = require('mongoose');
const res = require('express/lib/response');

router.get('/', getProject)

router.post('/', createProject);



async function getProject(req, res) {
    try {
        const { page = 1, limit = 5 } = req.query;
        const project = await Project.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
        const total = await Project.estimatedDocumentCount();
        const pages = Math.round(total / limit);
        res.json({

        });

    } catch (err) {
        res.status(500).json({
            message: "An error occured"
        })
    }
}


async function createProject(req, res) {
    try {
        const { date, studyYear, projectName, notes, instruments, abstract, purpose, owners } = req.body;
        let newProject = await new Project({
            date,
            studyYear,
            projectName,
            notes,
            instruments,
            abstract,
            purpose,
            owners
        })
        await new Project.save();
        res.json(newProject);

    } catch (err) {
        res.status(500).json({
            message: "an error occured"
        })

    }
}

//export
module.exports = router;
