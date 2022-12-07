const Error = ({id}, HTMLElementId, msg) => {
  let error = ''
  error += `
    <div id='${id}-error' class="bg-red-300 px-3 py-3 rounded-md">
      <p class="font-bold text-red-600 uppercasr">Error:
        <span class='font-normal italic'> ${msg}</span>
      </p>
    </div>
  `;
  document.getElementById(`${HTMLElementId}`).innerHTML = error;
  document.getElementById(`${id}`).classList.add('border-red-500');
}

export const removeError = ({ id }) => {
  if (document.getElementById(`${id}-error`) !== null) {
    document.getElementById(`${id}-error`).hidden = true;
    document.getElementById(`${id}`).classList.remove('border-red-500');
    document.getElementById(`${id}`).classList.add('border-sky-500');
  }
}

export const renderError = (node = null, HTMLElementId = '', HTMLError = {}) => {
  const {typeError, msg} = HTMLError
  if (typeError === '[Input Error] Password') {
    console.log("object");
    Error(node, HTMLElementId, msg)
  }
  if (typeError === '[Input Error] Password Confirm') {
    Error(node, HTMLElementId, msg)
  }
  if (typeError === '[Textarea Error] infoToBeEncrypted') {
    Error(node, HTMLElementId, msg)
  }
  if (typeError === '[Input Error] Password Confirm') {
    Error(node, HTMLElementId, msg)
  }
  if (typeError === '[Textarea Hash Error] infoToBeDecrypted') {
    Error(node, HTMLElementId, msg)
  }
}