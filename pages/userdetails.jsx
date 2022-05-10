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

  return <div>kjSDKFbksdb</div>;
}

UserDetails.layout = "L1";
export default UserDetails;
