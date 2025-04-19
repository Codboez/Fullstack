import { useState } from "react";
import { addDiaryEntry } from "../services/diaryService";
import { Visibility, Weather } from "../types";

const DiaryEntryForm = () => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    };

    try {
      await addDiaryEntry(newDiaryEntry);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };

  return (
    <div>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        date <input type="date" value={date} onChange={event => setDate(event.target.value)} /><br/>
        visibility   
        great<input type="radio" name="visibility" value="great" checked={visibility === Visibility.Great} onChange={handleVisibilityChange} />
        good<input type="radio" name="visibility" value="good" checked={visibility === Visibility.Good} onChange={handleVisibilityChange} />
        ok<input type="radio" name="visibility" value="ok" checked={visibility === Visibility.Ok} onChange={handleVisibilityChange} />
        poor<input type="radio" name="visibility" value="poor" checked={visibility === Visibility.Poor} onChange={handleVisibilityChange} />
        <br/>
        weather   
        sunny<input type="radio" name="weather" value="sunny" checked={weather === Weather.Sunny} onChange={handleWeatherChange} />
        rainy<input type="radio" name="weather" value="rainy" checked={weather === Weather.Rainy} onChange={handleWeatherChange} />
        cloudy<input type="radio" name="weather" value="cloudy" checked={weather === Weather.Cloudy} onChange={handleWeatherChange} />
        stormy<input type="radio" name="weather" value="stormy" checked={weather === Weather.Stormy} onChange={handleWeatherChange} />
        windy<input type="radio" name="weather" value="windy" checked={weather === Weather.Windy} onChange={handleWeatherChange} />
        <br/>
        comment <input value={comment} onChange={event => setComment(event.target.value)} /><br/>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryEntryForm;