import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const DashboardPage = () => {
  const [data, setData] = useState<{ id: number; email: string }>();

  useEffect(() => {
    axiosInstance.get("/protected").then((res) => setData(res.data.user));
  }, []);

  return (
    <div>
      <h2>Protected page</h2>
      <p>{data?.email}</p>
    </div>
  );
};

export default DashboardPage;
