"use client";

import { useEffect, useRef, useState } from "react";
import CategoryButton from "./CategoryButton";
import "./categoryButton.css";

const CategoryButtonGroup = ({ buttonData, handleTabClick, activeTab }) => {
  const scrollRef = useRef(null);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const animationRef = useRef(null);

  // Smooth scroll animation
  const smoothScroll = () => {
    if (Math.abs(velocity) > 0.5) {
      sliderRef.current.scrollLeft += velocity;
      setVelocity(velocity * 0.95); // Deceleration factor
      animationRef.current = requestAnimationFrame(smoothScroll);
    } else {
      setVelocity(0);
    }
  };

  // Mouse events for drag scrolling
  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    setVelocity(0);
    cancelAnimationFrame(animationRef.current);
    sliderRef.current.classList.add("no-smooth"); // Disable smooth scroll during drag
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    const newScrollLeft = scrollLeft - walk;

    // Calculate velocity for momentum scrolling
    setVelocity((newScrollLeft - sliderRef.current.scrollLeft) * 0.5);

    sliderRef.current.scrollLeft = newScrollLeft;
  };

  const endDrag = () => {
    setIsDragging(false);
    sliderRef.current.classList.remove("no-smooth");

    // Apply momentum scrolling
    if (Math.abs(velocity) > 1) {
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  };

  // Add/remove event listeners
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("mousemove", duringDrag);
    slider.addEventListener("mouseup", endDrag);
    slider.addEventListener("mouseleave", endDrag);

    return () => {
      cancelAnimationFrame(animationRef.current);
      slider.removeEventListener("mousedown", startDrag);
      slider.removeEventListener("mousemove", duringDrag);
      slider.removeEventListener("mouseup", endDrag);
      slider.removeEventListener("mouseleave", endDrag);
    };
  }, [isDragging, startX, scrollLeft, velocity]);

  return (
    <div className="category-button-group-wrapper">
      <div
        ref={scrollRef}
        className={`category-button-scroll-container ${
          isDragging ? "dragging" : ""
        }`}
      >
        <CategoryButton
          onClick={() => handleTabClick("all")}
          variant={activeTab === null ? "outline" : "default"}
          className="category-button all"
        >
          All
        </CategoryButton>

        <div
          ref={sliderRef}
          className={`category-scroll-list ${isDragging ? "dragging" : ""}`}
        >
          {buttonData.map((button) => (
            <CategoryButton
              key={button._id}
              onClick={() => handleTabClick(button.value)}
              variant={activeTab === button.value ? "outline" : "default"}
              className="category-button single !text-white"
            >
              {button.name}
            </CategoryButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryButtonGroup;
