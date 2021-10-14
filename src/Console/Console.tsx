import React from 'react';
import { Alert } from 'react-bootstrap';

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
                let variant = message.level === "log" ? "secondary" :
                            message.level === "warn" ? "warning" :
                            message.level === "error" ? "danger" : "";
                return <Alert key={i} variant={variant}>{message.message}</Alert>
            })}
        </div>
    )
};

export default Console;