import { removeError, renderError } from "../components/Error.js";
import { HTMLInputPasswordComparetionError } from "../utils/hanldeErrors.js";

const regExp = /^[a-zA-Z0-9]{6,16}$/;

export const isPasswordEncryptValid = (password, node, HTMLElementId, HTMLError) => {
  if (!regExp.test(password)) {
    renderError(node, HTMLElementId, HTMLError);
    return false;
  }
  removeError(node);
  return true;
}

export const confirmPassword = (password, node, HTMLElementId, HTMLError) => {
  if (node.value !== document.getElementById('passwordToEncrypt').value) {
    renderError(node, HTMLElementId, HTMLInputPasswordComparetionError)
    return false;
  }
  if (!regExp.test(password)) {
    renderError(node, HTMLElementId, HTMLError)
    return false;
  }
  removeError(node);
  return true;
}
