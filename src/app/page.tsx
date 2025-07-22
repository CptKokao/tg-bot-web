"use client";

import { useTelegram } from "../contexts /TelegramProvider";

const WebApp = () => {
  const { onClose, user, webApp } = useTelegram();

  console.log(webApp);
  console.log(user?.username);

  return (
    <div>
      {user?.username}
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default WebApp;
