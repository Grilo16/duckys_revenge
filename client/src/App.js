import { createContext, useEffect, useReducer, useState } from "react";
import GameContainer from "./containers/GameContainer";
import gameRepo from "./repositories/gameRepo";

export const AppContext = createContext(null);

const SPEED = 10;
const characterSize = { height: 100, width: 100 };
const enemySize = { height: 50, width: 50 };
const projectileSize = { height: 5, width: 5 }

const reducer = (state, action) => {
  const checkValidMove = (newPos, objSize) => {
    const isValid = state.invalidAreas.filter((invalidArea) => {
      if (
        newPos.x > invalidArea.x - objSize.width &&
        newPos.x < invalidArea.x + enemySize.width &&
        newPos.y > invalidArea.y - objSize.height &&
        newPos.y < invalidArea.y + enemySize.height
      ) {
        return true;
      }
      return false;
    });
    return isValid.length === 0;
  };
 
  const checkProjectileHit = (newPos, objSize) => {
    const enemyHit = state.enemyList.filter((enemy) => {
      if (
        newPos.x > enemy.positions.x - objSize.width &&
        newPos.x < enemy.positions.x + enemySize.width &&
        newPos.y > enemy.positions.y - objSize.height &&
        newPos.y < enemy.positions.y + enemySize.height
      ) {
        return true;
      }
      return false;
    });
    if (enemyHit.length === 1){
      return enemyHit[0]
    }
    return false
  };

  
  switch (action.type) {
    case "LoadPlayer":
      return { ...state, playerPosition: action.res[0].positions };

    case "LoadEnemies":
      return {
        ...state,
        enemyList: action.res,
        invalidAreas: action.res.map((enemy) => enemy.positions),
      };

    case "MovePlayerUp":
      const moveUp = {
        x: state.playerPosition.x,
        y: state.playerPosition.y - SPEED,
      };
      if (checkValidMove(moveUp, characterSize )) {
        return { ...state, playerPosition: moveUp, playerOrientation: "up" };
      }
      return state;

    case "MovePlayerDown":
      const moveDown = {
        x: state.playerPosition.x,
        y: state.playerPosition.y + SPEED,
      };
      if (checkValidMove(moveDown, characterSize)) {
        return { ...state, playerPosition: moveDown, playerOrientation: "down" };
      }
      return state;

    case "MovePlayerLeft":
      const moveLeft = {
        x: state.playerPosition.x - SPEED,
        y: state.playerPosition.y,
      };
      if (checkValidMove(moveLeft, characterSize)) {
        return { ...state, playerPosition: moveLeft, playerOrientation: "left" };
      }
      return state;

    case "MovePlayerRight":
      const moveRight = {
        x: state.playerPosition.x + SPEED,
        y: state.playerPosition.y,
      };
      if (checkValidMove(moveRight, characterSize)) {
        return { ...state, playerPosition: moveRight, playerOrientation: "right" };
      }
      return state;

    case "FireProjectile":
      let startPosition;
      if (state.playerOrientation === "up"){
        startPosition = {x: state.playerPosition.x +50, y: state.playerPosition.y}
      }else if(state.playerOrientation === "down"){
        startPosition = {x: state.playerPosition.x +50, y: state.playerPosition.y +100}
      }else if(state.playerOrientation === "right"){
        startPosition = {x: state.playerPosition.x +100, y: state.playerPosition.y +50}
      }else if(state.playerOrientation === "left"){
        startPosition = {x: state.playerPosition.x, y: state.playerPosition.y +50}
      }

      
      const projectileModel = {id: Date.now(), direction: state.playerOrientation, position: startPosition }
      return {...state, projectiles: [...state.projectiles, projectileModel]};

    case "CheckHit":
      const enemyHit = checkProjectileHit(action.position, projectileSize)
      if (enemyHit){
        const newEnemyList = [...state.enemyList.filter((enemy)=> enemy._id !== enemyHit._id)]
        const newInvalidAreas = [...state.invalidAreas.filter((coords) => coords !== enemyHit.positions)]

        return {...state, projectiles: [...state.projectiles.filter((projectile)=> projectile.id !== action.id)], enemyList: newEnemyList, invalidAreas: newInvalidAreas}
      }

      return state
      
    case "ClearLastProjectile":
      const newProjectiles = [...state.projectiles].filter(obj => obj.id !== action.id)
      return {...state, projectiles: newProjectiles};

    case "DeleteEnemy":
      const newEnemyList = [...state.enemyList.filter((enemy)=> enemy._id !== action.id)]
      const newInvalidAreas = [...state.invalidAreas.filter((coords) => coords !== action.position)]
      return {...state, enemyList: newEnemyList, invalidAreas: newInvalidAreas};

    default:
      return state;
  }
};

function App() {

  const initialStates = {
    playerOrientation : "right",
    playerPosition: {},
    enemyList: [],
    invalidAreas: [],
    projectiles: [],
  };

  const [state, dispatch] = useReducer(reducer, initialStates);

  useEffect(() => {
    gameRepo.getPlayers().then((res) => dispatch({ type: "LoadPlayer", res }));

    gameRepo.getEnemies().then((res) => dispatch({ type: "LoadEnemies", res }));
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, characterSize, enemySize, projectileSize }}>
      <GameContainer />
    </AppContext.Provider>
  );
}

export default App;
