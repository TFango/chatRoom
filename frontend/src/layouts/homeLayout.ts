export function homeLayout() {
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
}

.main__content {
  width: 90%;
  display: flex;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form_group {
  display: flex;
  flex-direction: column;
}

.label {
    font-size: 15px;
}

.input {
    height: 40px;
    border: 2px solid black;
    border-radius: 2px;
}

.button{
    background-color: rgba(156, 187, 233, 1);
    margin-top: 20px;
    height: 55px;
    font-size: 20px;
}    
    `;

  const div = document.createElement("div");
  div.innerHTML = `
<header class="header">
      <div class="header__content"></div>
    </header>

    <main class="main">
      <div class="main__content">
        <h1 class="main__title">Bienvenidx</h1>

        <form action="" class="form" data-el="form">
          <div class="form_group">
            <label class="label" for="">email</label>
            <input class="input" type="email" data-el="inputEmail"/>
          </div>

          <div class="form_group">
            <label class="label" for="">tu nombre</label>
            <input class="input" type="text" data-el="inputName" />
          </div>

          <div class="form_group">
            <label class="label" for="">room</label>
            <select class="input" name="" data-el="select">
              <option value="nuevoRoom">Nuevo room</option>
              <option value="roomExistente">Room existente</option>
            </select>
          </div>

          <div data-el="extra" class="form_group" style="display: none">
            <label class="label" for="">Room id</label>
            <input class="input" type="text" data-el="inputRoomId"/>
          </div>
          <button class="button">Comenzar</button>
        </form>
      </div>
    </main>    
    `;

  div.prepend(style);
  return div;
}
