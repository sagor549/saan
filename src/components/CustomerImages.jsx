import React from 'react';
// Import your avatar images from the assets folder
import avatar1 from "/assets/ava1.jpg";
import avatar2 from "/assets/ava2.jpg";
import avatar3 from "/assets/ava3.jpeg";
import avatar4 from "/assets/ava4.jpg";

/**
 * CustomerImages component displays a row of customer avatars with overlap effect
 * Using images from the assets folder
 */
const CustomerImages = () => {
  // Array of imported avatar images
  const avatars = [avatar1, avatar2, avatar3, avatar4];
  
  return (
    <div className="flex -space-x-2">
      {avatars.map((avatar, i) => (
        <div
          key={i}
          className="w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden"
        >
          <img 
            src={avatar}
            alt={`Customer ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default CustomerImages;