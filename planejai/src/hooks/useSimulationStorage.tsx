import { type SimulationFormData, type SimulationRecord } from "@/data/simulation";

const LOCAL_STORAGE_KEY = "simulation-data";

export const useSimulationStorage = () => {
  const getStoredRecords = () => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storage ? (JSON.parse(storage) as SimulationRecord[]) : [];
  };

  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID();
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
    };

    const savedData = getStoredRecords();

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...savedData, record]));

    return id;
  };

  const getAllSimulations = () => {
    return getStoredRecords();
  };

  const deleteSimulation = (id: string) => {
    const savedData = getStoredRecords();
    const filteredData = savedData.filter((record) => record.id !== id);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredData));
  };

  const getFormData = (id: string) => {
    const savedData = getStoredRecords();
    return savedData.find((record) => record.id === id) || null;
  };

  const getLatestFormData = () => {
    const savedData = getStoredRecords();
    return savedData.length > 0 ? savedData[savedData.length - 1] : null;
  };

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const savedData = getStoredRecords();
    const updated = savedData.map((record) => (record.id === id ? { ...data } : record));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const updateSavedAmount = (id: string, savedAmount: string) => {
    const savedData = getStoredRecords();
    const record = savedData.find((item) => item.id === id);

    if (!record) {
      console.warn(`Simulação ${id} não encontrada para atualizar o valor guardado.`);
      return null;
    }

    const normalizedSavedAmount = savedAmount.trim() === "" ? "0" : savedAmount;
    const updatedRecord = {
      ...record,
      savedAmount: normalizedSavedAmount,
    };

    const updated = savedData.map((item) => (item.id === id ? updatedRecord : item));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    return updatedRecord;
  };

  return {
    saveFormData,
    getFormData,
    getLatestFormData,
    getAllSimulations,
    deleteSimulation,
    updateSimulation,
    updateSavedAmount,
  };
};
