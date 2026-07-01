import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useSectionReveal = (sectionRef) => {
  useLayoutEffect(() => {

    const ctx = gsap.context(() => {

      gsap.set(sectionRef.current, {
        autoAlpha: 0,
        y: 60,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,

        onEnter: () => {
          gsap.to(sectionRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 3,
            delay: 0.4,
            ease: "power3.out",
            clearProps: "all",
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();

  }, []);
};

export default useSectionReveal;