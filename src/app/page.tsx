"use client";

import { ReactElement } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] p-8 lg:p-16">
      <Header />
      <main>app</main>
      <Footer />
    </div>
  );
}
