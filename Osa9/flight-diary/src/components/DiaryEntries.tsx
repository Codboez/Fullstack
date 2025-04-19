import { NonSensitiveDiaryEntry } from "../types";

const DiaryEntries = ({ diaryEntries }: {diaryEntries: NonSensitiveDiaryEntry[]}) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map(entry => 
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          visibility: {entry.visibility} <br />
          weather: {entry.weather}
        </div>
      )}
    </div>
  );
};

export default DiaryEntries;