document.addEventListener('DOMContentLoaded', () => {
  const input_ingreso = document.getElementById('input-ingreso-texto');
  const b_encriptar = document.getElementById('btn-encriptar');
  const b_desencriptar = document.getElementById('btn-desencriptar');
  const text_area = document.getElementById('area-text-salida');
  const b_copiar = document.getElementById('btn-copiar');
  const b_borra = document.getElementById('btn-borrar');

  const llaves_ingreso = { 'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat' };
  const llaves_salida = { 'enter': 'e', 'imes': 'i', 'ai': 'a', 'ober': 'o', 'ufat': 'u' };

  input_ingreso.addEventListener('keypress', (e) => {
    const charCode = e.charCode;
    if (!(charCode >= 65 && charCode <= 90) && 
        !(charCode >= 97 && charCode <= 122) && 
        charCode !== 32 && charCode !== 13) { 
      e.preventDefault();
    }
  });

  b_encriptar.addEventListener('click', () => {
    const inputText = input_ingreso.value.toLowerCase();
    let encriptando_ = '';

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      if (Object.keys(llaves_ingreso).includes(char)) {
        encriptando_ += llaves_ingreso[char];
      } else {
        encriptando_ += char;
      }
    }

    text_area.innerText = encriptando_;
    input_ingreso.value = ''; 
  });

  b_desencriptar.addEventListener('click', () => {
    let inputText = input_ingreso.value.toLowerCase();
    let desencriptando_ = '';
  
    while (inputText.length > 0) {
      let found = false;
      for (const key in llaves_salida) {
        if (inputText.startsWith(key)) {
          desencriptando_ += llaves_salida[key];
          inputText = inputText.substring(key.length);
          found = true;
          break;
        }
      }
      if (!found) {
        desencriptando_ += inputText[0];
        inputText = inputText.substring(1);
      }
    }
  
    text_area.innerText = desencriptando_; 
    input_ingreso.value = ''; 
  });

  b_copiar.addEventListener('click', () => {
    const outputText = text_area.innerText;
    navigator.clipboard.writeText(outputText);

    alert('Texto copiado al portapapeles');
  });

  b_borra.addEventListener('click', () => {
    input_ingreso.value = '';
    text_area.innerText = '';
  });
});