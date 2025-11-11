import { useState } from "react";
import type { Book } from "../App"; // ✅ 이제 App.tsx에서 import

type Props = { onAdd: (data: Omit<Book, "id">) => void };

export default function BookForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("소설");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("제목과 저자는 필수입니다.");
      return;
    }

    onAdd({
      title: title.trim(),
      author: author.trim(),
      price: Number(price) || 0,
      category,
    });

    setTitle("");
    setAuthor("");
    setPrice("");
    setCategory("소설");
    setError("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="row">
        <label>
          <span>제목</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>저자</span>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
      </div>

      <div className="row">
        <label>
          <span>가격</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          <span>카테고리</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>소설</option>
            <option>기술</option>
            <option>과학</option>
            <option>기타</option>
          </select>
        </label>
      </div>

      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn">
        추가
      </button>
    </form>
  );
}
