'use client'
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormEvent } from 'react'

export default function Home() {
  const [login, setLogin] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const checkAuth = async (e: any) => {
    let id = 0;
    await fetch('/datas/account.json')
      .then((res) => res.json())
      .then((data) => data.users.map((item) => {
        if (item.email === email && item.password === password) {
          setLogin(true);
          setId(item.id);
        }
      }))
  }
  useEffect(() => {
    if (login) {
      redirect(`/${id}`);
    }
  }, [login])
  return (
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={checkAuth}>Login</button>
    </div>
  );
}
