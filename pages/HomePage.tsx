import React, { useState } from 'react';
import { UploadSection } from '../components/UploadSection';
import { ProgressTracker } from '../components/ProgressTracker';
import { ResultsSection } from '../components/ResultsSection';
import { TrainingSchedule } from '../components/TrainingSchedule';
import { analyzeFightVideo, uploadVideoFile } from '../services/geminiCoachService';
import type { AnalysisResult, AnalysisState } from '../types';
import { Spinner } from '../components/Spinner';
import { WEIGHT_CLASSES } from '../constants';
import { MerchSearchSection } from '../components/MerchSearchSection';

interface HomePageProps {
    onNavigateToStore: () => void;
    fighterName: string;
    setFighterName: (name: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToStore, fighterName, setFighterName }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [opponentName, setOpponentName] = useState('');
    const [weightClass, setWeightClass] = useState(WEIGHT_CLASSES[3]); // Default to Lightweight

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setError(null);
        setResults(null);
        setAnalysisState('idle');
    };

    const resetState = () => {
        setSelectedFile(null);
        setAnalysisState('idle');
        setProgress(0);
        setStatusText('');
        setError(null);
        setResults(null);
        setFighterName('The Natural');
        setOpponentName('');
        setWeightClass(WEIGHT_CLASSES[3]);
    };

    const handleAnalyze = async () => {
        if (!selectedFile || !fighterName || !opponentName) return;

        setError(null);
        setResults(null);
        
        try {
            // 1. Uploading state
            setAnalysisState('uploading');
            setStatusText('Uploading video...');
            setProgress(0);
            
            const fileData = await uploadVideoFile(selectedFile, (p) => {
                setProgress(p);
            });

            // 2. Analyzing state
            setAnalysisState('analyzing');
            setStatusText('AI is analyzing the fight...');
            setProgress(0);
            
            const analysisResult = await analyzeFightVideo(fileData.uri, fileData.mimeType, fighterName, opponentName, weightClass);

            // 3. Success state
            setResults(analysisResult);
            setAnalysisState('success');

        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
            setAnalysisState('error');
        }
    };
    
    const isProcessing = analysisState === 'uploading' || analysisState === 'analyzing';

    return (
        <main className="flex-grow">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-white">
                            MMA Coach Assistant
                        </h1>
                        <p className="mt-3 text-lg text-red-500 font-semibold">Analyze fights and improve your technique with AI-powered insights</p>
                    </header>

                    <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="fighterName" className="block text-sm font-medium text-gray-300 mb-1">Fighter Name</label>
                                <input
                                    type="text"
                                    id="fighterName"
                                    value={fighterName}
                                    onChange={(e) => setFighterName(e.target.value)}
                                    placeholder="e.g., John 'The Natural' Doe"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                    disabled={isProcessing}
                                />
                            </div>
                            <div>
                                <label htmlFor="opponentName" className="block text-sm font-medium text-gray-300 mb-1">Opponent Name</label>
                                <input
                                    type="text"
                                    id="opponentName"
                                    value={opponentName}
                                    onChange={(e) => setOpponentName(e.target.value)}
                                    placeholder="e.g., Jane 'The Challenger' Smith"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                    disabled={isProcessing}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="weightClass" className="block text-sm font-medium text-gray-300 mb-1">Weight Class</label>
                                <select
                                    id="weightClass"
                                    value={weightClass}
                                    onChange={(e) => setWeightClass(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                    disabled={isProcessing}
                                >
                                    {WEIGHT_CLASSES.map(wc => <option key={wc} value={wc}>{wc}</option>)}
                                </select>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold text-white mb-4">Upload Fight Video for Analysis</h2>
                        
                        <UploadSection onFileSelect={handleFileSelect} disabled={isProcessing} />

                        {analysisState === 'uploading' && (
                            <div className="mt-6">
                                <ProgressTracker progress={progress} statusText={statusText} />
                            </div>
                        )}

                        {analysisState === 'analyzing' && (
                             <div className="flex justify-center items-center p-4 mt-6">
                                <Spinner />
                                <p className="ml-4 text-gray-300">{statusText}</p>
                            </div>
                        )}

                        {analysisState === 'error' && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md relative mt-6" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        
                        <div className="flex justify-end space-x-3 mt-6">
                            {analysisState !== 'idle' && (
                                <button
                                    onClick={resetState}
                                    className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                                >
                                    {isProcessing ? 'Cancel' : 'Start Over'}
                                </button>
                            )}
                            <button
                                onClick={handleAnalyze}
                                disabled={!selectedFile || !fighterName || !opponentName || isProcessing}
                                className="px-6 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : 'Analyze Fight'}
                            </button>
                        </div>
                    </div>
                    
                    {analysisState === 'success' && results && (
                        <>
                            <ResultsSection results={results} fighterName={fighterName} />
                            <TrainingSchedule schedule={results.trainingSchedule} fighterName={fighterName} />
                            <MerchSearchSection fighterName={fighterName} />
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};