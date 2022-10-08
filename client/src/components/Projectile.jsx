import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../App";



let ProjectileDiv = styled.div.attrs(props =>({
    style: {
        left: props.startPos.x,
        top: props.startPos.y,
        height: props.projectileSize.height,
        width: props.projectileSize.width,
    }
}))`
position: absolute;
background-color: rgb(0,255,255);
`;

const Projectile = ({projectile}) => {
    
    const {projectileSize, dispatch} = useContext(AppContext)
    const [position, setPosition] = useState(projectile.position )
    
    const moveProjectile = ()=>{
        
        let direction = projectile.direction
        
        if (direction === "right"){
            setPosition((position)=>{return {...position, x: position.x+=5}})
        }else if (direction === "left"){
            setPosition((position)=>{return {...position, x: position.x-=5}})
        }else if (direction === "up"){
            setPosition((position)=>{return {...position, y: position.y-=5}})
        }else if (direction === "down"){
            setPosition((position)=>{return {...position, y: position.y+=5}})
        }
        dispatch({type: "CheckHit", position: position, id:projectile.id, direction: projectile.direction})
    };

    useEffect(()=>{
        
        setTimeout(function() {dispatch({type: "ClearLastProjectile", id: projectile.id})}, 2000)

        let moveInterval;
        moveInterval = setInterval(moveProjectile, 10)

        return () => {
            clearInterval(moveInterval)
        }


    },[position])


    return (
        <>
        <ProjectileDiv projectileSize={projectileSize} startPos={position}>
        <h3>Pew PEW</h3>

        </ProjectileDiv>
        </>
    )
};

export default Projectile