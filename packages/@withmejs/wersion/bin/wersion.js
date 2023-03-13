#!/usr/bin/env node
import { program } from 'commander'
import { add } from '../lib/command/add.js';
import { init } from '../lib/command/init.js';

program
  .name("wersion")
  .description("custom packages version bump")
  .version("1.0.0")

program
  .command("init")
  .action(() => {
    init()
  })

program
  .command("add")
  .action(() => {
    add()
  })

program
  .command("version")
  .action(() => {
    
  })

program.parse()