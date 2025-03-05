import React, { useEffect, useState } from 'react'
import { FaChevronUp } from "react-icons/fa";


export default function GoToTop() {
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        const toggleVisibility = () => {
          if (window.scrollY > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
      }, []);


      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };


  return (
    <div 
      className={`go-top ${isVisible ? "active" : ""}`} 
      onClick={scrollToTop}
    >
      <FaChevronUp />
    </div>
  )
}
