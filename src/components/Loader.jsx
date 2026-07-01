import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.css";

function Loader({ finishLoading }) {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const countRef = useRef(null);
  const headerFillRef = useRef(null);

  useEffect(() => {
    const counter = { value: 0 };

    gsap.to(counter, {
      value: 100,

      duration: 2.4,

      ease: "power2.out",

      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerHTML = Math.round(counter.value)
            .toString()
            .padStart(2, "0");
        }

        gsap.set(progressRef.current, {
          width: `${counter.value}%`,
        });
        gsap.set(headerFillRef.current,{
    width:`${counter.value}%`
});
      },

      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,

          duration: 1,

          ease: "power4.inOut",

          delay: 0.2,

          onComplete: finishLoading,
        });
      },
    });
  }, []);
  return (
    <div ref={loaderRef} className="loader">

<div className="loader-header">

  <div
    ref={headerFillRef}
    className="loader-header-fill"
  />

  <div className="loader-logo">
    Matteo Fabbiani
  </div>

  <div className="loader-nav">
    BRAND STRATEGY • BRAND IDENTITY • WEBSITE EXPERIENCE
  </div>

</div>


      <div className="loader-progress">
        <div ref={progressRef} className="loader-progress-fill"></div>
      </div>


      <div className="loader-bottom">
        <div className="loader-text"></div>

        <div ref={countRef} className="loader-count">
          00
        </div>
      </div>
    </div>
  );
}

export default Loader;
