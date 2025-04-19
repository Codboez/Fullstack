import { useEffect, useState } from "react";
import DiaryEntries from "./DiaryEntries";
import { NonSensitiveDiaryEntry } from "../types";
import { getDiaryEntries } from "../services/diaryService";
import DiaryEntryForm from "./DiaryEntryForm";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getDiaryEntries().then(entries => setDiaryEntries(entries));
  }, []);

  console.log(diaryEntries);

  return (
    <div>
      <DiaryEntryForm />
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
