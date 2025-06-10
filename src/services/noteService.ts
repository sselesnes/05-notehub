import axios from "axios";
import type { AxiosResponse, Method } from "axios";
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

// method - запит ("get", "post", "delete")
// urlPath - шлях якщо потрібен
// CreateNoteParams data - для відправки
// FetchNotesParams params - для запиту
// number id - для Delete
// FetchNotesResponse - проміс з результатом

async function apiRequest(
  method: Method,
  urlPath: string,
  data?: CreateNoteParams,
  params?: FetchNotesParams,
  id?: number
): Promise<FetchNotesResponse | Note> {
  try {
    const endpoint = id !== undefined && method === "delete" ? `/${id}` : urlPath;

    // Запит залежно від методу
    const config = {
      method,
      url: endpoint,
      data: data,
      params:
        method === "get" && params
          ? {
              page: params.page || 1,
              perPage: params.perPage || 12,
              sortBy: "created",
              ...(params.query && params.query.trim().length > 0
                ? { search: params.query }
                : {}),
            }
          : undefined,
      headers: method === "post" ? { "Content-Type": "application/json" } : {},
    };

    const response: AxiosResponse<FetchNotesResponse | Note> = await api(config);
    return response.data;
  } catch (error) {
    throw new Error(`API: ${error instanceof Error ? error.message : "Unknown Error"}`);
  }
}

export async function fetchNotes({
  query,
  page = 1,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const result = await apiRequest("get", "", undefined, { query, page, perPage });
  return result as FetchNotesResponse;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
  const result = await apiRequest("post", "", data);
  return result as Note;
}

export async function deleteNote(id: number): Promise<Note> {
  const result = await apiRequest("delete", "", undefined, undefined, id);
  return result as Note;
}
