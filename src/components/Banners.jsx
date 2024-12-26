import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const Banners = () => {
  const ref = useRef();
  const { events } = useDraggable(ref);

  const isToken = useSelector((state) => state.login.isToken);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/banner",
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
        );
        console.log("response banner", response);
        setBanners(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBanner();
  }, []);
  return (
    <>
      {/* Banners */}
      <div className="mt-16">
        <h3 className="font-bold">Temukan Promo Menarik</h3>
        <div
          className="flex gap-4 mt-5 overflow-x-scroll w-[1200px] scrollbar-none"
          {...events}
          ref={ref}
        >
          {banners.map((item, i) => {
            return (
              <div key={i} className="w-[280px] h-[120px] flex-shrink-0">
                <img
                  src={item.banner_image}
                  alt=""
                  className="w-[280px] h-[120px] object-cover"
                  draggable="false"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Banners;
