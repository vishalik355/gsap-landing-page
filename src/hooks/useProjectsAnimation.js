import { useLayoutEffect } from "react";
import gsap from "gsap";

const useProjectsAnimation = (sliderRef, trackRef, setIsHovered) => {
  useLayoutEffect(() => {
    const track = trackRef.current;
    const slider = sliderRef.current;
    if (!track || !slider) return;

    const existingClones = track.querySelectorAll(".cloned-card");
    existingClones.forEach(clone => clone.remove());

    const originalCards = Array.from(track.children);
    
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("cloned-card");
      track.appendChild(clone);
    });


    const totalStepWidth = (480 + 30) * originalCards.length;

    const tween = gsap.to(track, {
      x: -totalStepWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalStepWidth),
      },
    });

    const handleMouseEnter = () => {
      tween.pause();
      setIsHovered(true); 
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      
      gsap.to(track, {
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          tween.play(); 
        }
      });
    };

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      tween.kill();
    };
  }, [trackRef, sliderRef, setIsHovered]);
};

export default useProjectsAnimation;