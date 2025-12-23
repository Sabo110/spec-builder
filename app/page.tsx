import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  return (
    <div>
      {user ? (
        <p>Connected</p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
}
