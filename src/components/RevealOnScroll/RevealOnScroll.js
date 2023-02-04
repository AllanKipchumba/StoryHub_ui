import React, { useEffect, useRef } from "react";
import styles from "./RevealOnScroll.module.scss";

export const RevealOnScroll = ({ children }) => {
  const elementRef = useRef(null);
  const [reveal, setReveal] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setReveal(true);
          observer.disconnect();
        }
      });
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${styles.hidden} ${reveal ? `${styles.reveal}` : ""}`}
    >
      {children}
    </div>
  );
};
