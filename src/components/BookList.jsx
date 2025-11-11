function BookList({ books, onDeleteBook }) {
  if (books.length === 0) {
    return <p className="empty-message">등록된 도서가 없습니다.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <button
            className="delete-button"
            onClick={() => onDeleteBook(book.id)}
          >
            삭제
          </button>
          <h3>{book.title}</h3>
          <p>저자: {book.author}</p>
          <p>가격: {book.price ? `${book.price}원` : '가격 정보 없음'}</p>
          <p>카테고리: {book.category || '분류 없음'}</p>
        </div>
      ))}
    </div>
  );
}

export default BookList;