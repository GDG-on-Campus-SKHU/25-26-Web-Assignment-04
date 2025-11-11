import type { Book } from "../types";

type Props = { books: Book[]; onDelete: (id: number) => void };

export default function BookList({ books, onDelete }: Props) {
  if (!books?.length) {
    return <p className="empty">등록된 도서가 없습니다.</p>;
  }

  return (
    <div className="grid">
      {books.map((b) => (
        <article key={b.id} className="card book">
          <button className="delete" onClick={() => onDelete(b.id)}>삭제</button>
          <h3 className="book-title">{b.title}</h3>
          <p className="meta">저자: {b.author}</p>
          <p className="meta">가격: {b.price.toLocaleString()}원</p>
          <p className="chip">{b.category}</p>
        </article>
      ))}
    </div>
  );
}
