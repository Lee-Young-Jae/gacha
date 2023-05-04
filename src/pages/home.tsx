import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import kitty from "../images/kittyNoBackground.png";
import mymelody from "../images/mymelodyNoBackground.png";
import pompompurin from "../images/pompompurinNoBackground.png";
import pochacco from "../images/pochaccoNoBackground.png";
import kittyMouse from "../images/kittyMouse.png";
import pochaccoMouse from "../images/pochaccoMouse.png";
import backgroundImg from "../images/background.jpg";

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

type HeaderProps = {
  fullScreen: boolean;
  x: number;
  y: number;
};

const HeaderImgPositionWeight = {
  x: 0,
  y: 0,
};

let headerMove = false;

const Header = styled.div<HeaderProps>`
  font-family: "Dongle", sans-serif;
  width: 100%;
  // fullscrren이 true 일때
  height: ${(props: { fullScreen: boolean }) =>
    props.fullScreen ? "1000px" : "100px"};

  box-sizing: border-box;
  font-size: 55px;
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImg});
  background-size: cover;

  transition: 3s;
  color: #ffffff;

  // 마우스 위치에 따라 background 이미지 위치 수정
  /* background-position: ${(props: { x: number; y: number }) =>
    `${~~(-props.x / 30)}px ${~~(-props.y / 30)}px`}; */

  // 마우스 위치에 따라 background 이미지 위치 수정
  background-position: ${(props: { x: number; y: number }) => {
    if (props.x > window.innerWidth / 2) {
      HeaderImgPositionWeight.x -= 10;
    } else {
      HeaderImgPositionWeight.x += 10;
    }

    if (props.y > window.innerHeight / 2) {
      HeaderImgPositionWeight.y -= 10;
    } else {
      HeaderImgPositionWeight.y += 10;
    }

    return headerMove
      ? `${HeaderImgPositionWeight.x + ~~(-props.x / 30)}px ${
          HeaderImgPositionWeight.y + ~~(-props.y / 30)
        }px`
      : `${~~(-props.x / 30)}px ${~~(-props.y / 30)}px`;
  }};
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
  width: 300px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }

  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  img {
    width: 44%;
    height: 45%;
    margin: 10px 0 0 0;
  }
  .active {
    animation: ${fadeImage} 1.2s;
    animation-iteration-count: 3;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  transition: 1s;

  animation: ${fadeIn} 5s;
  font-size: 50px;

  .lotteryResult {
    width: 30%;
    height: 30%;
    object-fit: contain;
    animation: ${slideDown} 1s;
    padding: 2px;
    transition: 1s;

    border-radius: 15px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.7);
    }
  }

  .nameBox {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    margin-top: 10px;
    animation: ${slideDown} 1s;
    transition: 1s;
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

  img {
    width: 140%;
    object-fit: contain;
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

const mouseImages = {
  kitty: kitty,
  mymelody: mymelody,
  pompompurin: pompompurin,
  pochacco: pochacco,
  basekitty: kittyMouse,
};

const Home = () => {
  const [activeImage, setactiveImage] = useState(characters[0]);

  const [fadeTime, setfadeTime] = useState(1000);

  const [lotteryResult, setLotteryResult] = useState({
    name: "",
    image: "",
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawn, setIsDrawn] = useState(false);

  // 마우스를 따라다니는 이미지
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseImage, setMouseImage] = useState([kittyMouse]);

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
    if (isDrawn) return;

    const interval = setInterval(() => {
      const max = characters.length;
      const beforeIndex = characters.findIndex(
        (character) => character.name === activeImage.name
      );
      const nextIndex = beforeIndex + 1 === max ? 0 : beforeIndex + 1;
      setactiveImage(characters[nextIndex]);
    }, fadeTime);

    return () => clearInterval(interval);
  }, [activeImage, fadeTime, isDrawn]);

  /** 마우스 이벤트 */

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Header
        x={mousePosition.x}
        y={mousePosition.y}
        fullScreen={mouseImage.length >= 4}
      >
        산리오 캐릭터즈 칙칙폭폭
      </Header>
      <HomeStyle className="Home">
        <GhachaContainer>
          <img ref={kittyRef} src={kitty} alt="kitty" />
          <img ref={mymelodyRef} src={mymelody} alt="mymelody" />
          <img ref={pompompurinRef} src={pompompurin} alt="pompompurin" />
          <img ref={pochaccoRef} src={pochacco} alt="pochacco" />
        </GhachaContainer>
        <Button
          onClick={() => {
            if (isDrawing) return;

            setfadeTime(200);
            setIsDrawing(true);
            setTimeout(() => {
              setfadeTime(1000);
              const randomIndex = Math.floor(Math.random() * 4);
              setLotteryResult(characters[randomIndex]);
              setactiveImage(characters[randomIndex]);
              // setactiveImage(characters[3]);
              // setLotteryResult(characters[3]);

              // 이벤트를 위한 코드로 삭제 요망
              const isFirst = localStorage.getItem("isFirst");
              if (!isFirst) {
                localStorage.setItem("isFirst", "true");
                setactiveImage(characters[3]);
                setLotteryResult(characters[3]);
              }
              // 여기까지

              setIsDrawing(false);
              setIsDrawn(true);
              setTimeout(() => {
                setIsDrawn(false);
              }, 2000);
            }, 6000);
          }}
        >
          뽑기
        </Button>

        {lotteryResult.name !== "" && !isDrawing && (
          <LotteryResultContainer>
            {lotteryResult && (
              <>
                <img
                  onClick={() => {
                    if (
                      mouseImage.includes(
                        mouseImages[
                          lotteryResult.name as keyof typeof mouseImages
                        ]
                      )
                    ) {
                      return;
                    }

                    // basekitty 이미지가 있다면 교체
                    if (mouseImage.includes(mouseImages.basekitty)) {
                      setMouseImage([
                        mouseImages[
                          lotteryResult.name as keyof typeof mouseImages
                        ],
                      ]);
                      return;
                    }

                    setMouseImage([
                      ...mouseImage,
                      mouseImages[
                        lotteryResult.name as keyof typeof mouseImages
                      ],
                    ]);
                  }}
                  className="lotteryResult"
                  src={lotteryResult.image}
                  alt={lotteryResult.name}
                ></img>
                <div className="nameBox">{lotteryResult.name}</div>
              </>
            )}
          </LotteryResultContainer>
        )}
      </HomeStyle>
      <MouseStyle
        x={
          mousePosition.x > window.innerWidth - 50
            ? window.innerWidth - 70
            : mousePosition.x
        }
        y={
          mousePosition.y > window.innerHeight - 50
            ? window.innerHeight - 70
            : mousePosition.y
        }
      >
        <img src={mouseImage[0]} alt="Mouse"></img>
      </MouseStyle>
      {mouseImage.length >= 2 && (
        <MouseStyle
          x={
            mousePosition.x > window.innerWidth - 50
              ? window.innerWidth - 70
              : mousePosition.x + 20
          }
          y={
            mousePosition.y > window.innerHeight - 50
              ? window.innerHeight - 70
              : mousePosition.y + 30
          }
        >
          <img src={mouseImage[1]} alt="Mouse"></img>
        </MouseStyle>
      )}
      {mouseImage.length >= 3 && (
        <MouseStyle
          x={
            mousePosition.x > window.innerWidth - 50
              ? window.innerWidth - 70
              : mousePosition.x + 40
          }
          y={
            mousePosition.y > window.innerHeight - 50
              ? window.innerHeight - 70
              : mousePosition.y + 10
          }
        >
          <img src={mouseImage[2]} alt="Mouse"></img>
        </MouseStyle>
      )}
      {mouseImage.length >= 4 && (
        <MouseStyle
          x={
            mousePosition.x > window.innerWidth - 50
              ? window.innerWidth - 70
              : mousePosition.x + 60
          }
          y={
            mousePosition.y > window.innerHeight - 50
              ? window.innerHeight - 70
              : mousePosition.y + 40
          }
        >
          <img src={mouseImage[3]} alt="Mouse"></img>
        </MouseStyle>
      )}
    </div>
  );
};

export default Home;
