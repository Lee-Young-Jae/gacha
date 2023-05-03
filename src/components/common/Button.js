import React from "react";

import styled from "styled-components";

const ButtonStyle = styled.button`
  width: 100px;
  height: 50px;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 10px;
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: 0.2s;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
  font-family: "Dongle", sans-serif;
`;

const Button = ({ children, onClick }) => {
  return <ButtonStyle onClick={onClick}>{children}</ButtonStyle>;
};

export default Button;
