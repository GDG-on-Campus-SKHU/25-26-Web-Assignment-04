import React, { useState } from 'react';
import type { Book } from './App';

interface Props {
  onAdd: (book: Omit<Book, 'id'>) => void;
}

export default function BookForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title: form.title,
      author: form.author,
      price: Number(form.price),
      category: form.category,
    });
    setForm({ title: '', author: '', price: '', category: '' });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="제목" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="저자" value={form.author} onChange={handleChange} required />
      <input name="price" placeholder="가격" value={form.price} onChange={handleChange} type="number" />
      <input name="category" placeholder="카테고리" value={form.category} onChange={handleChange} />
      <button type="submit">추가</button>
    </form>
  );
}
