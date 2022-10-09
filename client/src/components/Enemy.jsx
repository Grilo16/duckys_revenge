import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../containers/GameContainer";


let EnemyDiv = styled.div.attrs(props =>({
    style: {
        left: props.xPos,
        top: props.yPos,
        height: props.enemySize.height,
        width: props.enemySize.width,
    }
}))`
position: absolute;
background-color: rgb(255,0,255);
`;


const Enemy = ({enemy}) => {
    
    const {state, dispatch, unitSize} = useContext(AppContext)

    const xPos = enemy.positions.x
    const yPos = enemy.positions.y

    return (
        <EnemyDiv onClick={()=>dispatch({type:"DeleteEnemy", id: enemy._id, position: enemy.positions})} enemySize={unitSize} xPos={xPos} yPos={yPos}>
        </EnemyDiv>
    )
};

export default Enemy