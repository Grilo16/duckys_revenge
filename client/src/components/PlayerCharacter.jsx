import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../containers/GameContainer";

import ducky from "../static/DuckyPlayer.png"

let CharacterDiv = styled.div.attrs(props =>({
    style: {
        left: props.xPos,
        top: props.yPos,
        height: props.characterSize.height,
        width: props.characterSize.width,
    }
}))`
position: absolute;
`;

const PlayerCharacter = () => {
  
  const {state, characterSize, dispatch} = useContext(AppContext)
  
  const xPos = state.playerPosition.x
  const yPos = state.playerPosition.y
  
  
  useEffect(() => {
    document.addEventListener("keydown", playerAction);
  }, []);
  
  
  const myRef = useRef(null)
  const executeScroll = (myRef) =>  myRef.current.scrollIntoView({ behavior: "auto", block: "center", inline: "center"});
  
  const playerAction = (e) => {
    if (e.key.includes("Arrow")) {
      
      if (e.key === "ArrowUp") {
        dispatch({ type: "MovePlayerUp" });
      } else if (e.key === "ArrowDown") {
        dispatch({ type: "MovePlayerDown" });
      } else if (e.key === "ArrowRight") {
        dispatch({ type: "MovePlayerRight" });
      } else if (e.key === "ArrowLeft") {
        dispatch({ type: "MovePlayerLeft" });
      }
      executeScroll(myRef)
    }else if(e.key === " "){
        dispatch({type: "FireProjectile"})

    }else if(e.key === "!"){
        dispatch({type: "ToggleGameMenu"})
    }
  };

  const playerOrientation = () => {
    if (state.playerOrientation === "right"){
        return "rotate(180deg)"
    }else if (state.playerOrientation === "left"){
        return "rotate(0deg)"
    }else if (state.playerOrientation === "up"){
        return "rotate(90deg)"
    }else if (state.playerOrientation === "down"){
        return "rotate(270deg)"
    }
  };

    return (
        <CharacterDiv ref={myRef} characterSize={characterSize} xPos={xPos} yPos={yPos}>
            <img src={ducky} alt="" height={100} width={100} style={{margin: 0, transform: playerOrientation()}}/>
        </CharacterDiv>
    )
};
export default PlayerCharacter