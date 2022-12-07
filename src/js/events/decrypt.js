import { decrypt } from "../aes.js";
import { confirmPassword } from "../middlewares/inputs-validations.js";
import { isHashValid } from "../middlewares/textarea-validations.js";
import { HTMLInputPasswordConfirmError, HTMLTextareaHashError } from "../utils/hanldeErrors.js";

const passwordToDecrypt = document.querySelector('#passwordToDecrypt');
const infoToBeDecrypted = document.querySelector('#infoToBeDecrypted');
const decryptionResult = document.querySelector('#decryptionResult');
const btnDecrypt = document.querySelector('#btnDecrypt');
const btnCancelDecrypt = document.querySelector('#btnCancelDecrypt');

const INITIAL_STATE = '';

export const launchButtonsDecryptEvents = () => {
  btnDecrypt.onclick = async () => {
    const password = passwordToDecrypt.value;
    const codedTextWithBase64 = infoToBeDecrypted.value;
    const pass = confirmPassword(password, passwordToDecrypt, 'input-error-pass2', HTMLInputPasswordConfirmError);
    const hash = isHashValid(codedTextWithBase64, infoToBeDecrypted, 'textarea-decrypt-error', HTMLTextareaHashError)
    if (pass && hash) {
      try {
        const decrypted = await decrypt(password, codedTextWithBase64);
        decryptionResult.value = decrypted;
      } catch (e) {
        decryptionResult.value =
          'Decrypt error: ' +
          e.message +
          '. Is your password and information correct?';
      }
    }
  };

  btnCancelDecrypt.addEventListener('click', () =>  {
    document.querySelector('#passwordToDecrypt').value = INITIAL_STATE;
    document.querySelector('#infoToBeDecrypted').value = INITIAL_STATE;
    document.querySelector('#decryptionResult').value = INITIAL_STATE;
  });
}