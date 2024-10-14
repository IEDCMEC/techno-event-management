import { randomUUID, UUID } from 'node:crypto';

export class Mail {
  readonly jobId: UUID;
  accessor from: string;
  accessor name: string;
  accessor to: string;
  accessor subject: string;
  accessor text: string;
  accessor html: string;

  constructor(
    from: string,
    name: string,
    to: string,
    subject: string,
    text: string,
    html: string,
    jobId: UUID = randomUUID(),
  ) {
    this.jobId = jobId;
    this.from = from;
    this.name = name;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }

  toString(): string {
    return `{
            jobId: "${this.jobId}",
            from: "${this.from}",
            name: "${this.name}",
            to: "${this.to}",
            subject: "${this.subject}",
            text: "${this.text}",
            html: "${this.html}"
        }`;
  }
}

export function parseMail(str: string): Mail {
  const parsed = JSON.parse(str.replace(/(\w+):/g, '"$1":'));
  return new Mail(
    parsed.from,
    parsed.name,
    parsed.to,
    parsed.subject,
    parsed.text,
    parsed.html,
    parsed.jobId,
  );
}
