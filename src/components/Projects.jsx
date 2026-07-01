import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./Projects.css";


import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";

const projects = [
  { id: 1, title: "Work #1", image: project1 },
  { id: 2, title: "Work #2", image: project2 },
  { id: 3, title: "Work #3", image: project3 },
  { id: 4, title: "Work #4", image: project4 },
];

function Projects() { 
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const imageRefs = useRef([]);
  
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const track = trackRef.current;
    const slider = sliderRef.current;
    if (!track || !slider) return;

    

    const cardWidth = 540;
    const gap = 30;
    const step = cardWidth + gap;
    const sliderWidth = slider.offsetWidth;

    let targetX = 0;
    let imgParallaxX = 0;

    const centerSlider = sliderWidth / 2;
    const centerCard = cardWidth / 2;
    const absoluteCenterOffset = centerSlider - centerCard;

    if (hoveredIndex === null) {
      targetX = centerSlider - ((cardWidth * 2 + gap) / 2) - step - 15;
      imgParallaxX = 0;
    } else {
      if (hoveredIndex === 0) {
        targetX = 40; 
        imgParallaxX = 6;
      } else if (hoveredIndex === projects.length - 1) {
        const totalTrackWidth = (step * projects.length) - gap;
        targetX = sliderWidth - totalTrackWidth - 40; 
        imgParallaxX = -6;
      } else {
        targetX = absoluteCenterOffset - (hoveredIndex * step);
        imgParallaxX = hoveredIndex === 1 ? 3 : -3;
      }
    }

    const tl = gsap.timeline({ overwrite: "auto" });

    tl.to(track, {
      x: targetX,
      duration: 1.15,
      ease: "power3.inOut",
    }, 0);

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let targetY = 0;
      let parallaxX = 0;

      if (hoveredIndex !== null) {
        const distance = Math.abs(index - hoveredIndex);

        if (distance === 0) {
          targetY = 16; 
          parallaxX = 0;
        } else if (distance === 1) {
          targetY = 0;
          parallaxX = index > hoveredIndex ? 15 : -15;
        } else {
          targetY = 0;
          parallaxX = index > hoveredIndex ? 30 : -30;
        }
      }

      gsap.to(card, {
        y: targetY,
        x: parallaxX,
        duration: 0.85,
        ease: "power2.out",
        overwrite: "auto"
      });

      if (imageRefs.current[index]) {
        gsap.to(imageRefs.current[index], {
          xPercent: hoveredIndex === null ? 0 : imgParallaxX,
          duration: 1.15,
          ease: "power3.inOut",
        });
      }
    });

  }, [hoveredIndex]);

  return (
    <section className="projects">
      <h2 className="projects-title">Work - case studies</h2>

      <div ref={sliderRef} className="projects-slider">
        <div ref={trackRef} className="projects-track">
          {projects.map((project, index) => (
            <div 
              ref={(el) => (cardRefs.current[index] = el)}
              className={`project-card ${hoveredIndex === index ? "active-hover" : ""}`}
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img 
                ref={(el) => (imageRefs.current[index] = el)}
                src={project.image} 
                alt={project.title} 
              />

              <div className="project-overlay">
                <span>Case Study</span>
                <h3>{project.title}</h3>
                <p>This is some text inside of a div block.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a className="line-btn" href="javascript:void(0)">See more work →</a>
    </section>
  );
}

export default Projects;