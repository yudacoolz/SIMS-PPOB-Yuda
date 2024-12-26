import React from "react";
import Profile from "../components/Profile";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TransactionPage = () => {
  const isToken = useSelector((state) => state.login.isToken);
  const [transaction, setTransaction] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=0&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
        );
        setTransaction(response.data.data.records);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransaction();
  }, [limit]);

  const handleLoadMore = () => {
    setLimit(limit + 5);
  };
  console.log("transaction", transaction);
  console.log("limit", limit);

  const dtfUK = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div>
      <Profile />

      <div className="mt-10">
        <p className="font-bold text-2xl">Semua Transaksi</p>

        <div>
          {transaction.map((item, i) => {
            return (
              <div
                key={i}
                className="w-full flex justify-between items-center border border-slate-400 rounded-md p-4 my-3"
              >
                <div className="w-1/2">
                  <p
                    className={`font-bold text-2xl ${
                      item.transaction_type === "TOPUP"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.transaction_type === "TOPUP" ? "+ " : "- "}{" "}
                    {item.total_amount}
                  </p>
                  <p className="text-sm text-slate-400 mt-3">
                    {dtfUK.format(new Date(item.created_on))}
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="text-right">{item.description}</p>
                </div>
              </div>
            );
          })}
          <button
            className="text-red-500 w-full mt-5 font-bold border p-4"
            onClick={() => handleLoadMore()}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
