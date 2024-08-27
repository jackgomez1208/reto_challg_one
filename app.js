document.addEventListener('DOMContentLoaded', () => {
    const input_ingreso = document.getElementById('input-ingreso-texto');
    const b_encriptar = document.getElementById('btn-encriptar');
    const b_desencriptar = document.getElementById('btn-desencriptar');
    const text_area = document.getElementById('area-text-salida');
    const b_copiar = document.getElementById('btn-copiar');

    const b_borra = document.getElementById('btn-borrar');
  

    const llaves_ingreso = { 'e': 'enter','i': 'imes','a': 'ai','o': 'ober','u': 'ufat'    };
  
    const llaves_salida = { 'enter': 'e','imes': 'i','ai': 'a',  'ober': 'o',  'ufat': 'u'  };
    input_ingreso.addEventListener('keypress', (e) => {
        const charCode = e.charCode;
        if (!(charCode >= 65 && charCode <= 90) && 
            !(charCode >= 97 && charCode <= 122)) { 
          e.preventDefault();
        }
      });
  
    b_encriptar.addEventListener('click', () => {
      const inputText = input_ingreso.value.toLowerCase();
      
      let encriptando_ = '';
  
      for (let i = 0; i < inputText.length; i++) {
        const char = inputText[i];
        if (llaves_ingreso[char]) {
          encriptando_ += llaves_ingreso[char];
        } else {
          encriptando_ += char;
        }
      }
  
      text_area.innerText = encriptando_;
      input_ingreso.value = ''; 
    });
  
    b_desencriptar.addEventListener('click', () => {
        const outputText = text_area.innerText.toLowerCase();
        let desencriptando_ = '';
      
        let contador = 0;
        while (contador < outputText.length) {
          let found = false;
          for (const key in llaves_salida) {
            if (outputText.substring(contador, contador + key.length) === key) {
              desencriptando_ += llaves_salida[key];
              contador += key.length;
              found = true;
              break;
            }
          }
          if (!found) {
            desencriptando_ += outputText[contador];
            contador++;
          }
        }
      
        input_ingreso.value = desencriptando_; 
        text_area.innerText = ''; 
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