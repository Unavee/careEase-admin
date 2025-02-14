export const patientData = [
    {
      id: 1,
      name: "Emily",
      age: 72,
      condition: "Post-Surgery Recovery",
      medications: [
        { name: "Painkillers", dosage: "500mg", frequency: "Every 6 hours" },
        { name: "Antibiotics", dosage: "250mg", frequency: "Twice daily" }
      ],
      vitalSigns: {
        heartRate: { value: 78, trend: "stable", unit: "bpm" },
        bloodPressure: { systolic: 120, diastolic: 80, trend: "stable" },
        oxygenSaturation: { value: 95, trend: "improving", unit: "%" }
      },
      monitoringData: {
        recoveryProgress: 65,
        painLevel: 3,
        mobilityScore: 4
      }
    }
  ];