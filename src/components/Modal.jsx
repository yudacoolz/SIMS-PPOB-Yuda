import React from "react";
import Logo from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

const Modal = ({
  onClose,
  onSubmitModal,
  deskripsi,
  nominal,
  status,
  topUp,
}) => {
  let formatSaldo = nominal.toLocaleString();
  console.log("status dari modal : ", status);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg w-full max-w-lg mx-4 z-50 flex flex-col items-center gap-3 px-4 py-10">
        {status === null ? (
          <img src={Logo} alt="" className="w-32 h-32" />
        ) : (
          <FontAwesomeIcon
            icon={status === 0 ? faCircleCheck : faCircleXmark}
            className={`w-32 h-32 ${
              status === 0 ? "text-green-500" : "text-red-500"
            }`}
          />
        )}
        {topUp ? (
          <p className="font-medium text-lg mt-4">
            {status === null && "Anda Yakin untuk"}
            {deskripsi}
          </p>
        ) : (
          <p className="font-medium text-lg mt-4">
            {status === null ? "Beli " : "Pembayaran "}
            {deskripsi}
          </p>
        )}
        <p className="font-bold text-2xl mb-4">
          Rp. {formatSaldo} {status === null ? "?" : ""}
        </p>
        <p>{status === null ? "" : status === 0 ? " Berhasil!" : "Gagal"}</p>

        {status === null ? (
          <>
            <button
              onClick={onSubmitModal()}
              className="capitalize font-bold text-red-500"
            >
              ya, lanjutkan bayar
            </button>
            <button
              onClick={onClose}
              className="capitalize font-bold text-slate-500"
            >
              Batalkan
            </button>
          </>
        ) : (
          <button
            onClick={onClose}
            className="capitalize font-bold text-red-500"
          >
            Kembali ke Beranda
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
