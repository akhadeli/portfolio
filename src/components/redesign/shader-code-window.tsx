"use client";

import type { CSSProperties, ReactNode } from "react";
import { simFragment } from "@/components/front/3d/shaders/sim-frag";
import styles from "./code-storage-redesign.module.css";

const WINDOW_LINES = 10;
const LINE_HEIGHT = 19;
const LINE_DURATION_MS = 1350;

const shaderLines = simFragment
    .trim()
    .split("\n")
    .map((line) => (line.startsWith("    ") ? line.slice(4) : line));

const mainStart = shaderLines.findIndex(
    (line) => line.trim() === "void main() {",
);

// Cycle through the executable simulation path rather than the shader's long
// noise helpers. Every displayed line still comes directly from sim-frag.ts.
const simulationLines = shaderLines
    .slice(mainStart)
    .filter((line) => {
        const content = line.trim();
        return content.length > 0 && !content.startsWith("//");
    });

const keywordPattern =
    /(\b(?:bool|else|float|for|if|int|return|uniform|varying|void)\b)/g;
const typePattern = /(\b(?:mat[234]|sampler2D|vec[234])\b)/g;
const functionPattern =
    /(\b(?:atan|cos|curl|length|mix|normalize|sin|smoothstep|texture2D)\b)/g;

function highlightLine(line: string): ReactNode[] {
    return line
        .split(keywordPattern)
        .flatMap((keywordPart, keywordIndex) =>
            keywordPart.split(typePattern).flatMap((typePart, typeIndex) =>
                typePart.split(functionPattern).map((part, functionIndex) => {
                    const key = `${keywordIndex}-${typeIndex}-${functionIndex}`;

                    if (keywordPattern.test(part)) {
                        keywordPattern.lastIndex = 0;
                        return (
                            <span className={styles.keyword} key={key}>
                                {part}
                            </span>
                        );
                    }
                    keywordPattern.lastIndex = 0;

                    if (typePattern.test(part)) {
                        typePattern.lastIndex = 0;
                        return (
                            <span className={styles.type} key={key}>
                                {part}
                            </span>
                        );
                    }
                    typePattern.lastIndex = 0;

                    if (functionPattern.test(part)) {
                        functionPattern.lastIndex = 0;
                        return (
                            <span className={styles.property} key={key}>
                                {part}
                            </span>
                        );
                    }
                    functionPattern.lastIndex = 0;

                    return part;
                }),
            ),
        );
}

export default function ShaderCodeWindow() {
    const loopedLines = [
        ...simulationLines,
        ...simulationLines.slice(0, WINDOW_LINES),
    ];
    const trackStyle = {
        "--shader-cycle-distance": `${-simulationLines.length * LINE_HEIGHT}px`,
        animationDuration: `${simulationLines.length * LINE_DURATION_MS}ms`,
        animationTimingFunction: `steps(${simulationLines.length}, end)`,
    } as CSSProperties;

    return (
        <div
            className={`${styles.codeBlock} ${styles.shaderWindow}`}
            aria-label="Particle simulation shader"
        >
            <code
                className={styles.shaderTrack}
                style={trackStyle}
                aria-hidden="true"
            >
                {loopedLines.map((line, index) => (
                    <span className={styles.shaderLine} key={`${index}-${line}`}>
                        {highlightLine(line)}
                    </span>
                ))}
            </code>
            <pre className="sr-only">
                <code>{simulationLines.join("\n")}</code>
            </pre>
        </div>
    );
}
