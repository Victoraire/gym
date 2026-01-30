
import React from 'react';
import { WorkoutDay } from './types';

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: 'mon',
    title: 'Upper A',
    focus: 'Chest & Back (Mass)',
    exercises: [
      { name: 'Barbell Bench Press', sets: '4', reps: '6–8', description: '3-second lowering phase (tempo: 3-0-1-0).' },
      { name: 'Pendlay Rows', sets: '4', reps: '6–8', description: 'Explosive pull to stomach from dead stop on floor.' },
      { name: 'Dips', sets: '3', reps: 'Max', description: 'Lean forward to target pecs. Use benches or bars.' },
      { name: 'Underhand Barbell Row', sets: '3', reps: '10', description: 'Palms up to target lower lats and biceps.' },
      { name: 'Dumbbell Side Bends', sets: '3', reps: '15/side', description: 'Obliques focus. Keep torso upright.' }
    ]
  },
  {
    id: 'tue',
    title: 'Lower A',
    focus: 'Quads & Obliques',
    exercises: [
      { name: 'Barbell Back Squat', sets: '4', reps: '8–10', description: 'Full depth. Control the descent.' },
      { name: 'Goblet Squat (10kg DB)', sets: '3', reps: '15', description: 'Close stance, maximum depth for quad teardrop focus.' },
      { name: 'Standing Calf Raises', sets: '4', reps: '15', description: 'Hold the barbell. Squeeze at the top.' },
      { name: 'Russian Twists', sets: '3', reps: '20', description: 'Use 10kg DB. Rotate fully through the obliques.' }
    ]
  },
  {
    id: 'wed',
    title: 'Recovery',
    focus: 'Rest & Vibe',
    exercises: [],
    isRest: true
  },
  {
    id: 'thu',
    title: 'Upper B',
    focus: 'Shoulders & Arms',
    exercises: [
      { name: 'Overhead Press (Barbell)', sets: '4', reps: '8', description: 'Strict form. No leg drive.' },
      { name: 'Dumbbell Pullovers', sets: '3', reps: '12', description: 'Lats and chest expansion. Focus on the stretch.' },
      { name: 'Dumbbell Lateral Raises', sets: '4', reps: '15', description: 'Side delts focus. Pinkies up for maximum width.' },
      { name: 'Hammer Curls', sets: '3', reps: '12', description: 'Neutral grip for brachialis and forearm thickness.' },
      { name: 'Rear Delt Flys (DB)', sets: '3', reps: '15', description: 'Hinge at hips. Target the posterior shoulder head.' }
    ]
  },
  {
    id: 'fri',
    title: 'Lower B',
    focus: 'Posterior & Abs',
    exercises: [
      { name: 'Romanian Deadlifts (RDL)', sets: '4', reps: '10–12', description: 'Hamstring stretch focus. Do not touch floor.' },
      { name: 'Weighted Lunges', sets: '3', reps: '12/leg', description: 'Hold 10kg DBs in each hand. Big steps.' },
      { name: 'Seated Calf Raises', sets: '4', reps: '20', description: 'Barbell on knees. High reps for the soleus.' },
      { name: 'Weighted Sit-ups', sets: '3', reps: '15', description: 'Hold 10kg DB against chest. Full crunch.' }
    ]
  },
  {
    id: 'sat',
    title: 'Weak Point',
    focus: 'Skills/Weak Link',
    exercises: [
      { name: 'Calisthenics Skills', sets: '3', reps: 'Varies', description: 'Muscle ups, handstands, or planche work.' },
      { name: 'Any Lagging Part', sets: '3', reps: '12–15', description: 'Isolation work for parts that feel small.' }
    ]
  },
  {
    id: 'sun',
    title: 'Full Recovery',
    focus: 'Eat Heavy',
    exercises: [],
    isRest: true
  }
];

export const SYSTEM_INSTRUCTION = `
You are the "Naija Scan AI Coach". You are an expert in bodybuilding with limited equipment.
User Profile:
- Goal: Bulk from 57kg to 70kg (Mass Gain).
- Equipment: 50kg Barbell, 10kg DBs, Bench, Dip area.
- Strategy: Slow tempo (4 sec eccentric), High calorie surplus (Naija Fuel - Peanut butter, Milk).
- Aesthetic Focus: X-frame (Lats/Shoulders) and Abs/Obliques.

Guidelines for AI:
1. Provide encouraging, energetic advice.
2. Explain exercise form specifically for this program.
3. If they ask about weight selection, explain that if 50kg is too light, they should slow down the tempo or increase reps.
4. Encourage eating big.
5. Be concise but helpful.
`;
