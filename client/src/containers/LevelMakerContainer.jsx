import { useEffect, useState } from "react";
import TileSelector from "../components/TileSelector";

const LevelMakerContainer = ()=>{

    const [tileSelector, setTileSelector] = useState(false)

    useEffect(()=>{
        document.addEventListener("click", ()=>{setTileSelector(toggle => !toggle)})

    }, []);

    return (
        <>
        <h1>This will be the level Maker</h1>
        {tileSelector? <TileSelector/>: null}
        </>
    )
};

export default LevelMakerContainer