import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailIcon from "../assets/email.svg";
import phoneIcon from "../assets/phone.svg";
import footerIcon from "../assets/footer-logo.svg";
import { FaInstagram, FaBehance, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const left = footerRef.current.querySelector(".footer-left");
      const centerItems = gsap.utils.toArray(".footer-center li");
      const rightBlocks = gsap.utils.toArray(".contact-block");
      const copy = footerRef.current.querySelector(".footer-copy");
      const social = gsap.utils.toArray(".footer-social a");

      const targets = [left, ...centerItems, ...rightBlocks, copy, ...social];

      gsap.set(targets, {
        autoAlpha: 0,
        y: 40,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(left, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power4.out",
      })
        .to(
          centerItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power4.out",
            stagger: 0.06,
          },
          "+=0.1"
        )
        .to(
          rightBlocks,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power4.out",
            stagger: 0.08,
          },
          "+=0.1"
        )
        .to(
          [copy, ...social],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power4.out",
            stagger: 0.08,
          },
          "+=0.1"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="container">
        <div className="wrapper">
          {/* Left */}
          <div className="footer-left">
            <h2 className="footer-logo">
              <img src={footerIcon} alt="Matteo Fabbiani" />
            </h2>

            <p>
              Are you an agency or a freelancer? I always welcome new
              opportunities to exchange ideas and to explore collaborations.
            </p>

            <a href="#" className="footer-link">
              →{" "}
              <span className="footer_orange-link">
                GO TO MY OFFICIAL WEBSITE
              </span>
            </a>

            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="Behance">
                <FaBehance />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="footer-right-part">
            {/* Center */}
            <div className="footer-center">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Process</a>
                </li>
                <li>
                  <a href="#">Work</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Resources</a>
                </li>
              </ul>
            </div>

            {/* Right */}
            <div className="footer-right">
              <div className="contact-block">
                <div className="icon">
                  {" "}
                  <img src={emailIcon} alt="Email" />
                </div>

                <h3>Email</h3>

                <a href="mailto:info@example.com">info@example.com</a>
              </div>

              <div className="contact-block">
                <div className="icon">
                  {" "}
                  <img src={phoneIcon} alt="Phone" />
                </div>

                <h3>Phone</h3>

                <a href="tel:+393334445566">+39 333 444 55 66</a>
              </div>
            </div>
            <div className="footer-copy">
              <p>
                Copyright © 2023 Fabbiani Matteo - All Rights reserved •
                matteo.fabbiani@hotmail.it • P.I. 02916640358 •
              </p>

              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
 