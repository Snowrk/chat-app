import Home from "./homeComponent";

async function getSecret() {
  return process.env.SECRET;
}

export default function Page() {
  const secret = getSecret();
  return <Home secret={secret} />;
}
