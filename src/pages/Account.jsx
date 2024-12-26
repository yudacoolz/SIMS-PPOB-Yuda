import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogOut } from "../redux/slices/LoginSlice";
import DefaultUserPic from "../assets/Profile Photo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faUser, faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const isToken = useSelector((state) => state.login.isToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const InputImage = useRef(null);

  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isEdit, setisEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Timer succes to gone
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/profile",
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
        );
        setUser(response.data.data);
        setEmail(response.data.data.email);
        setFirstName(response.data.data.first_name);
        setLastName(response.data.data.last_name);
        // setProfilePic(response.data.data.profile_image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [success]);

  const handleLogout = () => {
    dispatch(LogOut());
    navigate("/Login");
  };
  const handleSimpan = async () => {
    try {
      const response = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          email: email,
          first_name: firstname,
          last_name: LastName,
        },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
        }
      );
      setUser(response.data.data);
      setisEdit(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await axios.put(
          "https://take-home-test-api.nutech-integrasi.com/profile/image",
          {
            // email: email,
            // first_name: firstname,
            // last_name: LastName,
            file: file,
          },
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUser(response.data.data);
        setSuccess(true);
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center mt-16">
      <div className="w-1/2 flex flex-col gap-3 items-center">
        <div className="relative">
          <img
            src={
              user.profile_image ===
              "https://minio.nutech-integrasi.com/take-home-test/null"
                ? DefaultUserPic
                : user.profile_image
            }
            alt=""
            className="rounded-full border w-32 h-32"
          />
          <input
            ref={InputImage}
            type="file"
            name="image"
            accept=".jpeg,.png"
            onChange={(e) => handleImage(e)}
            className="text-black ml-8 hidden"
          />
          <button
            className="absolute bottom-0 right-0 "
            onClick={() => InputImage.current.click()}
          >
            <FontAwesomeIcon
              icon={faPen}
              className="rounded-full border border-black p-2 w-5 h-5 bg-white"
            />
          </button>
        </div>
        <p className="capitalize text-slate-400 text-xl">selamat datang,</p>
        <p className="capitalize text-slate-700 text-3xl font-bold">
          {user.first_name} {user.last_name}
        </p>

        <form className="w-full mb-5">
          <div className="flex flex-col gap-2 w-full">
            <>
              <label className="font-semibold text-black mb-1">Email</label>
              <div className="flex gap-2 items-center border border-slate-400 rounded-md p-2">
                <FontAwesomeIcon icon={faAt} />
                <input
                  className="text-black w-full"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isEdit ? false : true}
                />
              </div>
            </>
            <>
              <label className="font-semibold text-black mb-1">
                Nama Depan
              </label>
              <div className="flex gap-2 items-center border border-slate-400 rounded-md p-2">
                <FontAwesomeIcon icon={faUser} />
                <input
                  className="text-black  w-full"
                  type="text"
                  name="firstname"
                  placeholder="firstname"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isEdit ? false : true}
                />
              </div>
            </>
            <>
              <label className="font-semibold text-black mb-1">
                Nama Belakang
              </label>
              <div className="flex gap-2 items-center border border-slate-400 rounded-md p-2">
                <FontAwesomeIcon icon={faUser} />
                <input
                  className="text-black w-full"
                  type="text"
                  name="lastname"
                  placeholder="lastname"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isEdit ? false : true}
                />
              </div>
            </>
          </div>
        </form>

        {success && (
          <div className="mt-10 w-[65%] bg-green-200 text-green-600 p-3 flex justify-between  ">
            <p>Data Berhasil di Update</p>
            <button className="text-white" onClick={() => setSuccess(null)}>
              X
            </button>
          </div>
        )}

        {!isEdit ? (
          <Button
            type="button"
            classname="w-full hover:bg-white hover:text-red-600 p-2 hover:border border-red-500"
            onClick={() => setisEdit(!isEdit)}
          >
            Edit
          </Button>
        ) : (
          <Button
            type="button"
            classname="w-full hover:bg-white hover:text-red-600 p-2 hover:border border-red-500"
            onClick={() => handleSimpan()}
          >
            Simpan Data
          </Button>
        )}
        {!isEdit && (
          <Button
            type="button"
            classname="w-full hover:bg-white hover:text-red-600 p-2 hover:border border-red-500 mt-2"
            onClick={() => handleLogout()}
          >
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
