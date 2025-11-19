import { homeLayout } from "../layouts/homeLayout";
import { state } from "../store/state";

export function homePage(root: HTMLElement) {
  root.innerHTML = "";

  const view = homeLayout();
  root.appendChild(view);

  const campoExtra = view.querySelector('[data-el="extra"]') as HTMLDivElement;

  const form = view.querySelector('[data-el="form"]') as HTMLFormElement;
  const inputEmail = view.querySelector(
    '[data-el="inputEmail"]'
  ) as HTMLInputElement;
  const inputName = view.querySelector(
    '[data-el="inputName"]'
  ) as HTMLInputElement;
  const typeSelect = view.querySelector(
    '[data-el="select"]'
  ) as HTMLSelectElement;
  const inputId = view.querySelector(
    '[data-el="inputRoomId"]'
  ) as HTMLInputElement;

  typeSelect?.addEventListener("change", () => {
    if (typeSelect.value === "roomExistente") {
      campoExtra.style.display = "flex";
    } else {
      campoExtra.style.display = "none";
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = inputEmail.value.trim();
    const name = inputName.value.trim();
    const select = typeSelect.value;
    const id = inputId.value.trim();

    if (!email) return alert("Por favor, ingrese su email");
    if (!name) return alert("Por favor, ingrese su nombre");

    if (select === "roomExistente" && !id) {
      return alert("Debe ingresar un Room ID valido");
    }

    await state.authOrSignup(email, name);

    if (select === "nuevoRoom") {
      await state.createRoom();
    } else {
      state.setRoomId(id);
      await state.connectToRoom();
    }

    location.hash = "#/chat";
  });
}
