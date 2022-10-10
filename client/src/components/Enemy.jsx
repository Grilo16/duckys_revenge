import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../containers/GameContainer";
import enemySprite from "../static/enemy.png"

let EnemyDiv = styled.div.attrs(props =>({
    style: {
        left: props.xPos,
        top: props.yPos,
        height: props.enemySize.height,
        width: props.enemySize.width,
    }
}))`
position: absolute;
`;


const Enemy = ({enemy}) => {
    
    const {state, dispatch, unitSize} = useContext(AppContext)

    const xPos = enemy.position.x
    const yPos = enemy.position.y

    return (
        <EnemyDiv enemySize={unitSize} xPos={xPos} yPos={yPos}>
            <img src={enemySprite} alt="" height={unitSize.height+20} width={unitSize.width+35} style={{position: "absolute", left: "-20px", top: "-10px"}}/>
        </EnemyDiv>
    )
};

export default Enemy