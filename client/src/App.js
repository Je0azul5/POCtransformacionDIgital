import React from 'react';
import ChatInterface from './components/ChatInterface';
import './App.css';
import UA from './images/UA.png'; // Adjust the path as necessary
import BR from './images/BR.webp'; // Adjust the path as necessary

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="image-container">
          <img className="left-image" src={UA} alt="Logo UA" />
          <h1 className="title">LeticIA</h1>
          <img className="right-image" src={BR} alt="Logo BR" />
        </div>
      </header>
      <main>
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;
