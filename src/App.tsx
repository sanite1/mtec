import React from "react";
import RoutesWrapper from "./routes/Wrapper";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <div>
      <Toaster />
      <RoutesWrapper />
    </div>
  );
};

export default App;
