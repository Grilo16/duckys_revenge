import { useContext, useEffect } from "react";
import { LevelMakerContext } from "../containers/LevelMakerContainer";
import styled from "styled-components"

const MapCanvasDiv = styled.div.attrs((props)=>({
    style:{
        width: 1000,
        height: 690,
    }
}))`
margin-left: 90px ;
background-color: rgb(255,0,0);
`


const MapCreator = () => {

    const {state, dispatch} = useContext(LevelMakerContext)

    useEffect(()=>{
        document.addEventListener("click", ()=>{dispatch({type: "AddUnitToMap"})})
    }, [])

    const handleInput = (e)=>{
        dispatch({type:"GetMapName", mapName: e.target.value})
    };


    return (
        <>
        <label htmlFor="map-name">Map Name</label>
        <br />
        <input onChange={handleInput} type="text" id="map-name" value={state.mapData.name?state.mapData.name:" "}/>
        <br />
        <button onClick={()=>{dispatch({type: "SaveMapToDb"})}}>Save map</button>
        </>
    )
};


export default MapCreator