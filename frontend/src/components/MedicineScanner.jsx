import React, { useState } from 'react';
import { Upload, X, Scan, Clock, Info } from 'lucide-react';

export default function MedicineScanner() {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
        analyzeMedicine();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeMedicine = () => {
    setIsAnalyzing(true);
    // Simulating API call to AI model
    setTimeout(() => {
      setResult({
        name: "Amoxicillin 500mg",
        usage: "Antibiotic used to treat bacterial infections",
        timing: "Take 1 capsule 3 times daily with meals"
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetScan = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Medicine Scanner</h2>
        <p className="text-gray-600">Upload an image of your medicine to get instant information</p>
      </div>

      {!image ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 transition-colors ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 hover:border-indigo-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Drag and drop your image here
            </h3>
            <p className="text-gray-500 mb-4">or</p>
            <label className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer">
              Choose File
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <div className="relative">
                <img
                  src={image}
                  alt="Uploaded medicine"
                  className="rounded-lg w-full h-auto"
                />
                <button
                  onClick={resetScan}
                  className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 p-6 bg-gray-50">
              {isAnalyzing ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Scan className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-600">Analyzing your medicine...</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-indigo-600" />
                      Medicine Details
                    </h3>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-lg text-indigo-600">
                        {result.name}
                      </h4>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-indigo-600" />
                      Usage
                    </h3>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-600">{result.usage}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      Timing
                    </h3>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-600">{result.timing}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
