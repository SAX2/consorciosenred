export type StatusValue = 'warning' | 'success' | 'error' | 'neutral' | "default" | "info" | "custom";

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
  },
  reservas: {
    "Aprobado": "success",
    "Pendiente": "warning",
    "Rechazado": "error",
    "Anuló Prop.": "neutral",
    "Por Liquidar": "info",
  }
};

export const getStatusType = (type: string, status: string): StatusValue => 
  statusTypes[type]?.[status] || "neutral";