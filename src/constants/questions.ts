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
        conditionalRatingThreshold: 2,
        conditionalPlaceholder: "담당 마케터가 어떤 부분을 더 이해했으면 하시나요?"
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
        conditionalTriggerOptions: ["③ 시키는 일만 잘 처리한다 (수동적)", "④ 요청해도 처리가 늦거나 누락된다"],
        conditionalPlaceholder: "어떤 제안이나 개선을 기대하시나요?"
    },
    {
        id: 4,
        type: "multiselect",
        category: "2. 파트너십 & 커뮤니케이션",
        question: "디자인/포스팅/마케팅 진행 시 급한 수정사항이나 이슈 발생 시 대처 속도와 결과에 만족하십니까?",
        options: [
            "1. 전혀 만족하지 않는다.",
            "2. 디자인은 만족하나, 포스팅/마케팅 불만족",
            "3. 포스팅은 만족하나, 디자인/마케팅 불만족",
            "4. 마케팅은 만족하나, 디자인/포스팅 불만족",
            "5. 전반적으로 모두 만족한다."
        ],
        maxSelections: 2,
        conditionalTriggerOptions: ["1. 전혀 만족하지 않는다.", "2. 디자인은 만족하나, 포스팅/마케팅 불만족", "3. 포스팅은 만족하나, 디자인/마케팅 불만족", "4. 마케팅은 만족하나, 디자인/포스팅 불만족"],
        conditionalPlaceholder: "어떤 부분이 아쉬우신가요? (이유 작성)"
    },
    {
        id: 5,
        type: "multiselect",
        category: "2. 파트너십 & 커뮤니케이션",
        question: "각 담당자의 상담 응대에 만족하십니까?",
        options: [
            "1. 전반적으로 늦고, 불만족한다.",
            "2. 상담은 빠르지만, 도움이 되지 않는다.",
            "3. 도움은 되지만 개선되면 좋겠다.",
            "4. 전반적으로 도움이 된다.",
            "5. 만족도가 매우 높고 응대가 잘 된다."
        ],
        maxSelections: 2,
        conditionalTriggerOptions: ["1. 전반적으로 늦고, 불만족한다.", "2. 상담은 빠르지만, 도움이 되지 않는다.", "3. 도움은 되지만 개선되면 좋겠다."],
        conditionalPlaceholder: "1,2,3번 시 이유 작성: (상담 응대에 불만족이 있으시다면, 어떤 부분이 아쉬우신가요?)"
    },

    // 3. 서비스별 품질 진단
    // (블로그 - 분기 로직 적용)
    {
        id: 6,
        type: "select",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "발행되는 블로그 콘텐츠가 병원만의 전문성과 신뢰감을 환자들에게 효과적으로 전달하고 있나요?",
        options: ["① 매우 그렇다", "② 그렇다", "③ 아니다", "④ 매우 아니다"]
    },
    {
        id: 7,
        type: "multiselect",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "Q5-1. 특히 전문적이고 신뢰감이 간다고 느끼신 포스팅(글 또는 카테고리)은 무엇인가요?",
        options: ["임상 포스팅", "전문가형(정보성) 포스팅", "AEO 칼럼", "AEO 의학정보 포스팅", "기타"],
        conditionalTriggerOptions: ["기타"],
        conditionalPlaceholder: "직접 입력해 주세요.",
        logic: {
            showIf: (answers) => answers[6]?.value === "① 매우 그렇다" || answers[6]?.value === "② 그렇다"
        }
    },
    {
        id: 8,
        type: "text",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "Q5-2. 해당 포스팅이 전문적이고 신뢰감을 준다고 생각하신 가장 큰 이유는 무엇인가요?",
        logic: {
            showIf: (answers) => answers[6]?.value === "① 매우 그렇다" || answers[6]?.value === "② 그렇다"
        }
    },
    {
        id: 9,
        type: "multiselect",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "Q5-3. 전문성이나 신뢰감이 다소 부족하다고 느끼신 특정 포스팅(글 또는 카테고리)이 있다면 선택해 주세요.",
        options: ["임상 포스팅", "전문가형(정보성) 포스팅", "AEO 칼럼", "AEO 의학정보 포스팅", "기타"],
        conditionalTriggerOptions: ["기타"],
        conditionalPlaceholder: "직접 입력해 주세요.",
        logic: {
            showIf: (answers) => answers[6]?.value === "③ 아니다" || answers[6]?.value === "④ 매우 아니다"
        }
    },
    {
        id: 10,
        type: "text",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "Q5-4. 위와 같이 평가하신 이유는 무엇인가요? (개선이 필요한 부분이나 아쉬웠던 점)",
        logic: {
            showIf: (answers) => answers[6]?.value === "③ 아니다" || answers[6]?.value === "④ 매우 아니다"
        }
    },
    {
        id: 11,
        type: "select",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "Q6. 포스팅의 톤앤매너(말투, 분위기)가 원장님이 생각하는 병원의 이미지와 일치합니까?",
        options: ["① 매우 그렇다", "② 그렇다", "③ 아니다", "④ 매우 아니다"]
    },
    {
        id: 12,
        type: "text",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "Q6-1. 해당 포스팅의 어떤 점이 원장님이 지향하시는 병원 이미지와 잘 부합한다고 생각하시나요?",
        logic: {
            showIf: (answers) => answers[11]?.value === "① 매우 그렇다" || answers[11]?.value === "② 그렇다"
        }
    },
    {
        id: 13,
        type: "text",
        category: "3. 서비스별 품질 진단",
        subCategory: "블로그 - 임상 포스팅",
        question: "Q6-2. 위와 같이 평가하신 이유는 무엇인가요? (반영되었으면 하는 톤앤매너 등)",
        logic: {
            showIf: (answers) => answers[11]?.value === "③ 아니다" || answers[11]?.value === "④ 매우 아니다"
        }
    },

    {
        id: 14,
        type: "multiselect",
        category: "디자인 및 운영 만족도",
        question: "전체적인 시안물이 일관되고, 브랜드 아이덴티티를 잘 표현하고 있습니까?",
        options: [
            "1. 전혀 표현이 되지 않는다.",
            "2. 조금 만족한다.",
            "3. 도움은 되지만, 더 발전이 필요하다.",
            "4. 전반적으로 평균 이상이다.",
            "5. 만족도가 매우 높고 잘 표현된다."
        ],
        maxSelections: 2,
        conditionalTriggerOptions: ["1. 전혀 표현이 되지 않는다.", "2. 조금 만족한다.", "3. 도움은 되지만, 더 발전이 필요하다."],
        conditionalPlaceholder: "어떤 부분이 아쉬우신가요? (이유 작성)"
    },
    // (디자인 & 영상)
    {
        id: 15,
        type: "multiselect",
        category: "3. 서비스별 품질 진단",
        subCategory: "디자인 & 영상",
        question: "제작된 오프라인 원내 배치 디자인물(인쇄 홍보물, 상담자료, X배너 등) 실제 원내에서 잘 활용되고 있습니까?",
        options: [
            "1. 원내에서 제작/요청하지 않는다.",
            "2. 담당자가 제안하지 않는다.",
            "3. 제작하지만 도움이 되지 않는다.",
            "4. 조금 도움이 된다.",
            "5. 자주 제작하고, 도움이 많이 된다."
        ],
        maxSelections: 2,
        conditionalTriggerOptions: ["1. 원내에서 제작/요청하지 않는다.", "2. 담당자가 제안하지 않는다.", "3. 제작하지만 도움이 되지 않는다."],
        conditionalPlaceholder: "어떤 부분이 아쉬우신가요? (이유 작성)"
    },
    {
        id: 16,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "디자인 & 영상",
        question: "영상 콘텐츠가 최신 트렌드를 반영하고 있으며,\n환자들의 시선을 끌고 있습니까?",
        maxRating: 5,
        conditionalRatingThreshold: 2,
        conditionalPlaceholder: "영상 콘텐츠에서 아쉬운 점이나 개선 의견을 알려주세요."
    },
    // (광고관리)
    {
        id: 17,
        type: "multiselect",
        category: "3. 서비스별 품질 진단",
        subCategory: "광고관리",
        question: "온라인 세팅 마케팅인 플레이스/홈페이지 등 매체별 플랫폼 병원정보가 최신 상태로 업데이트 되고 있습니까?",
        options: [
            "1. 전혀 관리가 되지 않는다.",
            "2. 업데이트가 잘 되지 않지만 보고가 잘 들어온다.",
            "3. 업데이트는 되나, 주기적 확인이 부족하다.",
            "4. 관리가 잘 되는 편이다.",
            "5. 온라인 세팅에 매우 만족하고, 관리도 잘된다."
        ],
        maxSelections: 2,
        conditionalTriggerOptions: ["1. 전혀 관리가 되지 않는다.", "2. 업데이트가 잘 되지 않지만 보고가 잘 들어온다.", "3. 업데이트는 되나, 주기적 확인이 부족하다."],
        conditionalPlaceholder: "1,2,3번 시 이유 작성:"
    },
    {
        id: 18,
        type: "multiselect",
        category: "3. 서비스별 품질 진단",
        subCategory: "광고관리",
        question: "제작된 온라인 디자인, 시안물이 (플레이스 세팅 시안, 홈페이지 등) 실제 도움이 되고, 디자인 만족도가 높습니까?",
        options: [
            "1. 디자인도, 관리도 전혀 도움이 되지 않는다.",
            "2. 디자인이 만족되지 않는다.",
            "3. 디자인은 만족하나 실제 관리가 부족하다.",
            "4. 디자인도 만족하고, 관리도 잘 되는 편이다.",
            "5. 만족도가 매우 높고 잘 사용하고 있다."
        ],
        maxSelections: 2,
        conditionalTriggerOptions: ["1. 디자인도, 관리도 전혀 도움이 되지 않는다.", "2. 디자인이 만족되지 않는다.", "3. 디자인은 만족하나 실제 관리가 부족하다."],
        conditionalPlaceholder: "1,2,3번 시 이유 작성:"
    },
    {
        id: 19,
        type: "select",
        category: "3. 서비스별 품질 진단",
        subCategory: "광고관리",
        question: "플랫폼별 최적화 세팅: 병원의 강점이 키워드와 정보에 충분히 반영되어 있습니까?",
        options: ["예", "아니오"],
        conditionalTriggerOptions: ["아니오"],
        conditionalPlaceholder: "어떤 키워드나 정보가 부족하다고 느끼시나요?"
    },
    {
        id: 20,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "광고관리",
        question: "해당 플랫폼들의 세팅 및 관리 상태에 얼마나 만족하십니까?",
        maxRating: 5,
        conditionalRatingThreshold: 2,
        conditionalPlaceholder: "플랫폼 관리에서 아쉬운 점을 알려주세요."
    },
    {
        id: 21,
        type: "rating",
        category: "3. 서비스별 품질 진단",
        subCategory: "광고관리",
        question: "현재 진행 중인 유료 광고(플레이스 광고, GFA 등)가 예산 대비 효율(충전 횟수 등)이 적절하다고 보십니까?",
        maxRating: 5,
        conditionalRatingThreshold: 2,
        conditionalPlaceholder: "광고 효율에 대한 구체적인 의견을 알려주세요."
    },

    // 4. 성과 보고 & 전략
    {
        id: 22,
        type: "select",
        category: "4. 성과 보고 & 전략",
        question: "월간 보고서가 단순한 수치 나열을 넘어,\n'다음 달 운영 전략'을 명확히 제시하고 있습니까?",
        options: [
            "① 매우 그렇다 (명확한 전략 제시)",
            "② 보통이다",
            "③ 아니다 (단순 수치 보고에 그침)",
            "④ 보고서 내용을 이해하기 어렵다"
        ],
        conditionalTriggerOptions: ["③ 아니다 (단순 수치 보고에 그침)", "④ 보고서 내용을 이해하기 어렵다"],
        conditionalPlaceholder: "보고서에서 아쉬운 점이나 기대하시는 내용을 알려주세요."
    },

    // 5. 위기 진단
    {
        id: 23,
        type: "select",
        category: "5. 위기 진단 (핵심)",
        question: "(필수) 만약 부득이하게 서비스 중\n하나를 줄여야 한다면, 무엇을 중단하시겠습니까?",
        options: [
            "① 블로그 포스팅",
            "② 원내 디자인 제작",
            "③ 영상 콘텐츠 제작",
            "④ 광고 관리",
            "⑤ 온라인 채널 관리(플레이스, 카카오 등)"
        ]
    },
    {
        id: 24,
        type: "select",
        category: "5. 위기 진단 (핵심)",
        question: "현재 그룹디에게 가장 아쉬운 점\n'단 한 가지'만 꼽는다면 무엇입니까?",
        options: [
            "① 신환 유입(매출) 효과 미미",
            "② 콘텐츠(블로그/디자인) 퀄리티 부족",
            "③ 담당자의 소통 부재 및 피드백 지연",
            "④ 매달 반복되는 기계적인 업무 처리",
            "⑤ 병원 현장에 대한 이해도 부족"
        ],
        conditionalTriggerOptions: ["① 신환 유입(매출) 효과 미미", "② 콘텐츠(블로그/디자인) 퀄리티 부족", "③ 담당자의 소통 부재 및 피드백 지연", "④ 매달 반복되는 기계적인 업무 처리", "⑤ 병원 현장에 대한 이해도 부족"],
        conditionalPlaceholder: "선택하신 항목에 대해 구체적으로 알려주시면 개선에 큰 도움이 됩니다."
    },
    {
        id: 25,
        type: "text",
        category: "5. 위기 진단 (핵심)",
        question: "마지막으로 그룹디가\n이것만은 꼭 고쳐줬으면 좋겠다 하는 점을\n가감 없이 적어주세요.",
    },
];
