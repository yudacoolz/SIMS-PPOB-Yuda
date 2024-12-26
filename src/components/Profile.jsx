import React from "react";
import CardSaldo from "../components/CardSaldo";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DefaultUserPic from "../assets/Profile Photo.png";

const Profile = () => {
  const isToken = useSelector((state) => state.login.isToken);
  const [user, setUser] = useState({});
  useEffect(() => {
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex gap-2 justify-between">
      <div className="w-full">
        <img
          src={
            user.profile_image ===
            "https://minio.nutech-integrasi.com/take-home-test/null"
              ? DefaultUserPic
              : user.profile_image
          }
          alt=""
          className="rounded-full border w-16 h-16 mb-4"
        />
        <p className="capitalize text-slate-400 text-xl">selamat datang,</p>
        <p className="capitalize text-slate-700 text-3xl font-bold">
          {user.first_name} {user.last_name}
        </p>
      </div>
      <CardSaldo />
    </div>
  );
};

export default Profile;
