export type StatusValue = 'warning' | 'success' | 'error' | 'neutral' | "default" | "custom";

type StatusMap = {
  [key: string]: {
    [key: string]: StatusValue;
  };
};

const statusTypes: StatusMap = {
  reclamos: {
    "En proceso": "warning",
    "Cerrado": "success",
    "Cancelado": "error"
  },
  juicios: {
    "Abierto": "success",
    "En proceso": "warning",
    "Rechazado": "error",
    "Cancelado": "neutral",
  }
};

export const getStatusType = (type: string, status: string): StatusValue => 
  statusTypes[type]?.[status] || "neutral";