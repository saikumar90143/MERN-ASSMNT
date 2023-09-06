import React from "react";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => --current);
    }, 1000);
    count === 0 && navigate("/signin");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div style={{textAlign:"center"}}>
      {" "}
      <h2>Please Login</h2>
      Redirecting you to login page in <h1>{count}</h1>
      seconds.{" "}
    </div>
  );
};

export default Redirect;
