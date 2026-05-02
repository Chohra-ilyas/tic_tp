import {SwotMatrix, SwotEntry} from "../types/analysis.js";

const PILLARS = [
    {
        id: "PERFORMANCE",
        keywords: [
            "fast",
            "speed",
            "efficient",
            "performance",
            "quick",
            "latency",
            "optimized",
            "high-load",
        ],
        strength: "Demonstrates high computational efficiency and low-latency response times.",
        weakness: "Potential risk of execution bottlenecks or lack of benchmarks.",
        isInternal: true,
    },
    {
        id: "SECURITY",
        keywords: [
            "secure",
            "auth",
            "protected",
            "encryption",
            "expert",
            "safe",
            "privacy",
            "audit",
        ],
        strength: "Integrated security framework with advanced encryption.",
        weakness: "Insufficient evidence of a hardened security perimeter.",
        isInternal: true,
    },
    {
        id: "SCALABILITY",
        keywords: ["scale", "scalable", "growth", "volume", "expandable", "stable"],
        strength: "Architectural design supports horizontal scaling.",
        weakness: "Non-elastic infrastructure detected.",
        isInternal: true,
    },
    {
        id: "AUTOMATION",
        keywords: [
            "automated",
            "workflow",
            "ci/cd",
            "cron",
            "automatic",
            "streamlined",
            "deployments",
            "manual",
        ],
        strength: "Highly automated operational workflows.",
        weakness: "Heavy reliance on manual intervention.",
        isInternal: true,
    },
    {
        id: "MARKET",
        keywords: [
            "demand",
            "users",
            "market",
            "competitors",
            "clients",
            "audience",
            "industry",
            "potential",
        ],
        strength: "Strategic alignment with market demand.",
        weakness: "Market misalignment or lack of audience fit.",
        isInternal: false,
    },
    {
        id: "INNOVATION",
        keywords: ["modern", "future", "cutting-edge", "latest", "innovative", "ai", "paradigms"],
        strength: "Adoption of innovative paradigms.",
        weakness: "Technological stagnation risk.",
        isInternal: false,
    },
    {
        id: "FINANCIAL",
        keywords: ["budget", "revenue", "costs", "profit", "monetization", "funding", "financial"],
        strength: "Clear financial viability and revenue pathways.",
        weakness: "Economic instability or budget sustainability issues.",
        isInternal: false,
    },
    {
        id: "USABILITY",
        keywords: [
            "ux",
            "ui",
            "simple",
            "easy",
            "user-friendly",
            "accessible",
            "interface",
            "complex",
        ],
        strength: "Intuitive user experience design.",
        weakness: "High technical complexity and barrier to entry.",
        isInternal: false,
    },
];

const sanitizeInput = (str: string) => str.replace(/<[^>]*>?/gm, "");

export const computeSwot = (text: string): SwotMatrix => {
    const rawContent = sanitizeInput(text);
    const content = rawContent.toLowerCase();
    const swot: SwotMatrix = {strengths: [], weaknesses: [], opportunities: [], threats: []};

    const negations = [
        "lack",
        "no ",
        "not ",
        "missing",
        "without",
        "hurdle",
        "issue",
        "haven't",
        "complex",
        "manual",
        "tight",
        "worried",
        "but",
    ];

    PILLARS.forEach((pillar) => {
        const foundKeywords = pillar.keywords.filter((word) => content.includes(word));

        if (foundKeywords.length === 0) {
            const entry: SwotEntry = {
                point: pillar.weakness,
                evidence: `Strategic Gap: ${pillar.id.toLowerCase()} not addressed.`,
            };
            pillar.isInternal ? swot.weaknesses.push(entry) : swot.threats.push(entry);
            return;
        }

        const isNegated = foundKeywords.some((key) => {
            const keyIndex = content.indexOf(key);
            return negations.some((neg) => {
                const negIndex = content.indexOf(neg);
                if (negIndex === -1) return false;
                return keyIndex > negIndex && keyIndex < negIndex + 45;
            });
        });

        const keywordsStr = foundKeywords.join(", ");

        const entry: SwotEntry = {
            point: isNegated ? pillar.weakness : pillar.strength,
            evidence: isNegated
                ? `Deficit detected for: "${keywordsStr}".`
                : `Positive indicators for: "${keywordsStr}".`,
        };

        if (isNegated) {
            pillar.isInternal ? swot.weaknesses.push(entry) : swot.threats.push(entry);
        } else {
            pillar.isInternal ? swot.strengths.push(entry) : swot.opportunities.push(entry);
        }
    });

    return swot;
};
