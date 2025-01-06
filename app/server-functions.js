"use server";

const { subtle } = globalThis.crypto;

export async function genKeys() {
  const keyPair = await subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  console.log(keyPair.publicKey, keyPair.privateKey);

  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  console.log("iv", iv);

  const secretKey = await subtle.importKey(
    "jwk",
    JSON.parse(process.env.SECRET),
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["wrapKey", "unwrapKey"]
  );
  console.log("key", secretKey);

  const privateKey = await subtle.wrapKey(
    "jwk",
    keyPair.privateKey,
    secretKey,
    {
      name: "AES-GCM",
      iv,
    }
  );
  console.log("privateKey", privateKey);

  const privateKeyBuffer = new Uint8Array(
    privateKey.byteLength + iv.byteLength
  );
  privateKeyBuffer.set(iv, 0);
  privateKeyBuffer.set(new Uint8Array(privateKey), iv.byteLength);
  console.log("privateBuffer", Array.from(privateKeyBuffer));

  const publicKey = await subtle.exportKey("jwk", keyPair.publicKey);
  console.log("publicKey", publicKey);

  return [Array.from(privateKeyBuffer), publicKey];
}

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
