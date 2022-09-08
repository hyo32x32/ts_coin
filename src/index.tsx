import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import App from "./App";

// const toggleTheme = () => {

//   if (theme === "light") {
//     setTheme("dark");
//   } else {
//     setTheme("light");
//   }
// };

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");

// null 일 경우의 조건문을 만들어 에러처리시키면 정상적으로 동작
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
