

///
export default class Logger {
    private className: string;

    constructor(className) {
        this.className = className;
    }

    log = (identifier: any, message?: any) => {
        if (message) {
            console.log(`[${this.className}]`, identifier, ":", message);
        } else {
            console.log(`[${this.className}]`, identifier);
        }
    }
}