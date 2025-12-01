import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message to chat, using the rest operator to copy existing messages
    setMessages(prev => [...prev, { sender: "user", text: input }]);

    // Send to backend through the API route /api/message which has an endpoint set up
    const response = await fetch("http://localhost:3001/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    // Get the response data, await means it is an asynchronous operation
    const data = await response.json();

    // Add server reply, again we are using the rest operator to copy existing messages
    // then we are using the data from the server response which tells us who the sender is and the message
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: data.message }
    ]);

    //this clears the input box after sending
    setInput("");
  };

  return (
    <div className="chatbox">
      <h1>Basic Chatbot</h1>
      <div className="message-container">
        {/* Render each message in the messages array */}
        {/* I'm doing a map over the messages array to create a div for each message */}
        {/* And then the other key aspect is, I'm aligning the text based on who the sender is */}

        {messages.map((m, i) => (
          <div>
            <strong>{m.sender === "user" ? "You" : "Bot"}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-box"
        />
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
