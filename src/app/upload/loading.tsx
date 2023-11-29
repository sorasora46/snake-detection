"use client";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/loadinng-animation.json";
import "./loading.css";

export default function Loading() {
  return (
    <main>
      <Lottie animationData={loadingAnimation} loop />
      <p>We are predicting</p>
      <p>Please wait</p>
    </main>
  );
}
