"use server";

const { subtle } = globalThis.crypto;

export async function decryptMessage(msg, wrapedKeyArr) {
  // console.log("start msg", msg);
  const unwrapingKey = await subtle.importKey(
    "jwk",
    JSON.parse(process.env.SECRET),
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
  const decryptKey = await subtle.unwrapKey(
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
  const decrypted = await subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    decryptKey,
    buffer
  );
  const decryptedMsg = new TextDecoder().decode(decrypted);
  return decryptedMsg;
}
