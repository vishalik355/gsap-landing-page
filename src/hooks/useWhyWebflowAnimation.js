import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useWhyWebflowAnimation = (sectionRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".why-item");

      gsap.set(items, {
        y: 40,
        opacity: 0,
        "--line-scale": 0,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })
        .to(items, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power4.out",
          stagger: 0.08,
        }, 0)
        .to(
          items,
          {
            "--line-scale": 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
          0.05
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
};

export default useWhyWebflowAnimation;
