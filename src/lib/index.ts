import { get, writable } from "svelte/store";

const codePattern = /^[A-Z]{3}-[A-Z]{3}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let notificationsCount = 0

interface notice {
    id: number;
    page: string;
    title: string;
    description: string;
    expire_at: string;
}

export interface agendaData {
    name: string;
    agenda: notice[];
}

export const codeHandle = (e:Event & {currentTarget: EventTarget & HTMLInputElement}) =>{
    let v = e.currentTarget.value.toUpperCase().replace(/[^A-Z]/g, '');
    v = v.slice(0, 6);
    if (v.length > 3) v = v.slice(0, 3) + '-' + v.slice(3)
    e.currentTarget.value = v;
}

export const notifications = writable<{id:number, message:string}[]>([]);

export const notify = (message:string) => {
    notificationsCount++
    notifications.set([...get(notifications), {id: notificationsCount, message}]);
}

export const codeTrue = (code: string) => {
    return codePattern.test(code);
}

export const emailTrue = (email: string) => {
    return emailPattern.test(email);
}

function parseDate(str: string): number {
    // Tenta ISO primeiro
    const iso = Date.parse(str);
    if (!isNaN(iso)) return iso;

    // Tenta formato brasileiro: DD/MM/YY, HH:mm
    const match = str.match(/^(\d{2})\/(\d{2})\/(\d{2}), (\d{2}):(\d{2})$/);
    if (match) {
        const [_, day, month, year, hour, minute] = match;
        // Assume século 2000
        const fullYear = parseInt(year) < 50 ? '20' + year : '19' + year;
        return new Date(`${fullYear}-${month}-${day}T${hour}:${minute}:00-03:00`).getTime();
    }
    // Se não conseguir, retorna NaN
    return NaN;
}

export const timeDiff = (fromIso: string, toIso: string, showPercent: boolean = false): { remain: string, complete: number, scope: string } => {

    const from = parseDate(fromIso);
    const to = parseDate(toIso);

    let diff = Math.max(0, to - from) / 1000;
    let scope, remain: string;

    if (diff < 60) {
        remain = `${diff.toFixed(0)} segundos`;
        scope = "segundos";
    } else if (diff < 3600) {
        remain = `${(diff / 60).toFixed(0)}:${(diff - (diff / 60)).toFixed(0)} segundos`;
        scope = "minutos";
    } else if (diff < 86400) {
        remain = `${(diff / 3600).toFixed(0)} horas`;
        scope = "horas";
    } else {
        remain = `${(diff / 86400).toFixed(0)} dias`;
        scope = "dias";
    }

    return { remain, complete: showPercent && to > from ? 100 * (from / to) : 0, scope };
}