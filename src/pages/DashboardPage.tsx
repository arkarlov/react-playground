import { useEffect, useState } from "react";
import api from "../api/axios";

const DashboardPage = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    api.get("/protected").then((res) => setData(res.data.message));
  }, []);

  return (
    <div>
      <h2>Приватная страница</h2>
      <p>{data}</p>
    </div>
  );
};

export default DashboardPage;
