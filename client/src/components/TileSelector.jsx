import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import Tile from "./Tile";
import ducky from "../static/DuckyPlayer.png"
import wallSprite from "../static/wall2.png"
import enemySprite from "../static/enemy.png"

const TileSelectorDiv = styled.div.attrs((props)=>({
    style : {
        left: props.position.x-150,
        top: props.position.y-200,
    }
}))`
position: absolute;
background-color: rgb(120, 110, 190);
height: 420px;
width: 300px;
display: grid;
grid-template-columns: 1fr ;
gap: 10px;
text-align: center;
padding-top: 20px;
padding-bottom: 20px;
border-radius: 50px;
`

const TileSelector = ()=>{

    const {state, dispatch} = useContext(LevelMakerContext)


    const unitTypes = [{id: 0, type:"player", img: ducky}, {id: 1, type:"enemy", img: enemySprite}, {id: 2, type:"wall", img: wallSprite}].map((type)=>{
        return (
            <Tile key={type.id} type={type.type} img={type.img}></Tile>
        )
    });

    
    const handleInput = (e)=>{
        dispatch({type:"GetMapName", mapName: e.target.value})
    };


    return (
        <>
        <TileSelectorDiv position={state.tileSelectorPosition}>
        <form>
        <label htmlFor="map-name">Name your map!</label>
        <br />
        <input onChange={handleInput} type="text" id="map-name" value={state.mapData.name?state.mapData.name:" "}/>
        <br />
        <button onClick={()=>{dispatch({type: "SaveMapToDb"})}}>Save map</button>
        </form>
        {unitTypes}
        </TileSelectorDiv>
        </>
    )
};

export default TileSelector