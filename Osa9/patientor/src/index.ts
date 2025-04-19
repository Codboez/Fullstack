import express from 'express';
import cors from "cors";
import { Response } from 'express';

import diagnoses from "../data/diagnoses";
import { Diagnosis, NonSensitivePatient, Patient } from './types';
import { getNonSensitivePatients, addPatient, parsePatient, getPatient } from './services/patientService';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get("/api/diagnoses", (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnoses);
});

app.get("/api/patients", (_req, res: Response<NonSensitivePatient[]>) => {
  const nonSensitivePatients = getNonSensitivePatients();
  res.json(nonSensitivePatients);
});

app.get("/api/patients/:id", (req, res: Response<Patient>) => {
  const patient = getPatient(req.params.id);
  res.json(patient);
});

app.post("/api/patients", (req, res) => {
  const newPatient = parsePatient(req.body);
  const addedPatient = addPatient(newPatient);
  res.status(201).json(addedPatient);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});