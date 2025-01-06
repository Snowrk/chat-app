import Home from "./homeComponent";

async function getSecret() {
  return process.env.SECRET;
}

export default async function Page() {
  const secret = getSecret();
  return <Home secret={secret} />;
}
