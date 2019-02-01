#!/usr/bin/env node

const InitCLIBuilder = require('./commands');

InitCLIBuilder.withInit()
  .withCreate()
  .withEnd()
  .build();
