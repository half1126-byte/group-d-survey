"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IntroPageProps {
    onStart: () => void;
}

export default function IntroPage({ onStart }: IntroPageProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-[100dvh] p-6 text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                안녕하세요,<br />
                <span className="text-teal-400">그룹디 전략기획팀</span>입니다.
            </h1>
            <p className="text-gray-300 mb-8 whitespace-pre-line leading-relaxed">
                더 나은 서비스를 제공해드리기 위해
                원장님의 소중한 의견을 듣고 싶습니다.
                <br />
                <br />
                (소요 시간: 약 2분)
            </p>

            <motion.button
                onClick={onStart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full bg-teal-500 text-deep-navy text-lg font-bold py-4 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:bg-teal-400 transition-all flex items-center justify-center gap-2"
            >
                설문 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </motion.div>
    );
}
