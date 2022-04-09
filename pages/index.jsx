import Link from "next/link";
import React from "react";
import Head from "next/head";
function HomePage() {
  return (
    <div>
      <Head>
        <title>Social Upgradable NFTs by Respct Club</title>
        <meta
          name="description"
          content="Respct.club is a creator token platform where you become a shareholder in the journey of your favorite creator"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="canonical" href="https://snft.respct.club/" />
        <meta name="keywords" content="Respct, club, web3, tokens" />
        <meta name="author" content="Respct" />

        {/* Social: Twitter */}
        <meta name="twitter:card" content="/favicon.ico" />
        <meta name="twitter:site" content="https://snft.respct.club/" />
        <meta name="twitter:title" content="Respct" />
        <meta
          name="twitter:description"
          content="Respct.club is a creator token platform where you become a shareholder in the journey of your favorite creator"
        />
        <meta name="twitter:image:src" content="/logo.png" />
        <meta name="twitter:image:alt" content="Respct Logo" />

        {/* Social: Facebook / Open Graph */}
        <meta property="og:url" content="https://snft.respct.club/" />
        <meta property="og:type" content="Creator Economy" />
        <meta property="og:title" content="Respct" />
        <meta property="og:image" content="/favicon.ico" />
        <meta
          property="og:description"
          content="Respct.club is a creator token platform where you become a shareholder in the journey of your favorite creator"
        />
        <meta property="og:site_name" content="Respct" />

        {/* Social: Google+ / Schema.org */}
        <meta itemProp="name" content="Respct" />
        <meta
          itemProp="description"
          content="Respct.club is a creator token platform where you become a shareholder in the journey of your favorite creator"
        />
        <meta itemProp="image" content="/icon.ico" />
      </Head>
      <div>Welcome to respct</div>
      <Link href="/Profile" passHref>
        <div>Go to Respct&apos;s profile</div>
      </Link>
      <Link href="/Login" passHref>
        <div>Go to Login Page</div>
      </Link>
    </div>
  );
}
HomePage.layout = "L1";
export default HomePage;
