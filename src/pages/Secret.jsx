import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Secret() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookies("jwt");
          navigate("/login");
        } else {
          toast.error(`HI ${data.user}`, {
            theme: "dark",
            position: "top-right",
          });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  const logOut = () => {
    removeCookies("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={logOut}>Log Out</button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Secret;
