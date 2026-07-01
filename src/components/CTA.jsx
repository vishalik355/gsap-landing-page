import "./CTA.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import book from "../assets/7key.png";
import arrowBlack from "../assets/hero-black.svg";
import arrowWhite from "../assets/hero-white.svg";
 
gsap.registerPlugin(ScrollTrigger);
 
function CTA() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const title = sectionRef.current.querySelector(".cta-left h2");
      const button = sectionRef.current.querySelector(".cta-btn");
      const image = sectionRef.current.querySelector(".cta-right img");

      gsap.set([title, button, image], {
        autoAlpha: 0,
        y: 40,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(title, {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        ease: "power4.out",
      })
        .to(
          button,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power4.out",
          },
          "+=0.05"
        )
        .to(
          image,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power4.out",
          },
          "+=0.05"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cta">
      <div className="wrapper medium-container">

        <div className="cta-left">

          <h2>
            Download my free
            checklist “7 key
            elements for a brand
            identity that works”
          </h2>

          <a href="#" className="cta-btn">
  <span>VISIT MY NEW WEBSITE</span>

  <span className="arrow-wrap">
    <img
      src={arrowBlack}
      className="arrow-black"
      alt=""
    />

    <img
      src={arrowWhite}
      className="arrow-white"
      alt=""
    />
  </span>
</a>

        </div>

        <div className="cta-right">
          <img src={book} alt="Branding Checklist" />
        </div>

      </div>
    </section>
  );
}

export default CTA;