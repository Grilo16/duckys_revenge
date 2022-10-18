import { createContext, useEffect, useReducer } from "react";
import MapCreator from "../components/MapCreator";
import MouseTile from "../components/MouseTile";
import TileSelector from "../components/TileSelector";
import gameRepo from "../repositories/gameRepo";

export const LevelMakerContext = createContext(null);

const reducer = (state, action) => {

  const checkValidUnitPosition = ()=>{
    if (!state.displayTileSelector){
      return true
    }
    if (state.displayTileSelector) {
      if (
        state.selectedTile.position.x > state.tileSelectorPosition.x - 150 &&
        state.selectedTile.position.x < state.tileSelectorPosition.x + 150 &&
        state.selectedTile.position.y > state.tileSelectorPosition.y - 200 &&
        state.selectedTile.position.y < state.tileSelectorPosition.y + 370
      ) {
        return false
      }
    }
    return true
  }

  switch (action.type) {
    case "TrackMousePosition":
      return {
        ...state,
        selectedTile: { ...state.selectedTile, position: action.position },
      };

    case "ToggleTileSelector":
      const status = !state.displayTileSelector;
      return {
        ...state,
        displayTileSelector: status,
        tileSelectorPosition: { ...state.selectedTile.position },
      };

    case "SelectTileType":
      return {
        ...state,
        selectedTile: { ...state.selectedTile, tileType: action.tileType },
      };

    case "ClearTileType":
      return {
        ...state,
        selectedTile: { ...state.selectedTile, tileType: "none" },
      };

    case "AddUnitToMap":
      const validPosition = checkValidUnitPosition()
      if (validPosition) {
        if (state.selectedTile.tileType === "enemy") {
          return {
            ...state,
            mapData: {
              ...state.mapData,
              enemies: [
                ...state.mapData.enemies,
                {
                  ...state.selectedTile,
                  _id: Math.floor(Math.random() * Date.now()),
                },
              ],
            },
          };
        } else if (state.selectedTile.tileType === "player") {
          return {
            ...state,
            mapData: {
              ...state.mapData,
              player: [
                {
                  ...state.selectedTile,
                  _id: Math.floor(Math.random() * Date.now()),
                },
              ],
            },
          };
        } else if (state.selectedTile.tileType === "wall") {
          return {
            ...state,
            mapData: {
              ...state.mapData,
              walls: [
                ...state.mapData.walls,
                {
                  ...state.selectedTile,
                  _id: Math.floor(Math.random() * Date.now()),
                },
              ],
            },
          };
        }
      }
      return state;

    case "GetMapName":
      return { ...state, mapData: { ...state.mapData, name: action.mapName } };

    case "SaveMapToDb":
      gameRepo.SaveMapToDb(state.mapData);
      return {
        ...state,
        mapData: { name: null, enemies: [], walls: [], player: [] },
      };

    default:
      return state;
  }
};

const LevelMakerContainer = () => {
  const initialStates = {
    tileSelectorPosition: { x: 250, y: 250 },
    displayTileSelector: false,
    selectedTile: { tileType: "none", position: {} },
    mapData: { name: null, enemies: [], walls: [], player: [] },
  };

  const [state, dispatch] = useReducer(reducer, initialStates);

  const trackMouse = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const newPosition = { x: mouseX, y: mouseY };
    dispatch({ type: "TrackMousePosition", position: newPosition });
  };

  const handleKeyPress = (e) => {
    const key = e.key;
    if (key === "Escape") {
      dispatch({ type: "ToggleTileSelector" });
    } else if (key === " ") {
      dispatch({ type: "ClearTileType" });
    }
  };

  const handleClick = () => {
    dispatch({ type: "AddUnitToMap" });
  };

  useEffect(() => {
    document.addEventListener("mousemove", trackMouse);
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClick);
  }, []);

  return (
    <>
      <LevelMakerContext.Provider value={{ state, dispatch }}>
        <MapCreator />
        {state.selectedTile.tileType ? <MouseTile /> : null}
        {state.displayTileSelector ? <TileSelector /> : null}
      </LevelMakerContext.Provider>
    </>
  );
};

export default LevelMakerContainer;
