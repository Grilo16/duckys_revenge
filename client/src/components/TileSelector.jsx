import { useState } from "react";
import styled from "styled-components"
import Tile from "./Tile";

const TileSelectorDiv = styled.div.attrs((props)=>({
    style : {
        left: props.position.x,
        top: props.position.y,
    }
}))`
position: absolute;
background-color: rgb(255, 100, 20);
height: 420px;
width: 300px;
text-align: center;
`

const TileSelector = ()=>{

    const [mockLocation, setMockLocation] = useState({x: 1350, y:250})


    return (
        <TileSelectorDiv position={mockLocation}>
        <h2>Select Tiles here</h2>
        <Tile/>
        <Tile/>
        <Tile/>
        </TileSelectorDiv>
    )
};

export default TileSelector