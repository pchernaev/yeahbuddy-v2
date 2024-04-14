import "./style/Chat.css";
import { useState } from "react";
import { Navbar } from "../Navbar And Footer/Navbar";
import { Footer } from "../Navbar And Footer/Footer";

export const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async () => {
    changeMessage(input, "You");
    const response = await fetchMessage(input);
    changeMessage(response, "Coach");
    setInput("");
  };

  function changeMessage(input: string, user: string) {
    let currentMessages = messages;
    currentMessages.push({ text: input, user: user });
    setMessages(currentMessages);
  }

  const fetchMessage = async (input: any) => {
    const response = await fetch(
      "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          prompt: `You: ${input}\nAI:`,
          max_tokens: 150,
        }),
      }
    );
    const data = await response.json();
    return data.choices[0].text.trim();
  };

   const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div id="chat-container">
      <Navbar />
      <h1>Coach</h1>
      <p>
        Engage in dynamic and personalized conversations with our AI Chat Coach.
        Whether you're striving for personal growth, professional development,
        or simply seeking guidance, our AI Chat Coach is here to support you.
      </p>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`${message.user}`}>
            <p>{message.user}</p>
            <div className="text">{message.text}</div>
          </div>
        ))}
      </div>
      <div id="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask question..."
          onKeyDown={handleKeyDown}
        />
        <p onClick={sendMessage}>Send</p>
      </div>
      <Footer />
    </div>
  );
};
