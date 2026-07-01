import "./Clients.css";
import { useRef } from "react";
import useClientsAnimation from "../hooks/useClientsAnimation";

function Clients() {
  const sectionRef = useRef(null);

  useClientsAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="clients">

      <div className="marquee top-text">
        <h2>
          Some nice words from my past clients
        </h2>
      </div>

      <div className="marquee bottom-text">
        <h2>
          Some nice words from my past clients
        </h2>
      </div>

    </section>
  );
}

export default Clients;