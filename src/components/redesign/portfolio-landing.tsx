import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./portfolio-landing.module.css";
import ParticleCloud from "./particle-cloud";
import ProjectCarousel from "./project-carousel";
import ShaderCodeWindow from "./shader-code-window";

const experiences = [
    {
        period: "2026—NOW",
        role: "PRODUCT ENGINEER",
        company: "STARISE",
        location: "DOHA, QATAR",
        summary:
            "I ship customer-facing features across TanStack Start, Next.js, Django, and Azure, and help set technical direction along the way.",
        outcomes: [
            "Own features from the first product conversation to production",
            "Make the architecture calls across frontend and service boundaries",
        ],
    },
    {
        period: "2024—2025",
        role: "LEAD AI/UI ENGINEER",
        company: "TENN.AI",
        location: "REMOTE",
        summary:
            "Led product engineering for an AI workflow product. Most of the job was making a complex tool feel fast and behave predictably.",
        outcomes: [
            "Made the interface feel 4x faster to users",
            "Set technical direction across product cycles",
            "Presented the product at Web Summit Doha",
        ],
    },
    {
        period: "2024—NOW",
        role: "FOUNDING ENGINEER",
        company: "GRADEKICK",
        location: "EDMONTON, CANADA",
        summary:
            "Took an education product from nothing to production: the app itself, the AI orchestration behind it, and the cloud infrastructure under it.",
        outcomes: [
            "Designed the core application and model-orchestration architecture",
            "Set up Azure Kubernetes deployment and release paths",
        ],
    },
    {
        period: "2023",
        role: "SOFTWARE DEVELOPMENT INTERN",
        company: "DIBSY",
        location: "DOHA, QATAR",
        summary:
            "Worked on analytics and data processing for high-volume financial workflows.",
        outcomes: [
            "Cut a reporting workflow from 72 hours to under two minutes",
            "Sped up a 15,000-record daily pipeline by 12%",
        ],
    },
] as const;

function MarkdownList({ items }: { items: readonly string[] }) {
    return (
        <ul className={styles.markdownList}>
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

function MobileArtifact({
    src,
    alt,
    kind,
}: {
    src: string;
    alt: string;
    kind: "phone" | "report";
}) {
    return (
        <div className={styles.mobileArtifact} data-kind={kind}>
            <div className={styles.artifactTopline}>
                <span>ARTIFACT</span>
                <span>{kind === "phone" ? "PRODUCT" : "RESEARCH"}</span>
            </div>
            <div className={styles.mobileArtifactImage}>
                <Image src={src} alt={alt} fill sizes="calc(100vw - 40px)" />
            </div>
        </div>
    );
}

function MetricGrid({
    items,
}: {
    items: readonly { label: string; value: string }[];
}) {
    return (
        <dl className={styles.metricGrid} data-count={items.length}>
            {items.map((item) => (
                <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}

function RefractiveTypeFilter({ strength }: { strength: number }) {
    return (
        <svg className={styles.filterDefinitions} aria-hidden="true">
            <defs>
                <filter
                    id="liquid-type"
                    x="-12%"
                    y="-16%"
                    width="124%"
                    height="132%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.006 0.016"
                        numOctaves="2"
                        seed="8"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale={3.2 * strength}
                        xChannelSelector="R"
                        yChannelSelector="B"
                        result="liquid-source"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale={7 * strength}
                        xChannelSelector="G"
                        yChannelSelector="R"
                        result="cyan-shape"
                    />
                    <feOffset
                        in="cyan-shape"
                        dx={-2.5 * strength}
                        result="cyan-offset"
                    />
                    <feFlood
                        floodColor="#55d9ff"
                        floodOpacity={0.82 * strength}
                        result="cyan-color"
                    />
                    <feComposite
                        in="cyan-color"
                        in2="cyan-offset"
                        operator="in"
                        result="cyan-refraction"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale={7 * strength}
                        xChannelSelector="B"
                        yChannelSelector="G"
                        result="red-shape"
                    />
                    <feOffset
                        in="red-shape"
                        dx={2.5 * strength}
                        result="red-offset"
                    />
                    <feFlood
                        floodColor="#ff557d"
                        floodOpacity={0.78 * strength}
                        result="red-color"
                    />
                    <feComposite
                        in="red-color"
                        in2="red-offset"
                        operator="in"
                        result="red-refraction"
                    />
                    <feMerge>
                        <feMergeNode in="cyan-refraction" />
                        <feMergeNode in="red-refraction" />
                        <feMergeNode in="liquid-source" />
                    </feMerge>
                </filter>
                <filter
                    id="liquid-image"
                    x="-8%"
                    y="-8%"
                    width="116%"
                    height="116%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.008 0.018"
                        numOctaves="2"
                        seed="13"
                        result="image-noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="image-noise"
                        scale="10"
                        xChannelSelector="R"
                        yChannelSelector="B"
                        result="image-source"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="image-noise"
                        scale="19"
                        xChannelSelector="G"
                        yChannelSelector="R"
                        result="image-cyan-shape"
                    />
                    <feOffset
                        in="image-cyan-shape"
                        dx="-4"
                        result="image-cyan-offset"
                    />
                    <feColorMatrix
                        in="image-cyan-offset"
                        type="matrix"
                        values="0 0 0 0 0.18
                                0 0.9 0 0 0.12
                                0 0 1 0 0.18
                                0 0 0 0.27 0"
                        result="image-cyan"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="image-noise"
                        scale="19"
                        xChannelSelector="B"
                        yChannelSelector="G"
                        result="image-red-shape"
                    />
                    <feOffset
                        in="image-red-shape"
                        dx="4"
                        result="image-red-offset"
                    />
                    <feColorMatrix
                        in="image-red-offset"
                        type="matrix"
                        values="1 0 0 0 0.18
                                0 0 0 0 0.04
                                0 0 0 0 0.08
                                0 0 0 0.25 0"
                        result="image-red"
                    />
                    <feBlend
                        in="image-cyan"
                        in2="image-red"
                        mode="screen"
                        result="image-chroma"
                    />
                    <feBlend
                        in="image-source"
                        in2="image-chroma"
                        mode="screen"
                    />
                </filter>
            </defs>
        </svg>
    );
}

function PersonalWorkSection() {
    return (
        <section className={styles.personalWork} id="work">
            <header className={styles.personalSectionIntro}>
                <h2>SELECTED WORK</h2>
                <p>
                    A few projects I keep coming back to. Each one shipped, and
                    each one moved a number that mattered.
                </p>
            </header>
            <div className={styles.gridSpacer} aria-hidden="true" />

            <article className={styles.personalProject}>
                <h3>NEXUSIX / MOBILE PRODUCT / 2024</h3>
                <p>
                    A commissioned social app that maps your connections as an
                    interactive bubble field. I built it end to end, from the
                    first sketch to the delivered product.
                </p>
                <MarkdownList
                    items={[
                        "Cross-platform MVP for iOS and Android",
                        "Product architecture and interaction implementation",
                        "Express, Supabase, and PostgreSQL backend foundation",
                    ]}
                />
                <MetricGrid
                    items={[
                        { label: "Role", value: "End-to-end" },
                        { label: "Platform", value: "iOS / Android" },
                        { label: "Status", value: "Delivered" },
                    ]}
                />
            </article>
            <aside className={styles.personalProjectMedia} aria-label="Nexusix product screens">
                <ProjectCarousel />
            </aside>

            <article className={styles.personalProject}>
                <h3>SFM–MVS / VISION RESEARCH / 2025</h3>
                <p>
                    Research into making 3D reconstruction from photos faster and
                    cleaner: a custom BRISK–SIFT feature extractor, CUDA
                    acceleration, and better outlier removal.
                </p>
                <MarkdownList
                    items={[
                        "2.3x faster feature extraction",
                        "29% more high-quality keypoints",
                        "40% less point-cloud noise",
                    ]}
                />
                <p className={styles.linkRow}>
                    <a href="https://github.com/roddylan/SFM-to-Mesh" target="_blank" rel="noopener noreferrer">
                        SOURCE
                    </a>
                    <a href="https://github.com/roddylan/SFM-to-Mesh/blob/main/report/report.pdf" target="_blank" rel="noopener noreferrer">
                        RESEARCH REPORT
                    </a>
                </p>
            </article>
            <aside className={styles.personalProjectMedia} aria-label="SFM-MVS research report">
                <div className={styles.personalReportMedia}>
                    <Image
                        src="/images/sfm-mvs-research-report.jpeg"
                        alt="First page of the SFM-MVS research report"
                        fill
                        sizes="(min-width: 1081px) 442px, calc(100vw - 40px)"
                    />
                </div>
            </aside>
        </section>
    );
}

function PersonalExperienceSection() {
    return (
        <section className={styles.personalExperience} id="experience">
            <header className={styles.personalSectionIntro}>
                <h2>EXPERIENCE</h2>
                <p>
                    Titles only tell you so much. What matters is what got
                    faster, clearer, or possible at each place.
                </p>
            </header>
            <div className={styles.gridSpacer} aria-hidden="true" />

            {experiences.map((experience, index) => (
                <div className={styles.experienceRow} key={`${experience.company}-${experience.period}`}>
                    <article className={styles.personalExperienceCopy}>
                        <h3>{experience.role} / {experience.company}</h3>
                        <p className={styles.metaLine}>
                            {experience.period} · {experience.location}
                        </p>
                        <p>{experience.summary}</p>
                        <MarkdownList items={experience.outcomes} />
                    </article>
                    <aside
                        className={styles.timelineRow}
                        data-last={index === experiences.length - 1}
                        aria-label={`${experience.period}, ${experience.company}`}
                    >
                        <span className={styles.timelineNode} aria-hidden="true" />
                        <span className={styles.timelineLabel}>
                            {experience.period}
                            <br />
                            {experience.company}
                        </span>
                    </aside>
                </div>
            ))}
        </section>
    );
}

export default function PortfolioLanding({
    variant = "editorial",
    headingRefractionStrength = 0.68,
}: {
    variant?: "editorial" | "personal";
    headingRefractionStrength?: number;
}) {
    const isPersonal = variant === "personal";
    const refractionStrength = Math.min(
        1,
        Math.max(0, headingRefractionStrength),
    );
    const refractionStyle = isPersonal
        ? ({
              "--heading-refraction-left": `${-2.5 * refractionStrength}px`,
              "--heading-refraction-right": `${2.5 * refractionStrength}px`,
              "--heading-refraction-cyan": `rgba(85, 217, 255, ${0.72 * refractionStrength})`,
              "--heading-refraction-red": `rgba(255, 85, 125, ${0.68 * refractionStrength})`,
              "--heading-refraction-glow": `rgba(150, 110, 255, ${0.2 * refractionStrength})`,
          } as CSSProperties)
        : undefined;

    return (
        <div
            className={`${styles.page} ${isPersonal ? styles.personal : ""}`}
            data-variant={variant}
            style={refractionStyle}
        >
            <a
                className={styles.skipLink}
                href="#content"
                data-native-anchor
            >
                SKIP TO CONTENT
            </a>

            <header className={styles.header}>
                <div className={styles.identity}>
                    <a href="#top">ABDULLAH KHADELI █</a>
                    {isPersonal ? null : (
                        <>
                            <span>PRODUCT ENGINEER</span>
                            <span>2026</span>
                        </>
                    )}
                </div>
                <nav aria-label="Redesign navigation">
                    {isPersonal ? (
                        <>
                            <span className={styles.navRow}>
                                <a href="#top">INDEX</a> / <a href="#contact">CONTACT</a>
                            </span>
                            <a href="#experience">EXPERIENCE</a>
                            <a href="#work">WORK</a>
                        </>
                    ) : (
                        <>
                            <span className={styles.navRow}>
                                [ <a href="#top">INDEX</a> / <a href="#contact">CONTACT</a> ]
                            </span>
                            <a href="#work">[ WORK ]</a>
                            <a href="#experience">[ EXPERIENCE ]</a>
                        </>
                    )}
                </nav>
            </header>

            {isPersonal ? (
                <RefractiveTypeFilter strength={refractionStrength} />
            ) : null}

            <main id="content">
                <div className={styles.pair} id="top">
                    <section className={`${styles.narrative} ${styles.heroNarrative}`}>
                        {isPersonal ? null : (
                            <div className={styles.mark} aria-label="AK monogram">
                                <span>A</span>
                                <span>K</span>
                            </div>
                        )}

                        {isPersonal ? null : (
                            <p className={styles.kicker}>
                                ~*~ © Abdullah Khadeli. Product Engineer. ~*~
                            </p>
                        )}

                        <h1>ROUGH IDEAS INTO WORKING SOFTWARE</h1>

                        <p>
                            I&apos;m Abdullah, a product engineer. Most of my work
                            lives in the gap between what a product should be and
                            what it takes to ship it: direction, architecture, and
                            the follow-through to get both into production.
                        </p>

                        <p>
                            Lately that means AI products, developer tools, and the
                            web platforms behind them. I care less about clever tech
                            than about software that holds up: users understand it,
                            and the team can keep building on it.
                        </p>

                        <p>
                            Some products need their first working version. Others
                            need someone to untangle what&apos;s already there.
                            Either way, I start from the real constraints and ship
                            in small steps you can see.
                        </p>

                        <ShaderCodeWindow />
                    </section>

                    <aside className={`${styles.visual} ${styles.heroVisual}`} aria-label="Interactive particle system illustration">
                        <div className={styles.particleCanvas}>
                            <ParticleCloud
                                refractive={isPersonal}
                                scale={isPersonal ? 1.12 : 1}
                                glassBackground="#000000"
                                warmupMs={isPersonal ? 1300 : 0}
                                minWidth={isPersonal ? 1160 : 1081}
                            />
                        </div>
                        <div className={`${styles.callout} ${styles.calloutHero}`}>
                            SYSTEMS EMERGE FROM SMALL INTERACTIONS
                        </div>
                        <div className={styles.flowArrow} aria-hidden="true">
                            <span>○</span>
                            <span>┊</span>
                            <span>↓</span>
                        </div>
                    </aside>
                </div>

                {isPersonal ? (
                    <PersonalExperienceSection />
                ) : (
                <div className={styles.pair} id="work">
                    <section className={styles.narrative}>
                        <h2>SELECTED WORK</h2>
                        <p>
                            A few projects I keep coming back to. Each one shipped,
                            and each one moved a number that mattered.
                        </p>

                        <article className={styles.project}>
                            <h3>NEXUSIX / MOBILE PRODUCT / 2024</h3>
                            <p>
                                A commissioned social app that maps your connections
                                as an interactive bubble field. I built it end to
                                end, from the first sketch to the delivered product.
                            </p>
                            <MobileArtifact
                                src="/images/nexusix-for-you-feed.avif"
                                alt="Nexusix For You feed"
                                kind="phone"
                            />
                            <MarkdownList
                                items={[
                                    "Cross-platform MVP for iOS and Android",
                                    "Product architecture and interaction implementation",
                                    "Express, Supabase, and PostgreSQL backend foundation",
                                ]}
                            />
                            {isPersonal ? (
                                <MetricGrid
                                    items={[
                                        { label: "Role", value: "End-to-end" },
                                        { label: "Platform", value: "iOS / Android" },
                                        { label: "Status", value: "Delivered" },
                                    ]}
                                />
                            ) : (
                                <div className={styles.asciiTable} role="region" aria-label="Nexusix project facts" tabIndex={0}>
                                    <pre>{`+-------------+------------------+
| ROLE        | END-TO-END       |
| PLATFORM    | IOS / ANDROID    |
| STATUS      | DELIVERED        |
+-------------+------------------+`}</pre>
                                </div>
                            )}
                        </article>

                        <article className={styles.project}>
                            <h3>SFM–MVS / VISION RESEARCH / 2025</h3>
                            <p>
                                Research into making 3D reconstruction from photos
                                faster and cleaner: a custom BRISK–SIFT feature
                                extractor, CUDA acceleration, and better outlier
                                removal.
                            </p>
                            <MobileArtifact
                                src="/images/sfm-mvs-research-report.jpeg"
                                alt="First page of the SFM-MVS research report"
                                kind="report"
                            />
                            <MarkdownList
                                items={[
                                    "2.3x faster feature extraction",
                                    "29% more high-quality keypoints",
                                    "40% less point-cloud noise",
                                ]}
                            />
                            <p className={styles.linkRow}>
                                {isPersonal ? null : "["}
                                <a href="https://github.com/roddylan/SFM-to-Mesh" target="_blank" rel="noopener noreferrer">
                                    SOURCE
                                </a>
                                {isPersonal ? "" : "] ["}
                                <a href="https://github.com/roddylan/SFM-to-Mesh/blob/main/report/report.pdf" target="_blank" rel="noopener noreferrer">
                                    RESEARCH REPORT
                                </a>
                                {isPersonal ? null : "]"}
                            </p>
                        </article>
                    </section>

                    <aside className={`${styles.visual} ${styles.workVisual}`} aria-label="Selected work artifacts">
                        <div className={`${styles.callout} ${styles.calloutProduct}`}>
                            A SOCIAL GRAPH BECOMES A PRODUCT INTERFACE
                        </div>
                        <div className={`${styles.artifactFrame} ${styles.phoneArtifact}`}>
                            <Image
                                src="/images/nexusix-for-you-feed.avif"
                                alt="Nexusix For You feed"
                                fill
                                sizes="420px"
                            />
                        </div>
                        <div className={styles.artifactConnector} aria-hidden="true">
                            ○┊┊┊↓
                        </div>
                        <div className={`${styles.callout} ${styles.calloutReport}`}>
                            RESEARCH BECOMES A REPRODUCIBLE ARTIFACT
                        </div>
                        <div className={`${styles.artifactFrame} ${styles.reportArtifact}`}>
                            <Image
                                src="/images/sfm-mvs-research-report.jpeg"
                                alt="First page of the SFM-MVS research report"
                                fill
                                sizes="440px"
                            />
                        </div>
                    </aside>
                </div>
                )}

                {isPersonal ? (
                    <PersonalWorkSection />
                ) : (
                <div className={styles.pair} id="experience">
                    <section className={styles.narrative}>
                        <h2>EXPERIENCE</h2>
                        <p>
                            Titles only tell you so much. What matters is what got
                            faster, clearer, or possible at each place.
                        </p>

                        {experiences.map((experience) => (
                            <article className={styles.experience} key={`${experience.company}-${experience.period}`}>
                                <h3>
                                    {experience.role} / {experience.company}
                                </h3>
                                <p className={styles.metaLine}>
                                    [{experience.period}] [{experience.location}]
                                </p>
                                <p>{experience.summary}</p>
                                <MarkdownList items={experience.outcomes} />
                            </article>
                        ))}
                    </section>

                    <aside className={`${styles.visual} ${styles.experienceVisual}`} aria-label="Career system diagram">
                        <div className={styles.systemDiagram}>
                            <div className={styles.diagramSpine} />
                            {experiences.map((experience, index) => (
                                <div className={styles.diagramNode} style={{ top: `${80 + index * 190}px` }} key={experience.company}>
                                    <span className={styles.nodeCircle}>○</span>
                                    <span className={styles.nodeLabel}>
                                        {experience.period}
                                        <br />
                                        {experience.company}
                                    </span>
                                </div>
                            ))}
                            <div className={`${styles.callout} ${styles.calloutCareer}`}>
                                EACH ROLE ADDS LEVERAGE TO THE NEXT
                            </div>
                        </div>
                    </aside>
                </div>
                )}

                <div className={styles.pair}>
                    <section className={styles.narrative}>
                        <h2>CAPABILITIES</h2>
                        <p>
                            The stack changes with the problem. These are the areas
                            I keep coming back to.
                        </p>
                        <MarkdownList
                            items={[
                                "Product engineering: direction, architecture, delivery",
                                "AI systems: orchestration, retrieval, model workflows",
                                "Platforms: Next.js, Python, PostgreSQL, cloud infrastructure",
                                "Visual computing: OpenCV, CUDA, Three.js, WebGL",
                            ]}
                        />

                        {isPersonal ? (
                            <MetricGrid
                                items={[
                                    { label: "Product", value: "Shape + ship" },
                                    { label: "AI systems", value: "Orchestrate + eval" },
                                    { label: "Platform", value: "Build + operate" },
                                    { label: "Visual computing", value: "Model + render" },
                                ]}
                            />
                        ) : (
                            <div className={styles.asciiTable} role="region" aria-label="Capability matrix" tabIndex={0}>
                                <pre>{`+-------------------+----------------------+
| PRODUCT           | SHAPE + SHIP         |
| AI SYSTEMS        | ORCHESTRATE + EVAL   |
| PLATFORM          | BUILD + OPERATE      |
| VISUAL COMPUTING  | MODEL + RENDER       |
+-------------------+----------------------+`}</pre>
                            </div>
                        )}

                        <h2 id="contact">CONTACT</h2>
                        <p>
                            If you&apos;re shaping a hard product, or you have a
                            system that&apos;s outgrown its design, I&apos;d like to
                            hear about it. Send me the constraints.
                        </p>
                        <p className={styles.contactLinks}>
                            {isPersonal ? null : "[ "}<a href="mailto:khadeli@threeark.com">EMAIL</a>{isPersonal ? " ↗" : " ]"}
                            <br />
                            {isPersonal ? null : "[ "}<a href="https://linkedin.com/in/akhadeli" target="_blank" rel="noopener noreferrer">LINKEDIN</a>{isPersonal ? " ↗" : " ]"}
                            <br />
                            {isPersonal ? null : "[ "}<a href="https://github.com/akhadeli" target="_blank" rel="noopener noreferrer">GITHUB</a>{isPersonal ? " ↗" : " ]"}
                        </p>
                        <p>
                            {isPersonal
                                ? "Based between Doha and Edmonton."
                                : "~*~ Based between Doha and Edmonton. ~*~"}
                        </p>
                    </section>

                    <aside className={`${styles.visual} ${styles.profileVisual}`} aria-label="Profile artifact">
                        <div className={`${styles.callout} ${styles.calloutProfile}`}>
                            THE ENGINEER IS PART OF THE SYSTEM
                        </div>
                        <div className={`${styles.artifactFrame} ${styles.profileArtifact}`}>
                            <Image
                                src="/images/abdullah-khadeli-profile.jpeg"
                                alt="Abdullah Khadeli"
                                fill
                                sizes="500px"
                            />
                        </div>
                        {isPersonal ? null : (
                            <div className={styles.profileTarget} aria-hidden="true">◎</div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
}
