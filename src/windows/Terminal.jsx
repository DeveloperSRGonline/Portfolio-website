import { useState, useEffect, useRef } from "react";
import { WindowControls } from "#components";
import { techStack, locations, socials, dockApps } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper"
import useWindowStore from "#store/window";
import { Check, Flag } from "lucide-react";

const TechStackView = () => (
    <div className="techstack-view mt-2">
        <div className="label">
            <p className="w-32">Category</p>
            <p>Technology</p>
        </div>

        <ul className="content">
            {techStack.map(({ category, items }) => (
                <li key={category} className="flex items-center">
                    <Check className="check" size={20} />
                    <h3>{category}</h3>
                    <ul>
                        {items.map((item, i) => (
                            <li key={i}>{item}{i < items.length - 1 ? "," : ""}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
        <div className="footnote">
            <p><Check size={20}/>{techStack.length} of {techStack.length} stacks loaded successfully (100%)</p>

            <p className="text-black dark:text-gray-300">
                <Flag size={15} fill="black" className="dark:fill-gray-300"/>
                Render time: 4ms
            </p>
        </div>
    </div>
);

const Terminal = () => {
    const { openWindow } = useWindowStore();
    const [inputValue, setInputValue] = useState("");
    const [history, setHistory] = useState([
        {
            id: 1,
            command: "show tech stack",
            output: <TechStackView />
        }
    ]);
    const [cmdHistory, setCmdHistory] = useState(["show tech stack"]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        focusInput();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (cmdText) => {
        const trimmed = cmdText.trim();
        if (!trimmed) return;

        const parts = trimmed.split(" ");
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        let output = null;

        switch (command) {
            case "help":
            case "?":
                output = (
                    <div className="py-2 space-y-1 text-gray-700">
                        <p className="font-bold text-[#00A154]">Available Commands:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-1 text-xs">
                            <p><span className="font-bold text-black">help</span> - Show this help menu</p>
                            <p><span className="font-bold text-black">about</span> - Learn about Shivam</p>
                            <p><span className="font-bold text-black">skills</span> - Display tech stack</p>
                            <p><span className="font-bold text-black">projects</span> - List personal projects</p>
                            <p><span className="font-bold text-black">contact</span> - Contact & social links</p>
                            <p><span className="font-bold text-black">open &lt;app&gt;</span> - Open an app window</p>
                            <p><span className="font-bold text-black">clear</span> - Clear terminal history</p>
                            <p><span className="font-bold text-black">date</span> - Display current date & time</p>
                            <p><span className="font-bold text-black">sudo &lt;cmd&gt;</span> - Run as superuser</p>
                        </div>
                    </div>
                );
                break;

            case "clear":
            case "cls":
                setHistory([]);
                setInputValue("");
                return;

            case "skills":
            case "tech":
            case "show":
                if (command === "show" && args.join(" ").toLowerCase() !== "tech stack") {
                    output = <p className="text-red-500 text-xs">Error: Unknown argument. Did you mean <span className="font-bold text-black">show tech stack</span>?</p>;
                } else {
                    output = <TechStackView />;
                }
                break;

            case "about":
            case "whoami": {
                const aboutTxt = locations.about?.children?.find(c => c.fileType === "txt");
                const descLines = aboutTxt?.description || [
                    "Hey! I’m Shivam 👋, a web developer who enjoys building sleek, interactive websites.",
                    "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and delightful.",
                    "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug."
                ];
                output = (
                    <div className="py-2 text-gray-700 space-y-2 max-w-xl">
                        <p className="font-semibold text-black">Shivam Garade - Web Developer</p>
                        {descLines.map((line, index) => (
                            <p key={index} className="text-xs leading-relaxed">{line}</p>
                        ))}
                    </div>
                );
                break;
            }

            case "projects":
            case "ls": {
                const projectsList = locations.work?.children || [];
                output = (
                    <div className="py-2 text-gray-700 space-y-2">
                        <p className="font-bold text-[#00A154]">Personal Projects:</p>
                        {projectsList.length > 0 ? (
                            <div className="space-y-3">
                                {projectsList.map((project) => {
                                    const txtFile = project.children?.find(c => c.fileType === 'txt');
                                    const desc = txtFile?.description?.[0] || 'No description available.';
                                    return (
                                        <div key={project.id} className="border-l-2 border-[#00A154] ps-3 py-0.5">
                                            <p className="font-bold text-black text-xs">{project.name}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5">{desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-xs">No projects found.</p>
                        )}
                    </div>
                );
                break;
            }

            case "contact":
            case "socials":
                output = (
                    <div className="py-2 text-gray-700 space-y-2">
                        <p className="font-bold text-[#00A154]">Social Links & Contact:</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {socials.map((soc) => (
                                <a
                                    key={soc.id}
                                    href={soc.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                                    style={{ backgroundColor: soc.bg }}
                                >
                                    <img src={soc.icon} className="w-3.5 h-3.5 invert filter brightness-200" alt={soc.text} />
                                    {soc.text}
                                </a>
                            ))}
                        </div>
                    </div>
                );
                break;

            case "open": {
                if (args.length === 0) {
                    output = <p className="text-red-500 text-xs">Error: Please specify an app to open. Example: <span className="font-bold">open safari</span></p>;
                    break;
                }
                const appQuery = args.join(" ").toLowerCase().trim();
                const appMapping = {
                    finder: "finder",
                    portfolio: "finder",
                    projects: "finder",
                    work: "finder",
                    safari: "safari",
                    articles: "safari",
                    blog: "safari",
                    photos: "photos",
                    gallery: "photos",
                    contact: "contact",
                    socials: "contact",
                    resume: "resume",
                    archive: "trash",
                    trash: "trash"
                };
                const targetAppKey = appMapping[appQuery];
                if (targetAppKey) {
                    openWindow(targetAppKey);
                    output = <p className="text-[#00A154] text-xs">Successfully opened {appQuery} window!</p>;
                } else {
                    const matchedApp = dockApps.find(a => a.name.toLowerCase() === appQuery || a.id.toLowerCase() === appQuery);
                    if (matchedApp && matchedApp.canOpen) {
                        openWindow(matchedApp.id);
                        output = <p className="text-[#00A154] text-xs">Successfully opened {matchedApp.name} window!</p>;
                    } else {
                        output = (
                            <p className="text-red-500 text-xs">
                                Error: App "{appQuery}" not found. Try: finder, safari, photos, contact, resume
                            </p>
                        );
                    }
                }
                break;
            }

            case "date":
                output = <p className="text-xs text-gray-700 font-mono">{new Date().toString()}</p>;
                break;

            case "sudo":
                output = <p className="text-red-500 text-xs font-mono">Permission denied: shivam is the only superuser here.</p>;
                break;

            default:
                output = (
                    <p className="text-red-500 text-xs font-mono">
                        Command not found: "{command}". Type <span className="font-bold text-black">help</span> for a list of available commands.
                    </p>
                );
                break;
        }

        setHistory((prev) => [
            ...prev,
            {
                id: Date.now(),
                command: cmdText,
                output
            }
        ]);
        setCmdHistory((prev) => [...prev, cmdText]);
        setInputValue("");
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            executeCommand(inputValue);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdHistory.length === 0) return;
            const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInputValue(cmdHistory[newIndex]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === -1) return;
            if (historyIndex === cmdHistory.length - 1) {
                setHistoryIndex(-1);
                setInputValue("");
            } else {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInputValue(cmdHistory[newIndex]);
            }
        }
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="terminal" />
                <h2>Terminal - Skills</h2>
            </div>
            <div 
                className="techstack h-[400px] overflow-y-auto flex flex-col justify-between" 
                onClick={focusInput} 
                ref={scrollRef}
            >
                <div className="space-y-4 pr-1">
                    {history.map((item) => (
                        <div key={item.id} className="space-y-1">
                            <p>
                                <span className="font-bold">@shivam % </span>
                                {item.command}
                            </p>
                            {item.output}
                        </div>
                    ))}
                    
                    {/* The active input prompt */}
                    <div className="flex items-center mt-2">
                        <span className="font-bold mr-1 flex-shrink-0">@shivam % </span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 text-sm font-roboto text-gray-800"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const TerminalWindow = WindowWrapper(Terminal, "terminal")

export default TerminalWindow;