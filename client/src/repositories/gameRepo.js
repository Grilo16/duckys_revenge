

const gameRepo = {
  async getPlayers() {
    const response = await fetch("http://localhost:9000/all");
    return response
      .json()
      .then((gameLog) => gameLog.filter((unit) => unit.type === "player"));
  },

  async getEnemies() {
    const response = await fetch("http://localhost:9000/all");
    return response.json().then((gameLog) => {
      return gameLog.filter((unit) => unit.type === "enemy");
    });
  },

  async getWalls() {
    const response = await fetch("http://localhost:9000/all");
    return response.json().then((gameLog) => {
      return gameLog.filter((unit) => unit.type === "wall");
    });
  },
};

export default gameRepo;
