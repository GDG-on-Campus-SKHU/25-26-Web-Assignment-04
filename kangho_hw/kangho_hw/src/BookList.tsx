import React from 'react';
import type { Book } from './App';
import BookCard from './BookCard';
import EmptyMessage from './EmptyMessage';

interface Props {
  books: Book[];
  onRemove: (id: number) => void;
}

export default function BookList({ books, onRemove }: Props) {
  if (books.length === 0) return <EmptyMessage message="등록된 도서가 없습니다." />;

  const avgPrice = books.length ? (books.reduce((sum, b) => sum + b.price, 0) / books.length).toFixed(1) : 0;

  return (
    <div className="book-list">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onRemove={onRemove} />
      ))}
      <p className="summary">
        총 {books.length}권 | 평균 가격 {avgPrice}원
      </p>
    </div>
  );
}
