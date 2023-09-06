import { timeStamp } from 'console'
import mongoose from 'mongoose'

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        minLength: 10,
        required: true
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, { timeStamp: true })


export default mongoose.model('notes', NoteSchema)