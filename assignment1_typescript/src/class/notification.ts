export enum Log {
  INFO = "INFO",
  ERROR = "ERROR",
}

export class Notification {
  notify(functionName: string, logType: Log): void {
    if (logType === Log.ERROR) {
      console.log(`${`[${Log.ERROR}]`} Error while executing ${functionName}`);
    } else {
      console.log(`${`[${Log.INFO}]`} Executed ${functionName}`);
    }
  }
}
