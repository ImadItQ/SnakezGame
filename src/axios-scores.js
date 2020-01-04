import axios from "axios";

const instance = axios.create({
  baseURL: "https://snake-game-620ab.firebaseio.com/"
});

export default instance;
