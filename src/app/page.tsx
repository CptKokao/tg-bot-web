"use client";

// import "./App.css";
import { useEffect, useState } from "react";
import { useTelegram } from "./useTelegram";
// import Header from "./components/Header/Header";
// import {Route, Routes} from 'react-router-dom'
// import ProductList from "./components/ProductList/ProductList";
// import Form from "./components/Form/Form";

function App() {
  const [tg, setTg] = useState();

  useEffect(() => {
    if (window?.Telegram?.WebApp) {
      setTg(window?.Telegram?.WebApp);
    }
  }, []);

  const onClose = () => {
    tg?.close();
  };

  return (
    <div className="App">
      <div className={"header"}>
        <button onClick={onClose}>Закрыть</button>
        <span className={"username"}>{tg?.initDataUnsafe?.user?.username}</span>
      </div>
    </div>
  );
}

export default App;
