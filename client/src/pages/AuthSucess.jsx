import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthSuccess = () => {

  const navigate =
    useNavigate();

  useEffect(() => {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const token =
      params.get("token");

    if (token) {

      localStorage.setItem(
        "token",
        token
      );

      const decoded =
        jwtDecode(token);

      localStorage.setItem(

        "user",

        JSON.stringify({

          id: decoded.id,

          username:
            decoded.username,

          role:
            decoded.role,

          avatar:
            decoded.avatar,

        })

      );

      navigate(
        "/dashboard"
      );

    }

  }, []);

  return (
    <div>
      Logging in...
    </div>
  );

};

export default AuthSuccess;