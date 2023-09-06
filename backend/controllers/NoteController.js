import mongoose from "mongoose";
import NoteModel from "../model/NoteModel.js";


// create Notes

export const CreateNote = async(req, res) => {
    const { title, desc } = req.body
    console.log('req: ', req.user._id);

    try {
        if (!title) return res.status(400).json({ message: "please provide title" })
        if (!desc) return res.status(400).json({ message: "please provide description" })
        const newNote = await NoteModel.create({ title, desc, creator: req.user._id })
        res.status(201).json(newNote)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const GetNotesById = async(req, res) => {
    console.log('req: ', req);
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "no notes are found" })
        const myNotes = await NoteModel.find({ creator: req.params.id })
        res.status(200).json(myNotes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}