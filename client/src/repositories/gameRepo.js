const gameRepo = {
  async SaveMapToDb(mapObject) {
    return await fetch("http://localhost:9000/add", {
      method: "POST",
      body: JSON.stringify(mapObject),
      headers: { "Content-Type": "application/json" },
    });
  },

  async getMapById(id) {
    const response = await fetch(`http://localhost:9000/${id}`);
    return response.json();
  },

  async getAllMaps() {
    const response = await fetch("http://localhost:9000/all");
    return response.json();
  },
};

export default gameRepo;
