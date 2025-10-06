"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // 初回ロード時にlocalStorageから読み込み
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // todosが変わるたび保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 追加
  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  // 削除
  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // 完了状態の切り替え
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 640,
        margin: "0 auto",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Todo App
      </h1>

      {/* 入力フォーム */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="やることを入力"
          style={{
            flex: 1,
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 6,
            fontSize: 16,
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            borderRadius: 6,
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          追加
        </button>
      </div>

      {/* Todoリスト */}
      <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #e5e5e5",
              padding: 10,
              borderRadius: 6,
              backgroundColor: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#999" : "#000",
                  fontSize: 16,
                }}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => removeTodo(todo.id)}
              style={{
                background: "none",
                border: "none",
                color: "#d00",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", marginTop: 40 }}>
          まだやることはありません。
        </p>
      )}
    </main>
  );
}