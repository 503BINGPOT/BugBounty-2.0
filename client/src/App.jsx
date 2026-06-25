import {
  Routes,
  Route,
} from "react-router-dom";


import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Wallet from "./pages/wallet";
import Bounties from "./pages/bounties";
import CompleteProfile from "./pages/completeProfile";
import PostBounty from "./pages/PostBounty";
import BountyDetails from "./pages/BountyDetails";
import MyApplications from "./pages/MyApplication";
import MyBounties from "./pages/myBounties";
import ConnectedRepositories from "./pages/connectedRepositories";
import RepositoryIssues from "./pages/repositoryIssues";
import AuthSuccess from "./pages/AuthSucess";
import Profile from "./pages/profile";

function App() {

  return (

    <div className="app-background text-white min-h-screen">

      <Navbar />

      <main className="pt-[72px]">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/wallet"
            element={<Wallet />}
          />

          <Route
            path="/bounties"
            element={<Bounties />}
          />

          <Route
          path="/complete-profile"
          element={<CompleteProfile />}
          />

          <Route
          path="/PostBounty"
          element={<PostBounty />}
          />

          <Route
          path="/bounties/:id"
          element={<BountyDetails />}
          />

          <Route
          path="/my-applications"
          element={<MyApplications />}
          />

          <Route
          path="/my-bounties"
          element={<MyBounties />}
          />

        <Route
        path="/repositories"
        element={<ConnectedRepositories />}
        />

        <Route
        path="/issues/:owner/:repo"
        element={
        <RepositoryIssues />}
        />

        <Route
        path="/auth-success"
        element={<AuthSuccess />}
        />

        <Route
        path="/profile"
        element={<Profile />}
        />
        
        </Routes>


      </main>

    </div>

  );

}

export default App;