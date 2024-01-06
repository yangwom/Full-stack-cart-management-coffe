"use client";
import logoCoffe from "../../assets/Logo.svg";
import logoLocal from "../../assets/logoLocal.svg";
import logoCar from "../../assets/car.svg";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";

import { useCartState } from "@/context/CartContext";

export function Header() {
  const { cart } = useCartState();
  const cartQuantity = cart.length;
  return (
    <header className={styles.headerCoffe}>
      <Image src={logoCoffe} alt="logoCoffe" />
      <div className={styles.containerLocal}>
        <div className={styles.local}>
          <Image src={logoLocal} alt="#" />
          <p>Porto Alegre, Rs</p>
        </div>
        <Link href="/cart" passHref className={styles.logoCar}>
          <span>{cartQuantity}</span>
          <Image src={logoCar} alt="" />
        </Link>
      </div>
    </header>
  );
}
