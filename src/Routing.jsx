import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/lib/Layout";
import useLogin from "./hooks/useLogin";

const Customer = lazy(() => import("./pages/Customer"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Quota = lazy(() => import("./pages/quota/Quota"));
const DetailQuota = lazy(() => import("./pages/quota/DetailQuota"));
const DashboardAdmin = lazy(() => import("./pages/DashboardAdmin"));

const Routing = () => {
  const { isLogin, isAdmin } = useLogin();
  return (
    <>
      {isLogin ? (
        <Layout>
          <Routes>
            {isAdmin ? (
              <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" Component={DashboardAdmin} />
                <Route path="/customer" Component={Customer} />
                <Route path="/transaction" Component={Transaction} />
              </>
            ) : (
              <>
                <Route path="/" Component={Home} />
                <Route path="/quota" Component={Quota} />
                <Route path="/quota/:id" Component={DetailQuota} />
              </>
            )}
            <Route path="*" Component={NotFound} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="*" Component={NotFound} />
        </Routes>
      )}
    </>
  );
};
export default Routing;
