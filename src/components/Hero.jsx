import "./Hero.css";
import hero from "../assets/img-right.png";
import matteLogo from "../assets/matte-logo.svg";
import fabLogo from "../assets/fab-logo.svg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import useMenuAnimation from "../hooks/useMenuAnimation";
import upArrow from "../assets/uparrow.svg";
import arrowBlack from "../assets/hero-black.svg";
import arrowWhite from "../assets/hero-white.svg";
import { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const { openMenu, closeMenu } = useMenuAnimation();

  const [menuOpen, setMenuOpen] = useState(false);
  const showImage = (image) => {
    gsap.killTweensOf(".menu-image");

    gsap.set(".menu-image", {
      attr: { src: image },
      transformOrigin: "100% 100%",
    });

    gsap.fromTo(
      ".menu-image",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 2.2,
        ease: "power4.out",
      },
    );
  };

  const hideImage = () => {
    gsap.to(".menu-image", {
      opacity: 0,
      scale: 0.9,
      x: 10,
      y: 10,
      duration: 0.45,
      ease: "power2.inOut",
    });
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }

    setMenuOpen(!menuOpen);
  };

  const heroRef = useRef(null);
  const rightRef = useRef(null);
  const imageRef = useRef(null);
  const buttonsRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoLineRef = useRef(null);
  const logoRightRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        delay: 0.4,
        defaults: {
          ease: "expo.out",
        },
      });

      intro
        .from(
          ".heading-wrapper .line span",
          {
            y: "100%",
            duration: 2.3,
            stagger: 0.08,
          },
          0,
        )
        .from(
          buttonsRef.current,
          {
            x: 80,
            opacity: 0,
            duration: 1.2,
          },
          0,
        )
        .fromTo(
          logoLeftRef.current,
          {
            x: 40,
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power4.out",
          },
          0,
        )
        .fromTo(
          logoRightRef.current,
          {
            x: -40,
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power4.out",
          },
          0,
        )
        .fromTo(
          logoLineRef.current,
          {
            scaleY: 0,
            autoAlpha: 0,
          },
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power4.out",
            transformOrigin: "center center",
          },
          0.05,
        )

        .from(
          ".image-mask",
          {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 3.6,
            ease: "expo.out",
          },
          0.5,
        );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1800",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        rightRef.current,
        {
          width: "100%",
          duration: 1,
          ease: "none",
        },
        0,
      ).to(
        imageRef.current,
        {
          scale: 1.08,
          duration: 1,
          ease: "none",
        },
        0,
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Navbar */}
      <header
        className="navbar"
        style={{
          backgroundColor: menuOpen ? "transparent" : "rgba(231,226,220,.12)",

          backdropFilter: menuOpen ? "none" : "blur(.5rem)",
        }}
      >
        <div
          className="logo"
          style={{
            visibility: menuOpen ? "hidden" : "visible",
          }}
        >
          <img ref={logoLeftRef} src={matteLogo} alt="Matteo" />
          <span ref={logoLineRef}></span>
          <img ref={logoRightRef} src={fabLogo} alt="Fabbiani" />
        </div>

        <div
          className="nav-right"
          style={{
            marginRight: menuOpen ? "-100px" : "0",
            transition: "margin .4s ease",
          }}
        >
          <div className="menu-icon-wrapper">
            <div
              className="close-btn"
              style={{
                transform: menuOpen ? "translateX(0)" : "translateX(70px)",
              }}
              onClick={toggleMenu}
            >
              <IoCloseOutline />
            </div>

            <div
              className="menu-btn"
              style={{
                transform: menuOpen ? "translateX(-70px)" : "translateX(0)",
              }}
              onClick={toggleMenu}
            >
              <HiOutlineMenuAlt3 />
            </div>
          </div>

          <button
            style={{
              visibility: menuOpen ? "hidden" : "visible",
            }}
          >
            CONTACT
          </button>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="hero">
        <div className="left">
          <h1 className="heading-wrapper">
            <div className="line">
              <span>Webflow</span>
            </div>
            <div className="line">
              <span>Designer &</span>
            </div>
            <div className="line">
              <span>Developer</span>
            </div>
            <div className="line">
              <span>crafting custom</span>
            </div>
            <div className="line">
              <span>experiences</span>
            </div>
          </h1>

          <div ref={buttonsRef} className="buttons">
            <a href="#" className="website-btn">
              <span>GO TO MY WEBSITE</span>

              <span className="arrow-wrap">
                <img className="arrow-black" src={arrowBlack} alt="" />

                <img className="arrow-white" src={arrowWhite} alt="" />
              </span>
            </a>

            <a href="#" className="line-btn">
              BOOK A FREE CONSULTATION CALL
            </a>
          </div>
        </div>

        <div ref={rightRef} className="right">
          <div className="image-wrapper buttons-wrapper">
            <div className="image-mask">
              <img ref={imageRef} src={hero} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Overlay */}
      <div className="menu-overlay">
        <div className="menu-left">
          <ul className="menu-list">
            <li
              onMouseEnter={() =>
                showImage(
                  "https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/6188d9fbbce7fc100e9187bf_home-3d-icon.webp",
                )
              }
              onMouseLeave={hideImage}
            >
              {" "}
              <a href="javascript:void(0)">
                {" "}
                <span>Home</span> <img src={upArrow} alt="" />{" "}
              </a>{" "}
            </li>
            <li
              onMouseEnter={() =>
                showImage(
                  "https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/6188d9fbf95033b7af2c9dda_m-3d-icon.webp",
                )
              }
              onMouseLeave={hideImage}
            >
              {" "}
              <a href="javascript:void(0)">
                {" "}
                <span>About</span> <img src={upArrow} alt="" />{" "}
              </a>{" "}
            </li>
            <li
              onMouseEnter={() =>
                showImage(
                  "https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/6188d9fb17f1614dd4b3e496_round-3d-icon.webp",
                )
              }
              onMouseLeave={hideImage}
            >
              {" "}
              <a href="javascript:void(0)">
                {" "}
                <span>Process</span> <img src={upArrow} alt="" />{" "}
              </a>{" "}
            </li>
            <li
              onMouseEnter={() =>
                showImage(
                  "https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/6188d9fb92aafe3b3d231637_line-3d-icon.webp",
                )
              }
              onMouseLeave={hideImage}
            >
              {" "}
              <a href="javascript:void(0)">
                {" "}
                <span>Work</span> <img src={upArrow} alt="" />{" "}
              </a>{" "}
            </li>
            <li
              onMouseEnter={() =>
                showImage(
                  "https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/6188d9fba8f20124fa8ee968_cube-3d-icon.webp",
                )
              }
              onMouseLeave={hideImage}
            >
              {" "}
              <a href="javascript:void(0)">
                {" "}
                <span>Contact</span> <img src={upArrow} alt="" />{" "}
              </a>{" "}
            </li>
            <li
              onMouseEnter={() =>
                showImage(
                  "https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/6188dad4ede0461cae7663f5_smile-3d-icon.webp",
                )
              }
              onMouseLeave={hideImage}
            >
              {" "}
              <a href="javascript:void(0)">
                {" "}
                <span>Resources</span> <img src={upArrow} alt="" />{" "}
              </a>{" "}
            </li>
          </ul>
        </div>

        <div className="menu-right">
          <img className="menu-image" src="" alt="" />
        </div>
      </div>
    </>
  );
}

export default Hero;
