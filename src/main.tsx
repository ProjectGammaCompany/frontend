import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { registerSW } from "virtual:pwa-register";
import App from "./app/App.tsx";
import { store } from "./app/providers/reduxProvider/store.ts";
import "./index.scss";
import { queryClient } from "./shared/api/reactQuery/queryClient.ts";

registerSW({ immediate: true });

async function enableMocks() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === "true") {
    const { worker } = await import("./shared/api/mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
}

void enableMocks().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </StrictMode>,
  );
});
