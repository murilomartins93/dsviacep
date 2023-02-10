import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from "../controllers/list-controller.js";

function State() {
  this.Address = new Address();

  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.errorCep = null;
  this.errorNumber = null;

  this.btnSave = null;
  this.btnClear = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.inputNumber.addEventListener("change", handleInputNumberChange);
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyUp);
  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
  state.inputCep.addEventListener("change", handleInputCepChange);
}

function handleInputNumberChange(event) {
  if (event.target.value == "") {
    setFormError("number", "Campo requerido");
  } else {
    setFormError("number", "");
  }
}

function handleInputNumberKeyUp(event) {
  state.address.number = event.target.value;
}

function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function handleBtnSaveClick(event) {
  event.preventDefault();

  const errors = addressService.getErrors(state.address);
  const keys = Object.keys(errors);

  if (keys.length > 0) {
    //  for(let i = 0; i < keys.length; i++) {
    //     setFormError(keys[i], errors[keys[i]]);}
    keys.forEach((key) => {
      setFormError(key, errors[key]);
    });
  } else {
    listController.addCard(state.address);
    clearForm();
  }
}

async function handleInputCepChange(event) {
  const cep = event.target.value;
  try {
    const address = await addressService.findByCep(cep);
    state.inputCity.value = address.city;
    state.inputStreet.value = address.street;
    state.address = address;
    setFormError("cep", "");
    state.inputNumber.focus();
  } catch (e) {
    state.inputStreet.value = "";
    state.inputCity.value = "";
    setFormError("cep", "Informe um CEP válido");
  }
}

function clearForm() {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputCity.value = "";

  setFormError("cep", "");
  setFormError("number", "");

  state.address = new Address();

  state.inputCep.focus();
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
