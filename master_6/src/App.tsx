import React, { useEffect, useState } from 'react';
import './styles.css';
import BookForm from './BookForm';
import BookList from './BookList';

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
}

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('books');
    if (saved) setBooks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (book: Omit<Book, 'id'>) => {
    if (!book.title.trim() || !book.author.trim()) return;
    setBooks((prev) => [...prev, { id: Date.now(), ...book }]);
  };

  const removeBook = (id: number) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">📚 도서 관리 프로그램</h1>
      <BookForm onAdd={addBook} />
      <BookList books={books} onRemove={removeBook} />
    </div>
  );
}
