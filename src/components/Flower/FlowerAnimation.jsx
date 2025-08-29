"use client"
import React, { useState, useEffect } from 'react';

// --- Configuration ---
const NUM_ELEMENTS = 300; // Erhöht von 50 auf 120 für mehr Kekse
const COOKIE_COLORS = ['#8B4513', '#D2691E', '#A0522D', '#CD853F', '#DEB887', '#F4A460']; // Various brown cookie colors
const ICING_COLORS = ['#FFFFFF', '#FFB6C1', '#87CEEB', '#98FB98', '#F0E68C']; // White, pink, blue, green, yellow icing
const CHOCO_CHIP_COLOR = '#3A230A'; // Darker brown for chocolate chips

// Configuration for collision detection
const MAX_SCALE = 2; // Max random scale factor used
const ROUND_COOKIE_BASE_DIMS = { width: 45, height: 45 };
const MIN_SPACING = 3; // Reduziert von 5 auf 3 für eine dichtere Platzierung
const MAX_PLACEMENT_ATTEMPTS = 500; // Erhöht von 100 auf 150 für mehr Versuche

// --- Styling ---
const styles = `
  .chaotic-cookie-background {
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
  .cookie-element {
    position: absolute;
  }

  /* --- Round Cookie Styles --- */
  .round-cookie {
    width: ${ROUND_COOKIE_BASE_DIMS.width}px;
    height: ${ROUND_COOKIE_BASE_DIMS.height}px;
    border-radius: 50%;
    box-shadow: inset -2px -3px 5px rgba(0, 0, 0, 0.2), 2px 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .round-cookie::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 
      8px -3px 0 rgba(0, 0, 0, 0.6),
      -5px 6px 0 rgba(0, 0, 0, 0.6),
      2px 8px 0 rgba(0, 0, 0, 0.6),
      -8px -2px 0 rgba(0, 0, 0, 0.6);
  }
  
  /* Schokostückchen mit besserer Platzierung und Aussehen */
  .round-cookie::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    background-image: 
      radial-gradient(circle at 30% 30%, ${CHOCO_CHIP_COLOR} 0%, ${CHOCO_CHIP_COLOR} 2.5px, transparent 2.5px),
      radial-gradient(circle at 70% 20%, ${CHOCO_CHIP_COLOR} 0%, ${CHOCO_CHIP_COLOR} 3px, transparent 3px),
      radial-gradient(circle at 40% 60%, ${CHOCO_CHIP_COLOR} 0%, ${CHOCO_CHIP_COLOR} 2.8px, transparent 2.8px),
      radial-gradient(circle at 60% 75%, ${CHOCO_CHIP_COLOR} 0%, ${CHOCO_CHIP_COLOR} 3.2px, transparent 3.2px),
      radial-gradient(circle at 20% 50%, ${CHOCO_CHIP_COLOR} 0%, ${CHOCO_CHIP_COLOR} 2px, transparent 2px),
      radial-gradient(circle at 85% 40%, ${CHOCO_CHIP_COLOR} 0%, ${CHOCO_CHIP_COLOR} 2.2px, transparent 2.2px),
      radial-gradient(circle at 80% 80%, ${CHOCO_CHIP_COLOR} 0%, ${CHOCO_CHIP_COLOR} 2.5px, transparent 2.5px);
    pointer-events: none;
  }

  /* --- Icing decoration */
  .icing {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 40%;
    border-radius: 50%;
    opacity: 0.8;
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
function CookieBackground() {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const placedElements = []; // Store elements with their calculated boundaries
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Teile den Bildschirm in Bereiche ein für bessere Verteilung
        const gridCellsX = 6; // Anzahl der horizontalen Zellen
        const gridCellsY = 6; // Anzahl der vertikalen Zellen
        const cellWidth = screenWidth / gridCellsX;
        const cellHeight = screenHeight / gridCellsY;

        // Verfolge, wie viele Elemente pro Zelle platziert wurden
        const cellPopulation = Array(gridCellsX * gridCellsY).fill(0);

        // Hilfsfunktion, um den Zellenindex basierend auf Koordinaten zu finden
        const getCellIndex = (x, y) => {
            const gridX = Math.floor(x / cellWidth);
            const gridY = Math.floor(y / cellHeight);
            return gridY * gridCellsX + gridX;
        };

        for (let i = 0; i < NUM_ELEMENTS; i++) {
            let validPositionFound = false;

            // Try to find a valid position for the current element
            for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
                const type = 'round'; // Only round cookies in this version
                const scale = Math.random() * (MAX_SCALE - 0.8) + 0.8; // Random scale

                const baseDims = ROUND_COOKIE_BASE_DIMS;

                const width = baseDims.width * scale;
                const height = baseDims.height * scale;

                // Finde die am wenigsten bevölkerte Zelle
                let minPopulation = Number.MAX_VALUE;
                let targetCellIndex = -1;

                for (let idx = 0; idx < cellPopulation.length; idx++) {
                    if (cellPopulation[idx] < minPopulation) {
                        minPopulation = cellPopulation[idx];
                        targetCellIndex = idx;
                    }
                }

                // Berechne die Koordinaten innerhalb der Zielzelle
                const cellX = targetCellIndex % gridCellsX;
                const cellY = Math.floor(targetCellIndex / gridCellsX);

                // Generiere Position innerhalb der Zielzelle mit etwas Zufall
                const top = cellY * cellHeight + getRandomInt(5, cellHeight - height - 5);
                const left = cellX * cellWidth + getRandomInt(5, cellWidth - width - 5);
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
                        id: `cookie-${i}`,
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
                    elementData.cookieColor = getRandomColor(COOKIE_COLORS);
                    elementData.style.backgroundColor = elementData.cookieColor;
                    elementData.style.color = elementData.cookieColor; // For star cookies



                    // Aktualisiere die Zellenpopulation
                    const cellIndex = getCellIndex(left, top);
                    if (cellIndex >= 0 && cellIndex < cellPopulation.length) {
                        cellPopulation[cellIndex]++;
                    }

                    placedElements.push(elementData); // Add to list of placed elements
                    validPositionFound = true;
                    break; // Exit placement attempt loop
                }
            } // End placement attempt loop

            if (!validPositionFound) {
                console.warn(`Could not find a valid position for cookie ${i} after ${MAX_PLACEMENT_ATTEMPTS} attempts.`);
            }
        } // End main element generation loop

        setElements(placedElements); // Update state with successfully placed elements

    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <>
            <style>{styles}</style>
            <div className="chaotic-cookie-background">
                {elements.map((elem) => {
                    if (elem.type === 'round') {
                        return (
                            <div
                                key={elem.id}
                                className="cookie-element round-cookie"
                                style={elem.style}
                            >
                                {elem.hasIcing && (
                                    <div
                                        className="icing"
                                        style={{ backgroundColor: elem.icingColor }}
                                    ></div>
                                )}
                            </div>
                        );
                    }
                })}
            </div>
            {/* Your other application content goes here */}
        </>
    );
}

export default CookieBackground;
