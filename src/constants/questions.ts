import { Question } from "@/types";

export const SURVEY_QUESTIONS: Question[] = [
    // 1. 핵심 지표 (NPS) - Changed to 1-5 Scale
    {
        id: 1,
        type: "nps",
        category: "1. 핵심 지표 (NPS)",
        question: "원장님께서는 동료 원장님들에게\n마케팅 파트너로 '그룹디'를\n추천하실 의향이 있으십니까?",
        description: "1점 (절대 아님) ~ 5점 (강력 추천)",
        maxRating: 5,
    },

    // 2. 파트너십 & 커뮤니케이션
    {
        id: 2,
        type: "rating",
        category: "2. 파트너십 & 커뮤니케이션",
        subCategory: "담당자 역량",
        question: "담당 마케터가 우리 치과의\n'진료 철학'과 '주력 진료 과목'에 대해\n정확히 이해하고 있습니까?",
        maxRating: 5,
    },
    {
        id: 3,
        type: "select",
        category: "2. 파트너십 & 커뮤니케이션",
        question: "담당 마케터는 요청을 기다리는 편인가요,\n아니면 먼저 마케팅 제안을 하는 편인가요?",
        options: [
            "① 항상 먼저 제안한다 (매우 능동적)",
            "② 가끔 먼저 제안한다",
            "③ 시키는 일만 잘 처리한다 (수동적)",
            "④ 요청해도 처리가 늦거나 누락된다"
        ],
    },
    {
        id: 4,
        type: "rating",
        category: "2. 파트너십 & 커뮤니케이션",
        question: "급한 수정 사항이나 이슈 발생 시,\n대처 속도와 결과에 만족하십니까?",
        maxRating: 5,
    },

    // 3. 서비스별 품질 진단
    // (블로그)
    {
        id: 5,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "발행되는 포스팅이 환자들에게\n'신뢰감'을 줄 만큼 충분히 전문적입니까?",
        maxRating: 5,
    },
    {
        id: 6,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "포스팅의 톤앤매너(말투, 분위기)가\n원장님이 생각하는 병원의 이미지와 일치합니까?",
        maxRating: 5,
    },
    // (디자인 & 영상)
    {
        id: 7,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "디자인 & 영상",
        question: "제작된 원내 디자인물(X배너, 리플릿 등)이\n실제 환자 상담/응대에 실질적인 도움이 됩니까?",
        maxRating: 5,
    },
    {
        id: 8,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "디자인 & 영상",
        question: "영상 콘텐츠가 최신 트렌드를 반영하고 있으며,\n환자들의 시선을 끌고 있습니까?",
        maxRating: 5,
    },
    // (광고 & 채널)
    {
        id: 9,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "광고 & 채널 관리",
        question: "플레이스/홈페이지 등의 병원 정보가\n최신 상태로 깔끔하게 관리되고 있습니까?",
        maxRating: 5,
    },
    {
        id: 10,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "광고 & 채널 관리",
        question: "현재 집행 중인 유료 광고(파워링크 등)의\n예산 대비 효율(신환 유입)이 적절하다고 보십니까?",
        maxRating: 5,
    },

    // 4. 성과 보고 & 전략
    {
        id: 11,
        type: "select",
        category: "4. 성과 보고 & 전략",
        question: "월간 보고서가 단순한 수치 나열을 넘어,\n'다음 달 운영 전략'을 명확히 제시하고 있습니까?",
        options: [
            "① 매우 그렇다 (명확한 전략 제시)",
            "② 보통이다",
            "③ 아니다 (단순 수치 보고에 그침)",
            "④ 보고서 내용을 이해하기 어렵다"
        ]
    },

    // 5. 위기 진단
    {
        id: 12,
        type: "select",
        category: "5. 위기 진단 (핵심)",
        question: "(필수) 만약 부득이하게 서비스 중\n하나를 줄여야 한다면, 무엇을 중단하시겠습니까?",
        options: [
            "① 블로그 포스팅",
            "② 원내 디자인 제작",
            "③ 영상 콘텐츠 제작",
            "④ 네이버 광고 관리",
            "⑤ 채널(플레이스) 관리"
        ]
    },
    {
        id: 13,
        type: "select",
        category: "5. 위기 진단 (핵심)",
        question: "현재 그룹디에게 가장 아쉬운 점\n'단 한 가지'만 꼽는다면 무엇입니까?",
        options: [
            "① 신환 유입(매출) 효과 미미",
            "② 콘텐츠(블로그/디자인) 퀄리티 부족",
            "③ 담당자의 소통 부재 및 피드백 지연",
            "④ 매달 반복되는 기계적인 업무 처리",
            "⑤ 병원 현장에 대한 이해도 부족"
        ]
    },
    {
        id: 14,
        type: "text",
        category: "5. 위기 진단 (핵심)",
        question: "마지막으로 그룹디가\n이것만은 꼭 고쳐줬으면 좋겠다 하는 점을\n가감 없이 적어주세요.",
    },
];
