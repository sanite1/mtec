import React from "react";
import RoutesWrapper from "./routes/Wrapper";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="bottom-right" />
        <RoutesWrapper />
      </QueryClientProvider>
    </div>
  );
};

export default App;
