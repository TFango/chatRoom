import { initRouter } from "./router/router";
import { state } from "./store/state";

(window as any).state = state;

(function main() {
  initRouter();
})();