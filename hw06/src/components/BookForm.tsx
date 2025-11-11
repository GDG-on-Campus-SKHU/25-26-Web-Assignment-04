import { useState } from "react";
import type { Book } from "../types";

type Props = { onAdd: (book: Omit<Book, "id">) => void };

export default function BookForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim(), a = author.trim();
    if (!t || !a) return alert("제목과 저자는 반드시 입력해주세요.");

    const p = Number(price);
    onAdd({
      title: t,
      author: a,
      price: Number.isFinite(p) && p >= 0 ? p : 0,
      category: category.trim() || "기타",
    });

    setTitle(""); setAuthor(""); setPrice(""); setCategory("");
  };

  return (
    <form className="card form" onSubmit={onSubmit}>
      <div className="row">
        <label className="label">
          제목
          <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="예) 모던 자바스크립트" />
        </label>
        <label className="label">
          저자
          <input className="input" value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder="예) 홍길동" />
        </label>
      </div>

      <div className="row">
        <label className="label">
          가격(숫자)
          <input className="input" type="number" min={0} value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="예) 15000" />
        </label>
        <label className="label">
          카테고리
          <input className="input" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="예) IT/프로그래밍" />
        </label>
      </div>

      <div className="actions right">
        <button type="submit" className="btn primary">추가</button>
      </div>
    </form>
  );
}
