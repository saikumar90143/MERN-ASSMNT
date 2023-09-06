import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Components/Home";
import Mynotes from "./Components/Mynotes";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import CreateNote from "./Components/CreateNote";
import PrivateRoute from "./ManageRoutes/PrivateRoute";

function App() {
  return (
    <>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/createnotes" element={<PrivateRoute><CreateNote/></PrivateRoute>}></Route>
          <Route path="/notes" element={<PrivateRoute><Mynotes/></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
