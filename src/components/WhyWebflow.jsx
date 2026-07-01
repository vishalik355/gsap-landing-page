import "./WhyWebflow.css";
import { useRef } from "react";
import useWhyWebflowAnimation from "../hooks/useWhyWebflowAnimation";

const left = [
  "It allows pixel perfect development",
  "It makes internal team more flexible",
  "It's 100% SEO friendly",
  "Your site will load super fast",
];

const right = [
  "It makes development much faster",
  "I can make delightful interactions and animations",
  "I build with clean and efficient Client-First.",
  "Hyper-secure, as standard",
];

function WhyWebflow() {
  const sectionRef = useRef(null);
  useWhyWebflowAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="why-webflow">
      <div className="container">

        <h2>Why Webflow?</h2>

        <div className="why-grid">

          <div className="column">
            {left.map((item, index) => (
              <div className="why-item" key={index}>
                <span className="bullet">•</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="column">
            {right.map((item, index) => (
              <div className="why-item" key={index}>
                <span className="bullet">•</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyWebflow;