import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSaldoSlice } from "../redux/slices/PembayaranSlice";

const CardSaldo = () => {
  const dispatch = useDispatch();
  const [showSaldo, setshowSaldo] = useState(false);
  const [saldo, setSaldo] = useState("");

  const isToken = useSelector((state) => state.login.isToken);

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/balance",
          {
            headers: {
              //   Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              Authorization: `Bearer ${isToken}`,
            },
          }
        );
        const TotalSaldo = response.data.data.balance;
        setSaldo(TotalSaldo);
        dispatch(setSaldoSlice(TotalSaldo));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSaldo();
  }, []);

  let formatSaldo = saldo.toLocaleString();
  return (
    <div className="w-full p-5 flex flex-col gap-3 bg-red-600 rounded-lg">
      <p className="capitalize text-white">saldo anda</p>
      {showSaldo ? (
        <p className="text-2xl font-semibold text-white"> Rp. {formatSaldo}</p>
      ) : (
        <p className="text-2xl font-semibold text-white">Rp. ******</p>
      )}
      <button
        className="w-fit text-white"
        onClick={() => setshowSaldo(!showSaldo)}
      >
        Lihat Saldo <FontAwesomeIcon icon={faEye} />
      </button>
    </div>
  );
};

export default CardSaldo;
