import { createContext, useEffect, useReducer } from "react";
import Enemy from "../components/Enemy";
import GameMenu from "../components/GameMenu";
import PlayerCharacter from "../components/PlayerCharacter";
import Projectile from "../components/Projectile";
import Walls from "../components/Walls";
import gameRepo from "../repositories/gameRepo";


export const AppContext = createContext(null);

const SPEED = 10;
const characterSize = { height: 100, width: 100 };
const unitSize = { height: 50, width: 50 };
const projectileSize = { height: 5, width: 5 }

const reducer = (state, action) => {
  const checkValidMove = (newPos, objSize) => {
    const isValid = state.invalidAreas.filter((invalidArea) => {
      if (
        newPos.x > invalidArea.x - objSize.width &&
        newPos.x < invalidArea.x + unitSize.width &&
        newPos.y > invalidArea.y - objSize.height &&
        newPos.y < invalidArea.y + unitSize.height
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
        newPos.x > enemy.position.x - objSize.width &&
        newPos.x < enemy.position.x + unitSize.width &&
        newPos.y > enemy.position.y - objSize.height &&
        newPos.y < enemy.position.y + unitSize.height
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

    case "LoadMapList":
      return {...state, selectedMapId: action.res[0]._id, mapList: [...action.res.map((mapObj)=>{return {name: mapObj.name, _id: mapObj._id}})]}

    case "LoadMap":
      return { ...state, playerPosition: action.res[0].player[0].position, enemyList: action.res[0].enemies, walls: action.res[0].walls, selectedMap: {name : action.res[0].name, id: action.res[0]._id }, invalidAreas: [...action.res[0].enemies.map((enemy)=>enemy.position), ...action.res[0].walls.map((wall)=>wall.position)], nextMapId: action.res[0]._id};

    case "PreLoadNextMap":
      return {...state, nextMapId: action.map}

    case "MovePlayerUp":
      if (state.showGameMenu){
        return state
      }
      const moveUp = {
        x: state.playerPosition.x,
        y: state.playerPosition.y - SPEED,
      };
      if (checkValidMove(moveUp, characterSize)) {
        return { ...state, playerPosition: moveUp, playerOrientation: "up" };
      }
      return {...state, playerOrientation: "up"};

    case "MovePlayerDown":
      if (state.showGameMenu){
        return state
      }
      const moveDown = {
        x: state.playerPosition.x,
        y: state.playerPosition.y + SPEED,
      };
      if (checkValidMove(moveDown, characterSize)) {
        return { ...state, playerPosition: moveDown, playerOrientation: "down" };
      }
      return {...state, playerOrientation: "down"};

    case "MovePlayerLeft":
      if (state.showGameMenu){
        return state
      }
      const moveLeft = {
        x: state.playerPosition.x - SPEED,
        y: state.playerPosition.y,
      };
      if (checkValidMove(moveLeft, characterSize)) {
        return { ...state, playerPosition: moveLeft, playerOrientation: "left" };
      }
      return {...state, playerOrientation: "left"};

    case "MovePlayerRight":
      if (state.showGameMenu){
        return state
      }
      const moveRight = {
        x: state.playerPosition.x + SPEED,
        y: state.playerPosition.y,
      };
      if (checkValidMove(moveRight, characterSize)) {
        return { ...state, playerPosition: moveRight, playerOrientation: "right" };
      }
      return {...state, playerOrientation: "right"};

    case "FireProjectile":
      if (state.showGameMenu){
        return state
      }
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
        const newInvalidAreas = [...state.invalidAreas.filter((coords) => coords !== enemyHit.position)]

        return {...state, projectiles: [...state.projectiles.filter((projectile)=> projectile.id !== action.id)], enemyList: newEnemyList, invalidAreas: newInvalidAreas}
      }else if (!checkValidMove(action.position, projectileSize)){
        return {...state, projectiles: [...state.projectiles.filter((projectile)=> projectile.id !== action.id)]}
      }

      return state
      
    case "ClearLastProjectile":
      const newProjectiles = [...state.projectiles].filter(obj => obj.id !== action.id)
      return {...state, projectiles: newProjectiles};

    case "DeleteEnemy":
      const newEnemyList = [...state.enemyList.filter((enemy)=> enemy._id !== action.id)]
      const newInvalidAreas = [...state.invalidAreas.filter((coords) => coords !== action.position)]
      return {...state, enemyList: newEnemyList, invalidAreas: newInvalidAreas};

    case "ToggleGameMenu":
      const invertShowGameMenu = !state.showGameMenu
      return {...state, showGameMenu : invertShowGameMenu}

    default:
      return state;
  }
};

const GameContainer = () => {
  
  const initialStates = {
    selectedMap: {},
    playerOrientation : "right",
    playerPosition: {},
    enemyList: [],
    invalidAreas: [],
    projectiles: [],
    walls: [],
    mapList: [],
    nextMapId: null,
    showGameMenu: false,
  };

  const [state, dispatch] = useReducer(reducer, initialStates);
  
  
  useEffect(() => {
    gameRepo.getAllMaps().then((res)=>{dispatch({type: "LoadMapList", res}); return res[0]._id})
    .then(gameRepo.getMapById)
    .then((res) => dispatch({type: "LoadMap", res}))
  }, []);

  const walls = state.walls.map((wall)=>{
    return (
      <Walls key={wall._id} wall={wall}/>
    )
  })
  
  const enemies = state.enemyList.map((enemy) => {
    return <Enemy key={enemy._id} enemy={enemy} />;
  });

  const projectiles = state.projectiles.map((projectile)=>{
    return (
      <Projectile key={projectile.id} projectile={projectile}/>
    )
  })

  return (
      <AppContext.Provider value={{ state, dispatch, characterSize, unitSize, projectileSize }}>
      <div id="game-div">
      <PlayerCharacter />
      {enemies}
      {walls}      
      {state.projectiles.length ? projectiles : null}
      {state.showGameMenu? <GameMenu/> : null }
      </div>
      </AppContext.Provider>
  );
};

export default GameContainer;
