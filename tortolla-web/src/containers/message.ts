import { useContext } from "react";
import { MessageContext } from "../components/MessageProvider.tsx";
import { MessageBarIntent } from "@fluentui/react-components";
export interface AppMessage {
  intent: MessageBarIntent;
  message: string;
  id: number;
}

export const useMessage = () => {
  const { messages, info, warn, error, success, dismiss } =
    useContext(MessageContext);
  return { messages, info, warn, error, success, dismiss };
};
