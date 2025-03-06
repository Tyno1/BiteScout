import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const serverApi = import.meta.env.VITE_BACKEND_SERVER;
  const { getAccessTokenSilently } = useAuth0();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ApiCall = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("Token received:", token.substring(0, 10) + "..."); // Log first part of token

        const response = await axios.get(`${serverApi}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.status);

        // const data = await response.text();
        // setMessage(data);
      } catch {
        console.error("Failed to fetch API");
      }
    };
    ApiCall();
  }, [getAccessTokenSilently]);

  return (
    <div className="w-full min-h-[100vh] bg-orange">
      <button className="bg-red p-2 m-2">Call APi</button>
      Dash Home
    </div>
  );
};
export default Dashboard;
