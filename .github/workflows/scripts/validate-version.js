#!/usr/bin/env node

const GH_TAG   = process.env.GITHUB_REF_NAME;
const PKG_ROOT = process.env.GITHUB_WORKSPACE;

const path = require('path');

const pkgPath = path.join(PKG_ROOT, "package.json")
const pkg = require(pkgPath);

if (!GH_TAG) {
  console.error('Error: GITHUB_REF_NAME is not set. This workflow must be triggered by a tag push or release.');
  process.exit(1);
}

const expectedVersion = GH_TAG.replace(/^v/, '');

if (pkg.version !== expectedVersion) {
  console.error(`Error: package.json version "${pkg.version}" does not match tag "${GH_TAG}" (expected "${expectedVersion}")`);
  process.exit(1);
}

console.log(`Version OK: ${pkg.version}`);
