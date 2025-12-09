"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserInfo } from "@/types";
import { ArrowRight, Building, User, Badge } from "lucide-react"; // Using Icon placeholders closest to meaning

interface UserIdentificationProps {
    onComplete: (info: UserInfo) => void;
}

export default function UserIdentification({ onComplete }: UserIdentificationProps) {
    const [info, setInfo] = useState<UserInfo>({
        hospitalName: "",
        role: "대표원장", // Default
        name: "",
    });

    const roles = ["대표원장", "원장", "실장", "팀장", "기타"];

    const isValid = info.hospitalName.trim() !== "" && info.name.trim() !== "";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            onComplete(info);
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-[100dvh] p-6 max-w-md mx-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <div className="w-full bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    기본 정보 입력
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hospital Name */}
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400 flex items-center gap-2">
                            <Building className="w-4 h-4" /> 병원명
                        </label>
                        <input
                            type="text"
                            value={info.hospitalName}
                            onChange={(e) => setInfo({ ...info, hospitalName: e.target.value })}
                            placeholder="예) 그룹디 치과"
                            className="w-full p-4 bg-slate-900 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder-slate-600 text-lg"
                            autoFocus
                        />
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400 flex items-center gap-2">
                            <Badge className="w-4 h-4" /> 직책
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {roles.map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setInfo({ ...info, role: r })}
                                    className={`p-3 rounded-lg text-sm font-medium transition-all ${info.role === r
                                        ? "bg-teal-500 text-deep-navy shadow-lg shadow-teal-500/20"
                                        : "bg-slate-900 text-slate-400 border border-slate-600 hover:bg-slate-700"
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400 flex items-center gap-2">
                            <User className="w-4 h-4" /> 성함
                        </label>
                        <input
                            type="text"
                            value={info.name}
                            onChange={(e) => setInfo({ ...info, name: e.target.value })}
                            placeholder="예) 홍길동"
                            className="w-full p-4 bg-slate-900 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder-slate-600 text-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all mt-8 ${isValid
                            ? "bg-teal-500 text-deep-navy shadow-lg hover:bg-teal-400 hover:scale-[1.02]"
                            : "bg-slate-700 text-slate-500 cursor-not-allowed"
                            }`}
                    >
                        확인 후 시작하기
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </motion.div>
    );
}
