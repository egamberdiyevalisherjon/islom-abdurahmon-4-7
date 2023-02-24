import { Route, Routes } from "react-router-dom";
import routes from "./Routes";
import { Suspense, useEffect } from "react";
import Loader from "./Components/Loader";
import Header from "./Components/Header";
import useFetch from "./Hooks/useFetch";
import { useDispatch } from "react-redux";
import { loadUserData } from "./store/slices/user";

function App() {
  const { data: profile } = useFetch("/profile/me");

  const dispatch = useDispatch();
  useEffect(() => {
    if (profile) {
      dispatch(loadUserData(profile));
    }
  }, [profile]);

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
