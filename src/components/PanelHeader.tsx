'use client'

import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConnection";
import Link from "next/link";

export default function DashboardHeader() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
      <Link href="/dashboard">Dashboard</Link>
 /     <Link href="/dashboard/new">Cadastrar carro</Link>

      <button className="ml-auto" onClick={handleLogout}>Sair da conta</button>
    </div>
  );
}
