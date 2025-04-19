import patients from "../../data/patients";
import { Gender, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';
import z from "zod";

export const getNonSensitivePatients = () => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation 
  }));
};

export const getPatient = (id: string) => {
  return patients.find(patient => patient.id === id);
};

export const addPatient = ({ name, occupation, gender, ssn, dateOfBirth }: NewPatient) => {
  const id = uuid();
  const newPatient = {
    id,
    name,
    occupation,
    gender,
    ssn,
    dateOfBirth,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

export const parsePatient = (patient: unknown): NewPatient => {
  if (!patient || typeof patient !== "object") {
    throw new Error("Invalid patient");
  }

  if (!("name" in patient) || !("dateOfBirth" in patient) || !("ssn" in patient)
      || !("gender" in patient) || !("occupation" in patient)) {
    throw new Error("Invalid patient");
  }

  const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
  });
  const newPatient = newPatientSchema.parse(patient);

  return newPatient;
};

/*const parseName = (name: unknown) => {
  if (!name || !isString(name)) {
    throw new Error("Invalid name");
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown) => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Invalid date of birth");
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown) => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Invalid ssn");
  }

  return ssn;
};

const parseGender = (gender: unknown) => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender");
  }

  return gender;
};

const parseOccupation = (occupation: unknown) => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Invalid occupation");
  }

  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender).map(gender => gender.toString()).includes(text);
};*/