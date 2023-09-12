import { Suspense } from "react";
import AppRouter from "./router/ui/AppRouter";
const App = () => {
  return (
    <Suspense fallback="">
      <main className="app">
        <AppRouter />
      </main>
    </Suspense>
  );
};
export default App;
