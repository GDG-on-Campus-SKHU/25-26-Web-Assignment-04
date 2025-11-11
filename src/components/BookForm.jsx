import { useState } from 'react';

function BookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 제목이나 저자가 비어있으면 등록 X
    if (!title.trim() || !author.trim()) {
      alert('제목과 저자는 필수입니다.');
      return;
    }

    onAddBook({
      title: title.trim(),
      author: author.trim(),
      price: price.trim(),
      category: category.trim(),
    });

    // 폼 초기화
    setTitle('');
    setAuthor('');
    setPrice('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div>
        <label>
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="도서 제목"
          />
        </label>
      </div>
      <div>
        <label>
          저자
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="저자 이름"
          />
        </label>
      </div>
      <div>
        <label>
          가격
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격(원)"
          />
        </label>
      </div>
      <div>
        <label>
          카테고리
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="예: 소설, 경제, 개발"
          />
        </label>
      </div>
      <button type="submit">추가</button>
    </form>
  );
}

export default BookForm;
