function State() {
  this.container = null;
  this.btnClose = null;
}

const state = new State();

export function init() {
  state.container = document.querySelector("#modal-contact");
  state.btnClose = document.querySelector("#modal-contact-close");

  state.container.addEventListener("click", handleContainerClick);
  state.btnClose.addEventListener("click", handleBtnCloseClick);
}

export function showModal() {
  state.container.classList.add("active");
}

export function closeModal() {
  state.container.classList.remove("active");
}

function handleBtnCloseClick(event) {
  event.preventDefault();
  closeModal();
}

function handleContainerClick(event) {
  // 'This' references where the listener is added, 
  // So, if the target click is equal to 'this', it'll trigger the action;
  if(event.target === this) {
    closeModal();
  }
}
