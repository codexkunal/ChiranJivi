import React, { useRef, useEffect, useState } from 'react';
import { Palette, RotateCcw, Download } from 'lucide-react';

const ZenPatterns = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#4F46E5');
  const [symmetry, setSymmetry] = useState(8);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerWidth * 0.8;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.strokeStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.stroke();
  }, []);

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    for (let i = 0; i < symmetry; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((Math.PI * 2 * i) / symmetry);
      
      ctx.beginPath();
      ctx.moveTo(x - centerX, y - centerY);
      ctx.lineTo(x - centerX + 1, y - centerY + 1);
      ctx.stroke();
      
      ctx.restore();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'zen-pattern.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Zen Patterns</h1>
          <p className="text-gray-600">Create peaceful mandala patterns with gentle movements</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-gray-600">Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-600">Symmetry:</label>
              <select
                value={symmetry}
                onChange={(e) => setSymmetry(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                {[4, 6, 8, 12, 16].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 px-4 py-1 bg-gray-100 rounded hover:bg-gray-200"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={downloadImage}
              className="flex items-center gap-1 px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              <Download className="w-4 h-4" />
              Save
            </button>
          </div>

          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              onMouseDown={() => setIsDrawing(true)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseMove={draw}
              onMouseLeave={() => setIsDrawing(false)}
              onTouchStart={() => setIsDrawing(true)}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={draw}
              className="border rounded-lg touch-none"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZenPatterns;
