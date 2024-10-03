"use client";

import { ReactElement, ReactNode } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PokedexProvider = dynamic(() => import("@/services/PokedexContext"), {
  ssr: false,
});

const queryClient = new QueryClient();

export default function Providers({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <PokedexProvider>
        {children}
        <ToastContainer theme="dark" />
        <ReactQueryDevtools />
      </PokedexProvider>
    </QueryClientProvider>
  );
}
