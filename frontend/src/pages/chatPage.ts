import { chatLayout } from "../layouts/chatLayout";
import { state } from "../store/state";

export function chatPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = chatLayout();
  root.appendChild(view);

  const messagesEl = view.querySelector('[data-el="messages"]') as HTMLElement;
  const formEl = view.querySelector('[data-el="form"]') as HTMLFormElement;
  const inputEl = view.querySelector('[data-el="input"]') as HTMLInputElement;
  const roomIdEl = view.querySelector(
    '[data-el="roomId"]'
  ) as HTMLParagraphElement;

  const { userId, roomId, rtdbRoomId } = state.getState();
  if (!userId || !roomId) {
    location.hash = "#/";
    return;
  }

  roomIdEl.textContent = `room id: ${state.getState().roomId}`;

  function renderMessages() {
    const { messages } = state.getState();
    messagesEl.innerHTML = "";

    for (const m of messages) {
      const wrapper = document.createElement("div");
      wrapper.className = `msg-group ${m.mine ? "send-group" : "received-group"}`;

      if (!m.mine) {
        const author = document.createElement("p");
        author.className = "msg-author";
        author.textContent = m.from;
        wrapper.appendChild(author);
      }

      const p = document.createElement("p");
      p.className = `message ${m.mine ? "send" : "received"}`;
      p.textContent = m.text;

      wrapper.appendChild(p);
      messagesEl.appendChild(wrapper);
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  renderMessages();

  state.listenMessages();
  state.subscribe(renderMessages);

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;
    state.sendMessage(text);
    inputEl.value = "";
  });
}
