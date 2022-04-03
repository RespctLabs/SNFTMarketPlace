import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div>
      <div>Welcome to respct</div>
      <Link href="/Profile" passHref>
        <div>Go to Respct's profile</div>
      </Link>
      <Link href="/Login" passHref>
        <div>Go to Login Page</div>
      </Link>
    </div>
  );
}

export default HomePage;
