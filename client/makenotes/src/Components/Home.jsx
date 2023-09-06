import React from "react";
import Banner from "../assets/notebook-3297317_1280.jpg";
import styled from "styled-components";
function Home() {
  return (
    <Wrapper className="banner">
      <h2>Gather your Notes Here</h2>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("${Banner}");
  background-position: center;
  background-size: fit-content;
  background-repeat: no-repeat;
  h2 {
    background: linear-gradient(to right, red, blue);
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;
export default Home;
