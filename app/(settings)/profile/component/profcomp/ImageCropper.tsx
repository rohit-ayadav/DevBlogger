import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/context/ThemeContext';
import { X, ZoomIn, ZoomOut, RotateCw, Move } from 'lucide-react';

interface ImageCropperProps {
    imageUrl: string;
    onCancel: () => void;
    onCropComplete: (croppedBlob: Blob) => void;
    aspectRatio?: number;
    loading?: boolean;
}

export const ImageCropper = ({
    imageUrl,
    onCancel,
    onCropComplete,
    aspectRatio = 1,
    loading = false
}: ImageCropperProps) => {
    const { isDarkMode } = useTheme();
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Load the image when the component mounts
        const img = new Image();
        img.onload = () => {
            imageRef.current = img;
            drawImage();
        };
        img.src = imageUrl;
    }, [imageUrl]);

    useEffect(() => {
        // Redraw the image when zoom, rotation, or position changes
        if (imageRef.current) {
            drawImage();
        }
    }, [zoom, rotation, position]);

    const drawImage = () => {
        if (!canvasRef.current || !imageRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Save the current context state
        ctx.save();

        // Move to the center of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Rotate the canvas
        ctx.rotate((rotation * Math.PI) / 180);

        // Scale the image
        ctx.scale(zoom, zoom);

        // Adjust for position offset
        ctx.translate(position.x / zoom, position.y / zoom);

        // Calculate the center position to draw the image
        const centerX = -imageRef.current.width / 2;
        const centerY = -imageRef.current.height / 2;

        // Draw the image
        ctx.drawImage(imageRef.current, centerX, centerY);

        // Restore the context state
        ctx.restore();
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDragging(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        setDragStart({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPosition(prevPos => ({
            x: prevPos.x + (x - dragStart.x),
            y: prevPos.y + (y - dragStart.y)
        }));

        setDragStart({ x, y });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        if (e.touches.length !== 1) return;
        setIsDragging(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        setDragStart({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        });
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDragging || !canvasRef.current || e.touches.length !== 1) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        setPosition(prevPos => ({
            x: prevPos.x + (x - dragStart.x),
            y: prevPos.y + (y - dragStart.y)
        }));

        setDragStart({ x, y });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleZoomChange = (value: number[]) => {
        setZoom(value[0]);
    };

    const handleRotate = () => {
        setRotation(prev => (prev + 90) % 360);
    };

    const handleCrop = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        // Create a new canvas for the cropped image
        const croppedCanvas = document.createElement('canvas');
        const size = Math.min(canvas.width, canvas.height);
        croppedCanvas.width = size;
        croppedCanvas.height = size;

        const ctx = croppedCanvas.getContext('2d');
        if (!ctx) return;

        // Calculate the center of the canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const halfSize = size / 2;

        // Draw the cropped image
        ctx.drawImage(
            canvas,
            centerX - halfSize,
            centerY - halfSize,
            size,
            size,
            0,
            0,
            size,
            size
        );

        // Convert to blob and call the completion handler
        croppedCanvas.toBlob(blob => {
            if (blob) {
                onCropComplete(blob);
            }
        }, 'image/jpeg', 0.9);
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDarkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`}>
            <div
                className={`relative p-6 rounded-lg shadow-lg max-w-xl w-full mx-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                ref={containerRef}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Crop Your Profile Picture</h3>
                    <button
                        onClick={onCancel}
                        className={`rounded-full p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Canvas Container */}
                <div className={`relative border-2 rounded-lg mb-4 overflow-hidden ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="aspect-square w-full flex items-center justify-center">
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={300}
                            className="max-w-full max-h-full cursor-move"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        />

                        {/* Crop Circle Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="rounded-full border-2 border-white aspect-square w-4/5 shadow-inner"></div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    {/* Zoom controls */}
                    <div className="flex items-center space-x-4">
                        <ZoomOut className="w-5 h-5 text-gray-500" />
                        <div className="flex-1">
                            <Slider
                                value={[zoom]}
                                min={0.5}
                                max={3}
                                step={0.1}
                                onValueChange={handleZoomChange}
                            />
                        </div>
                        <ZoomIn className="w-5 h-5 text-gray-500" />
                    </div>

                    {/* Rotation and move info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Move className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-500">Drag to reposition</span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRotate}
                            className={`${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''}`}
                        >
                            <RotateCw className="w-4 h-4 mr-2" /> Rotate
                        </Button>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end space-x-2 mt-6">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className={isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCrop}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
};