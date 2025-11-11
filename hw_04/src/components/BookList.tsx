import styled from "styled-components";
import type { Book } from "../types";

type Props = {
  books: Book[];
  onDelete: (id: string) => void;
};

export default function BookList({ books, onDelete }: Props) {
  if (!books.length) {
    return (
      <Panel>
        <Empty>등록된 도서가 없습니다.</Empty>
      </Panel>
    );
  }

  return (
    <Panel>
      <Grid>
        {books.map((b) => (
          <BookCard key={b.id}>
            <DeleteBtn onClick={() => onDelete(b.id)}>삭제</DeleteBtn>
            <BookTitle>{b.title}</BookTitle>
            <Meta>
              <MetaItem>
                <MetaLabel>저자</MetaLabel>
                <MetaValue>{b.author || "-"}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>가격</MetaLabel>
                <MetaValue>
                  {Number.isFinite(b.price)
                    ? `${b.price.toLocaleString()}원`
                    : "-"}
                </MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>카테고리</MetaLabel>
                <MetaValue>{b.category || "-"}</MetaValue>
              </MetaItem>
            </Meta>
          </BookCard>
        ))}
      </Grid>
    </Panel>
  );
}

const Panel = styled.section`
  min-height: 240px;
`;

const Empty = styled.div`
  background: #fff;
  border: 1px solid #e6e8ef;
  border-radius: 14px;
  padding: 28px;
  text-align: center;
  color: #6b707c;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BookCard = styled.article`
  position: relative;
  background: #ffffff;
  border: 1px solid #e6e8ef;
  border-radius: 14px;
  padding: 16px 16px 14px;
  box-shadow: 0 6px 14px rgba(18, 22, 33, 0.04);
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid #f1c3c0;
  background: #ffe9e7;
  color: #b4332a;
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 999px;
  cursor: pointer;
  transition: filter 0.15s;
  &:hover {
    filter: brightness(0.97);
  }
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  margin: 2px 0 10px;
  line-height: 1.35;
`;

const Meta = styled.dl`
  display: grid;
  grid-template-columns: 90px 1fr;
  row-gap: 6px;
`;

const MetaItem = styled.div`
  display: contents;
`;

const MetaLabel = styled.dt`
  color: #666c78;
  font-size: 12px;
`;

const MetaValue = styled.dd`
  font-size: 14px;
  margin: 0;
`;
