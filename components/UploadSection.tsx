import React, { useCallback, useRef, useState } from 'react';

interface UploadSectionProps {
    onFileSelect: (file: File) => void;
    disabled: boolean;
}

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};


export const UploadSection: React.FC<UploadSectionProps> = ({ onFileSelect, disabled }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((file: File | undefined) => {
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            alert('Please select a video file.');
            return;
        }

        if (file.size > 100 * 1024 * 1024) { // 100MB limit
            alert('File size must be less than 100MB.');
            return;
        }
        setSelectedFile(file);
        onFileSelect(file);
    }, [onFileSelect]);


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (!disabled) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.value = ""; // Allow re-selecting the same file
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0]);
    };

    const dragOverClasses = isDragOver ? 'border-red-500 bg-gray-800' : 'border-gray-600';

    return (
        <div 
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${disabled ? 'cursor-not-allowed bg-gray-800/50' : 'cursor-pointer hover:border-red-500'} ${dragOverClasses}`}
        >
            <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="video/*"
                onChange={handleFileChange}
                disabled={disabled}
            />
            {selectedFile && !disabled ? (
                <>
                    <i className="fa-solid fa-circle-check text-5xl text-green-500 mx-auto mb-4"></i>
                    <p className="text-gray-100 font-medium">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm">{formatFileSize(selectedFile.size)}</p>
                    <p className="text-red-500 text-sm mt-2">Click to select a different file</p>
                </>
            ) : (
                <>
                    <i className="fa-solid fa-cloud-arrow-up text-5xl text-gray-500 mx-auto mb-4"></i>
                    <p className="text-gray-300 mb-2">Drag and drop your fight video here</p>
                    <p className="text-gray-500 text-sm mb-4">or</p>
                    <span className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold">
                        Select a file
                    </span>
                    <p className="text-gray-500 text-sm mt-4">Supported formats: MP4, MOV, etc. (Max 100MB)</p>
                </>
            )}
        </div>
    );
};
