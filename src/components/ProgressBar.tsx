"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-800 z-50">
            <motion.div
                className="h-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.7)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
    );
}
