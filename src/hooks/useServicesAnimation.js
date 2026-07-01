import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useServicesAnimation = (sectionRef, tabRefs) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

tl.from(
  tabRefs.current[0],
  {
    xPercent: 100,
    opacity: 0,
    duration: 0.7,
    ease: "expo.out",
  },
  0
);

tl.from(
  tabRefs.current.slice(1),
  {
    yPercent: 100,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: "expo.out",
  },
  0.1
);

      tl.from(
        ".service-image",
        {
          x: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.3
      );

      tl.from(
        ".service-content-right",
        {
          x: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, tabRefs]);
};

export default useServicesAnimation;