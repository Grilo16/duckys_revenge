

const gameRepo = {

  async SaveMapToDb(mapObject){
      return await fetch("http://localhost:9000/add", {
            method:"POST",
            body: JSON.stringify(mapObject),
            headers : {"Content-Type": "application/json"}
          })
        },
  
  async getMapById(id) {
    const response = await fetch(`http://localhost:9000/${id}`);
    return response.json()
    
  },

  // async getPlayers() {
  //   const response = await fetch("http://localhost:9000/all");
  //   return response
  //     .json()
  //     .then((gameLog) => gameLog.filter((unit) => unit.type === "player"));
  // },

  // async getEnemies() {
  //   const response = await fetch("http://localhost:9000/all");
  //   return response.json().then((gameLog) => {
  //     return gameLog.filter((unit) => unit.type === "enemy");
  //   });
  // },

  // async getWalls() {
  //   const response = await fetch("http://localhost:9000/all");
  //   return response.json().then((gameLog) => {
  //     return gameLog.filter((unit) => unit.type === "wall");
  //   });
  // },

};

export default gameRepo;
