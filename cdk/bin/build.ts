#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { BuildStack } from '../lib/build-stack';

const app = new cdk.App();
new BuildStack(app, 'BuildStack');
app.run();