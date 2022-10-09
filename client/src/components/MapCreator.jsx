import { useContext, useEffect } from "react";
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import styled from "styled-components"
import ducky from "../static/DuckyPlayer.png"


let MapCanvasDiv = styled.div.attrs((props)=>({
    style:{
        width: 1000,
        height: 690,
    }
}))`
margin-left: 90px ;
background-color: rgb(255,0,0);
`


let EnemyDiv = styled.div.attrs(props =>({
    style: {
        left: props.enemy.position.x,
        top: props.enemy.position.y,
        height: 50,
        width: 50,
    }
}))`
position: absolute;
background-color: rgb(255,0,255);
`;

let WallDiv = styled.div.attrs(props =>({
    style: {
        left: props.wall.position.x,
        top: props.wall.position.y,
        height: 50,
        width: 50,
    }
}))`
position: absolute;
background-color: rgb(0,255,255);
`;


let CharacterDiv = styled.div.attrs(props =>({
    style: {
        left: props.position.x,
        top: props.position.y,
        height: 100,
        width: 100,
    }
}))`
position: absolute;
`;



const MapCreator = () => {

    const {state, dispatch} = useContext(LevelMakerContext)

    const trackMouse = (e)=>{
        const mouseX = e.clientX
        const mouseY = e.clientY
        const newPosition = {x: mouseX, y: mouseY}
        dispatch({type: "TrackMousePosition", position: newPosition})

    };

    const handleKeyPress = (e) => {
        const key = e.key
        if (key === "!"){
            dispatch({type: "ToggleTileSelector"})
        }else if (key ==='"'){
            dispatch({type: "ClearTileType"})

        }
    }

    const handleClick = ()=>{
            dispatch({type: "AddUnitToMap"})
    };
 
    useEffect(()=>{
        document.addEventListener("mousemove", trackMouse)
        document.addEventListener("keypress", handleKeyPress)
        document.addEventListener("click", handleClick)
    }, [])

    
 


    
    const enemies = state.mapData.enemies.map((enemy) => {
      return (
      <EnemyDiv key={enemy._id} enemy={enemy}/>
      )
    });
  
    const walls = state.mapData.walls.map((wall)=>{
        return (
          <WallDiv key={wall._id} wall={wall}/>
        )
      })



    return (
        <>
        {state.mapData.enemies.length ? enemies :null}
        {state.mapData.walls.length ? walls : null}
        {state.mapData.player.length ? <CharacterDiv position={state.mapData.player[0].position}> <img src={ducky} alt="" height={100} width={100} /> </CharacterDiv> : null}
        </>
    )
};


export default MapCreator