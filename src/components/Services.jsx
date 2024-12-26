import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Services = () => {
  const isToken = useSelector((state) => state.login.isToken);
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/services",
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
        );
        console.log("response service", response);
        setService(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();
  }, []);
  return (
    <>
      {/* Services */}
      <div className="flex gap-6 mt-16">
        {service.map((item, i) => {
          return (
            <Link
              to={`/Pembayaran/${item.service_name}`}
              key={i}
              className="flex flex-col justify-center items-center gap-2"
            >
              <img src={item.service_icon} alt="" className="rounded" />
              <p className="capitalize break-words">
                {
                  item.service_code
                    .replace(/_/g, " ") // underscore menjadi spasi
                    .toLowerCase() // ubah semua ke lower case
                    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize kata pertama
                }
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Services;
