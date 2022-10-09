import { useContext } from "react";
import styled from "styled-components";
import { LevelMakerContext } from "../containers/LevelMakerContainer";

let TileSelectDiv = styled.div.attrs(props =>({
    style: {
        height: 100,
        width: 100,
    }
}))`
margin-left: 100px;
background-color: rgb(255,0,255);
`;

const Tile = ({type})=>{

    const {state, dispatch} = useContext(LevelMakerContext)



    return (
        <>
        <TileSelectDiv onClick={()=>{dispatch({type: "SelectTileType", tileType: type })}}>
        <h4>Tile</h4>
        <p>{type}</p>
        </TileSelectDiv>
        </>

    )
};

export default Tile