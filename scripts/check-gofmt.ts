import { execSync } from "child_process";

const out = execSync("gofmt -l services/code-runner services/collab").toString().trim();

if (out) {
  console.error(out);
  process.exit(1);
}

console.log("[code-runner, collab] gofmt OK");
