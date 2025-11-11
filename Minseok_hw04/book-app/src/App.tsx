import { useEffect, useState } from "react";
import "./index.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

// ✅ types.ts 안 만들고 여기 안에서 바로 타입 정의
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
}

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("books");
    if (saved) setBooks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (data: Omit<Book, "id">) => {
    const newBook: Book = { id: crypto.randomUUID(), ...data };
    setBooks((prev) => [newBook, ...prev]);
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="container">
      <h1>도서 정보 관리</h1>
      <BookForm onAdd={addBook} />
      <BookList books={books} onDelete={deleteBook} />
    </div>
  );
}
