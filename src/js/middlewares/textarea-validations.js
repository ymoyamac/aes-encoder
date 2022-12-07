import { removeError, renderError } from "../components/Error.js";
import { HTMLTextareaHashError } from "../utils/hanldeErrors.js";

export const isTextInfoEncryptValid = (text, node, HTMLElementId, HTMLError) => {
  if (!text) {
    renderError(node, HTMLElementId, HTMLError);
    return false;
  }
  removeError(node);
  return true;
}

export const isHashValid = (text, node, HTMLElementId, HTMLError) => {
  if (node.value !== document.getElementById('encryptionResult').value) {
    renderError(node, HTMLElementId, HTMLTextareaHashError);
    return false;
  }
  if (!text) {
    renderError(node, HTMLElementId, HTMLError);
    return false;
  }
  removeError(node);
  return true;
}