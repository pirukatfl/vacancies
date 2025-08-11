// A função a ser executada
export async function encryptAndSave(data: {}, keySession: string) {
  const textEncoder = new TextEncoder();
  const dataToEncrypt = textEncoder.encode(JSON.stringify(data));

  // Gera uma chave de criptografia
  const key = await window.crypto.subtle.generateKey(
      {
          name: "AES-GCM",
          length: 256,
      },
      true,
      ["encrypt", "decrypt"]
  );

  // Gera um vetor de inicialização (IV)
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Criptografa os dados
  const encryptedData = await window.crypto.subtle.encrypt(
      {
          name: "AES-GCM",
          iv: iv
      },
      key,
      dataToEncrypt
  );

  // Converte os dados criptografados para uma string para salvar no sessionStorage
  // Isso é um pouco mais complexo, pois os dados são binários.
  // Você precisaria salvá-los em um formato como Base64.
  const ivString = btoa(String.fromCharCode(...iv));
  const encryptedDataString = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
  const exportedKey = await window.crypto.subtle.exportKey('jwk', key);

  // Salvando os dados (aqui, a chave também está sendo salva, o que ainda é um risco)
  sessionStorage.setItem('key', JSON.stringify(exportedKey));
  sessionStorage.setItem('iv', ivString);
  sessionStorage.setItem(keySession, encryptedDataString);
}

// Para descriptografar...
export async function decryptAndRead(keySession: string) {
  const exportedKey = JSON.parse(sessionStorage.getItem('key'));
  const ivString = sessionStorage.getItem('iv');
  const encryptedDataString = sessionStorage.getItem(keySession);
  
  // Converte de volta para os formatos originais
  const key = await window.crypto.subtle.importKey('jwk', exportedKey, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
  const iv = Uint8Array.from(atob(ivString), c => c.charCodeAt(0));
  const encryptedData = Uint8Array.from(atob(encryptedDataString), c => c.charCodeAt(0));

  // Descriptografa os dados
  const decryptedData = await window.crypto.subtle.decrypt(
      {
          name: "AES-GCM",
          iv: iv
      },
      key,
      encryptedData
  );

  const textDecoder = new TextDecoder();
  const decryptedText = textDecoder.decode(decryptedData);
  return JSON.parse(decryptedText)
}
