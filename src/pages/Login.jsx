import { useState } from "react";
import axios from "axios";
import LoginIllustration from "../assets/Illustrasi Login.png";
import Logo from "../assets/Logo.png";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faAt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLogin, setIsToken } from "./../redux/slices/LoginSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [error, setError] = useState("");
  // const [token, setToken] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Semua Field harus diisi");
      return;
    }
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response);
      setError("");
      if (response.data.data.token) {
        console.log("token", response.data.data.token);
        const tokenReceived = response.data.data.token;
        console.log("tokenReceived", tokenReceived);

        // setToken(tokenReceived);
        // console.log("token", token);
        sessionStorage.setItem("token", tokenReceived);
        dispatch(setIsLogin());
        dispatch(setIsToken(tokenReceived));
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log("error", error);
    }
  };

  return (
    <div className="flex gap-2 h-screen ">
      <div className="w-full flex flex-col items-center justify-center h-full p-4 ">
        <div className="flex gap-2 text-xl ">
          <img src={Logo} alt="" /> <p className="font-semibold"> SIMS PPOB</p>
        </div>
        <h2 className="text-center capitalize font-semibold text-3xl my-5 ">
          Lengkapi data untuk <br /> membuat akun
        </h2>
        <form onSubmit={handleLogin}>
          <div className="w-auto h-auto p-6 rounded-lg  flex flex-col gap-4">
            <div className="flex gap-2 items-center border rounded-md p-2">
              <FontAwesomeIcon icon={faAt} />
              <input
                className="text-black"
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center border rounded-md p-2">
              <FontAwesomeIcon icon={faLock} />
              <input
                className="text-black"
                type={hidePass ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setHidePass(!hidePass)}>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
            <Button type="submit" classname="py-2">
              Masuk
            </Button>
          </div>

          <p className="mt-5 text-center">
            Belum punya akun ? registrasi{" "}
            <Link to={"/Register"} className="text-red-500 font-bold">
              di sini
            </Link>
          </p>
        </form>

        {error && (
          <div className="mt-10 w-[65%] bg-red-200 text-red-600 p-3 flex justify-between  ">
            <p>{error}</p>
            <button className="text-white" onClick={() => setError("")}>
              X
            </button>
          </div>
        )}
      </div>

      {/* Illustration */}
      <div className="w-full">
        <div>
          <img
            src={LoginIllustration}
            alt="Login Illustration"
            className="w-full h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
