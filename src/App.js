import './App.css';
import './normal.css';
import { useState } from 'react';

function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today?"
  }
  ]);

  function clearChat() {
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]

    setInput('');
    // setChatLog(chatLogNew);

    const messages = chatLogNew.map((message) => message.message).join('\n')

    // fetch request to API combining chatlog array of messages and sending it as a message to localhost:3080 as a post
    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });

    const data = await response.json();
    console.log(data.message);

    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])

  }

  return (
    <>
      <div className="App">
        <section className="chatbox">
          <section className="chat-log">
          {chatLog.map((message, index) => (
            <div className="chat-container" key={`message-${index}`}>
              <div
                
                className={`chat-message ${message.user === "gpt" && "chatgpt"}`}
              >
                <div className="chat-message-center">
                  <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
                  </div>
                  <div className="message">
                    {message.message}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </section>
          <div className="chat-input-holder">
            <form onSubmit={handleSubmit}>
              <input
                className="chat-input-textarea"
                rows="2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></input>
            </form>
            <div className="refresh">
              <div className="refresh-menu-button" onClick={clearChat}>
                <span>+</span>New Chat</div>
            </div>
          </div>
        </section>
      </div>
    </>

  );
}

// const ChatMessage = ({ message }) => {
//   return (
//     <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
//       <div className="chat-message-center">
//         <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>

//         </div>
//         <div className="message">
//           {message.message}
//         </div>
//       </div>
//     </div>
//   )
// }

export default App;
