import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GetUserNote } from "../Redux/ReduxSlice/NotesSlice";

function Mynotes() {
  const dispatch = useDispatch();

  const { mynotes } = useSelector((state) => state.note);
  console.log("mynotes: ", mynotes);
  const { user } = useSelector((state) => state.user);
  const userId = user?.result?._id;
  useEffect(() => {
    if (userId) {
      dispatch(GetUserNote(userId));
    }
  }, [userId]);
  return (
    <Wrapper>
      <h2>My Notes</h2>

      {mynotes.length == 0 ? (
        <h2 style={{ textAlign: "center" }}>No notes found</h2>
      ) : (
        mynotes.map((note, i) => {
          return (
            <MDBAccordion borderless initialActive={1} key={i}>
              {`${i + 1} )`}{" "}
              <MDBAccordionItem collapseId={i + 1} headerTitle={note?.title}>
                {note?.desc}
              </MDBAccordionItem>
            </MDBAccordion>
          );
        })
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section``;
export default Mynotes;
