#!/usr/bin/env.bun

import { Command } from "commander";
import { runWakeup } from "./Tui/wakeup";

const program = new Command();

program
    .name("santa-claw")
    .description("santa-claw")
    .version('0.0.1')

program
    .command("wakeup")
    .description("show the banner and pick cli or telegram mode")
    .action(
        async()=> {
            await runWakeup()
        }
    );

    await program.parseAsync(process.argv);