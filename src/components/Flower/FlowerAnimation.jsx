"use client"
import React, { useState, useEffect } from 'react';

// --- Configuration ---
const NUM_ELEMENTS = 50; // Max number of eggs/flowers to attempt placing
const EGG_COLORS = ['#fecaca', '#a7f3d0', '#bfdbfe', '#fef08a', '#ddd6fe', '#fbcfe8']; // Light red, green, blue, yellow, purple, pink
const FLOWER_PETAL_COLORS = ['#ffffff', '#fbcfe8', '#c7d2fe', '#fef9c3']; // White, pink, indigo, light yellow
const FLOWER_CENTER_COLOR = '#fef08a'; // Yellow

// Configuration for collision detection
const MAX_SCALE = 2; // Max random scale factor used
const EGG_BASE_DIMS = { width: 40, height: 55 };
const FLOWER_BASE_DIMS = { width: 35, height: 35 };
const MIN_SPACING = 5; // Minimum pixels between bounding boxes
const MAX_PLACEMENT_ATTEMPTS = 100; // Max tries to find a spot for one element

// --- Styling ---
// Includes styles for eggs and flowers from previous versions, adjusted for chaos
const styles = `
  .chaotic-easter-background {
    position: fixed; /* Cover the viewport */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    scale: 1.5;
    overflow: hidden; /* Hide elements going slightly outside */
    z-index: -1; /* Behind other content */
    font-family: 'Inter', sans-serif;
  }

  /* Base style for positioned elements */
  .easter-element {
    position: absolute;
  }

  /* --- Egg Styles --- */
  .egg {
    width: ${EGG_BASE_DIMS.width}px;
    height: ${EGG_BASE_DIMS.height}px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; /* Egg shape */
    box-shadow: inset -2px -3px 5px rgba(0, 0, 0, 0.1);
  }
  .egg::before, .egg::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.6); /* Default stripe color */
    border-radius: 5px;
  }
  .egg::before { top: 15px; }
  .egg::after { bottom: 15px; }

  /* --- Flower Styles --- */
  .flower {
    width: ${FLOWER_BASE_DIMS.width}px;
    height: ${FLOWER_BASE_DIMS.height}px;
  }
  .petal {
    position: absolute;
    width: 14px;
    height: 18px;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0,0,0,0.15);
    transform-origin: center center; /* Use center origin for rotation */
  }
  .petal-top { top: 0; left: 50%; transform: translateX(-50%); }
  .petal-bottom { bottom: 0; left: 50%; transform: translateX(-50%) rotate(180deg); }
  .petal-left { top: 50%; left: 0; transform: translateY(-50%) rotate(-90deg); }
  .petal-right { top: 50%; right: 0; transform: translateY(-50%) rotate(90deg); }
  .flower-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background-color: ${FLOWER_CENTER_COLOR};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    box-shadow: 0 0 3px rgba(0,0,0,0.2);
  }

  /* Basic styling for content visibility */
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 20px;
    position: relative;
    min-height: 100vh;
    background-color: transparent; /* Show background behind body */
  }
`;

// --- Helper Functions ---
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor(colors) {
    return colors[getRandomInt(0, colors.length - 1)];
}

// Collision detection function
function checkCollision(elemA, elemB, spacing) {
    // Calculate boundaries including spacing
    const leftA = elemA.left - spacing;
    const rightA = elemA.left + elemA.width + spacing;
    const topA = elemA.top - spacing;
    const bottomA = elemA.top + elemA.height + spacing;

    const leftB = elemB.left - spacing;
    const rightB = elemB.left + elemB.width + spacing;
    const topB = elemB.top - spacing;
    const bottomB = elemB.top + elemB.height + spacing;

    // Check for overlap
    return leftA < rightB && rightA > leftB && topA < bottomB && bottomA > topB;
}


// --- Component ---
function EasterBackground() {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const placedElements = []; // Store elements with their calculated boundaries
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        for (let i = 0; i < NUM_ELEMENTS; i++) {
            let validPositionFound = false;

            // Try to find a valid position for the current element
            for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
                const type = Math.random() > 0.5 ? 'egg' : 'flower';
                const scale = Math.random() * (MAX_SCALE - 0.8) + 0.8; // Random scale
                const baseDims = type === 'egg' ? EGG_BASE_DIMS : FLOWER_BASE_DIMS;
                const width = baseDims.width * scale;
                const height = baseDims.height * scale;

                // Generate random position within bounds
                const top = getRandomInt(0, screenHeight - height); // Ensure it fits vertically
                const left = getRandomInt(0, screenWidth - width); // Ensure it fits horizontally
                const rotation = getRandomInt(-45, 45);

                const newElementBounds = { top, left, width, height };
                let collisionDetected = false;

                // Check against all previously placed elements
                for (const placedElem of placedElements) {
                    if (checkCollision(newElementBounds, placedElem, MIN_SPACING)) {
                        collisionDetected = true;
                        break; // Stop checking if collision found
                    }
                }

                // If no collision, place the element
                if (!collisionDetected) {
                    let elementData = {
                        id: `elem-${i}`,
                        type: type,
                        // Store position/size info for future collision checks
                        top: top,
                        left: left,
                        width: width,
                        height: height,
                        // Style object for rendering
                        style: {
                            top: `${top}px`,
                            left: `${left}px`,
                            transform: `rotate(${rotation}deg) scale(${scale})`,
                            // Set width/height explicitly in style for scaled elements
                            width: `${baseDims.width}px`,
                            height: `${baseDims.height}px`,
                        },
                    };

                    // Assign colors
                    if (type === 'egg') {
                        elementData.style.backgroundColor = getRandomColor(EGG_COLORS);
                    } else {
                        elementData.petalColor = getRandomColor(FLOWER_PETAL_COLORS);
                    }

                    placedElements.push(elementData); // Add to list of placed elements
                    validPositionFound = true;
                    break; // Exit placement attempt loop
                }
            } // End placement attempt loop

            if (!validPositionFound) {
                console.warn(`Could not find a valid position for element ${i} after ${MAX_PLACEMENT_ATTEMPTS} attempts.`);
            }
        } // End main element generation loop

        setElements(placedElements); // Update state with successfully placed elements

    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <>
            <style>{styles}</style>
            <div className="chaotic-easter-background">
                {elements.map((elem) => {
                    // Note: We apply width/height from base dims in CSS,
                    // but scale is handled by transform.
                    // The width/height stored in elem are for collision detection.
                    if (elem.type === 'egg') {
                        return (
                            <div
                                key={elem.id}
                                className="easter-element egg"
                                style={elem.style}
                            >
                                {/* Pseudo elements ::before and ::after handle stripes */}
                            </div>
                        );
                    } else { // Flower
                        return (
                            <div
                                key={elem.id}
                                className="easter-element flower"
                                style={elem.style}
                            >
                                <div className="petal petal-top" style={{ backgroundColor: elem.petalColor }}></div>
                                <div className="petal petal-bottom" style={{ backgroundColor: elem.petalColor }}></div>
                                <div className="petal petal-left" style={{ backgroundColor: elem.petalColor }}></div>
                                <div className="petal petal-right" style={{ backgroundColor: elem.petalColor }}></div>
                                <div className="flower-center"></div>
                            </div>
                        );
                    }
                })}
            </div>
            {/* Your other application content goes here */}
        </>
    );
}

export default EasterBackground;