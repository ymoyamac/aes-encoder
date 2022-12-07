const bufferToBase64 = (buffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));

const base64ToBuffer = (buffer) =>
  Uint8Array.from(atob(buffer), (c) => c.charCodeAt(0));

const LENGTH_SAL = 16;
const VECTOR_INIT_LENGTH = LENGTH_SAL;

const PasswordBasedKeyDrift = async (
  password,
  sal,
  iterations,
  length,
  hash,
  algorithm = "AES-CBC"
) => {
  const encoder = new TextEncoder();
  let keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(sal),
      iterations,
      hash,
    },
    keyMaterial,
    { name: algorithm, length },
    false,
    ["encrypt", "decrypt"]
  );
};

export const encypt = async (password, textPlain) => {
  const encoder = new TextEncoder();
  const sal = window.crypto.getRandomValues(new Uint8Array(LENGTH_SAL));
  const initVector = window.crypto.getRandomValues(
    new Uint8Array(VECTOR_INIT_LENGTH)
  );
  const bufferTextPlain = encoder.encode(textPlain);
  const clave = await PasswordBasedKeyDrift(
    password,
    sal,
    100000,
    256,
    "SHA-256"
  );
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: initVector },
    clave,
    bufferTextPlain
  );
  return bufferToBase64([
    ...sal,
    ...initVector,
    ...new Uint8Array(encrypted),
  ]);
};

export const decrypt = async (password, base64Encryption) => {
  const decoder = new TextDecoder();
  const encryptedData = base64ToBuffer(base64Encryption);
  const sal = encryptedData.slice(0, LENGTH_SAL);
  const initVector = encryptedData.slice(
    0 + LENGTH_SAL,
    LENGTH_SAL + VECTOR_INIT_LENGTH
  );
  const clave = await PasswordBasedKeyDrift(
    password,
    sal,
    100000,
    256,
    "SHA-256"
  );
  const decyptedDataAsBuffer = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: initVector },
    clave,
    encryptedData.slice(LENGTH_SAL + VECTOR_INIT_LENGTH)
  );
  return decoder.decode(decyptedDataAsBuffer);
};
