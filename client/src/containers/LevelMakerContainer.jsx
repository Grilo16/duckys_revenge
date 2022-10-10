import { createContext, useReducer } from "react";
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
            const status = !state.displayTileSelector
                return {...state, displayTileSelector: status, tileSelectorPosition: {...state.selectedTile.position}}

        case "SelectTileType":
            return {...state, selectedTile: {...state.selectedTile, tileType: action.tileType }}

        case "ClearTileType":
            return  {...state, selectedTile: {...state.selectedTile, tileType: null }}

        case "AddUnitToMap":
            if (!state.displayTileSelector){
                if (state.selectedTile.tileType === "enemy"){
                    return {...state, mapData: {...state.mapData, enemies: [...state.mapData.enemies, {...state.selectedTile, _id: Math.floor(Math.random() * Date.now())}]}}
                }else if (state.selectedTile.tileType === "player"){
                    return {...state, mapData: {...state.mapData, player: [{...state.selectedTile, _id: Math.floor(Math.random() * Date.now())}]}}
                }else if(state.selectedTile.tileType === "wall"){
                    return {...state, mapData: {...state.mapData, walls: [...state.mapData.walls, {...state.selectedTile, _id: Math.floor(Math.random() * Date.now())}]}}
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


    return (
        <>
        <LevelMakerContext.Provider value={{state, dispatch}}>
        <MapCreator />
        {state.selectedTile.tileType? <MouseTile/>: null}
        {state.displayTileSelector ? <TileSelector/>: null}
        </LevelMakerContext.Provider>
        </>
        
    )
};

export default LevelMakerContainer