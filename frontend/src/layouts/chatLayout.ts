export function chatLayout() {
  const style = document.createElement("style");
  style.textContent = `
.header {
  width: 100%;
  background-color: rgba(255, 130, 130, 1);
  height: 60px;
}

.main {
  display: flex;
  justify-content: center;
  height: calc(100vh - 60px);
}

.main__content {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main__title {
  margin: 10px 0px 0px 0px;
}

.main__title-description {
  margin: 5px 0px 0px 0px;
}

.main__chat {
  display: flex;
  flex-direction: column; /* orden normal */
  justify-content: flex-end; /* empuja el contenido al fondo */
  gap: 8px;
  flex: 1; /* ocupa el hueco entre título y form */
  overflow-y: auto;
  padding: 8px 0;
}

.message {
  max-width: 100%; /* evita burbujas demasiado anchas */
  padding: 8px 12px;
  border-radius: 12px;
  line-height: 1.3;
  word-break: break-word; /* por si vienen textos largos o sin espacios */
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input {
  height: 55px;
  border: 2px solid black;
  border-radius: 4px;
}

.button {
  background-color: rgba(156, 187, 233, 1);
  height: 55px;
  color: black;
  font-size: 15px;
  border: none;
  border-radius: 4px;
}

.msg-group {
  display: flex;
  flex-direction: column;
  max-width: 85%;      /* más ancho y natural */
}

.msg-author {
  margin: 0;
  font-size: 13px;
  color: rgba(165, 165, 165, 1);
}

.received-group {
  align-self: flex-start;
}

.received {
  background-color: rgba(216, 216, 216, 1);
  align-self: flex-start;   /* izquierda */
}

.send {
  background-color: rgba(185, 233, 124, 1);
  align-self: flex-end;
}    

.label{
    font-weight: 400;
    color: rgba(165, 165, 165, 1);
    max-width: 50%;
}    
.send-group {
  align-self: flex-end;
}

.received-group {
  align-self: flex-start;
}
    `;

  const div = document.createElement("div");
  div.innerHTML = `
<header class="header">
      <div class="header__content"></div>
    </header>

    <main class="main">
      <div class="main__content">
        <section class="main__description">
          <h1 class="main__title">Chat</h1>
          <p class="main__title-description" data-el="roomId"></p>
        </section>

        <section data-el="messages" class="main__chat">
          
        </section>

        <form action="" class="form" data-el="form">
          <input type="text" class="input" placeholder="Type your message" data-el="input" />
          <button class="button">Send</button>
        </form>
      </div>
    </main>    
    `;

  div.prepend(style);
  return div;
}

// <div class="msg-group receiver-group">
//   <p class="msg-author">alan</p>
//   <div class="message received">que onda?</div>
// </div>

// <p class="message send">Hola</p>
