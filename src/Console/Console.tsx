import "./Console.css"

export type LogMessage = {
    level: "log" | "warn" | "error";
    message: string;
}

interface ConsoleProps {
    logMessages: Array<LogMessage>;
};

function Console(props: ConsoleProps) {
    return (
        <div className="consoleBox">
            {props.logMessages.map((message, i) => {
                let variant = message.level === "log" ? "text-secondary" :
                            message.level === "warn" ? "text-warning" :
                            message.level === "error" ? "text-danger" : "";
                return <p key={i} className={variant}>{message.message}</p>
            })}
        </div>
    )
};

export default Console;