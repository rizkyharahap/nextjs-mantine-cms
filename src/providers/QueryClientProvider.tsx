"use client";

import React from "react";

import { queryClient } from "@/services/query-client";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";

export default function QueryClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
