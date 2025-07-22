import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import { useTelegram } from "@/contexts /TelegramProvider";

const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { webApp } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    webApp?.sendData(JSON.stringify(data));
  }, [country, street, subject, webApp]);

  useEffect(() => {
    webApp?.onEvent("mainButtonClicked", onSendData);
    return () => {
      webApp?.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, webApp]);

  useEffect(() => {
    webApp?.MainButton.setParams({
      text: "Отправить данные",
    });
  }, [webApp]);

  useEffect(() => {
    if (!street || !country) {
      webApp?.MainButton.hide();
    } else {
      webApp?.MainButton.show();
    }
  }, [country, street, webApp]);

  const onChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form"}>
      <h3>Введите ваши данные</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"Страна"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Улица"}
        value={street}
        onChange={onChangeStreet}
      />
      <select value={subject} onChange={onChangeSubject} className={"select"}>
        <option value={"physical"}>Физ. лицо</option>
        <option value={"legal"}>Юр. лицо</option>
      </select>
    </div>
  );
};

export default Form;
