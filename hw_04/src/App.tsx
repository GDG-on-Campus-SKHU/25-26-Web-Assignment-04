import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import type { Book } from "./types";

const LOCAL_KEY = "books";
type SortDir = "asc" | "desc";

// 초기 상태를 localStorage에서 동기적으로 읽음
function loadInitialBooks(): Book[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (b) =>
        b &&
        typeof b.id === "string" &&
        typeof b.title === "string" &&
        typeof b.author === "string" &&
        typeof b.price === "number" &&
        typeof b.category === "string"
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [books, setBooks] = useState<Book[]>(() => loadInitialBooks());
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [categoryFilter, setCategoryFilter] = useState<string>("전체");

  // 변경 시에만 저장 (초기값은 이미 로컬스토리지에서 읽음)
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(books));
    } catch {}
  }, [books]);

  const handleAdd = (book: Book) => setBooks((prev) => [book, ...prev]);
  const handleDelete = (id: string) =>
    setBooks((prev) => prev.filter((b) => b.id !== id));

  // 카테고리 목록 (Select 옵션)
  const categories = useMemo(() => {
    const set = new Set<string>();
    books.forEach((b) => {
      const c = (b.category || "").trim();
      if (c) set.add(c);
    });
    return ["전체", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [books]);

  // 필터 + 정렬 적용된 리스트
  const visibleBooks = useMemo(() => {
    const filtered =
      categoryFilter === "전체"
        ? books
        : books.filter((b) => (b.category || "").trim() === categoryFilter);

    const sorted = [...filtered].sort((a, b) =>
      sortDir === "asc" ? a.price - b.price : b.price - a.price
    );

    return sorted;
  }, [books, sortDir, categoryFilter]);

  // 통계(현재 표시 중인 리스트 기준)
  const stats = useMemo(() => {
    const count = visibleBooks.length;
    const total = visibleBooks.reduce(
      (s, b) => s + (Number.isFinite(b.price) ? b.price : 0),
      0
    );
    const avg = count ? Math.round(total / count) : 0;
    return { count, total, avg };
  }, [visibleBooks]);

  return (
    <Wrap>
      <Header>도서 정보 관리</Header>

      <Inner>
        {/* 도서 추가 */}
        <LeftCol>
          <BookForm onAdd={handleAdd} />
        </LeftCol>

        {/* 도서 리스트 */}
        <RightCol>
          <Controls>
            <Group>
              <SegButton
                type="button"
                $active={sortDir === "asc"}
                onClick={() => setSortDir("asc")}
              >
                가격 ↑
              </SegButton>
              <SegButton
                type="button"
                $active={sortDir === "desc"}
                onClick={() => setSortDir("desc")}
              >
                가격 ↓
              </SegButton>
            </Group>

            <Group>
              <FilterLabel htmlFor="categoryFilter">카테고리</FilterLabel>
              <FilterSelect
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </FilterSelect>
            </Group>
          </Controls>

          <BookList books={visibleBooks} onDelete={handleDelete} />

          <StatsBar>
            <div>
              총 <b>{stats.count}</b>권
            </div>
            <div>
              합계 <b>{stats.total.toLocaleString()}원</b>
            </div>
            <div>
              평균 <b>{stats.avg.toLocaleString()}원</b>
            </div>
          </StatsBar>
        </RightCol>
      </Inner>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 800;
`;

const Inner = styled.main`
  width: 100%;
  max-width: 1050px;
  margin: 20px auto;
  padding: 0 16px;

  display: grid;
  grid-template-columns: 480px 1fr;
  gap: 20px;
  align-items: start;
`;

const LeftCol = styled.div``;
const RightCol = styled.div``;

const Controls = styled.div`
  background: #ffffff;
  border: 1px solid #e6e8ef;
  border-radius: 14px;
  padding: 12px;
  margin-bottom: 14px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
`;

const Group = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const SegButton = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? "#4f66ff" : "#d8dbe5")};
  background: ${({ $active }) => ($active ? "#eef1ff" : "#fff")};
  color: ${({ $active }) => ($active ? "#2d3cff" : "#333")};
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  color: #5a5f6a;
`;

const FilterSelect = styled.select`
  border: 1px solid #d8dbe5;
  border-radius: 8px;
  padding: 8px 0;
  font-size: 13px;
  background: #fff;
  min-width: 160px;
  outline: none;
`;

const StatsBar = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: flex-end;
  color: #535964;
  font-size: 14px;
  margin-top: 14px;

  b {
    color: #111;
  }
`;
