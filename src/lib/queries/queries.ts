"use server";

import { QueryFileProps } from "../types/data.types";
import { fetchWithAuth } from "./global";

export const getFiles = async ({ id, name, type }: QueryFileProps) => await fetchWithAuth("cer_api.nsf/xsp/.xrest/adjunto", { method: 'POST', data: { id, nombreAdjunto: name, tipo: type } });
export const getUnits = async () => await fetchWithAuth("cer_exp.nsf/xsp/.xrest/panel", { method: 'POST' });
export const getOptions = async ({ key }: { key: string }) => await fetchWithAuth("cer_api.nsf/xsp/.xrest/cfgKey", { method: 'POST', data: { key } });
export const getUnit = async ({ id }: { id: string }) => await fetchWithAuth("cer_exp.nsf/xsp/.xrest/unidad", { method: 'POST', data: { uf_id: id } });
export const getUser = async () => await fetchWithAuth("cer_api.nsf/xsp/.xrest/usuario", { method: 'POST' });
export const getUnitIssues = async ({ code, id = "" }: { code: string, id?: string }) => await fetchWithAuth("cer_ied.nsf/xsp/.xrest/rclList", { method: 'POST', data: { codEdificio: code, id } });
export const getUnitJudgments = async ({ code, id, pin }: { code: string, id?: string, pin?: string }) => await fetchWithAuth("cer_ied.nsf/xsp/.xrest/juiList", { method: 'POST', data: { codEdificio: code, Jui_id: id, pin } });
export const getUnitNews = async ({ code }: { code: string, id?: string, pin?: string }) => await fetchWithAuth("cer_ied.nsf/xsp/.xrest/nvdList", { method: 'POST', data: { codEdificio: code } });
export const getUnitAssembly = async ({ code, pin }: { code: string, id?: string, pin?: string }) => await fetchWithAuth("cer_ied.nsf/xsp/.xrest/asaList", { method: 'POST', data: { codEdificio: code, pin } });
export const getUnitRegulation = async ({ code, pin }: { code: string, id?: string, pin?: string }) => await fetchWithAuth("cer_ied.nsf/xsp/.xrest/rcoList", { method: 'POST', data: { codEdificio: code, pin } });
export const getUnitPayments = async ({ id }: { id: string }) => await fetchWithAuth("cer_api.nsf/xsp/.xrest/notiPagoList", { method: 'POST', data: { idDepto: id } });
export const getUnitReservationsList = async ({ id, orden, vencidas }: { id: string, orden: "descendente" | "ascendente", vencidas?: "no" }) => await fetchWithAuth("cer_rec.nsf/xsp/.xrest/reservasPorPin", { method: 'POST', data: { pin: id, orden: orden, vencidas } });
export const getUnitReservations = async ({ id, state = "", code }: { id: string, state?: string, code: string }) => await fetchWithAuth("cer_rec.nsf/xsp/.xrest/recListEdificio", { method: 'POST', data: { pin: id, codEdificio: code, recuEstado: state } });
export const getUnitReservationsByGroup = async ({ id, group, code }: { id: string, group: string, code: string }) => await fetchWithAuth("cer_rec.nsf/xsp/.xrest/resPorGrupo", { method: 'POST', data: { pin: id, codEdificio: code, recuGrupo: group } });
export const getUnitReservationsByGroupCalendar = async ({ id, group, code }: { id: string, group: string, code: string }) => await fetchWithAuth(`cer_rec.nsf/rest.xsp/resCal?pn=${id}&edf=${code}&gr=${group}`, { method: 'POST' });
export const createNotifyPayment = async ({ ...props }: { codEdificio: string, idDepto: string, fecha: string, importe: number, comentario: string, pagoTotal: boolean, adjuntos: string[] }) => await fetchWithAuth("cer_api.nsf/xsp/.xrest/notificarPago", { method: 'POST', data: { ...props } });
export const createNewRcl = async ({ ...props }: { id: string, Rcl_Sobre: string, Rcl_Type: string, Rcl_DateTime: string, Rcl_Subject: string, Rcl_Description: string }) => await fetchWithAuth("cer_api.nsf/xsp/.xrest/altaRcl", { method: 'POST', data: { ...props } });
export const createNewCommentRcl = async ({ ...props }: { Rcl_id: string, Rcl_Description: string }) => await fetchWithAuth("cer_api.nsf/xsp/.xrest/respRcl", { method: 'POST', data: { ...props } });
export const createNewReservation = async ({ eventos }: { eventos: { tycs: string, costo: string, start: string, end: string, id: string, title: string, pn: string, timeZone: string, costoChecked: string, isAdmChecked: string, tycsAttach: string, tycsChecked: string }[] }) => await fetchWithAuth("cer_rec.nsf/xsp/.xrest/reservaNew", { method: 'POST', data: { eventos } });
export const cancelTurn = async ({ eventos }: { eventos: { accion: string, recurso: string, start: string, end: string, id: string, fechaHoraDesde: string, title: string, pn: string, }[] }) => await fetchWithAuth("cer_rec.nsf/xsp/.xrest/reservaCancel", { method: 'POST', data: { eventos } });
export const addNewUnit = async ({ pin }: { pin: string }) => await fetchWithAuth("cer_api.nsf/xsp/.xrest/altaPin", { method: 'POST', data: { PIN: pin } });
export const getToken = async ({ username, password }: { username: string, password: string }) => await fetchWithAuth("/cer_api.nsf/xsp/.xrest/token", { method: 'POST', data: { "032569E3": username, "005AA4F3": password }, headers: { "Authorization": "Basic " + btoa(`${username}:${password}`) } });