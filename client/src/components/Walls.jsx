import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../containers/GameContainer";


let WallDiv = styled.div.attrs(props =>({
    style: {
        left: props.position.x,
        top: props.position.y,
        height: props.dimensions.height,
        width: props.dimensions.width,
    }
}))`
position: absolute;
background-color: rgb(0,255,255);
`;

const Walls = ({wall}) => {

    const {unitSize} = useContext(AppContext)

    return (
        <WallDiv position={wall.position} dimensions={unitSize}>
        </WallDiv>

    )
};

export default Walls