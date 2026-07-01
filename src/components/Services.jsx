import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./Services.css";

import brand from "../assets/brand.png";
import identity from "../assets/identity.png";
import webdesign from "../assets/webdesign.png";
import webflow from "../assets/webflow.png";
import useTextReveal, { useTextImage } from "../hooks/useTextReveal";
import useSectionReveal from "../hooks/useSectionReveal";


const tabs = [
  {
    title: "Brand Strategy",
    image: brand,
    heading: "Brand Strategy",
    description: "Strategy is the foundation of any branding project. It's impossible to intentionally reach any kind of business goal without doing strategy first. Brand strategy is understanding goals, the target and customer profiles, the market, where the brand currently is and where it wants to be in the future.",
  },
  {
    title: "Brand Identity",
    image: identity,
    heading: "Brand Identity",
    description: "Brand identity is not just about the logo. Brand identity is the set of elements through which the brand influences people's perception of itself. The visual style has to reflect the soul of the brand, to better connect with its target audience.",
  },
  {
    title: "UX/UI design",
    image: webdesign,
    heading: "UX/UI design",
    description: "A website is not just a crucial marketing tool. Today, people live on the internet. Your website can't just be pretty and salesy, but it's supposed to be a unique experience for the user. That's why my web design process has a strong focus on Strategy and User Experience.",
  },
  {
    title: "Web development",
    image: webflow,
    heading: "Web development",
    description: "Fast, flexible and lean web development with the most powerful development platform, Webflow. My approach is to create 100% custom experiences for your users, without any technical limits. I never use any kind of template for website building.",
  },
];

function Services() {
  const [active, setActive] = useState(0);

  const slidesRef = useRef([]);
  const isAnimating = useRef(false);
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);
  const aboutRef = useRef(null);
  // const textImagRef = useRef(null);

  // useSectionReveal(aboutRef);
  useTextReveal(aboutRef);
  useTextImage(aboutRef);
  
  const tabsContainerRef = useRef(null);
  const activeBgRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const initialBtn = buttonRefs.current[0];
    const container = tabsContainerRef.current;
    if (initialBtn && activeBgRef.current && container) {
      const btnRect = initialBtn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      gsap.set(activeBgRef.current, {
        x: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, []);

  const handleTabChange = (index) => {
    if (isAnimating.current || index === active) return;

    isAnimating.current = true;

    const direction = index > active ? 1 : -1;

    const currentSlide = slidesRef.current[active];
    const nextSlide = slidesRef.current[index];

    const currentImage = imageRefs.current[active];
    const nextImage = imageRefs.current[index];

    const currentContent = contentRefs.current[active];
    const nextContent = contentRefs.current[index];

    const targetButton = buttonRefs.current[index];
    const container = tabsContainerRef.current;
    const btnRect = targetButton.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const targetX = btnRect.left - containerRect.left;

    setActive(index);

    gsap.set(nextSlide, { display: "flex", zIndex: 2 });

    gsap.set(nextImage, { xPercent: -100 * direction });
    gsap.set(nextContent, { xPercent: 100 * direction });

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
        duration: 0.9,
      },
      onComplete: () => {
        currentSlide.classList.remove("active");
        nextSlide.classList.add("active");

        gsap.set(currentSlide, { display: "none", zIndex: 1 });
        gsap.set(nextSlide, { zIndex: 1 });

        gsap.set(currentImage, { xPercent: 0 });
        gsap.set(currentContent, { xPercent: 0 });

        isAnimating.current = false;
      },
    });

    tl.to(currentImage, { xPercent: 100 * direction }, 0)
      .to(nextImage, { xPercent: 0 }, 0)
      .to(currentContent, { xPercent: -100 * direction }, 0)
      .to(nextContent, { xPercent: 0 }, 0)
      .to(activeBgRef.current, {
        x: targetX,
        width: btnRect.width,
      }, 0);
  };

  return (
    <section ref={aboutRef} className="services">
      <div className="tabs" ref={tabsContainerRef}>
        <div className="active-bg line-inner" ref={activeBgRef}></div>

        {tabs.map((tab, index) => (
          <div className="tab-item" key={index}>
            <button
              ref={(el) => (buttonRefs.current[index] = el)}
              className={`line-inner ${active === index ? "active" : ""}`}
              onClick={() => handleTabChange(index)}
            >
              {tab.title}
            </button>
          </div>
        ))}
      </div>

      <div className="slider">
        {tabs.map((tab, index) => (
          <div
            key={index}
            ref={(el) => (slidesRef.current[index] = el)}
            className={`slide ${index === active ? "active" : ""}`}
          >
            <div className="left">
              <div className="image-wrapper">
                <div className="image-inner" ref={(el) => (imageRefs.current[index] = el)}>
                  <img src={tab.image} alt={tab.heading} />
                </div>
              </div>
            </div>

            <div className="right">
              <div className="content-wrapper">
                <div className="content-inner" ref={(el) => (contentRefs.current[index] = el)}>
                  <h2>{tab.heading}</h2>
                  <p>{tab.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;