import { useState, useEffect } from "react";
import axios from "axios";
import LoginIllustration from "../assets/Illustrasi Login.png";
import Logo from "../assets/Logo.png";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faAt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess(false);
    if (password !== ConfirmPass) {
      setError("Password harus sama dengan confirm password");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Email harus memakai format email");
      return;
    }
    if (!email || !firstname || !LastName || !password || !ConfirmPass) {
      setError("Semua Field harus diisi");
      return;
    }
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        {
          email: email,
          first_name: firstname,
          last_name: LastName,
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
      setSuccess(true);
    } catch (error) {
      setError(error.response.data.message);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (password.length <= 7) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [password]);

  return (
    <div className="flex gap-2 h-screen ">
      <div className="w-full flex flex-col items-center justify-center h-full p-4 ">
        <div className="flex gap-2 text-xl ">
          <img src={Logo} alt="" /> <p className="font-semibold"> SIMS PPOB</p>
        </div>
        <h2 className="text-center capitalize font-semibold text-3xl my-5 ">
          Lengkapi data untuk <br /> membuat akun
        </h2>
        <form onSubmit={handleRegister}>
          <div className="w-auto h-auto p-6 rounded-lg  flex flex-col gap-4">
            <div className="flex gap-2 items-center border rounded-md py-2 px-4">
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
            <div className="flex gap-2 items-center border rounded-md py-2 px-4">
              <FontAwesomeIcon icon={faUser} />
              <input
                className="text-black"
                type="text"
                name="firstname"
                placeholder="firstname"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center border rounded-md py-2 px-4">
              <FontAwesomeIcon icon={faUser} />
              <input
                className="text-black"
                type="text"
                name="lastname"
                placeholder="lastname"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center border rounded-md py-2 px-4">
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
            {password.length >= 1 && password.length <= 7 && (
              <p className="text-red-500"> Password minimal 8 karakter</p>
            )}
            <div className="flex gap-2 items-center border rounded-md py-2 px-4">
              <FontAwesomeIcon icon={faLock} />
              <input
                className="text-black"
                type={hideConfirmPass ? "password" : "text"}
                name="Konfirmasi password"
                placeholder="Konfirmasi Password"
                value={ConfirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setHideConfirmPass(!hideConfirmPass)}
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
            <Button type="submit" classname="py-2" Disabled={disabled}>
              Register
            </Button>
          </div>

          <p className="mt-5 text-center">
            Sudah Punya Akun ? Login{" "}
            <Link to={"/Login"} className="text-red-500 font-bold">
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
        {success && (
          <div className="mt-10 w-[65%] bg-green-200 text-green-600 p-3 flex justify-between  ">
            <p>
              Reguistrasi berhasil ! silahkan{" "}
              <Link to={"/Login"} className="text-green-800 font-bold">
                Login
              </Link>
            </p>
            <button className="text-white" onClick={() => setSuccess(null)}>
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

export default RegisterPage;
