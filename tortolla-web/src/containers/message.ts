import { MessageBarIntent } from "@fluentui/react-components";

export interface AppMessage {
    intent: MessageBarIntent;
    message: string;
    id: number;
  }

export let messages : Array<AppMessage> = [];

export const info = (message: string) => {
    const id = Date.now();
    messages.push({
        intent: "info",
        message: message,
        id: id,
    })
}

export const warn = (message: string) => {
    const id = Date.now();
    messages.push({
        intent: "warning",
        message: message,
        id: id,
    })
}

export const error = (message: string) => {
    const id = Date.now();
    messages.push({
        intent: "error",
        message: message,
        id: id,
    })
}

export const dismiss = (id: number) => {
    messages = messages.filter((message) => {message.id === id});
}
