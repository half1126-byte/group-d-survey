"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SURVEY_QUESTIONS } from "@/constants/questions";
import { Answer, UserInfo } from "@/types";
import IntroPage from "./IntroPage";
import UserIdentification from "./UserIdentification";
import CompletionPage from "./CompletionPage";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Logo from "./Logo";
import { ChevronLeft } from "lucide-react";

type SurveyStatus = "intro" | "identification" | "survey" | "completion";

export default function SurveyContainer() {
    const [status, setStatus] = useState<SurveyStatus>("intro");
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, Answer>>({});
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    // 1. Local Storage: Load
    useEffect(() => {
        const saved = localStorage.getItem("groupd-survey-progress");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.status && parsed.answers) {
                    let restoreStatus = parsed.status === 'completion' ? 'intro' : parsed.status;

                    // Force identification if missing userInfo but attempting to enter survey
                    if (restoreStatus === 'survey' && !parsed.userInfo) {
                        restoreStatus = 'identification';
                    }

                    setStatus(restoreStatus);
                    setCurrentStep(parsed.currentStep || 0);
                    setAnswers(parsed.answers);
                    setUserInfo(parsed.userInfo || null);
                }
            } catch (e) {
                console.error("Failed to load progress", e);
            }
        }
    }, []);

    // 2. Local Storage: Save
    useEffect(() => {
        if (status !== 'intro') {
            localStorage.setItem("groupd-survey-progress", JSON.stringify({
                status,
                currentStep,
                answers,
                userInfo
            }));
        }
    }, [status, currentStep, answers, userInfo]);

    const currentQuestion = SURVEY_QUESTIONS[currentStep];

    const handleStart = () => {
        setStatus("identification");
    };

    const handleIdentificationComplete = (info: UserInfo) => {
        setUserInfo(info);
        setStatus("survey");
        setCurrentStep(0);
    };

    const handleAnswer = (value: any, otherValue?: string) => {
        const question = currentQuestion;
        const newAnswers = {
            ...answers,
            [question.id]: {
                questionId: question.id,
                value,
                otherValue
            }
        };
        setAnswers(newAnswers);

        // Auto-advance for simple types
        if (['rating', 'select', 'nps'].includes(question.type)) { // Added 'nps' back
            setTimeout(() => {
                handleNext(newAnswers);
            }, 400);
        }
    };

    const handleNext = (currentAnswers = answers) => {
        // Validation
        const answer = currentAnswers[currentQuestion.id];
        // Check validation only for this step
        // Note: if answer is 0 (NPS), previous check (!answer.value) might fail if value is number 0. 
        // Fix validation logic.
        if (!answer) return;

        // Strict check for empty strings or empty arrays
        if (answer.value === "" || (Array.isArray(answer.value) && answer.value.length === 0)) {
            return;
        }

        if (currentStep < SURVEY_QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            finishSurvey(currentAnswers);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const finishSurvey = async (finalAnswers: any) => {
        setIsSubmitting(true);
        const payload = {
            userInfo,
            answers: finalAnswers
        };

        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            // Success
            setStatus("completion");
            // Optional: Clear local storage here only on success or in CompletionPage (already in CompletionPage)
        } catch (error) {
            console.error("Submission failed", error);
            alert("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 3. Keyboard Support
    useEffect(() => {
        if (status !== 'survey') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleNext();
            }

            const num = parseInt(e.key);
            if (!isNaN(num)) {
                // NPS 0-9 support? Or just 1-5 for rating.
                // If NPS, mapping keys might be complex (0 vs 10). Let's stick to 1-5 for Rating/Select.
                if (currentQuestion.type === 'rating' && num >= 1 && num <= 5) {
                    handleAnswer(num);
                } else if (currentQuestion.type === 'select' && currentQuestion.options && num >= 1 && num <= currentQuestion.options.length) {
                    handleAnswer(currentQuestion.options[num - 1]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status, currentStep, answers, currentQuestion]);

    if (status === "intro") return (
        <>
            <Logo />
            <IntroPage onStart={handleStart} />
        </>
    );

    if (status === "identification") return (
        <>
            <Logo />
            <UserIdentification onComplete={handleIdentificationComplete} />
        </>
    );

    if (status === "completion") return <CompletionPage />;

    const progress = ((currentStep + 1) / SURVEY_QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-deep-navy flex flex-col relative overflow-hidden text-white">
            <Logo />
            <ProgressBar progress={progress} />

            {/* Loading Overlay */}
            {isSubmitting && (
                <div className="absolute inset-0 z-[100] bg-deep-navy/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xl font-bold text-white animate-pulse">결과 저장 중...</p>
                </div>
            )}

            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full px-4 relative pt-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full"
                    >
                        <QuestionCard
                            question={currentQuestion}
                            value={answers[currentQuestion.id]?.value}
                            onChange={handleAnswer}
                            onNext={() => handleNext()}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 flex justify-between items-center max-w-2xl mx-auto right-0 pointer-events-none">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`pointer-events-auto p-2 rounded-full hover:bg-slate-700 transition-colors ${currentStep === 0 ? 'opacity-0' : 'opacity-100 text-slate-500'}`}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="text-xs text-slate-600 pointer-events-auto">
                    Powered by <strong>Group D</strong>
                </div>
            </div>
        </div>
    );
}
