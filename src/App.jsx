import React, { useEffect, useState } from 'react';

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageURL, setImageURL] = useState('https://avatars.githubusercontent.com/u/43477348?v=4');
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX - 455, y: clientY - 455  });
    };

    if (enabled) {
      window.addEventListener('pointermove', handleMove);
    }

    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [enabled]);

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return () => {
      document.body.classList.remove('no-cursor');
    };
  }, [enabled]);

  return (
    <>
      <img
        src={imageURL}
        alt="Imagen que sigue al mouse"
        style={{
          position: 'absolute',
        
          width: '50px', 
          height: '50px', 
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  );
};

export default FollowMouse;
