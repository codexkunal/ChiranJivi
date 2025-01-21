import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

function FocusFlow() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 400;
    
    let orb = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 15,
      speed: 5
    };
    
    let distractions = [];
    let animationFrameId;
    let mousePos = { x: canvas.width / 2, y: canvas.height / 2 };
    
    const addDistraction = () => {
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let x, y, dx, dy;
      
      switch (side) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = -20;
          dx = (orb.x - x) / 100;
          dy = (orb.y - y) / 100;
          break;
        case 1: // right
          x = canvas.width + 20;
          y = Math.random() * canvas.height;
          dx = (orb.x - x) / 100;
          dy = (orb.y - y) / 100;
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 20;
          dx = (orb.x - x) / 100;
          dy = (orb.y - y) / 100;
          break;
        default: // left
          x = -20;
          y = Math.random() * canvas.height;
          dx = (orb.x - x) / 100;
          dy = (orb.y - y) / 100;
      }
      
      distractions.push({ x, y, dx, dy, radius: 10 });
    };
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    });
    
    const animate = () => {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw orb
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#4F46E5';
      ctx.fill();
      
      // Move orb towards mouse
      const dx = (mousePos.x - orb.x) * 0.1;
      const dy = (mousePos.y - orb.y) * 0.1;
      orb.x += dx;
      orb.y += dy;
      
      // Update and draw distractions
      distractions.forEach((d, index) => {
        d.x += d.dx;
        d.y += d.dy;
        
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.fill();
        
        // Check collision
        const distance = Math.sqrt(Math.pow(orb.x - d.x, 2) + Math.pow(orb.y - d.y, 2));
        
        if (distance < orb.radius + d.radius) {
          setGameOver(true);
          cancelAnimationFrame(animationFrameId);
          return;
        }
        
        // Remove if out of bounds
        if (d.x < -50 || d.x > canvas.width + 50 || d.y < -50 || d.y > canvas.height + 50) {
          distractions.splice(index, 1);
          setScore((s) => s + 1);
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    const distractionInterval = setInterval(addDistraction, 2000);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(distractionInterval);
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Focus Flow</h1>
          <p className="text-gray-600">Guide your orb and avoid distractions</p>
          <div className="mt-4">
            <span className="text-xl font-semibold text-indigo-600">Score: {score}</span>
          </div>
        </div>

        {!gameStarted && !gameOver && (
          <div className="text-center">
            <button
              onClick={() => setGameStarted(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Game
            </button>
          </div>
        )}

        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="bg-gray-100 rounded-xl shadow-lg"
            style={{ maxWidth: '100%' }}
          />
        </div>

        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <p className="text-gray-600 mb-6">Final Score: {score}</p>
              <button
                onClick={() => {
                  setGameOver(false);
                  setGameStarted(false);
                  setScore(0);
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FocusFlow;
