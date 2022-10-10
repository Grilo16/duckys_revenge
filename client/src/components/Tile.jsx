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
`;

const Tile = ({type, img})=>{


    const {state, dispatch} = useContext(LevelMakerContext)

    const tileSize = 100


    return (
        <>
        <TileSelectDiv onClick={()=>{dispatch({type: "SelectTileType", tileType: type })}}>
        <img src={img} alt="" height={tileSize} width={tileSize} style={{margin: "0px"}}/>
        </TileSelectDiv>
        </>

    )
};

export default Tile