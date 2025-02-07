//import React from 'react'
//import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
// import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking </span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            inventore ea odit placeat fuga blanditiis laborum dicta cupiditate
            aperiam eum voluptas incidunt consectetur ad, modi minus. Eveniet,
            error cumque! Eos, doloribus atque perferendis blanditiis cum quis
            repellendus hic vel possimus.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login/Demo User
          </Link>
        </div>
        <img src={main} className="img main-img" alt="jobify" />
      </div>
    </Wrapper>
  );
};

export default Landing;
