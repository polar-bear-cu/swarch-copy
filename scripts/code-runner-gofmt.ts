import { execSync } from "child_process";

const out = execSync("gofmt -l services/code-runner").toString().trim();

if (out) {
  console.error(out);
  process.exit(1);
}

console.log("[code-runner] gofmt OK");
