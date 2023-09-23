import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// Optimizing Bundle Size with Code Splitting

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-38818f6b.css   30.24 kB │ gzip:   5.06 kB
// dist/assets/index-40fd70e7.js   524.99 kB │ gzip: 148.72 kB

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/

export default App;
