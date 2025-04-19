import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, convertExercisesToNumber, convertTargetToNumber } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
    res.json({
      weight: req.query.weight,
      height: req.query.height,
      bmi
    });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.json({
      error: errorMessage
    });
  }
});

app.post("/exercises", (req: Request<null, null, { daily_exercises: number[], target: number }>, res: Response) => {
  const { daily_exercises, target } = req.body;
  
  if (daily_exercises === undefined || target === undefined) {
    res.json({ error: "Parameters missing" });
  }

  try {
    const exerciseResult = calculateExercises(convertExercisesToNumber(daily_exercises), convertTargetToNumber(target));
    res.json(exerciseResult);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.json({
      error: errorMessage
    });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});