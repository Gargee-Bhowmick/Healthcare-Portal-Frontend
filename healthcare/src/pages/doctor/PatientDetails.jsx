import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Avatar,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Alert,
  Stack,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InfoIcon from "@mui/icons-material/Info";
import Description from "@mui/icons-material/Description";
import Biotech from "@mui/icons-material/Biotech";
import MedicalServices from "@mui/icons-material/MedicalServices";
import Vaccines from "@mui/icons-material/Vaccines";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Person from "@mui/icons-material/Person";
import Business from "@mui/icons-material/Business";
import Download from "@mui/icons-material/Download";
import Search from "@mui/icons-material/Search";
import { useParams, useNavigate } from "react-router-dom";

// Helper for BMI
function getBMI(weight, height) {
  if (!weight || !height) return "-";
  return (weight / ((height / 100) ** 2)).toFixed(1);
}

// Helper for file icon
const getFileIcon = (fileType, category) => {
  if (fileType === "pdf" && category === "Lab Results") return <Biotech color="primary" />;
  if (fileType === "image" || category === "X-Ray/Imaging") return <LocalHospitalIcon color="info" />;
  if (category === "Prescription") return <MedicalServices color="success" />;
  if (category === "Vaccination Record") return <Vaccines color="warning" />;
  if (fileType === "pdf") return <Description color="error" />;
  return <AssignmentIcon color="action" />;
};

// Patient data: IDs and names must match those in Timetable.jsx bookings!
// All patient details for PatientDetails.jsx and Timetable.jsx

const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 34,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    contact: "+91 9876543210",
    emergencyContact: "+91 9123456789",
    chiefComplaint: "Fever and cough",
    symptoms: "High fever, dry cough, fatigue",
    vitals: {
      temperature: 101.2,
      bp: "130/85",
      heartRate: 98,
      respRate: 18,
      spo2: 97,
      weight: 72,
      height: 175,
    },
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
      { name: "Cough Syrup", dosage: "10ml", frequency: "Thrice a day" },
    ],
    allergies: ["Penicillin"],
    chronic: ["Hypertension"],
    surgeries: ["Appendectomy (2015)"],
    insurance: "MediCare Plus (ID: MC123456)",
    familyHistory: "Father: Diabetes, Mother: Hypertension",
    lifestyle: "Non-smoker, Occasional alcohol",
    medicalHistory: [
      {
        date: "2024-06-15",
        summary: "Routine checkup. All vitals normal.",
        details: "No complaints. BP slightly elevated.",
      },
    ],
    medicalRecords: [
      {
        id: 1,
        title: "Blood Test Results",
        category: "Lab Results",
        date: "2024-12-15",
        doctorName: "Dr. Sarah Johnson",
        hospital: "City General Hospital",
        description: "Complete blood count and lipid profile",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    contact: "+91 9988776655",
    emergencyContact: "+91 8877665544",
    chiefComplaint: "Headache",
    symptoms: "Persistent headache, mild nausea",
    vitals: {
      temperature: 98.6,
      bp: "120/80",
      heartRate: 76,
      respRate: 16,
      spo2: 99,
      weight: 60,
      height: 165,
    },
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Once a day" },
    ],
    allergies: [],
    chronic: [],
    surgeries: [],
    insurance: "HealthSecure (ID: HS987654)",
    familyHistory: "No significant history",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-06-01",
        summary: "Migraine episode, prescribed medication.",
        details: "Advised to avoid screen time.",
      },
    ],
    medicalRecords: [
      {
        id: 2,
        title: "MRI Brain",
        category: "X-Ray/Imaging",
        date: "2024-12-10",
        doctorName: "Dr. Michael Chen",
        hospital: "Metro Medical Center",
        description: "Routine MRI brain scan",
        fileType: "image",
      },
    ],
  },
  {
    id: 3,
    name: "Alice Brown",
    age: 41,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    contact: "+91 9123456780",
    emergencyContact: "+91 9988776655",
    chiefComplaint: "Back pain",
    symptoms: "Lower back pain, stiffness",
    vitals: {
      temperature: 98.7,
      bp: "125/82",
      heartRate: 80,
      respRate: 17,
      spo2: 98,
      weight: 68,
      height: 162,
    },
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Twice a day" },
    ],
    allergies: ["Latex"],
    chronic: ["Arthritis"],
    surgeries: ["None"],
    insurance: "CarePlus (ID: CP112233)",
    familyHistory: "Mother: Arthritis",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-05-20",
        summary: "Back pain, prescribed physiotherapy.",
        details: "Advised regular exercise.",
      },
    ],
    medicalRecords: [
      {
        id: 3,
        title: "Spine X-Ray",
        category: "X-Ray/Imaging",
        date: "2024-11-18",
        doctorName: "Dr. Alex Turner",
        hospital: "City General Hospital",
        description: "Lumbar spine x-ray for back pain",
        fileType: "image",
      },
    ],
  },
  {
    id: 4,
    name: "Bob Lee",
    age: 36,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    contact: "+91 9000000004",
    emergencyContact: "+91 9000000005",
    chiefComplaint: "Routine checkup",
    symptoms: "No symptoms",
    vitals: {
      temperature: 98.4,
      bp: "120/80",
      heartRate: 72,
      respRate: 16,
      spo2: 99,
      weight: 75,
      height: 178,
    },
    medications: [
      { name: "Multivitamin", dosage: "1 tablet", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "MediAssist (ID: MA100004)",
    familyHistory: "No significant history",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-04-10",
        summary: "Annual physical exam.",
        details: "All parameters within normal limits.",
      },
    ],
    medicalRecords: [
      {
        id: 4,
        title: "Annual Physical Report",
        category: "Medical Report",
        date: "2024-04-10",
        doctorName: "Dr. Priya Singh",
        hospital: "Wellness Clinic",
        description: "Routine annual checkup report.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 5,
    name: "Charlie Kim",
    age: 29,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/46.jpg",
    contact: "+91 9000000006",
    emergencyContact: "+91 9000000007",
    chiefComplaint: "Allergy",
    symptoms: "Sneezing, runny nose",
    vitals: {
      temperature: 98.5,
      bp: "118/76",
      heartRate: 74,
      respRate: 17,
      spo2: 98,
      weight: 68,
      height: 172,
    },
    medications: [
      { name: "Cetirizine", dosage: "10mg", frequency: "Once a day" },
    ],
    allergies: ["Pollen"],
    chronic: ["Allergic Rhinitis"],
    surgeries: ["None"],
    insurance: "CareFirst (ID: CF100005)",
    familyHistory: "Mother: Asthma",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-03-15",
        summary: "Allergy symptoms, prescribed antihistamine.",
        details: "Advised to avoid pollen exposure.",
      },
    ],
    medicalRecords: [
      {
        id: 5,
        title: "Allergy Test Report",
        category: "Lab Results",
        date: "2024-03-14",
        doctorName: "Dr. Rakesh Mehta",
        hospital: "Allergy Center",
        description: "Skin prick test for common allergens.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 6,
    name: "Night Owl",
    age: 40,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/47.jpg",
    contact: "+91 9000000008",
    emergencyContact: "+91 9000000009",
    chiefComplaint: "Insomnia",
    symptoms: "Difficulty sleeping",
    vitals: {
      temperature: 98.6,
      bp: "122/80",
      heartRate: 70,
      respRate: 16,
      spo2: 98,
      weight: 80,
      height: 180,
    },
    medications: [
      { name: "Melatonin", dosage: "3mg", frequency: "Once at night" },
    ],
    allergies: ["None"],
    chronic: ["Insomnia"],
    surgeries: ["None"],
    insurance: "SleepCare (ID: SC100006)",
    familyHistory: "Father: Hypertension",
    lifestyle: "Smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-02-20",
        summary: "Sleep disturbance, started melatonin.",
        details: "Advised sleep hygiene and regular schedule.",
      },
    ],
    medicalRecords: [
      {
        id: 6,
        title: "Sleep Study Report",
        category: "Medical Report",
        date: "2024-02-18",
        doctorName: "Dr. Anjali Rao",
        hospital: "Sleep Clinic",
        description: "Polysomnography for sleep disorder diagnosis.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 7,
    name: "Diana Prince",
    age: 35,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/47.jpg",
    contact: "+91 9000000010",
    emergencyContact: "+91 9000000011",
    chiefComplaint: "Fatigue",
    symptoms: "Tiredness, low energy",
    vitals: {
      temperature: 98.3,
      bp: "119/77",
      heartRate: 75,
      respRate: 16,
      spo2: 99,
      weight: 62,
      height: 168,
    },
    medications: [
      { name: "Iron Supplement", dosage: "100mg", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["Anemia"],
    surgeries: ["None"],
    insurance: "HealthPlus (ID: HP100007)",
    familyHistory: "Mother: Diabetes",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-01-10",
        summary: "Fatigue, diagnosed with mild anemia.",
        details: "Started iron supplementation.",
      },
    ],
    medicalRecords: [
      {
        id: 7,
        title: "CBC Report",
        category: "Lab Results",
        date: "2024-01-09",
        doctorName: "Dr. Suresh Nair",
        hospital: "City Lab",
        description: "Complete blood count for anemia diagnosis.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 8,
    name: "Grace Hall",
    age: 50,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/48.jpg",
    contact: "+91 9000000012",
    emergencyContact: "+91 9000000013",
    chiefComplaint: "Hypertension follow-up",
    symptoms: "No symptoms",
    vitals: {
      temperature: 98.5,
      bp: "140/90",
      heartRate: 78,
      respRate: 18,
      spo2: 97,
      weight: 70,
      height: 160,
    },
    medications: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["Hypertension"],
    surgeries: ["None"],
    insurance: "SeniorCare (ID: SC100008)",
    familyHistory: "Father: Hypertension",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-05-01",
        summary: "Hypertension follow-up, BP controlled.",
        details: "Continue current medication.",
      },
    ],
    medicalRecords: [
      {
        id: 8,
        title: "BP Monitoring Chart",
        category: "Medical Report",
        date: "2024-04-30",
        doctorName: "Dr. Kavita Sharma",
        hospital: "Senior Clinic",
        description: "Blood pressure log for 1 month.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 9,
    name: "Henry Ford",
    age: 60,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/48.jpg",
    contact: "+91 9000000014",
    emergencyContact: "+91 9000000015",
    chiefComplaint: "Arthritis",
    symptoms: "Joint pain",
    vitals: {
      temperature: 98.6,
      bp: "130/85",
      heartRate: 80,
      respRate: 18,
      spo2: 98,
      weight: 85,
      height: 170,
    },
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Twice a day" },
    ],
    allergies: ["None"],
    chronic: ["Arthritis"],
    surgeries: ["Knee replacement (2020)"],
    insurance: "ElderCare (ID: EC100009)",
    familyHistory: "Mother: Arthritis",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-03-10",
        summary: "Arthritis pain, prescribed NSAIDs.",
        details: "Advised physiotherapy.",
      },
    ],
    medicalRecords: [
      {
        id: 9,
        title: "Knee X-Ray",
        category: "X-Ray/Imaging",
        date: "2024-03-09",
        doctorName: "Dr. Rajiv Kumar",
        hospital: "Ortho Center",
        description: "X-ray for arthritis assessment.",
        fileType: "image",
      },
    ],
  },
  {
    id: 10,
    name: "Ivy Lane",
    age: 27,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/49.jpg",
    contact: "+91 9000000016",
    emergencyContact: "+91 9000000017",
    chiefComplaint: "Routine checkup",
    symptoms: "No symptoms",
    vitals: {
      temperature: 98.4,
      bp: "118/76",
      heartRate: 72,
      respRate: 16,
      spo2: 99,
      weight: 55,
      height: 162,
    },
    medications: [
      { name: "Multivitamin", dosage: "1 tablet", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "YoungCare (ID: YC100010)",
    familyHistory: "No significant history",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-06-01",
        summary: "Routine checkup, all normal.",
        details: "Advised healthy diet and exercise.",
      },
    ],
    medicalRecords: [
      {
        id: 10,
        title: "Annual Health Report",
        category: "Medical Report",
        date: "2024-05-30",
        doctorName: "Dr. Neha Gupta",
        hospital: "Wellness Clinic",
        description: "Comprehensive health checkup report.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 11,
    name: "Sam Carter",
    age: 38,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/49.jpg",
    contact: "+91 9000000018",
    emergencyContact: "+91 9000000019",
    chiefComplaint: "Knee pain",
    symptoms: "Pain while walking",
    vitals: {
      temperature: 98.7,
      bp: "124/80",
      heartRate: 74,
      respRate: 17,
      spo2: 98,
      weight: 78,
      height: 175,
    },
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "ActiveCare (ID: AC100011)",
    familyHistory: "Father: Arthritis",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-04-15",
        summary: "Knee pain, prescribed rest and medication.",
        details: "Advised physiotherapy.",
      },
    ],
    medicalRecords: [
      {
        id: 11,
        title: "Knee MRI",
        category: "X-Ray/Imaging",
        date: "2024-04-14",
        doctorName: "Dr. Sunil Joshi",
        hospital: "Ortho Center",
        description: "MRI for knee pain assessment.",
        fileType: "image",
      },
    ],
  },
  {
    id: 12,
    name: "Eve Adams",
    age: 32,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/50.jpg",
    contact: "+91 9000000020",
    emergencyContact: "+91 9000000021",
    chiefComplaint: "Fever",
    symptoms: "Mild fever, headache",
    vitals: {
      temperature: 99.1,
      bp: "120/80",
      heartRate: 80,
      respRate: 18,
      spo2: 98,
      weight: 60,
      height: 165,
    },
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "HealthFirst (ID: HF100012)",
    familyHistory: "Mother: Hypertension",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-05-10",
        summary: "Fever, prescribed paracetamol.",
        details: "Advised rest and fluids.",
      },
    ],
    medicalRecords: [
      {
        id: 12,
        title: "Fever Panel",
        category: "Lab Results",
        date: "2024-05-09",
        doctorName: "Dr. Amit Shah",
        hospital: "City Lab",
        description: "Blood tests for fever diagnosis.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 13,
    name: "Frank Moore",
    age: 45,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/50.jpg",
    contact: "+91 9000000022",
    emergencyContact: "+91 9000000023",
    chiefComplaint: "Chest pain",
    symptoms: "Mild chest pain",
    vitals: {
      temperature: 98.8,
      bp: "130/85",
      heartRate: 82,
      respRate: 18,
      spo2: 97,
      weight: 85,
      height: 180,
    },
    medications: [
      { name: "Aspirin", dosage: "75mg", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["Hypertension"],
    surgeries: ["None"],
    insurance: "SecureCare (ID: SC100013)",
    familyHistory: "Father: Heart Disease",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-03-20",
        summary: "Chest pain, ECG normal.",
        details: "Advised to monitor symptoms.",
      },
    ],
    medicalRecords: [
      {
        id: 13,
        title: "ECG Report",
        category: "Lab Results",
        date: "2024-03-19",
        doctorName: "Dr. Meena Patel",
        hospital: "Heart Center",
        description: "ECG for chest pain evaluation.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 14,
    name: "Jack Frost",
    age: 31,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/51.jpg",
    contact: "+91 9000000024",
    emergencyContact: "+91 9000000025",
    chiefComplaint: "Cold",
    symptoms: "Sneezing, runny nose",
    vitals: {
      temperature: 98.5,
      bp: "118/76",
      heartRate: 70,
      respRate: 16,
      spo2: 99,
      weight: 70,
      height: 175,
    },
    medications: [
      { name: "Cetirizine", dosage: "10mg", frequency: "Once a day" },
    ],
    allergies: ["Dust"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "FrostCare (ID: FC100014)",
    familyHistory: "Mother: Asthma",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-02-05",
        summary: "Cold symptoms, prescribed antihistamine.",
        details: "Advised steam inhalation.",
      },
    ],
    medicalRecords: [
      {
        id: 14,
        title: "Allergy Panel",
        category: "Lab Results",
        date: "2024-02-04",
        doctorName: "Dr. Rakesh Mehta",
        hospital: "Allergy Center",
        description: "Blood test for allergy markers.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 15,
    name: "Karen Page",
    age: 29,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/51.jpg",
    contact: "+91 9000000026",
    emergencyContact: "+91 9000000027",
    chiefComplaint: "Migraine",
    symptoms: "Headache, nausea",
    vitals: {
      temperature: 98.6,
      bp: "120/80",
      heartRate: 76,
      respRate: 16,
      spo2: 99,
      weight: 58,
      height: 160,
    },
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["Migraine"],
    surgeries: ["None"],
    insurance: "PageCare (ID: PC100015)",
    familyHistory: "Father: Migraine",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-01-20",
        summary: "Migraine attack, prescribed pain relief.",
        details: "Advised to avoid triggers.",
      },
    ],
    medicalRecords: [
      {
        id: 15,
        title: "MRI Brain",
        category: "X-Ray/Imaging",
        date: "2024-01-19",
        doctorName: "Dr. Michael Chen",
        hospital: "Metro Medical Center",
        description: "MRI for migraine evaluation.",
        fileType: "image",
      },
    ],
  },
  {
    id: 16,
    name: "Leo King",
    age: 37,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    contact: "+91 9000000028",
    emergencyContact: "+91 9000000029",
    chiefComplaint: "Routine checkup",
    symptoms: "No symptoms",
    vitals: {
      temperature: 98.4,
      bp: "120/80",
      heartRate: 72,
      respRate: 16,
      spo2: 99,
      weight: 80,
      height: 180,
    },
    medications: [
      { name: "Multivitamin", dosage: "1 tablet", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "KingCare (ID: KC100016)",
    familyHistory: "No significant history",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-06-01",
        summary: "Routine checkup, all normal.",
        details: "Advised healthy diet and exercise.",
      },
    ],
    medicalRecords: [
      {
        id: 16,
        title: "Annual Health Report",
        category: "Medical Report",
        date: "2024-05-30",
        doctorName: "Dr. Neha Gupta",
        hospital: "Wellness Clinic",
        description: "Comprehensive health checkup report.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 17,
    name: "Mona Ray",
    age: 33,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    contact: "+91 9000000030",
    emergencyContact: "+91 9000000031",
    chiefComplaint: "Stomach ache",
    symptoms: "Abdominal pain",
    vitals: {
      temperature: 99.0,
      bp: "118/76",
      heartRate: 74,
      respRate: 17,
      spo2: 98,
      weight: 62,
      height: 165,
    },
    medications: [
      { name: "Omeprazole", dosage: "20mg", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["Gastritis"],
    surgeries: ["None"],
    insurance: "RayCare (ID: RC100017)",
    familyHistory: "Mother: Ulcer",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-04-12",
        summary: "Stomach pain, prescribed omeprazole.",
        details: "Advised bland diet.",
      },
    ],
    medicalRecords: [
      {
        id: 17,
        title: "Abdominal Ultrasound",
        category: "X-Ray/Imaging",
        date: "2024-04-11",
        doctorName: "Dr. Ritu Sharma",
        hospital: "City Hospital",
        description: "Ultrasound for abdominal pain.",
        fileType: "image",
      },
    ],
  },
  {
    id: 18,
    name: "Nina West",
    age: 26,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/53.jpg",
    contact: "+91 9000000032",
    emergencyContact: "+91 9000000033",
    chiefComplaint: "Cough",
    symptoms: "Dry cough",
    vitals: {
      temperature: 98.7,
      bp: "120/80",
      heartRate: 76,
      respRate: 16,
      spo2: 99,
      weight: 55,
      height: 160,
    },
    medications: [
      { name: "Cough Syrup", dosage: "10ml", frequency: "Thrice a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "WestCare (ID: WC100018)",
    familyHistory: "Father: Asthma",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-03-18",
        summary: "Dry cough, prescribed syrup.",
        details: "Advised steam inhalation.",
      },
    ],
    medicalRecords: [
      {
        id: 18,
        title: "Chest X-Ray",
        category: "X-Ray/Imaging",
        date: "2024-03-17",
        doctorName: "Dr. Ajay Singh",
        hospital: "Metro Medical Center",
        description: "X-ray for cough evaluation.",
        fileType: "image",
      },
    ],
  },
  {
    id: 19,
    name: "Oscar Wilde",
    age: 44,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/53.jpg",
    contact: "+91 9000000034",
    emergencyContact: "+91 9000000035",
    chiefComplaint: "Joint pain",
    symptoms: "Knee pain",
    vitals: {
      temperature: 98.8,
      bp: "125/80",
      heartRate: 78,
      respRate: 17,
      spo2: 98,
      weight: 85,
      height: 178,
    },
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    ],
    allergies: ["None"],
    chronic: ["Arthritis"],
    surgeries: ["None"],
    insurance: "WildeCare (ID: WC100019)",
    familyHistory: "Mother: Arthritis",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-02-22",
        summary: "Knee pain, prescribed pain relief.",
        details: "Advised physiotherapy.",
      },
    ],
    medicalRecords: [
      {
        id: 19,
        title: "Knee X-Ray",
        category: "X-Ray/Imaging",
        date: "2024-02-21",
        doctorName: "Dr. Sunil Joshi",
        hospital: "Ortho Center",
        description: "X-ray for knee pain assessment.",
        fileType: "image",
      },
    ],
  },
  {
    id: 20,
    name: "Paul Young",
    age: 39,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
    contact: "+91 9000000036",
    emergencyContact: "+91 9000000037",
    chiefComplaint: "Routine checkup",
    symptoms: "No symptoms",
    vitals: {
      temperature: 98.5,
      bp: "120/80",
      heartRate: 72,
      respRate: 16,
      spo2: 99,
      weight: 77,
      height: 175,
    },
    medications: [
      { name: "Multivitamin", dosage: "1 tablet", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "YoungCare (ID: YC100020)",
    familyHistory: "No significant history",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-06-01",
        summary: "Routine checkup, all normal.",
        details: "Advised healthy diet and exercise.",
      },
    ],
    medicalRecords: [
      {
        id: 20,
        title: "Annual Health Report",
        category: "Medical Report",
        date: "2024-05-30",
        doctorName: "Dr. Neha Gupta",
        hospital: "Wellness Clinic",
        description: "Comprehensive health checkup report.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 21,
    name: "Quinn Fox",
    age: 30,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    contact: "+91 9000000038",
    emergencyContact: "+91 9000000039",
    chiefComplaint: "Fever",
    symptoms: "High fever",
    vitals: {
      temperature: 101.0,
      bp: "120/80",
      heartRate: 90,
      respRate: 18,
      spo2: 97,
      weight: 70,
      height: 170,
    },
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "FoxCare (ID: FC100021)",
    familyHistory: "Mother: Hypertension",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-05-05",
        summary: "Fever, prescribed paracetamol.",
        details: "Advised rest and fluids.",
      },
    ],
    medicalRecords: [
      {
        id: 21,
        title: "Fever Panel",
        category: "Lab Results",
        date: "2024-05-04",
        doctorName: "Dr. Amit Shah",
        hospital: "City Lab",
        description: "Blood tests for fever diagnosis.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 22,
    name: "Rita Stone",
    age: 36,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/54.jpg",
    contact: "+91 9000000040",
    emergencyContact: "+91 9000000041",
    chiefComplaint: "Back pain",
    symptoms: "Lower back pain",
    vitals: {
      temperature: 98.7,
      bp: "125/82",
      heartRate: 80,
      respRate: 17,
      spo2: 98,
      weight: 68,
      height: 162,
    },
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Twice a day" },
    ],
    allergies: ["None"],
    chronic: ["Arthritis"],
    surgeries: ["None"],
    insurance: "StoneCare (ID: SC100022)",
    familyHistory: "Mother: Arthritis",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-04-10",
        summary: "Back pain, prescribed physiotherapy.",
        details: "Advised regular exercise.",
      },
    ],
    medicalRecords: [
      {
        id: 22,
        title: "Spine X-Ray",
        category: "X-Ray/Imaging",
        date: "2024-04-09",
        doctorName: "Dr. Alex Turner",
        hospital: "City General Hospital",
        description: "Lumbar spine x-ray for back pain",
        fileType: "image",
      },
    ],
  },
  {
    id: 23,
    name: "Steve Nash",
    age: 42,
    gender: "Male",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
    contact: "+91 9000000042",
    emergencyContact: "+91 9000000043",
    chiefComplaint: "Diabetes follow-up",
    symptoms: "No symptoms",
    vitals: {
      temperature: 98.6,
      bp: "120/80",
      heartRate: 76,
      respRate: 16,
      spo2: 99,
      weight: 80,
      height: 180,
    },
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice a day" },
    ],
    allergies: ["None"],
    chronic: ["Diabetes"],
    surgeries: ["None"],
    insurance: "NashCare (ID: NC100023)",
    familyHistory: "Father: Diabetes",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-03-01",
        summary: "Diabetes follow-up, blood sugar controlled.",
        details: "Continue current medication.",
      },
    ],
    medicalRecords: [
      {
        id: 23,
        title: "Blood Sugar Report",
        category: "Lab Results",
        date: "2024-02-28",
        doctorName: "Dr. Kavita Sharma",
        hospital: "Diabetes Clinic",
        description: "Fasting and postprandial blood sugar.",
        fileType: "pdf",
      },
    ],
  },
  {
    id: 24,
    name: "Tina Bell",
    age: 27,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    contact: "+91 9000000044",
    emergencyContact: "+91 9000000045",
    chiefComplaint: "Cough",
    symptoms: "Dry cough",
    vitals: {
      temperature: 98.7,
      bp: "120/80",
      heartRate: 76,
      respRate: 16,
      spo2: 99,
      weight: 55,
      height: 160,
    },
    medications: [
      { name: "Cough Syrup", dosage: "10ml", frequency: "Thrice a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "BellCare (ID: BC100024)",
    familyHistory: "Father: Asthma",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-02-10",
        summary: "Dry cough, prescribed syrup.",
        details: "Advised steam inhalation.",
      },
    ],
    medicalRecords: [
      {
        id: 24,
        title: "Chest X-Ray",
        category: "X-Ray/Imaging",
        date: "2024-02-09",
        doctorName: "Dr. Ajay Singh",
        hospital: "Metro Medical Center",
        description: "X-ray for cough evaluation.",
        fileType: "image",
      },
    ],
  },
  {
    id: 25,
    name: "Uma Dale",
    age: 31,
    gender: "Female",
    photo: "https://randomuser.me/api/portraits/women/56.jpg",
    contact: "+91 9000000046",
    emergencyContact: "+91 9000000047",
    chiefComplaint: "Routine checkup",
    symptoms: "No symptoms",
    vitals: {
      temperature: 98.4,
      bp: "120/80",
      heartRate: 72,
      respRate: 16,
      spo2: 99,
      weight: 60,
      height: 165,
    },
    medications: [
      { name: "Multivitamin", dosage: "1 tablet", frequency: "Once a day" },
    ],
    allergies: ["None"],
    chronic: ["None"],
    surgeries: ["None"],
    insurance: "DaleCare (ID: DC100025)",
    familyHistory: "No significant history",
    lifestyle: "Non-smoker, No alcohol",
    medicalHistory: [
      {
        date: "2024-06-01",
        summary: "Routine checkup, all normal.",
        details: "Advised healthy diet and exercise.",
      },
    ],
    medicalRecords: [
      {
        id: 25,
        title: "Annual Health Report",
        category: "Medical Report",
        date: "2024-05-30",
        doctorName: "Dr. Neha Gupta",
        hospital: "Wellness Clinic",
        description: "Comprehensive health checkup report.",
        fileType: "pdf",
      },
    ],
  },
];

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialId = id ? Number(id) : patients[0].id;
  const [selectedId, setSelectedId] = useState(initialId);
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sync dropdown with URL param
  useEffect(() => {
    if (id && Number(id) !== selectedId) setSelectedId(Number(id));
    // eslint-disable-next-line
  }, [id]);

  // When dropdown changes, update the route
  const handleSelectChange = (e) => {
    const newId = Number(e.target.value);
    setSelectedId(newId);
    navigate(`/doctor/patient-details/${newId}`);
  };

  const patient = patients.find((p) => p.id === selectedId);

  // Filter medical records by search
  const filteredRecords = patient.medicalRecords.filter((record) =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, mb: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" spacing={3}>
          <AssignmentIndIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h4" fontWeight={700} color="primary.dark" flex={1}>
            Patient Details
          </Typography>
          <Select
            value={selectedId}
            onChange={handleSelectChange}
            size="small"
            sx={{ minWidth: 220, bgcolor: "#f5f7fa", borderRadius: 2 }}
          >
            {patients.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar src={p.photo} alt={p.name} sx={{ width: 28, height: 28 }} />
                  <span>{p.name}</span>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {/* Left: Demographics & Vitals */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar
                  src={patient.photo}
                  alt={patient.name}
                  sx={{ width: 64, height: 64, border: "2px solid #1976d2" }}
                />
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {patient.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {patient.age} | Gender: {patient.gender}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">{patient.contact}</Typography>
              <Typography variant="body2" color="text.secondary">
                Emergency: {patient.emergencyContact}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Chief Complaint
              </Typography>
              <Typography variant="body2">{patient.chiefComplaint}</Typography>
              <Typography variant="body2" color="text.secondary">
                {patient.symptoms}
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Vital Signs
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <b>Temp:</b> {patient.vitals.temperature}°F
                  </Typography>
                  <Typography variant="body2">
                    <b>BP:</b> {patient.vitals.bp}
                  </Typography>
                  <Typography variant="body2">
                    <b>Heart Rate:</b> {patient.vitals.heartRate} bpm
                  </Typography>
                  <Typography variant="body2">
                    <b>Resp Rate:</b> {patient.vitals.respRate} /min
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <b>SpO₂:</b> {patient.vitals.spo2}%
                  </Typography>
                  <Typography variant="body2">
                    <b>Weight:</b> {patient.vitals.weight} kg
                  </Typography>
                  <Typography variant="body2">
                    <b>Height:</b> {patient.vitals.height} cm
                  </Typography>
                  <Typography variant="body2">
                    <b>BMI:</b> {getBMI(patient.vitals.weight, patient.vitals.height)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right: Main Info */}
        <Grid item xs={12} md={8}>
          {/* Alerts */}
          {patient.allergies.length > 0 && (
            <Alert
              severity="error"
              icon={<WarningAmberIcon />}
              sx={{ mb: 2, fontWeight: 600, fontSize: 15 }}
            >
              Allergies:{" "}
              {patient.allergies.map((a) => (
                <Chip
                  key={a}
                  label={a}
                  color="error"
                  size="small"
                  sx={{ mx: 0.5, fontWeight: 600 }}
                />
              ))}
            </Alert>
          )}

          <Card elevation={2} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <MedicationIcon color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>
                  Current Medications
                </Typography>
              </Stack>
              {patient.medications.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No current medications.
                </Typography>
              ) : (
                <List dense>
                  {patient.medications.map((med, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemText
                        primary={
                          <span>
                            <b>{med.name}</b> — {med.dosage} ({med.frequency})
                          </span>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <HistoryEduIcon color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>
                  Past Medical History
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <b>Chronic Illnesses:</b>{" "}
                {patient.chronic.length === 0 ? (
                  <span style={{ color: "#90a4ae" }}>None</span>
                ) : (
                  patient.chronic.join(", ")
                )}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <b>Surgeries:</b>{" "}
                {patient.surgeries.length === 0 ? (
                  <span style={{ color: "#90a4ae" }}>None</span>
                ) : (
                  patient.surgeries.join(", ")
                )}
              </Typography>
            </CardContent>
          </Card>

          {/* Tabs for expandable info */}
          <Paper elevation={1} sx={{ borderRadius: 3 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ px: 2, pt: 1 }}
            >
              <Tab label="Insurance & Billing" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Family History" icon={<LocalHospitalIcon />} iconPosition="start" />
              <Tab label="Lifestyle" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Medical Files" icon={<Description />} iconPosition="start" />
            </Tabs>
            <Divider />
            <Box sx={{ p: 2 }}>
              {tab === 0 && (
                <Typography variant="body2">
                  <b>Insurance:</b> {patient.insurance}
                </Typography>
              )}
              {tab === 1 && (
                <Typography variant="body2">
                  <b>Family Medical History:</b> {patient.familyHistory}
                </Typography>
              )}
              {tab === 2 && (
                <Typography variant="body2">
                  <b>Lifestyle / Social History:</b> {patient.lifestyle}
                </Typography>
              )}
              {/* Medical Files Tab */}
              {tab === 3 && (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Search sx={{ mr: 1, color: "text.secondary" }} />
                    <input
                      type="text"
                      placeholder="Search records, doctors, hospitals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        border: "none",
                        outline: "none",
                        background: "#f5f7fa",
                        padding: "8px 12px",
                        borderRadius: 8,
                        fontSize: 14,
                        width: "100%",
                        maxWidth: 320,
                      }}
                    />
                  </Box>
                  <Grid container spacing={3}>
                    {filteredRecords.map((record) => (
                      <Grid item xs={12} sm={6} lg={4} key={record.id}>
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                              <Avatar sx={{ bgcolor: "primary.light" }}>
                                {getFileIcon(record.fileType, record.category)}
                              </Avatar>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                                  {record.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" noWrap>
                                  {record.category}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.5 }}>
                              {record.description}
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="body2" color="textSecondary">
                                  {formatDate(record.date)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Person sx={{ fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="body2" color="textSecondary" noWrap>
                                  {record.doctorName}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Business sx={{ fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="body2" color="textSecondary" noWrap>
                                  {record.hospital}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                          <CardActions sx={{ justifyContent: "center", px: 2, pb: 2 }}>
                            <Button
                              size="small"
                              onClick={() => {
                                setSelectedRecord(record);
                                setOpenDialog(true);
                              }}
                              variant="outlined"
                            >
                              View Details
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  {filteredRecords.length === 0 && (
                    <Paper sx={{ p: 4, textAlign: "center", mt: 3 }}>
                      <Typography variant="h6" color="textSecondary">
                        No medical records found
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Try adjusting your search criteria
                      </Typography>
                    </Paper>
                  )}
                  {/* Record Details Dialog */}
                  <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth="md"
                    fullWidth
                  >
                    {selectedRecord && (
                      <>
                        <DialogTitle>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {getFileIcon(selectedRecord.fileType, selectedRecord.category)}
                            <Box>
                              <Typography variant="h6">{selectedRecord.title}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {selectedRecord.category}
                              </Typography>
                            </Box>
                          </Box>
                        </DialogTitle>
                        <DialogContent>
                          <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Description
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.description}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Category
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.category}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Divider sx={{ my: 2 }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Date
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {formatDate(selectedRecord.date)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                File Type
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.fileType.toUpperCase()}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Doctor
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.doctorName}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" gutterBottom>
                                Hospital/Clinic
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedRecord.hospital}
                              </Typography>
                            </Grid>
                          </Grid>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpenDialog(false)}>Close</Button>
                          <Button variant="outlined" startIcon={<Download />}>
                            Download
                          </Button>
                        </DialogActions>
                      </>
                    )}
                  </Dialog>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}          