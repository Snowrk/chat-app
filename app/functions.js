export async function encryptMessage(msg, key) {
  let enc = new TextEncoder();
  let encoded = enc.encode(msg);
  const cypherText = await window.crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    key,
    encoded
  );
  // console.log("cypherText", cypherText);
  const buffer = Array.from(new Uint8Array(cypherText));
  // console.log("buffer", buffer);
  return buffer;
}

export async function decryptMessage(msg, wrapedKeyArr, secretKey) {
  // console.log("start msg", msg);
  const secret = await secretKey;
  const unwrapingKey = await window.crypto.subtle.importKey(
    "jwk",
    JSON.parse(secret),
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["wrapKey", "unwrapKey"]
  );
  // console.log("unwrapingKey", unwrapingKey);
  // console.log("wrapedKeyArr", wrapedKeyArr);

  const wrapedKeyBuffer = new Uint8Array(wrapedKeyArr);
  // console.log("wrapedKeyBuffer", wrapedKeyBuffer);
  const wrapedKey = wrapedKeyBuffer.slice(12);
  const iv = wrapedKeyBuffer.slice(0, 12);
  const decryptKey = await window.crypto.subtle.unwrapKey(
    "jwk",
    wrapedKey,
    unwrapingKey,
    {
      name: "AES-GCM",
      iv,
    },
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
  // console.log("decryptKey", decryptKey);

  // console.log("msg", msg);
  const buffer = new Uint8Array(msg);
  // console.log("server buffer", buffer);
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    decryptKey,
    buffer
  );
  const decryptedMsg = new TextDecoder().decode(decrypted);
  return decryptedMsg;
}

// export async function decryptMessage(msg, key) {
//   // console.log("env", process.env.NEXT_PUBLIC_ENCRYPT_PRIVATE_KEY);
//   // const key = await window.crypto.subtle.importKey(
//   //   "jwk",
//   //   JSON.parse(process.env.NEXT_PUBLIC_ENCRYPT_PRIVATE_KEY),
//   //   {
//   //     name: "RSA-OAEP",
//   //     hash: "SHA-256",
//   //   },
//   //   true,
//   //   ["decrypt"]
//   // );
//   // console.log(key);
//   console.log("in decrypt cypherText", msg);
//   let decrypted = await window.crypto.subtle.decrypt(
//     {
//       name: "RSA-OAEP",
//     },
//     key,
//     msg
//   );
//   let dec = new TextDecoder();
//   return dec.decode(decrypted);
// }
