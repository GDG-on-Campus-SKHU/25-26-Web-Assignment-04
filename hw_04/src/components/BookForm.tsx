import { useState, type FormEvent } from "react";
import styled from "styled-components";
import type { Book } from "../types";

type Props = { onAdd: (book: Book) => void };

export default function BookForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setTitle("");
    setAuthor("");
    setPrice("");
    setCategory("");
    setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    const a = author.trim();
    if (!t || !a) {
      setError("제목과 저자는 반드시 입력해 주세요.");
      return;
    }
    const p = Number(price);
    const safePrice = Number.isFinite(p) && p >= 0 ? p : 0;

    const book: Book = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: t,
      author: a,
      price: safePrice,
      category: category.trim(),
    };

    onAdd(book);
    reset();
  };

  return (
    <Card as="form" onSubmit={handleSubmit}>
      <Title>도서 추가</Title>

      <Field>
        <Label htmlFor="title">제목 *</Label>
        <Input
          placeholder="예) 모던 자바스크립트 Deep Dive"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>

      <Field>
        <Label htmlFor="author">저자 *</Label>
        <Input
          placeholder="예) 홍길동"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Field>

      {/* 가격 / 카테고리 */}
      <Row>
        <Field>
          <Label htmlFor="price">가격</Label>
          <Input
            type="number"
            min={0}
            step={100}
            placeholder="예) 18000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor="category">카테고리</Label>
          <Input
            placeholder="예) IT / 소설 / 에세이"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Field>
      </Row>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Submit type="submit">추가</Submit>
      <Hint>* 표시된 항목은 필수입니다.</Hint>
    </Card>
  );
}

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e6e8ef;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 6px 14px rgba(18, 22, 33, 0.04);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 14px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  min-width: 0;
`;

const Label = styled.label`
  font-size: 12px;
  color: #5a5f6a;
  margin-bottom: 6px;
`;

const Input = styled.input`
  border: 1px solid #d8dbe5;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  transition: box-shadow 0.15s, border-color 0.15s;
  min-width: 0;

  &:focus {
    border-color: #8aa0ff;
    box-shadow: 0 0 0 3px rgba(138, 160, 255, 0.25);
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const Submit = styled.button`
  width: 100%;
  border: none;
  border-radius: 10px;
  background: #4f66ff;
  color: #fff;
  font-weight: 700;
  padding: 12px 14px;
  cursor: pointer;
  margin-top: 4px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.95;
  }
  &:active {
    opacity: 0.9;
  }
`;

const ErrorMsg = styled.p`
  color: #d33a2c;
  font-size: 13px;
  margin: 4px 0 8px;
`;

const Hint = styled.p`
  font-size: 12px;
  color: #737782;
  margin-top: 10px;
`;
