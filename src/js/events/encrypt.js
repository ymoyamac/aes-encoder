import { encypt } from "../aes.js";
import { isPasswordEncryptValid } from "../middlewares/inputs-validations.js";
import { isTextInfoEncryptValid } from "../middlewares/textarea-validations.js";
import { HTMLInputPasswordError, HTMLTextareaError } from "../utils/hanldeErrors.js";

const passwordToEncrypt = document.querySelector('#passwordToEncrypt');
const infoToBeEncrypted = document.querySelector('#infoToBeEncrypted');
const encryptionResult = document.querySelector('#encryptionResult');
const btnEncrypt = document.querySelector('#btnEncrypt');
const btnCancelEncrypt = document.querySelector('#btnCancelEncrypt');

const INITIAL_STATE = '';

export const launchButtonsEncryptEvents = () => {
  btnEncrypt.addEventListener('click', async () => {
    const password = passwordToEncrypt.value;
    const textPlain = infoToBeEncrypted.value;
    const passValid = isPasswordEncryptValid(password, passwordToEncrypt, 'input-error-pass1', HTMLInputPasswordError);
    const textareaValid = isTextInfoEncryptValid(textPlain, infoToBeEncrypted, 'textarea-encrypt-error', HTMLTextareaError);
    if (passValid && textareaValid) {
      encryptionResult.value = await encypt(password, textPlain);
    }
  });

  btnCancelEncrypt.addEventListener('click', () => {
    document.querySelector('#passwordToEncrypt').value = INITIAL_STATE;
    document.querySelector('#infoToBeEncrypted').value = INITIAL_STATE;
    document.querySelector('#encryptionResult').value = INITIAL_STATE;
  });
}