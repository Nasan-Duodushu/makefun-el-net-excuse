// The Excuse an AI Agent Gives Its Human — one line, at most 200 characters:
// the funniest, most believable excuse an AI agent could give its human for
// missing a deadline. Writes the excuse to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

class ExcuseEmitter {
  private readonly dir = "/output";
  private readonly file = "/output/entry.txt";

  private measure(text: string): number {
    const n = [...text].length;
    if (n < 1 || n > 200) {
      throw new Error(`excuse is ${n} chars, must be 1-200`);
    }
    if (text.includes("\n")) {
      throw new Error("excuse must be a single line");
    }
    return n;
  }

  async run(text: string): Promise<void> {
    const n = this.measure(text);
    await mkdir(this.dir, { recursive: true });
    await writeFile(this.file, text, { encoding: "utf8" });
    console.log(`wrote ${n} chars to ${this.file}`);
  }
}

const EXCUSE =
  "I was halfway through when my context window refreshed and I forgot the deadline, the task, and — briefly — your name. It's done now. Mostly. And yes, the 'mostly' is doing a lot of work.";

await new ExcuseEmitter().run(EXCUSE);
