import React from "react";
import axios from "axios";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { setAmmount } from "../redux/slices/TopUpSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import Profile from "../components/Profile";
import Modal from "../components/Modal";

const TopUpPage = () => {
  const dispatch = useDispatch();
  const topUpAmmount = useSelector((state) => state.TopUp.TopUpAmmount);
  const ErrorAmmount = useSelector((state) => state.TopUp.errorAmmount);
  const isToken = useSelector((state) => state.login.isToken);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);

  const HandleTopUpForm = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const HandleTopUp = async () => {
    try {
      const res = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        {
          top_up_amount: topUpAmmount,
        },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(res.data.status);
      console.log("res", res);
      console.log("res data", res.data.status);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("topUpAmmount", topUpAmmount);

  return (
    <div>
      <Profile />
      <h2 className="font-semibold text-xl mt-10">Silahkan Masukan</h2>
      <h1 className="font-bold text-3xl">Nominal TopUp</h1>
      <form onSubmit={HandleTopUpForm} className="mt-10">
        <div className="flex gap-3">
          <div className="w-3/5">
            <input
              type="number"
              name="topUpAmmount"
              placeholder="topUp Ammount"
              value={topUpAmmount === 0 ? "" : topUpAmmount}
              className="border border-slate-400 rounded-md p-3 w-full"
              onChange={(e) => dispatch(setAmmount(e.target.value))}
            />
            {ErrorAmmount && <p className="text-red-500">{ErrorAmmount}</p>}
            <Button
              type="submit"
              classname={"w-full p-3 mt-5"}
              Disabled={
                ErrorAmmount || topUpAmmount === 0 || topUpAmmount === 1000001
              }
            >
              Top Up
            </Button>
          </div>
          <div className="w-2/5">
            <div className="grid grid-cols-3 gap-3">
              {[
                { amount: 10000, label: "Rp. 10.000" },
                { amount: 20000, label: "Rp. 20.000" },
                { amount: 50000, label: "Rp. 50.000" },
                { amount: 100000, label: "Rp. 100.000" },
                { amount: 250000, label: "Rp. 250.000" },
                { amount: 500000, label: "Rp. 500.000" },
              ].map((item) => (
                <div
                  key={item.amount}
                  onClick={() => dispatch(setAmmount(item.amount))}
                  className="border border-slate-400 rounded-md p-3 cursor-pointer w-full hover:bg-red-500 hover:text-white transition-all"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmitModal={() => HandleTopUp}
          deskripsi="Top Up Sebesar"
          nominal={topUpAmmount}
          status={status}
          topUp={true}
        />
      )}
    </div>
  );
};

export default TopUpPage;
