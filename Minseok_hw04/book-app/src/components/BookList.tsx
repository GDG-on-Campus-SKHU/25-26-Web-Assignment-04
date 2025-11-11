import type { Book } from "../App";

type Props = { books: Book[]; onDelete: (id: string) => void };

export default function BookList({ books, onDelete }: Props) {
  if (books.length === 0) return <p>등록된 도서가 없습니다.</p>;

  return (
    <div className="grid">
      {books.map((b) => (
        <div key={b.id} className="card">
          <button className="delete" onClick={() => onDelete(b.id)}>
            ×
          </button>
          <h3>{b.title}</h3>
          <p>저자: {b.author}</p>
          <p>가격: {b.price.toLocaleString()}원</p>
          <p>카테고리: {b.category}</p>
        </div>
      ))}
    </div>
  );
}
