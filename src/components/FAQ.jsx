import { useState, useRef, useLayoutEffect } from "react";
import "./FAQ.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useFaqAnimation from "../hooks/useFaqAnimation";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How long does it take to rebrand my company?",
    answer:
      "Most branding projects take between 4-8 weeks depending on the scope of work and client feedback. Every project starts with a discovery phase to ensure the strategy aligns with your business goals.",
  },
  {
    question: "How long does it take build a website?",
    answer:
      "A typical Webflow website takes around 3-6 weeks depending on the number of pages, animations, CMS and revisions.",
  },
  {
    question: "What's your process?",
    answer:
      "My process includes Discovery, Strategy, Design, Development, Revisions and Launch. Throughout the project we work closely together to ensure the best outcome.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every project is different. After our discovery call I'll prepare a tailored proposal based on your goals and requirements.",
  },
];

function FAQ() {
  const [active, setActive] = useState(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const heading = sectionRef.current.querySelector("h2");
      const items = gsap.utils.toArray(".faq-item");

      gsap.set([heading, ...items], {
        y: 40,
        autoAlpha: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(heading, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power4.out",
      }).to(
        items,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power4.out",
          stagger: 0.1,
        },
        "+=0.1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useFaqAnimation(active);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="faq">
        <div className="container">
        <div className="wrapper">

            <h2>FAQs</h2>

            {faqs.map((item, index) => (
            <div
                key={index}
                className={`faq-item ${active === index ? "active" : ""}`}
            >

                <button
                className="faq-question"
                onClick={() => toggle(index)}
                >

                <div className="faq-bg"></div>

                <span className="faq-title">
                    {item.question}
                </span>

                <div className="faq-icon">
                    <span></span>
                    <span></span>
                </div>

                </button>

                <div className="faq-answer">
                <p>{item.answer}</p>
                </div>

            </div>
            ))}

        </div>
        </div>
    </section>
  );
}

export default FAQ;