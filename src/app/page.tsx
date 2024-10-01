"use client";

import { ReactElement } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PokemonList from "@/app/components/PokemonList";

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] p-8 lg:p-16">
      <Header />
      <main>
        <PokemonList />
      </main>
      <Footer />
    </div>
  );
}
