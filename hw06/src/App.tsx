import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import type { Book } from "./types"; 

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("books");
      if (raw) setBooks(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("books", JSON.stringify(books));
    } catch {}
  }, [books]);

  const handleAdd = (book: Omit<Book, "id">) => {
    setBooks((prev) => [{ id: Date.now(), ...book }, ...prev]);
  };
  const handleDelete = (id: number) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <main className="page">
      <div className="container">
        <h1 className="title">📚 도서 정보 관리</h1>
        <BookForm onAdd={handleAdd} />
        <BookList books={books} onDelete={handleDelete} />
      </div>
    </main>
  );
}
