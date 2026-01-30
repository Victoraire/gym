
export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  description: string;
}

export interface WorkoutDay {
  id: string;
  title: string;
  focus: string;
  exercises: Exercise[];
  isRest?: boolean;
}

export interface UserStats {
  currentWeight: number;
  targetWeight: number;
  height: number;
}

export interface WorkoutSession {
  dayId: string;
  date: string;
  completedExerciseIndices: number[];
}
