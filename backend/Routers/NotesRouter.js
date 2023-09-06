import express from 'express'
import { CreateNote, GetNotesById } from '../controllers/NoteController.js'
import verifyToken from '../middleware/VerifyToken.js'


const router = express.Router()


router.post('/createnote', verifyToken, CreateNote)

router.get('/mynotes/:id', verifyToken, GetNotesById)

export default router