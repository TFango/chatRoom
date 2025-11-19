import { homePage } from "../pages/home";
import { chatPage } from "../pages/chatPage";

const routes: Record<string, (root: HTMLElement) => void> = {
  "#/": homePage,
  "#/chat": chatPage,
};

const root = document.getElementById("app")!;
let cleanup: (() => void) | undefined;

function render() {
  cleanup?.();
  const page = routes[location.hash || "#/"];
  if (!page) return (root.textContent = "404");
  const maybeCleanup = page(root);
  if (typeof maybeCleanup === "function") cleanup = maybeCleanup;
}

export function initRouter() {
  window.addEventListener("hashchange", render);
  render();
}
