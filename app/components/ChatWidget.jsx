"use client";

import { useState } from "react";
import styles from "./styles/ChatWidget.module.scss";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 How can I help with your shipment today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply }
      ]);

    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className={styles.chatWidget}>

      {!open && (
        <button
          className={styles.chatButton}
          onClick={() => setOpen(true)}
        >
          Chat
        </button>
      )}

      {open && (
        <div className={styles.chatWindow}>

          <div className={styles.header}>
            <span>Shipping Assistant</span>
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className={styles.typing}>
                Assistant typing...
              </div>
            )}
          </div>

          <div className={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about shipping..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>
              Send
            </button>
          </div>

        </div>
      )}

    </div>
  );
}