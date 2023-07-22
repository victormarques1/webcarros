import Link from "next/link";
import Image from "next/image";
import logoImg from "../assets/logo.svg";
import { FiUser, FiLogIn } from "react-icons/fi";

export default function Header() {
  const signed = true;
  const loadingAuth = false;

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow-sm mb-4">
      <header className="flex w-full items-center justify-between px-4 mx-auto">
        <Link href="/">
          <Image src={logoImg} alt="logo do site" />
        </Link>

        {!loadingAuth && signed && (
          <Link href="/dashboard">
            <div className="border-2 rounded-full p-1 border-gray-900">
              <FiUser size={24} color="#000" />
            </div>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link href="/login">
            <div className="border-2 rounded-full p-1 border-gray-900">
              <FiLogIn size={24} color="#000" />
            </div>
          </Link>
        )}
      </header>
    </div>
  );
}
