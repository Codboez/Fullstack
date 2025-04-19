import axios from "axios";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

export const getDiaryEntries = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const response = await axios.get("http://localhost:3000/api/diaries");
  return response.data;
};

export const addDiaryEntry = async (diaryEntry: NewDiaryEntry) => {
  try {
    const response = await axios.post("http://localhost:3000/api/diaries", diaryEntry);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    } else {
      console.error(error);
    }
  }
  
};