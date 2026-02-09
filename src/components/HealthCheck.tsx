import { useEffect } from "react";
import { toast } from "sonner";
import { useGetHealthStatusQuery } from "@/rtk/api/healthApi";

const HealthCheck = () => {
  const { isSuccess, isError } = useGetHealthStatusQuery();

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Cure Cottage Connected", {
  //       description: "Backend is up and running!",
  //       duration: 3000,
  //     });
  //   }
  //   if (isError) {
  //     toast.error("Connection Failed", {
  //       description: "Unable to connect to backend server",
  //       duration: 4000,
  //     });
  //   }
  // }, [isSuccess, isError]);

  return null;
};

export default HealthCheck;
