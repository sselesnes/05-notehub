export interface Note {
  id: number;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  created: string;
}

export interface NoteListProps {
  notes: Note[];
}

export interface FetchNotesParams {
  query?: string;
  page?: number;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

export interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export interface NoteModalProps {
  onClose: () => void;
}

export interface ErrorMessageProps {
  message: string;
}
