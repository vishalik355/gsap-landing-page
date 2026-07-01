import { useLayoutEffect } from "react";
import gsap from "gsap";

const useFaqAnimation = (active) => {
  useLayoutEffect(() => {
    const items = document.querySelectorAll(".faq-item");

    items.forEach((item, index) => {
      const question = item.querySelector(".faq-question");
      const bg = item.querySelector(".faq-bg");
      const title = item.querySelector(".faq-title");
      const icon = item.querySelector(".faq-icon");

      const enter = () => {
        gsap.to(bg, {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 0.45,
          ease: "power3.out",
        });

        gsap.to(title, {
          x: 40,
          duration: 0.45,
          ease: "power3.out",
        });

        gsap.to(icon, {
          x: -40,
          duration: 0.45,
          ease: "power3.out",
        });
      };

      const leave = () => {
        if (active !== index) {
          gsap.to(bg, {
            scaleY: 0,
            transformOrigin: "bottom",
            duration: 0.45,
            ease: "power3.out",
          });

          gsap.to(title, {
            x: 0,
            duration: 0.45,
            ease: "power3.out",
          });

          gsap.to(icon, {
            x: 0,
            duration: 0.45,
            ease: "power3.out",
          });
        }
      };

      question.addEventListener("mouseenter", enter);
      question.addEventListener("mouseleave", leave);

      return () => {
        question.removeEventListener("mouseenter", enter);
        question.removeEventListener("mouseleave", leave);
      };
    });
  }, [active]);

  useLayoutEffect(() => {
    const items = document.querySelectorAll(".faq-item");

    items.forEach((item, index) => {
      const bg = item.querySelector(".faq-bg");
      const title = item.querySelector(".faq-title");
      const icon = item.querySelector(".faq-icon");

      if (active === index) {
        gsap.to(bg, {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 0.45,
        });

        gsap.to(title, {
          x: 40,
          duration: 0.45,
        });

        gsap.to(icon, {
          x: -40,
          duration: 0.45,
        });
      } else {
        gsap.to(bg, {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.45,
        });

        gsap.to(title, {
          x: 0,
          duration: 0.45,
        });

        gsap.to(icon, {
          x: 0,
          duration: 0.45,
        });
      }
    });
  }, [active]);
};

export default useFaqAnimation;