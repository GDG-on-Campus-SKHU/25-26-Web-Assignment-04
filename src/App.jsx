// book-manager/src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  // 처음 실행할 때 localStorage에서 책 리스트 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('books');
    if (stored) {
      try {
        setBooks(JSON.parse(stored));
      } catch (e) {
        console.error('failed to parse books from localStorage', e);
      }
    }
  }, []);

  // books 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // 도서 추가
  const handleAddBook = (book) => {
    setBooks((prev) => [
      ...prev,
      { ...book, id: Date.now() }, // 간단한 고유 id
    ]);
  };

  // 도서 삭제
  const handleDeleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="app">
      <h1>도서 정보 관리 프로그램</h1>
      <BookForm onAddBook={handleAddBook} />
      <BookList books={books} onDeleteBook={handleDeleteBook} />
    </div>
  );
}

export default App;
