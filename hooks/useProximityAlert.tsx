import { useEffect, useRef, useState } from 'react';

const useProximityAlert = (distance = 10) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      const rect = divRef.current.getBoundingClientRect();
      const { clientX: mouseX, clientY: mouseY } = e;

      // Calculate distances to all edges
      const distances = {
        left: mouseX - rect.left,
        right: rect.right - mouseX,
        top: mouseY - rect.top,
        bottom: rect.bottom - mouseY
      };

      // Check if mouse is within proximity range of any edge
      const isMouseNear = Object.values(distances).some(
        (dist) => Math.abs(dist) <= distance && dist > 0
      );

      setIsNear(isMouseNear);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [distance]);

  useEffect(() => {
    if (!isNear) {
      console.log(`Mouse has left the ${distance}px proximity of the div!`);
      // Perform your action here when the mouse leaves the proximity
    }else{
        console.log(`Mouse is within ${distance}px proximity of the div!`);
        // Perform your action here when the mouse is within the proximity
    }
  }, [isNear, distance]);

  return { divRef, isNear };
};

export default useProximityAlert;

