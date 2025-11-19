import { db } from "../services/firebase";
import { ref, onChildAdded, push } from "firebase/database";

const API_URL = "/api";

type Message = { from: string; text: string; mine: boolean };

type Data = {
  email: string;
  name: string;
  userId: string;
  roomId: string;
  rtdbRoomId: string;
  messages: Message[];
};

export const state = {
  data: {
    email: "",
    name: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    messages: [] as Message[],
  },
  listeners: [] as Array<(data: Data) => void>,

  getState() {
    return this.data;
  },
  setState(newState: Data) {
    this.data = newState;
    for (const cb of this.listeners) cb(this.data);
  },
  subscribe(callback: (data: Data) => void) {
    this.listeners.push(callback);
  },
  setEmail(email: string) {
    const current = this.getState();
    const newState: Data = {
      ...current,
      email,
    };
    this.setState(newState);
  },
  setName(name: string) {
    const current = this.getState();
    const newState: Data = {
      ...current,
      name,
    };
    this.setState(newState);
  },
  setRoomId(roomId: string) {
    const current = this.getState();

    const newState: Data = {
      ...current,
      roomId,
    };

    this.setState(newState);
  },
  resetMessages() {
    const current = this.getState();
    this.setState({
      ...current,
      messages: [],
    });
  },
  async authOrSignup(email: string, name: string) {
    console.log("➡️ authOrSignup llamado con:", { email, name });

    if (!email) {
      console.error("authOrSignup llamado sin email", email);
      throw new Error("email requerido");
    }
    //1) Intenta autenticar
    const resAuth = await fetch(`/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    let userId = "";

    if (resAuth.ok) {
      // Usuario EXISTE -> usmos id de /auth
      const data = await resAuth.json();
      userId = data.id;
      name = data.name || name;
    } else {
      // Usuario NO existe -> creamos uno nuevo
      const resSignup = await fetch(`/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (!resSignup.ok) throw new Error(`HTTP: ${resSignup.status}`);

      const data = await resSignup.json();
      userId = data.id;
    }

    //Guarda el state
    const current = this.getState();
    const newState: Data = {
      ...current,
      email,
      name,
      userId,
    };
    this.setState(newState);
  },
  async createRoom() {
    const userId = this.getState().userId;

    const resCreate = await fetch(`/api/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!resCreate.ok) throw new Error(`HTTP: ${resCreate.status}`);

    const data = await resCreate.json();
    const roomId = data.id;

    const resRtdb = await fetch(`/api/rooms/${roomId}?userId=${userId}`);

    if (!resRtdb.ok) throw new Error(`HTTP ${resRtdb.status}`);

    const dataRtdb = await resRtdb.json();
    const rtdbRoomId = dataRtdb.rtdbRoomId;

    const current = this.getState();
    const newState: Data = {
      ...current,
      roomId,
      rtdbRoomId,
    };

    this.setState(newState);
  },
  async connectToRoom() {
    const { roomId, userId } = this.getState();

    if (!roomId) throw new Error("No roomId set in state");
    if (!userId) throw new Error("User not authenticated");

    const resRtdb = await fetch(`/api/rooms/${roomId}?userId=${userId}`);

    if (!resRtdb.ok) throw new Error(`HTTP ${resRtdb.status}`);

    const dataRtdb = await resRtdb.json();

    const current = this.getState();
    const newState: Data = {
      ...current,
      roomId,
      userId,
      rtdbRoomId: dataRtdb.rtdbRoomId,
    };
    this.setState(newState);
  },
  addMessage(message: Message) {
    /*
    Toma un mensaje nuevo como parametro
    Lee el state actual con getState()
    Crea un nuevo state copiando todo, pero con el array messages + ese mensaje agregado al final
    llama a setstate(newState), actualiza el state dispara los listeners
    */

    const current = this.getState();

    const newState: Data = {
      ...current,
      messages: [...current.messages, message],
    };

    this.setState(newState);
  },
  async sendMessage(text: string) {
    /*
        Limpia el texto, si queda vacio no hace nada
        saca del state el name del usuario y el rtdbRoomId de la sala
        Si no hay rtdbRommId no puede enviar nada (no save a que room de Firebase pegarle)
        Crea una referencia a rooms/<rtdbRoomId>/message en la RTDB
        hace push de un nuevo mensaje con {from: name, text: cleantext}
    */
    const cleanText = text.trim();
    if (!cleanText) return;

    const { name, rtdbRoomId } = this.data;

    if (!rtdbRoomId) {
      console.error("No hay rtdbRoomId activo. No podés enviar mensajes.");
      return;
    }
    const messagesRef = ref(db, `rooms/${rtdbRoomId}/messages`);

    await push(messagesRef, {
      from: name,
      text: cleanText,
    });
  },
  listenMessages() {
    /*
    Se suscribe a los mensajes del room actual en Firebase RTDB

        - Lee rtdbRoomId y name del state.
        - Si no hay rtdbRoomId, no puede escuchar mensajes.
        - Crea una referencia a rooms/<rtdbRoomId>/messages.
        -Usa onChilAdded para reaccionar a cada mensaje nuevo.
        - Por cada mensaje:
            - arama un objeto Message con from, text y mine
            - lo agrega el state con this.addMessage(message)
    */
    const { rtdbRoomId, name } = this.getState();

    if (!rtdbRoomId) {
      console.error("No hay rtdbRoomId. No se puede escuchar mensajes.");
    }

    const chatRef = ref(db, `rooms/${rtdbRoomId}/messages`);

    onChildAdded(chatRef, (snap) => {
      const msg = snap.val();

      const message: Message = {
        from: msg.from,
        text: msg.text,
        mine: msg.from === name,
      };

      this.addMessage(message);
    });
  },
};
