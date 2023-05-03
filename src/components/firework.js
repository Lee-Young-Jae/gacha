import React from "react";
import styled, { keyframes } from "styled-components";

const FireworkStyle = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 50%;

  animation: ${(props) => props.animation} 1s ease-in-out;
`;

const Firework = ({ animation }) => {
  return <FireworkStyle animation={animation} />;
};

export default Firework;
