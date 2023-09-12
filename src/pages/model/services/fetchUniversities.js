import axios from "axios";

export const fetchUniversities = async (country) => {
  try {
    return await axios.get(`http://universities.hipolabs.com/search?country=${country}`)
  } catch (e) {
    console.error(e);
  }
};
