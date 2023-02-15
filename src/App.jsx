import { Link, Route, Routes } from "react-router-dom";
import routes from "./Routes";
import { Suspense } from "react";
import Loader from "./Components/Loader";
import Header from "./Components/Header";

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} key={route.id} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
