"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle } from "lucide-react";

export default function CompletionPage() {
    useEffect(() => {
        // Fire confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#14b8a6', '#fcd34d', '#ffffff'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#14b8a6', '#fcd34d', '#ffffff'] });
        }, 250);

        // Clear local storage
        localStorage.removeItem("groupd-survey-progress");

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mb-8 p-6 bg-teal-500/10 rounded-full ring-2 ring-teal-500"
            >
                <CheckCircle className="w-16 h-16 text-teal-400" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-4">
                참여해 주셔서 감사합니다!
            </h2>
            <p className="text-gray-300 leading-relaxed">
                보내주신 소중한 의견은<br />
                <strong>전략기획팀장</strong>이 직접 확인 후<br />
                서비스 개선에 적극 반영하겠습니다.
            </p>
        </motion.div>
    );
}
