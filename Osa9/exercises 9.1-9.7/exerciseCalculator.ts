interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): ExerciseResult => {
  const average = hours.reduce((sum, dailyHours) => sum + dailyHours, 0) / hours.length;
  const rating = Math.max(Math.floor(Math.min(average - target, 0)) + 3, 1);

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(dayHours => dayHours > 0).length,
    success: average >= target,
    rating,
    ratingDescription: getRatingDescription(rating),
    target,
    average
  };
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return "You can do better";
    case 2:
      return "Not too bad but could be better";
    case 3:
      return "Well done";
    default:
      throw new Error("Invalid rating");
  }
};

export const convertExercisesToNumber = (exercises: unknown[]): number[] => {
  for (let i = 0; i < exercises.length; i++) {
    if (Number.isNaN(Number(exercises[i]))) {
      throw new Error("Malformatted parameters");
    }
  }

  return exercises.map(value => Number(value));
};

export const convertTargetToNumber = (target: unknown): number => {
  if (Number.isNaN(Number(target))) {
    throw new Error("Malformatted parameters");
  }

  return Number(target);
};

if (require.main === module) {
  if (process.argv.length < 4) {
    console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
  } else {
    console.log(calculateExercises(convertExercisesToNumber(process.argv.slice(3)), convertTargetToNumber(process.argv[2])));
  }
}