"use server"

import { QueryFileProps } from "../types/data.types";
import { fetchWithAuth } from "./global";

export const getFiles = ({ id, name, type }: QueryFileProps) => fetchWithAuth("cer_api.nsf/xsp/.xrest/adjunto", { method: 'POST', data: { id, nombreAdjunto: name, tipo: type } });
export const getUnits = () => fetchWithAuth("cer_exp.nsf/xsp/.xrest/panel", { method: 'POST' });
export const getUnit = ({ id }: { id: string }) => fetchWithAuth("cer_exp.nsf/xsp/.xrest/unidad", { method: 'POST', data: { uf_id: id} });
export const getUser = () => fetchWithAuth("cer_api.nsf/xsp/.xrest/usuario", { method: 'POST' });
export const getUnitIssues = ({ code }: { code: string }) => fetchWithAuth("cer_ied.nsf/xsp/.xrest/rclList", { method: 'POST', data: { codEdificio: code } });
export const getUnitPayments = ({ id }: { id: string }) => fetchWithAuth("cer_api.nsf/xsp/.xrest/notiPagoList", { method: 'POST', data: { idDepto: id } });
export const getUnitReservations = ({ id, state = "", code }: { id: string, state?: string, code: string }) => fetchWithAuth("cer_rec.nsf/xsp/.xrest/recListEdificio", { method: 'POST', data: { pin: id, codEdificio: code, recuEstado: state } });
export const createNotifyPayment = ({ ...props }: { codEdificio: string, idDepto: string, fecha: string, importe: number, comentario: string, pagoTotal: boolean, adjuntos: string[] }) => fetchWithAuth("cer_api.nsf/xsp/.xrest/notificarPago", { method: 'POST', data: { ...props } });
export const createNewRcl = ({ ...props }: { id: string, Rcl_Sobre: string, Rcl_Type: string, Rcl_DateTime: string, Rcl_Subject: string, Rcl_Description: string }) => fetchWithAuth("cer_api.nsf/xsp/.xrest/altaRcl", { method: 'POST', data: { ...props } });