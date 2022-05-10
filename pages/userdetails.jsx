import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BlockchainContext } from "../context/BlockchainContext";
function UserDetails() {
  const [user, setUser] = useState({});
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  // define a const function
  const fetchUser = () => {
    axios.get(`/users/login?address=${connectedAccount}`).then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <div className=" mt-0 h-screen">{JSON.stringify(user)}</div>;
}

UserDetails.layout = "L1";
export default UserDetails;
