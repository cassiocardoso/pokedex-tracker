"use client";

import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function Providers({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer theme="dark" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
