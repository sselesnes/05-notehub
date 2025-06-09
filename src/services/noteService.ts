import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  FetchNotesParams,
  FetchNotesResponse,
  CreateNoteParams,
  Note,
} from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/json",
  },
});

export async function fetchNotes({
  query,
  page = 1,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: { [key: string]: number | string | undefined } = {
    page,
    perPage,
    sortBy: "created",
  };

  // параметр search лише якщо query не є порожнім
  if (query && query.trim().length > 0) {
    params.search = query;
  }

  const response: AxiosResponse<FetchNotesResponse> = await api.get("", {
    params,
  });
  return response.data;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("", data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/${id}`);
  return response.data;
}
