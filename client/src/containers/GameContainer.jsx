import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import Enemy from "../components/Enemy";
import PlayerCharacter from "../components/PlayerCharacter";
import Projectile from "../components/Projectile";
import Walls from "../components/Walls";

const GameContainer = () => {

  const mockWall = {_id : Date.now(), position: {x: 150, y: 150}, dimensions: {height: 150, width: 50 }}
  const mockWallList = [
  ]

  const { state } = useContext(AppContext);

  const enemies = state.enemyList.map((enemy) => {
    return <Enemy key={enemy._id} enemy={enemy} />;
  });

  const projectiles = state.projectiles.map((projectile)=>{
    return (
      <Projectile key={projectile.id} projectile={projectile}/>
    )
  })

  return (
    <>
      <h1>Player Position</h1>
      <h3>Player x : {state.playerPosition.x}</h3>
      <h3>Player y : {state.playerPosition.y}</h3>

      <PlayerCharacter />
      {enemies}
      {state.projectiles.length ? projectiles : null}
      <Walls/>
      
    </>
  );
};

export default GameContainer;
