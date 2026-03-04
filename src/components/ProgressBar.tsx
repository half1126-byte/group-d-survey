"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    progress: number;
    current: number;
    total: number;
}

export default function ProgressBar({ progress, current, total }: ProgressBarProps) {
    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="h-1.5 bg-slate-800 w-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
            <div className="max-w-2xl mx-auto px-4 flex justify-between items-center py-2 text-[10px] font-bold tracking-widest text-teal-500/80 uppercase">
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-teal-500 animate-pulse" />
                    진행률 {Math.round(progress)}%
                </div>
                <div>{current} / {total}</div>
            </div>
        </div>
    );
}
