
export function getTrace(_channel: string): (message?: any, ...optionalParams: any[]) => void {
    if (typeof localStorage === "undefined" || localStorage.getItem("trace") === null) {
        return () => {};
    }
    return (message?: any, ...optionalParams: any[]) => {
        console.log(`[web-bml][${_channel}] ${message}`, ...optionalParams);
    }
}

export function getLog(_channel: string): (message?: any, ...optionalParams: any[]) => void {
    return (message?: any, ...optionalParams: any[]) => {
        console.log(`[web-bml][${_channel}] ${message}`, ...optionalParams);
    }
}

export function getWarn(_channel: string): (message?: any, ...optionalParams: any[]) => void {
    return (message?: any, ...optionalParams: any[]) => {
        console.warn(`[web-bml][${_channel}] ${message}`, ...optionalParams);
    }
}

export function getError(_channel: string): (message?: any, ...optionalParams: any[]) => void {
    return (message?: any, ...optionalParams: any[]) => {
        console.error(`[web-bml][${_channel}] ${message}`, ...optionalParams);
    }
}
