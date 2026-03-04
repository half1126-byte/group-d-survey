"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Question } from "@/types";
import { Star, Check } from "lucide-react";
import { useState } from "react";

interface QuestionCardProps {
    question: Question;
    value: any;
    onChange: (value: any, otherValue?: string) => void;
    onNext: () => void;
}

export default function QuestionCard({ question, value, onChange, onNext }: QuestionCardProps) {
    const [otherText, setOtherText] = useState("");

    // Handling NPS / Numeric scale (1-5 dynamic)
    const renderNPS = () => {
        const max = question.maxRating || 5;
        const range = Array.from({ length: max }, (_, i) => i + 1);

        return (
            <div className="flex flex-col items-center py-6">
                <div className="flex justify-center gap-2 sm:gap-4 w-full">
                    {range.map((num) => (
                        <button
                            key={num}
                            onClick={() => onChange(num)}
                            className={cn(
                                "w-14 h-14 sm:w-20 sm:h-20 rounded-2xl text-xl sm:text-2xl font-bold transition-all shadow-sm border flex items-center justify-center",
                                value === num
                                    ? "bg-teal-500 text-deep-navy border-teal-500 scale-110 shadow-lg shadow-teal-500/30 ring-2 ring-teal-400"
                                    : "bg-slate-800 text-gray-400 border-slate-700 hover:border-slate-500 hover:bg-slate-700 hover:text-white active:scale-95"
                            )}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between w-full max-w-[400px] mt-4 px-2 text-xs sm:text-sm text-slate-400 font-medium">
                    <span>{question.maxRating === 10 ? '0 (절대 아님)' : '1 (절대 아님)'}</span>
                    <span>{question.maxRating || 5} (강력 추천)</span>
                </div>
            </div>
        );
    };

    // Handling Star Rating (1-5)
    const renderRating = () => {
        const showReason = question.conditionalRatingThreshold && typeof value === 'number' && value <= question.conditionalRatingThreshold;

        return (
            <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => onChange(star)}
                            className="group focus:outline-none transition-transform active:scale-95"
                        >
                            <Star
                                className={cn(
                                    "w-12 h-12 sm:w-16 sm:h-16 transition-colors duration-200",
                                    star <= (value || 0)
                                        ? "fill-teal-400 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                                        : "text-slate-700 group-hover:text-slate-500"
                                )}
                            />
                        </button>
                    ))}
                </div>
                <div className="flex justify-between w-full max-w-[300px] text-sm text-slate-400 px-2">
                    <span>매우 불만족</span>
                    <span>매우 만족</span>
                </div>

                {showReason && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="w-full mt-2"
                    >
                        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                추가 의견
                            </label>
                            <textarea
                                className="w-full p-4 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none bg-slate-900 text-white placeholder-slate-500"
                                rows={3}
                                placeholder={question.conditionalPlaceholder || "낮은 점수를 주신 이유를 알려주세요."}
                                value={otherText}
                                onChange={(e) => {
                                    setOtherText(e.target.value);
                                    onChange(value, e.target.value);
                                }}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        );
    };

    // Handling Select
    const renderSelect = () => {
        const hasTrigger = question.conditionalTriggerOptions?.includes(value as string);

        return (
            <div className="flex flex-col gap-3">
                {question.options?.map((option) => (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={cn(
                            "p-5 rounded-xl text-left transition-all shadow-sm border flex items-center justify-between group",
                            value === option
                                ? "bg-teal-500/10 border-teal-500 text-teal-400 ring-1 ring-teal-500"
                                : "bg-slate-800 border-slate-700 text-gray-300 hover:border-slate-500 hover:bg-slate-700 hover:text-white"
                        )}
                    >
                        <span className="text-lg leading-relaxed">{option}</span>
                        {value === option && <Check className="w-6 h-6 text-teal-400 shrink-0 ml-4" />}
                    </button>
                ))}

                {hasTrigger && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2"
                    >
                        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                추가 의견
                            </label>
                            <textarea
                                className="w-full p-4 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none bg-slate-900 text-white placeholder-slate-500"
                                rows={3}
                                placeholder={question.conditionalPlaceholder || "이유를 적어주세요."}
                                value={otherText}
                                onChange={(e) => {
                                    setOtherText(e.target.value);
                                    onChange(value, e.target.value);
                                }}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        );
    };

    // Handling MultiSelect (Checkbox)
    const renderMultiSelect = () => {
        const currentValues = (Array.isArray(value) ? value : []) as string[];
        const maxSelections = question.maxSelections || 10;

        const toggleOption = (option: string) => {
            let newValues;
            if (currentValues.includes(option)) {
                newValues = currentValues.filter(v => v !== option);
            } else {
                if (currentValues.length >= maxSelections) {
                    // Force replace or just ignore? instructions say "2 selections possible", usually means limit.
                    // Let's prevent adding more if limit reached.
                    return;
                }
                newValues = [...currentValues, option];
            }
            onChange(newValues, otherText);
        };

        const hasTrigger = question.conditionalTriggerOptions?.some(opt => currentValues.includes(opt));

        return (
            <div className="flex flex-col gap-3">
                <div className="text-xs text-slate-500 mb-1 flex justify-between items-center">
                    <span>최대 {maxSelections}개 선택 가능</span>
                    <span>{currentValues.length} / {maxSelections}</span>
                </div>
                {question.options?.map((option) => (
                    <button
                        key={option}
                        onClick={() => toggleOption(option)}
                        className={cn(
                            "p-5 rounded-xl text-left transition-all shadow-sm border flex items-center justify-between group",
                            currentValues.includes(option)
                                ? "bg-teal-500/20 border-teal-500 text-teal-400 font-semibold ring-1 ring-teal-500/50"
                                : "bg-slate-800 border-slate-700 text-gray-300 hover:border-slate-500 hover:bg-slate-700 hover:text-white"
                        )}
                    >
                        <span className="text-base sm:text-lg leading-relaxed">{option}</span>
                        <div className={cn(
                            "w-6 h-6 rounded-md border flex items-center justify-center transition-colors",
                            currentValues.includes(option) ? "bg-teal-500 border-teal-500" : "bg-transparent border-slate-600 group-hover:border-slate-400"
                        )}>
                            {currentValues.includes(option) && <Check className="w-4 h-4 text-deep-navy stroke-[3]" />}
                        </div>
                    </button>
                ))}

                {/* Conditional Textarea Logic */}
                {hasTrigger && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4"
                    >
                        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                추가 의견
                            </label>
                            <textarea
                                className="w-full p-4 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none bg-slate-900 text-white placeholder-slate-500"
                                rows={3}
                                placeholder={question.conditionalPlaceholder || "내용을 입력해주세요..."}
                                value={otherText}
                                onChange={(e) => {
                                    setOtherText(e.target.value);
                                    onChange(currentValues, e.target.value);
                                }}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        );
    };

    // Handling Text
    const renderText = () => {
        return (
            <div className="mt-4">
                <textarea
                    className="w-full p-4 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none text-lg shadow-sm bg-slate-800 text-white placeholder-slate-500 leading-relaxed"
                    rows={6}
                    placeholder="자유롭게 작성해주세요..."
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
            </div>
        );
    };

    return (
        <motion.div
            className="w-full max-w-xl mx-auto p-1 rounded-2xl"
        >
            <div className="bg-transparent">
                {/* Section Title */}
                {question.category && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold tracking-wider uppercase border border-teal-500/20">
                            {question.category}
                        </span>
                        {question.subCategory && (
                            <span className="ml-2 text-slate-400 text-sm font-medium">
                                - {question.subCategory}
                            </span>
                        )}
                    </motion.div>
                )}

                {/* Question Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-normal whitespace-pre-wrap word-break-keep-all">
                    <span className="text-teal-500 inline-block mr-2">Q{question.id}.</span>
                    {question.question}
                </h2>

                {/* Description */}
                {question.description && !question.type.includes('nps') && (
                    <p className="text-slate-400 text-sm mb-6 bg-slate-800/50 p-3 rounded-lg inline-block">
                        💡 {question.description}
                    </p>
                )}

                {/* Content */}
                <div className="mt-8">
                    {question.type === 'nps' && renderNPS()}
                    {question.type === 'rating' && renderRating()}
                    {question.type === 'select' && renderSelect()}
                    {question.type === 'multiselect' && renderMultiSelect()}
                    {question.type === 'text' && renderText()}
                </div>

                {/* Navigation Help / Button for Manual Advance types */}
                {(
                    ['multiselect', 'text'].includes(question.type) ||
                    (question.type === 'rating' && question.conditionalRatingThreshold && typeof value === 'number' && value <= question.conditionalRatingThreshold) ||
                    (question.type === 'select' && question.conditionalTriggerOptions?.includes(value as string))
                ) && (
                        <div className="mt-10 flex justify-end">
                            <button
                                onClick={onNext}
                                className="bg-teal-500 text-deep-navy px-10 py-4 rounded-xl font-bold hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20 active:scale-95 text-lg"
                            >
                                다음으로
                            </button>
                        </div>
                    )}
            </div>
        </motion.div>
    );
}
