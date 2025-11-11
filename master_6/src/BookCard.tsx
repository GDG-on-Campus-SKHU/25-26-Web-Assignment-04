import React from 'react';
import type { Book } from './App';

interface Props {
  book: Book;
  onRemove: (id: number) => void;
}

export default function BookCard({ book, onRemove }: Props) {
  return (
    <div className="book-card">
      <button className="delete-btn" onClick={() => onRemove(book.id)}>
        ❌
      </button>
      <h3>{book.title}</h3>
      <p>저자: {book.author}</p>
      <p>가격: {book.price.toLocaleString()}원</p>
      <p>카테고리: {book.category || '-'}</p>
    </div>
  );
}
