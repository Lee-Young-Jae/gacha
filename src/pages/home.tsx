import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import kitty from "../images/kitty.jpg";
import mymelody from "../images/mymelody.jpg";
import pompompurin from "../images/pompompurin.jpg";
import pochacco from "../images/pochacco.jpg";

import kittyMouse from "../images/kittyMouse.png";

import Button from "../components/common/Button";

const HomeStyle = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #e4e4e4;
  font-family: "Dongle", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  font-family: "Dongle", sans-serif;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  font-size: 50px;
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// fadeImage
const fadeImage = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }

`;

const GhachaContainer = styled.div`
  width: 400px;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  img {
    width: 45%;
    height: 45%;
    margin: 10px 0;
    border-radius: 10px;
  }
  .active {
    animation: ${fadeImage} 1s;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// 위에서 아래로 slide
const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;
const LotteryResultContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 10px;

  animation: ${fadeIn} 5s;
  font-size: 55px;

  .lotteryResult {
    width: 40%;
    height: 40%;
    object-fit: cover;
    font-size: 20px;
    margin-top: 10px;
    animation: ${slideDown} 1s;
    padding: 2px;

    // 캡슐 처럼
    border-radius: 15px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  }
`;

const jump = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const MouseStyle = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${(props) => props.y + 5}px;
  left: ${(props) => props.x + 5}px;
  width: 30px;
  height: 25px;
  cursor: pointer;
  transition: 0.1s;
  /* @media screen and (max-width: 500px) {
    // safari에서는 작동하지 않음
    transition: 0.5s;
    width: 100px;
    height: 100px;
  } */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  animation: ${jump} 1s ease-in-out infinite;
`;

const characters = [
  {
    name: "kitty",
    image: kitty,
  },
  {
    name: "mymelody",
    image: mymelody,
  },
  {
    name: "pompompurin",
    image: pompompurin,
  },
  {
    name: "pochacco",
    image: pochacco,
  },
];

const Home = () => {
  const [activeImage, setactiveImage] = useState(characters[0]);

  const [fadeTime, setfadeTime] = useState(1000);

  const [lotteryResult, setLotteryResult] = useState(characters[0]);

  // 마우스를 따라다니는 이미지
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useRef를 사용하여 DOM에 접근
  const kittyRef = useRef<HTMLImageElement>(null);
  const mymelodyRef = useRef<HTMLImageElement>(null);
  const pompompurinRef = useRef<HTMLImageElement>(null);
  const pochaccoRef = useRef<HTMLImageElement>(null);

  // activeImage가 바뀔 때마다 해당 이미지에 active 클래스 추가
  useEffect(() => {
    kittyRef.current?.classList.remove("active");
    mymelodyRef.current?.classList.remove("active");
    pompompurinRef.current?.classList.remove("active");
    pochaccoRef.current?.classList.remove("active");

    switch (activeImage.name) {
      case "kitty":
        kittyRef.current?.classList.add("active");
        break;
      case "mymelody":
        mymelodyRef.current?.classList.add("active");
        break;
      case "pompompurin":
        pompompurinRef.current?.classList.add("active");
        break;
      case "pochacco":
        pochaccoRef.current?.classList.add("active");
        break;
    }
  }, [activeImage]);

  // 1초 단위로 이미지 교체
  useEffect(() => {
    const interval = setInterval(() => {
      const max = characters.length;
      const beforeIndex = characters.findIndex(
        (character) => character.name === activeImage.name
      );
      const nextIndex = beforeIndex + 1 === max ? 0 : beforeIndex + 1;
      setactiveImage(characters[nextIndex]);
    }, fadeTime);

    return () => clearInterval(interval);
  }, [activeImage, fadeTime]);

  /** 마우스 이벤트 */

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Header>산리오 캐릭터즈 칙칙폭폭</Header>
      <HomeStyle className="Home">
        <GhachaContainer>
          <img ref={kittyRef} src={kitty} alt="kitty" />
          <img ref={mymelodyRef} src={mymelody} alt="mymelody" />
          <img ref={pompompurinRef} src={pompompurin} alt="pompompurin" />
          <img ref={pochaccoRef} src={pochacco} alt="pochacco" />
        </GhachaContainer>
        <Button
          onClick={() => {
            setfadeTime(200);
            setTimeout(() => {
              setfadeTime(1000);
              // const randomIndex = Math.floor(Math.random() * 4);
              // setLotteryResult(characters[randomIndex].name);
              // setactiveImage(characters[randomIndex]);
              setactiveImage(characters[3]);
              setLotteryResult(characters[3]);
            }, 6000);
          }}
        >
          뽑기
        </Button>

        {lotteryResult.name === "pochacco" && (
          <LotteryResultContainer>
            <img className="lotteryResult" src={lotteryResult.image}></img>
            <div>{lotteryResult.name}</div>
          </LotteryResultContainer>
        )}
      </HomeStyle>
      <MouseStyle
        x={
          mousePosition.x > window.innerWidth - 50
            ? window.innerWidth - 50
            : mousePosition.x
        }
        y={
          mousePosition.y > window.innerHeight - 50
            ? window.innerHeight - 50
            : mousePosition.y
        }
      >
        <img src={kittyMouse} alt="kittyMouse"></img>
      </MouseStyle>
    </div>
  );
};

export default Home;
