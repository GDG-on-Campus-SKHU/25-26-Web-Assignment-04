import React from 'react';

export default function EmptyMessage({ message }: { message: string }) {
  return <p className="empty-message">{message}</p>;
}
