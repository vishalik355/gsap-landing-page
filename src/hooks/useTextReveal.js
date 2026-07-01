import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useTextReveal = (sectionRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set(".line-inner", {
        y: "100%",
      });

      gsap.to(".line-inner", {
        y: "0%",
        duration: 2,
        delay: 0.4,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
};


export const useTextImage = (sectionRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const image = sectionRef.current.querySelector(".slide.active .image-inner");
      const content = sectionRef.current.querySelector(".slide.active .content-inner");

      gsap.set(image, {
  xPercent: "-100",
});

      gsap.set(content, {
  xPercent: "100",
});

    gsap.to(image, {
  xPercent: 0,
  duration: 2,
  delay: 0.4,
  ease: "expo.out",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 80%",
    once: true,
  },
});

gsap.to(content, {
  xPercent: 0,
  duration: 2,
  delay: 0.4,
  ease: "expo.out",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 80%",
    once: true,
  },
});

    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
};



export default useTextReveal;