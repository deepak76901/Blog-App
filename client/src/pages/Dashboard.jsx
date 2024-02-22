import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col sm:flex-row" >
      {/* SideBar */}
      <div className="sm:w-56">
        <DashSidebar />
      </div>
      {/* Profile */}
      <div>
        {tab === "profile" && <DashProfile />}
      </div>
    </div>
  );
}
