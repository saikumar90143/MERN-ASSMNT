import { MDBBtn, MDBInput, MDBTextArea, MDBTypography } from "mdb-react-ui-kit";
import React, { useState } from "react";
import styled from "styled-components";
import { CreateNotes } from "../Redux/ReduxSlice/NotesSlice";
import { useDispatch} from "react-redux";
function CreateNote() {
  const dispatch = useDispatch();
     const [error,setError]=useState('')
  // state to hold the notes data
  const [note, setNote] = useState({
    title: "",
    desc: "",
  });
  // destructring the notes data
  const { title, desc } = note;
  // gathering the all notes in one array
  const [data, setData] = useState([]);
  console.log("data: ", data);

  // submiting the notes if every this is ok
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      if (!title){
        setError('please enter title')
      }else if(!desc){
        setError('please enter atleast 10 chars')

      }else{
        dispatch(CreateNotes(note));
        setData((prev) => [...prev, note]);
        setNote({
          title: "",
          desc: "",
        });
        setError('')
      }

    
    } catch (error) {
      return error.message
    }
   
  };
  return (
    <Wrapper>
      <MDBTypography variant="h3">Create Notes</MDBTypography>
      <form method="post" onSubmit={handleSubmit}>
        <MDBInput
          type="text"
          label="title"
          value={title}
          name="title"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="title"
        />
        <MDBTextArea
          label="note"
          name="desc"
          value={desc}
          onChange={(e) => setNote({ ...note, desc: e.target.value })}
          rows={4}
          placeholder="note"
        />
      <span style={{ color: "red" }}>{error}</span>
        <MDBBtn type="submit">Create Note</MDBBtn>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  form {
    width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;
export default CreateNote;
