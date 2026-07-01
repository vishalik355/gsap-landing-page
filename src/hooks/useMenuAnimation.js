import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useMenuAnimation = () => {
  const tl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    gsap.set(".menu-overlay", {
      autoAlpha: 0,
      pointerEvents: "none",
    });

    gsap.set(".menu-left", {
      xPercent: -100,
    });

    gsap.set(".menu-right", {
      xPercent: 100,
    });

    gsap.set(".menu-image", {
      y: 120,
      scale: 0.5,
      rotation: -20,
      opacity: 0,
    });

    tl.current
      .set(".menu-overlay", {
        autoAlpha: 1,
        pointerEvents: "auto",
      })

      .to(
        ".menu-left",
        {
          xPercent: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )

      .to(
        ".menu-right",
        {
          xPercent: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )

      .to(
        ".menu-image",
        {
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.8)",
        },
        0.55
      );

    tl.current.eventCallback("onReverseComplete", () => {
      gsap.set(".menu-overlay", {
        autoAlpha: 0,
        pointerEvents: "none",
      });
    });
  }, []);

  const openMenu = () => {
    tl.current.play();
  };

  const closeMenu = () => {
    tl.current.reverse();
  };

  return {
    openMenu,
    closeMenu,
  };
};

export default useMenuAnimation;