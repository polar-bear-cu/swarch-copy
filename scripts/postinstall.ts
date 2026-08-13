import { execSync } from "child_process";
import path from "path";

const root = process.cwd();
const goServices = ["services/code-runner", "services/collab"];

for (const dir of goServices) {
  execSync("go mod download", { cwd: path.join(root, dir), stdio: "inherit" });
}

const GO_TOOLS: Record<string, string> = {
  air: "github.com/air-verse/air@latest",
  swag: "github.com/swaggo/swag/cmd/swag@latest",
};

function commandExists(cmd: string): boolean {
  try {
    execSync(process.platform === "win32" ? `where ${cmd}` : `command -v ${cmd}`, {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

for (const [bin, pkg] of Object.entries(GO_TOOLS)) {
  if (commandExists(bin)) continue;
  console.log(`[postinstall] installing ${bin} (go install ${pkg})`);
  execSync(`go install ${pkg}`, { stdio: "inherit" });
}

const gopathBin = path.join(execSync("go env GOPATH").toString().trim(), "bin");
const onPath = (process.env.PATH ?? "")
  .split(path.delimiter)
  .some((p) => p && path.resolve(p) === path.resolve(gopathBin));

if (!onPath) {
  console.warn(`\n[postinstall] WARNING: ${gopathBin} is not on your PATH.`);
  console.warn(
    `[postinstall] air/swag were installed there but your shell won't find them until it's added.`,
  );
  if (process.platform === "win32") {
    console.warn(
      `[postinstall]   PowerShell (permanent, then restart your terminal):\n` +
        `[postinstall]   [Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";${gopathBin}", "User")`,
    );
  } else {
    console.warn(`[postinstall]   Add to your shell profile: export PATH="$PATH:${gopathBin}"`);
  }
}
