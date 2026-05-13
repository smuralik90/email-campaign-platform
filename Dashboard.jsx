import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar";

const Dashboard = () => {

  const { user } = useContext(AuthContext);

  return (
    <div>

      <Navbar />

      <div style={{ padding: "30px" }}>

        <h1>
          Welcome {user?.name}
        </h1>

        <p>
          Role: {user?.role}
        </p>

        <h2>
          Email Campaign Platform Dashboard
        </h2>

      </div>

    </div>
  );
};

export default Dashboard;