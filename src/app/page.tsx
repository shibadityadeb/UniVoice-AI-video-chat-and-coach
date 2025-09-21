"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


export default function Home() {
   const { 
        data: session
    } = authClient.useSession() 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

const onSubmit = async () => {
  try {
    await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("Successfully signed up");
        }
      }
    );
  } catch (err) {
    // Fallback error handling if the client throws
    console.error("signup error", err);
    window.alert("Signup failed");
  }
};

const onLogin = async () => {
  try {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          // fixed message to indicate sign in
          window.alert("Successfully signed in");
        }
      }
    );
  } catch (err) {
    console.error("login error", err);
    window.alert("Login failed");
  }
};
if (session) {
  return (
   
    <div className="flex flex-col p-4 gap-y-4">
     <p> Logged in as {session.user.name}</p>
     <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
  )
}

  return (
    <>
      <div className="flex flex-col p-4 gap-y-4">
        <div className="flex flex-col gap-y-4 p-4">
          <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={onSubmit}>
            Create User
          </Button>
        </div>
        <div>
          <div className="flex flex-col p-4 gap-y-4">
            <div className="flex flex-col gap-y-4 p-4">
              <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={onLogin}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
