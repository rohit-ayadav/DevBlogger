"use client";
import { useDarkMode } from '@/hooks/useDarkMode';
import React, { useState, useEffect } from 'react';

const ColorPicker = () => {
  const [color, setColor] = useState('#4287f5');
  const [colorSpace, setColorSpace] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  const [savedColors, setSavedColors] = useState<{ hex: string; timestamp: number }[]>([]);
  const [copied, setCopied] = useState(false);
  const [gradientDirection, setGradientDirection] = useState('to right');
  const [gradientColor1, setGradientColor1] = useState('#4287f5');
  const [gradientColor2, setGradientColor2] = useState('#f542e0');
  const [showGradient, setShowGradient] = useState(false);
  const { isDarkMode } = useDarkMode();

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Get color values in different formats
  const getColorValues = () => {
    const rgb = hexToRgb(color);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    return {
      hex: color,
      rgb: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '',
      hsl: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : ''
    };
  };

  const colorValues = getColorValues();

  // Copy color to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Save current color
  const saveColor = () => {
    const newColor = {
      hex: color,
      timestamp: Date.now()
    };
    setSavedColors(prev => {
      const updated = [newColor, ...prev].slice(0, 20); // Keep only 20 most recent colors
      localStorage.setItem('savedColors', JSON.stringify(updated));
      return updated;
    });
  };

  // Load saved colors from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedColors');
    if (saved) {
      setSavedColors(JSON.parse(saved));
    }
  }, []);

  // Get text color for contrast
  const getContrastColor = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#000000';
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  const textColor = getContrastColor(color);

  // Generate gradient CSS
  const gradientCSS = `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`;
  const gradientCSSToCopy = `background: ${gradientCSS};`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Color Picker Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Single Color Picker */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Select a Color</h2>

            <div
              className="w-full h-48 rounded-lg mb-4 flex items-center justify-center"
              style={{ backgroundColor: color, color: textColor }}
            >
              <span className="text-lg font-medium">{colorValues[colorSpace]}</span>
            </div>

            <div className="mb-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 cursor-pointer"
              />
            </div>

            <div className="flex space-x-2 mb-4">
              <button
                className={`px-3 py-1 rounded ${colorSpace === 'hex' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setColorSpace('hex')}
              >
                HEX
              </button>
              <button
                className={`px-3 py-1 rounded ${colorSpace === 'rgb' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setColorSpace('rgb')}
              >
                RGB
              </button>
              <button
                className={`px-3 py-1 rounded ${colorSpace === 'hsl' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setColorSpace('hsl')}
              >
                HSL
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => copyToClipboard(colorValues[colorSpace])}
              >
                {copied ? 'Copied!' : 'Copy Value'}
              </button>
              <button
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={saveColor}
              >
                Save Color
              </button>
            </div>
          </div>

          {/* Color Values */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Color Values</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">HEX:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono">{colorValues.hex}</span>
                  <button
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => copyToClipboard(colorValues.hex)}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">RGB:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono">{colorValues.rgb}</span>
                  <button
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => copyToClipboard(colorValues.rgb)}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">HSL:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono">{colorValues.hsl}</span>
                  <button
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => copyToClipboard(colorValues.hsl)}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">CSS:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono">background: {colorValues.hex};</span>
                  <button
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => copyToClipboard(`background: ${colorValues.hex};`)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Gradient Generator */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Gradient Generator</h2>
              <button
                className={`px-3 py-1 rounded ${showGradient ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setShowGradient(!showGradient)}
              >
                {showGradient ? 'Hide Gradient' : 'Show Gradient'}
              </button>
            </div>

            {showGradient && (
              <>
                <div
                  className="w-full h-48 rounded-lg mb-4"
                  style={{ background: gradientCSS }}
                ></div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Color 1</label>
                    <input
                      type="color"
                      value={gradientColor1}
                      onChange={(e) => setGradientColor1(e.target.value)}
                      className="w-full h-10 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Color 2</label>
                    <input
                      type="color"
                      value={gradientColor2}
                      onChange={(e) => setGradientColor2(e.target.value)}
                      className="w-full h-10 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Direction</label>
                  <select
                    value={gradientDirection}
                    onChange={(e) => setGradientDirection(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="to right">Horizontal →</option>
                    <option value="to left">Horizontal ←</option>
                    <option value="to bottom">Vertical ↓</option>
                    <option value="to top">Vertical ↑</option>
                    <option value="to bottom right">Diagonal ↘</option>
                    <option value="to bottom left">Diagonal ↙</option>
                    <option value="to top right">Diagonal ↗</option>
                    <option value="to top left">Diagonal ↖</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">CSS Code</label>
                  <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                    {gradientCSSToCopy}
                  </div>
                </div>

                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => copyToClipboard(gradientCSSToCopy)}
                >
                  Copy CSS
                </button>
              </>
            )}
          </div>

          {/* Saved Colors */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Saved Colors</h2>

            {savedColors.length > 0 ? (
              <div className="grid grid-cols-5 gap-2">
                {savedColors.map((savedColor, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: savedColor.hex }}
                    onClick={() => setColor(savedColor.hex)}
                    title={savedColor.hex}
                  ></div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No saved colors yet. Click "Save Color" to add colors to your palette.</p>
            )}

            {savedColors.length > 0 && (
              <button
                className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  localStorage.removeItem('savedColors');
                  setSavedColors([]);
                }}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Color Harmonies */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Color Harmonies</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Complementary', 'Analogous', 'Triadic', 'Monochromatic'].map((harmony, index) => (
            <div key={index} className="text-center">
              <h3 className="font-medium mb-2">{harmony}</h3>
              <div className="h-24 rounded bg-gray-100"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p><a href="https://devblogger.in/tools" className="underline hover:text-blue-500">More Tools</a></p>
      </div>
    </div>
  );
};

export default ColorPicker;