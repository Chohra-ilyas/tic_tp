import React, {useState} from "react";
import "../App.css";

const SwotAnalysis = () => {
    const [inputText, setInputText] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleBackendGenerate = async () => {
        if (!inputText.trim()) return;
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/analysis/swot", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text: inputText}),
            });
            const data = await response.json();
            setAnalysis(data);
        } catch (error) {
            console.error("Error fetching analysis:", error);
        } finally {
            setLoading(false);
        }
    };

    const getHighlightedText = () => {
        if (!analysis) return inputText;

        let highlighted = inputText;
        const categories = [
            {key: "strengths", color: "hl-strength"},
            {key: "weaknesses", color: "hl-weakness"},
            {key: "opportunities", color: "hl-opportunity"},
            {key: "threats", color: "hl-threat"},
        ];

        categories.forEach(({key, color}) => {
            analysis[key]?.forEach((item) => {
                const matches = item.evidence.match(/"([^"]+)"/);
                if (matches && matches[1]) {
                    const keywords = matches[1].split(", ");
                    keywords.forEach((word) => {
                        const cleanWord = word.trim();
                        if (cleanWord.length > 0) {
                            const regex = new RegExp(`\\b(${cleanWord})\\b`, "gi");
                            highlighted = highlighted.replace(
                                regex,
                                `<span class="${color}">$1</span>`,
                            );
                        }
                    });
                }
            });
        });

        return <div dangerouslySetInnerHTML={{__html: highlighted}} />;
    };

    return (
        <div className="swot-container">
            <div className="input-section">
                <textarea
                    placeholder="Enter project description..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <div className="button-group">
                    <button
                        className="btn-primary"
                        onClick={handleBackendGenerate}
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Generate Local SWOT"}
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => alert("AI Feature coming soon!")}
                    >
                        Generate AI SWOT (Future)
                    </button>
                </div>
            </div>

            {analysis && (
                <div className="results-section">
                    <div className="highlight-preview">
                        <h3>Text Evidence Mapping</h3>
                        <div className="preview-box">{getHighlightedText()}</div>
                    </div>

                    <div className="swot-grid">
                        <Quadrant title="Strengths" items={analysis.strengths} type="strength" />
                        <Quadrant title="Weaknesses" items={analysis.weaknesses} type="weakness" />
                        <Quadrant
                            title="Opportunities"
                            items={analysis.opportunities}
                            type="opportunity"
                        />
                        <Quadrant title="Threats" items={analysis.threats} type="threat" />
                    </div>
                </div>
            )}
        </div>
    );
};

const Quadrant = ({title, items, type}) => (
    <div className={`swot-card ${type}`}>
        <h4>{title}</h4>
        <ul>
            {items.map((item, i) => (
                <li key={i}>
                    <strong className="point-text">{item.point}</strong>
                    <p className="evidence-text">
                        <span className="quote-symbol">“</span>
                        {item.evidence.replace(/"/g, "")}
                    </p>
                </li>
            ))}
        </ul>
    </div>
);

export default SwotAnalysis;
