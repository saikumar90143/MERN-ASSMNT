import axios from "axios";

import { axioxInstance } from "./UserApi";

const CreateNote = async(noteData) => {
    const response = await axioxInstance.post("/api/note/createnote", noteData);

    return response.data;
};

const GetUserNotes = async(id) => {
    const response = await axioxInstance.get(`/api/note/mynotes/${id}`);
    return response.data;
};

const NoteApi = { CreateNote, GetUserNotes };

export default NoteApi;