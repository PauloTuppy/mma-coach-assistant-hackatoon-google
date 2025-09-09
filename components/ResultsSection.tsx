import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultsSectionProps {
    results: AnalysisResult;
    fighterName: string;
}

const StatCard: React.FC<{ value: string | number, label: string }> = ({ value, label }) => (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-3xl font-bold text-red-500">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
    </div>
);

export const ResultsSection: React.FC<ResultsSectionProps> = ({ results, fighterName }) => {
    return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mt-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Analysis Results for <span className="text-red-500">{fighterName}</span></h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StatCard value={`${results.strikeAccuracy}%`} label="Strike Accuracy" />
                <StatCard value={results.successfulTakedowns} label="Successful Takedowns" />
                <StatCard value={results.avgStrikesPerMin.toFixed(1)} label="Avg. Strikes/Min" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-medium text-white mb-3"><i className="fa-solid fa-lightbulb mr-2 text-red-500"></i>Key Insights</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {results.keyInsights.map((insight, index) => <li key={index}>{insight}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-medium text-white mb-3"><i className="fa-solid fa-dumbbell mr-2 text-red-500"></i>Recommended Training Focus</h3>
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                        <p className="text-gray-200 font-semibold">{results.trainingFocus.title}</p>
                        <ul className="list-disc list-inside pl-5 mt-2 text-gray-300">
                             {results.trainingFocus.points.map((point, index) => <li key={index}>{point}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};