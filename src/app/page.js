"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

useEffect(() => {
  async function load() {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: true});

    if (error) {
      console.log(error);
      return;
    }

    setItems(data);
  }

  load();
},[]);

  async function handleAdd(e) {
    e. preventDefault();
    if (text === "")return;

    const { data, error } = await supabase
       .from("wishes")
       .insert({title: text })
       .select();

    if (error) {
      console.log(error);
      return;
    } 

  setItems([...items, data[0]]);
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
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </main>
  );
}