"use client";

import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  function handleAdd(e) {
    e. preventDefault();
    if (text === "")return;
    setItems([...items, text])
    setText("");
    setIsOpen(false);
  }

  return (
    <main>
      <h1>C♡NNECT</h1>

      <button onClick={() => setIsOpen(true)}>+</button>

      {isOpen && (
        <form onSubmit={handleAdd}>
          <input 
             type="text"
             placeholder="行きたいところ"
             value={text}
             onChange={(e) => setText(e.target.value)}
             enterKeyHint="done"
          />
          <button type="button" onClick={() => setIsOpen(false)}>閉じる</button>
          <button type="submit">追加</button>
        </form>
      )}

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </main>
  );
}