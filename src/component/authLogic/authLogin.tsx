
import Button from "@mui/material/Button";
import { getServerSession } from "next-auth";
import { signOut, getSession } from "next-auth/react"

export default async function LoginLogout() {
  const session = await getServerSession();

  function renderLogin() {
    if (session) {
      return (
        <Button color="inherit" href="/" onClick={() => signOut()}>
          Logout
        </Button>
      );
    } else {
      return (
        <Button color="inherit" href="logintest">
          Login
        </Button>
      );
    }
  }
}