import React from "react";
import axios from "axios";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { Payment } from "../redux/slices/PembayaranSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Profile from "../components/Profile";
import Modal from "../components/Modal";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const Pembayaran = () => {
  const { nama } = useParams();
  const dispatch = useDispatch();
  const SaldoAmmount = useSelector(
    (state) => state.Pembayaran.PembayaranAmmount
  );
  const isError = useSelector((state) => state.Pembayaran.errorMessage);
  const isToken = useSelector((state) => state.login.isToken);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [services, setServices] = useState([]);
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
        const fetchedServices = response.data.data;
        setServices(fetchedServices);
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
  }, []);

  useEffect(() => {
    if (services.length > 0 && nama) {
      const filteredService = services.filter(
        (item) => item.service_name.toLowerCase() === nama.toLowerCase()
      );
      setService(filteredService); // Update the filtered service
    }
  }, [services, nama]);

  useEffect(() => {
    if (service.length > 0) {
      dispatch(Payment(service[0].service_tariff));
    }
  }, [service]);

  const HandleModal = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const HandleBayar = async () => {
    const serviceCode = service[0].service_code;
    try {
      const res = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        {
          service_code: serviceCode,
        },
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStatus(res.data.status);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("error", error);
      setStatus(error.response.data.status);
    }
  };
  return (
    <div>
      <Profile />
      <div className="mt-10">
        <h2 className="text-2xl font-medium text-slate-500">Pembayaran</h2>
        {service.length > 0 && (
          <>
            <div className="flex gap-2 items-center mt-5">
              <img
                src={service[0].service_icon}
                alt=""
                className="w-10 h-10 rounded"
              />
              <p className="font-bold text-xl">{service[0].service_name}</p>
            </div>
            <form onSubmit={HandleModal} className="mt-10">
              <div className="flex gap-2 items-center w-full px-8 py-3 border border-slate-400 rounded-lg">
                <FontAwesomeIcon icon={faWallet} className="w-8 h-8" />
                <input
                  type="number"
                  name="nominal"
                  id="nominal"
                  placeholder="Nominal"
                  value={service[0].service_tariff}
                  className="w-full p-3  rounded-lg"
                  disabled
                />
              </div>
              <p className="text-red-500 mt-2 text-lg">{isError}</p>
              <Button
                type="submit"
                classname={"w-full p-3 mt-5"}
                Disabled={isError}
              >
                Bayar
              </Button>
            </form>
          </>
        )}
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmitModal={() => HandleBayar}
          deskripsi={`${service[0].service_name} Sebesar`}
          nominal={service[0].service_tariff}
          status={status}
          topUp={false}
        />
      )}
    </div>
  );
};

export default Pembayaran;
