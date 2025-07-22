"use client";

import { TelegramProvider, useTelegram } from "../contexts /TelegramProvider";
// import { useRouter } from "next/router";

const WebApp = () => {
  const { onClose, user, webApp } = useTelegram();
  // const { push } = useRouter();

  // useEffect(() => {
  //   if (user?.id) {
  //     // push({
  //     //   pathname: "/role",
  //     //   query: { user: user?.id },
  //     // });
  //   }
  // }, [user]);

  console.log(webApp);
  console.log(user?.username);
  return (
    <div>
      {user?.username}
      <button onClick={onClose}>onClose</button>
    </div>
  );
};

const WithTelegramProvider = () => {
  return (
    <TelegramProvider>
      <WebApp />
    </TelegramProvider>
  );
};

export default WithTelegramProvider;
