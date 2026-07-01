import "./About.css";
import { useRef, useLayoutEffect } from "react";
import useTextReveal from "../hooks/useTextReveal";
import useSectionReveal from "../hooks/useSectionReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
const aboutRef = useRef(null);

useSectionReveal(aboutRef);
useTextReveal(aboutRef);
const lineRef = useRef(null);

useLayoutEffect(() => {
  gsap.set(lineRef.current, {
    yPercent: -100,
  });

  gsap.to(lineRef.current, {
    yPercent: 200,
    duration: 1.5,
    ease: "none",
    repeat: -1,
  });
}, []);

  return (
    <section ref={aboutRef} className="about">
              <div className="about-line">
  <div ref={lineRef} className="about-line-inner"></div>
</div>
      <div className="container">
        <div className="about-content">

          <span className="line">
            <span className="line-inner">I work with design</span>
          </span>

          <span className="line">
            <span className="line-inner">driven companies and</span>
          </span>

          <span className="line">
            <span className="line-inner">startups on designing</span>
          </span>

          <span className="line">
            <span className="line-inner">meaningful brands and</span>
          </span>

          <span className="line">
            <span className="line-inner">creating high end</span>
          </span>

          <span className="line">
            <span className="line-inner">Webflow websites</span>
          </span>

        </div>

        <div className="about-how">
          <h2>How I can help you</h2>
        </div>

      </div>
    </section>
  );
}

export default About;