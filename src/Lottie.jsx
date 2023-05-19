import React from "react";
import lottie from "lottie-web";
import lottieLoader from "./reactlottie.json";

export default function Lottie() {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loader"),
      animationData: lottieLoader
    });
  }, []);

  return (
    
  
      <div id="loader" style={{ width: 100, height: 100 }} />
    
  );
}
