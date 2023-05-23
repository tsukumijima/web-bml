
export function getTrace(_channel: string): (message?: any, ...optionalParams: any[]) => void {
    if (!localStorage.getItem("trace")) {
        return () => {};
    }
    return (message?: any, ...optionalParams: any[]) => {
        console.log(`[${_channel}]`, message, ...optionalParams);
    }
}

export function getLog(_channel: string): (message?: any, ...optionalParams: any[]) => void {
    return (message?: any, ...optionalParams: any[]) => {
        console.log(`[${_channel}]`, message, ...optionalParams);
    }
}

export function getWarn(_channel: string): (message?: any, ...optionalParams: any[]) => void {
    return (message?: any, ...optionalParams: any[]) => {
        console.warn(`[${_channel}]`,  message, ...optionalParams);
    }
}

export function getError(_channel: string): (message?: any, ...optionalParams: any[]) => void {
    return (message?: any, ...optionalParams: any[]) => {
        console.error(`[${_channel}]`, message, ...optionalParams);
    }
}
