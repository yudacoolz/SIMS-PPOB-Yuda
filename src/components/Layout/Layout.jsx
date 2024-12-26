import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Header />
        <div className="px-24 my-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
