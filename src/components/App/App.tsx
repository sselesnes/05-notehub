import css from "./App.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { fetchNotes } from "../../services/noteService";
import type { FetchNotesResponse } from "../../types/note";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoteModal from "../NoteModal/NoteModal";

export default function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<FetchNotesResponse | undefined, Error>({
    queryKey: ["notes", page, debouncedQuery],
    queryFn: () => fetchNotes({ page, query: debouncedQuery, perPage: 12 }),
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={page - 1}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error.message} />}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data?.notes && data.notes.length === 0 && <p>Nothing found</p>}
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
