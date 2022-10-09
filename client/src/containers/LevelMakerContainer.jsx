import { createContext, useEffect, useReducer } from "react";
import MapCreator from "../components/MapCreator";
import MouseTile from "../components/MouseTile";
import TileSelector from "../components/TileSelector";
import gameRepo from "../repositories/gameRepo";

export const LevelMakerContext = createContext(null)

const reducer = (state, action)=>{

    switch (action.type){

        case "TrackMousePosition":
            return {...state, selectedTile: {...state.selectedTile, position: action.position }}

        case "ToggleTileSelector":
            if (!state.displayTileSelector){
                return {...state, displayTileSelector: true, tileSelectorPosition: {...state.selectedTile.position}}
            }else{
                return {...state, displayTileSelector: false}
            }

        case "SelectTileType":
            return {...state, selectedTile: {...state.selectedTile, tileType: action.tileType }}

        case "ClearTileType":
            return  {...state, selectedTile: {...state.selectedTile, tileType: null }}

        case "AddUnitToMap":
            if (!state.displayTileSelector){
                if (state.selectedTile.tileType === "enemy"){
                    return {...state, mapData: {...state.mapData, enemies: [...state.mapData.enemies, {...state.selectedTile, _id: Date.now()}]}}
                }else if (state.selectedTile.tileType === "player"){
                    return {...state, mapData: {...state.mapData, player: [{...state.selectedTile, _id: Date.now()}]}}
                }else if(state.selectedTile.tileType === "wall"){
                    return {...state, mapData: {...state.mapData, walls: [...state.mapData.walls, {...state.selectedTile, _id: Date.now()}]}}
                }
            }
            return state

        case "GetMapName":
            return {...state, mapData: {...state.mapData, name: action.mapName}}

        case "SaveMapToDb":
            gameRepo.SaveMapToDb(state.mapData)
            return {...state, mapData: {name: null, enemies: [], walls: [], player:[]}}

        case "ClearMap":
            return state

        default:
            return state
        }
    } 

const LevelMakerContainer = ()=>{

    const initialStates = {
        tileSelectorPosition: {x: 250, y: 250},
        displayTileSelector: false,
        selectedTile: {tileType: null, position: {}},
        mapData: {name: null, enemies: [], walls: [], player:[]}
    }
    
    const [state, dispatch] = useReducer(reducer, initialStates)

    const trackMouse = (e)=>{
        const mouseX = e.clientX
        const mouseY = e.clientY
        const newPosition = {x: mouseX, y: mouseY}
        dispatch({type: "TrackMousePosition", position: newPosition})

    };

    const handleKeyPress = (e) => {
        const key = e.key
        if (key === "t"){
            dispatch({type: "ToggleTileSelector"})
        }else if (key ==="r"){
            dispatch({type: "ClearTileType"})

        }
    }

    useEffect(()=>{
        document.addEventListener("mousemove", (e)=>{trackMouse(e)})
        document.addEventListener("keypress", handleKeyPress)
    }, [])

    return (
        <>
        <LevelMakerContext.Provider value={{state, dispatch}}>
        <h1>This will be the level Maker</h1>
        
        {state.selectedTile.tileType? <MouseTile/>: null}
        {state.displayTileSelector ? <TileSelector/>: null}
        <MapCreator/>
        </LevelMakerContext.Provider>
        </>
    )
};

export default LevelMakerContainer