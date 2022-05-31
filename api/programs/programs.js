//require
const router = require("express").Router();
const Program = require("../../models/program");
const { permit } = require("../../middlewares/permition_roles");
const mongoose = require("mongoose");
//routes

router.get("/", permit(["user"]), list);
router.get("/search/", permit(["user"]), search);
router.get("/:id", permit(["admin"]), read);
router.post("/", permit(["admin"]), create);
router.put("/:id", permit(["admin"]), update);
router.delete("/:id", permit(["admin"]), del);

//implementations

/**
 * List of  food with pagination
 */
async function list(req, res) {
    try {
        const { page = 1, limit = 5 } = req.query;
        const program = await Program.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const total = await Program.estimatedDocumentCount();
        const pages = Math.round(total / limit);
        res.json({
            total,
            pages,
            currentPage: page,
            perPage: limit,
            illness,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occured",
        });
    }
}

/**
 * search for food item
 */
async function search(req, res) {
    try {
        const str = req.query.title;
        const criteria = str.length > 0 ? { title: { $regex: `${str}`, $options: "i" } } : undefined;
        const found = await Program.find(criteria);
        res.json(found);
    } catch (error) {
        res.status(500).json({
            message: "An error occured",
        });
    }
}

/**
 * Read food
 */
async function read(req, res) {
    try {
        const foundPrograms = await Program.findById(req.params.id);
        res.json(Program.format(foundFood));
    } catch (error) {
        res.status(404).json({
            message: "User is not found",
        });
    }
}

/**
 * Create food
 */
async function create(req, res) {
    try {
        const { studyYear, forGroups, titleOfCourse, professor } = req.body;

        let newProgram = await new Program({
            studyYear,
            forGroups,
            titleOfCourse,
            professor
        });
        await newProgram.save();
        res.json(Illness.format(newProgram));
    } catch (error) {
        res.status(500).json({
            message: "An error occured",
        });
    }
}

/**
 * Update food
 */
async function update(req, res) {
    try {
        const { studyYear, forGroups, titleOfCourse, professor } = req.body;
        const toUpdate = {
            ...(studyYear && { studyYear }),
            ...(forGroups && { forGroups }),
            ...(sttitleOfCourseage && { titleOfCourse }),
            ...(professor && { professor }),

        };

        const updatedProgram = await Program.findOneAndUpdate({ _id: req.params.id }, toUpdate, {
            new: true,
        });
        res.status(201).json(Program.format(updatedProgram));
    } catch (error) {
        res.status(500).json({
            message: "An error occured",
        });
    }
}

/**
 * Delete food
 */
async function del(req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const deletedProgram = await Program.findById(id).remove();
        res.status(200).json(deletedProgram);
    } catch (error) {
        res.status(500).json({
            message: "An error occured",
        });
    }
}

//export
module.exports = router;
