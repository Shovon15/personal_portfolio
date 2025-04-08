"use client";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Custom } from "@/utils/customLoader";
import { ThemeProvider } from "@/components/themeProvider/themeProvider";
import { AuthProvider } from "@/context/authProvider";
import { DataProvider } from "@/context/dataProvider";

interface ProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const RootProviders = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Provider store={store}> */}
      <DataProvider>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Custom>{children}</Custom>
          </ThemeProvider>
        </AuthProvider>
      </DataProvider>
      {/* </Provider> */}
    </QueryClientProvider>
  );
};
