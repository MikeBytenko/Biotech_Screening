const router = require('express').Router();
const Program = require('../../models/user-programs');
const User = require('../../models/user');
const { json } = require('express/lib/response');

router.get('/', read)
router.post('/', create)
router.delete('/:id', del)


async function read(req, res) {
    try {
        const foundUser = req.user;
        const UserPrograms = foundUser.programs;
        res.json(UserPrograms)

    } catch (err) {
        res.status(404).json({
            message: "not found"
        })
    }
}

async function create(req, res) {
    try {
        const ProgramId = req.body.programId;
        const { forGroups } = req.body;
        const foundUser = req.user;
        foundUser.programs.push({ProgramId, forGroups});
        await foundUser.save();
        req.json(foundUser.programs)
    } catch (err) {
        res.status(500).json({ message: "An error occured"})
    }
}




async function del(req, res) {
    try{
        const UserProgramId = req.params.id;
        const user = req.user;
        let removedoc = user.programs.find( prog => {
            return prog.id == UserProgramId;
        })
        if(!removedoc){
            res.redirect('/', 404).json({
                message: "User has not this program"
            })
        }
        await user.save();
        return res.status(201).json(removedoc)
    }catch(err){
        res.status(500).json({
            message: "An error occured"
        })

    }
}
module.exports = router;