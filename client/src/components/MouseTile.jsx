import { useContext } from "react";
import styled from "styled-components";
import { LevelMakerContext } from "../containers/LevelMakerContainer";

const MouseTileDiv = styled.div.attrs((props)=>({
    style :{
        top: props.mousePosition.y,
        left: props.mousePosition.x + 50,
        backgroundColor: "rgb(130, 100, 255)", 
    }
}))`
position: absolute;
`


const MouseTile = ()=>{

    const {state, dispatch} = useContext(LevelMakerContext)

    return (
        <MouseTileDiv mousePosition={state.selectedTile.position}>
        <h2>{state.selectedTile.tileType}</h2>

        </MouseTileDiv>
    )
};

export default MouseTile