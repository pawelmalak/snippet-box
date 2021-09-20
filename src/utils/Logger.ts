import { ErrorLevel } from '../typescript/types/ErrorLevel';

export class Logger {
  private namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  public log(message: string, level: ErrorLevel = 'INFO'): void {
    console.log(
      `[${this.generateTimestamp()}] [${level}] ${this.namespace}: ${message}`
    );
  }

  private generateTimestamp(): string {
    const d = new Date();

    // Date
    const year = d.getFullYear();
    const month = this.parseDate(d.getMonth() + 1);
    const day = this.parseDate(d.getDate());

    // Time
    const hour = this.parseDate(d.getHours());
    const minutes = this.parseDate(d.getMinutes());
    const seconds = this.parseDate(d.getSeconds());
    const miliseconds = this.parseDate(d.getMilliseconds(), true);

    // Timezone
    const tz = -d.getTimezoneOffset() / 60;

    // Construct string
    const timestamp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}.${miliseconds} UTC${
      tz >= 0 ? '+' + tz : tz
    }`;

    return timestamp;
  }

  private parseDate(dateFragment: number, ms: boolean = false): string {
    if (ms) {
      if (dateFragment >= 10 && dateFragment < 100) {
        return `0${dateFragment}`;
      } else if (dateFragment < 10) {
        return `00${dateFragment}`;
      }
    }

    return dateFragment < 10 ? `0${dateFragment}` : dateFragment.toString();
  }
}
