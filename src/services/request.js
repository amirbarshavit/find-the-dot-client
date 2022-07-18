import axios from "axios";
export const updateScoreBoard = async (data) => {
  try {
    const res = await axios.post("http://localhost:3333/update-user", { data });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
