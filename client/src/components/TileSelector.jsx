import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import Tile from "./Tile";

const TileSelectorDiv = styled.div.attrs((props)=>({
    style : {
        left: props.position.x-150,
        top: props.position.y-200,
    }
}))`
position: absolute;
background-color: rgb(255, 100, 20);
height: 420px;
width: 300px;
text-align: center;
`

const TileSelector = ()=>{

    const {state, dispatch} = useContext(LevelMakerContext)


    const unitTypes = [{id: 0, type:"player"}, {id: 1, type:"enemy"}, {id: 2, type:"wall"}].map((type)=>{
        return (
            <Tile key={type.id} type={type.type}/>
        )
    });

    
    const handleInput = (e)=>{
        dispatch({type:"GetMapName", mapName: e.target.value})
    };


    return (
        <>
        <TileSelectorDiv position={state.tileSelectorPosition}>
        <h2>Select Tiles here</h2>
        <label htmlFor="map-name">Map Name</label>
        <br />
        <input onChange={handleInput} type="text" id="map-name" value={state.mapData.name?state.mapData.name:" "}/>
        <br />
        <button onClick={()=>{dispatch({type: "SaveMapToDb"})}}>Save map</button>
        {unitTypes}
        </TileSelectorDiv>
        </>
    )
};

export default TileSelector