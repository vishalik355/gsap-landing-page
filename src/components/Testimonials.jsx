import "./Testimonials.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import timothy from "../assets/test1.png";
import eric from "../assets/test2.png";
import monica from "../assets/test3.png";

const testimonials = [
  {
    id: 1,
    name: "Timothy Browns",
    role: "CMO",
    image: timothy,
    review:
      "Thanks to this project we discovered and realised our brand was so much more than what we thought. We're extremely happy about the results.",
  },
  {
    id: 2,
    name: "Eric Billings",
    role: "CMO",
    image: eric,
    review:
      "Not only the project inspired us about our brand, but the actual results we were able to accomplish were amazing.",
  },
  {
    id: 3,
    name: "Monica Lentini",
    role: "Co-Founder",
    image: monica,
    review:
      "It seems like a trivial thing for us now, but thanks to the project we have realised that all design choices must have a strategic basis.",
  },
];

function Testimonials() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".testimonial-card");

      gsap.set(cards, {
        y: 40,
        autoAlpha: 0,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      }).to(cards, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power4.out",
        stagger: 0.12,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="testimonials">
      <div className="container">

        <div className="testimonial-grid">

          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.id}>

              <div className="stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className="star"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        opacity=".3"
                        d="M12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
                        fill="currentColor"
                      />
                      <path
                        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                ))}
              </div>

              <p className="review">"{item.review}"</p>

              <div className="author">
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;