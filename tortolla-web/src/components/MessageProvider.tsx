import React, { createContext, useState } from "react";
import { AppMessage } from "../containers/message.ts";

export type MessageContextValue = {
  messages: AppMessage[];
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  success: (message: string) => void;
  dismiss: (id: number) => void;
};

// Create a context object with a default value
export const MessageContext = createContext<MessageContextValue>({
  messages: [],
  info: () => {},
  warn: () => {},
  error: () => {},
  success: () => {},
  dismiss: () => {},
});

export const MessageProvider = (props: React.PropsWithChildren) => {
  const [messages, setMessages] = useState<AppMessage[]>([]);

  const pushMessage = (message: AppMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const info = (message: string) => {
    const newMessage: AppMessage = {
      intent: "info",
      message: message,
      id: Date.now(),
    };
    pushMessage(newMessage);
  };

  const warn = (message: string) => {
    const newMessage: AppMessage = {
      intent: "warning",
      message: message,
      id: Date.now(),
    };
    pushMessage(newMessage);
  };

  const error = (message: string) => {
    const newMessage: AppMessage = {
      intent: "error",
      message: message,
      id: Date.now(),
    };
    pushMessage(newMessage);
  };

  const success = (message: string) => {
    const newMessage: AppMessage = {
      intent: "success",
      message: message,
      id: Date.now(),
    };
    pushMessage(newMessage);
  };

  const dismiss = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  // Return the provider component with the value prop
  return (
    <MessageContext.Provider
      value={{ messages, info, warn, error, success, dismiss }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
