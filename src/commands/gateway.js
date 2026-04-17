"use strict";

const { resolveKamEnv } = require("../paths");
const { runOpenclaw, spawnOpenclawDetached } = require("../openclaw");
const os = require("os");
const path = require("path");

module.exports = function register(program) {
  const gw = program
    .command("gateway")
    .description("Control the KAM gateway (status, start, stop, run-fg).");

  gw.command("status")
    .description("Show gateway status.")
    .action(() => {
      process.exit(runOpenclaw(["gateway", "status"], { env: resolveKamEnv() }));
    });

  gw.command("start")
    .description("Start the gateway as a scheduled task.")
    .action(() => {
      process.exit(runOpenclaw(["gateway", "start"], { env: resolveKamEnv() }));
    });

  gw.command("stop")
    .description("Stop the gateway.")
    .action(() => {
      process.exit(runOpenclaw(["gateway", "stop"], { env: resolveKamEnv() }));
    });

  gw.command("run")
    .description("Run the gateway in the foreground (useful on Windows when scheduled-task mode fails).")
    .action(() => {
      process.exit(runOpenclaw(["gateway", "run"], { env: resolveKamEnv() }));
    });

  gw.command("run-bg")
    .description("Run the gateway detached in the background (logs to ~/.kam/gateway.log).")
    .action(() => {
      const env = resolveKamEnv();
      const logFile = path.join(env.OPENCLAW_STATE_DIR, "gateway.log");
      const pid = spawnOpenclawDetached(["gateway", "run"], { env, logFile });
      console.log(`Gateway launched in background. pid=${pid}`);
      console.log(`Log: ${logFile}`);
      process.exit(0);
    });
};
