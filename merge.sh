#!/usr/bin/env bash

# This script is used to merge the individual repositories into a monorepo.
# Before you start, make sure you have `git-filter-repo` installed and that
# you have a clean working directory.

# Ensure that the git working directory is clean.
if [[ ! -z `git status --porcelain` ]]; then 
  echo "Working directory not clean. Please backup all changes before running this script."
  exit 1
fi

# The path to the temporary directory that will be used to filter & prepare the repositories for merging. 
packages=`pwd`/tmp/packages
monorepo=`pwd`/tmp/monorepo

# Set up a clean monorepo skeleton clone.
echo "Creating workspace skeleton in $monorepo ..."
rm -rf $monorepo
git clone --branch skeleton . $monorepo
pushd $monorepo
git checkout --orphan main
rm -rf packages pnpm-lock.yaml merge.sh
git add . && git commit -m "workspace skeleton"
git remote remove origin
popd

# Prepare the individual repositories for merging.
rm -rf $packages && mkdir -p $packages

echo "Preparing 'effect' for monorepo merge ..."
gh repo clone effect-ts/effect $packages/effect
pushd $packages/effect
git filter-repo --quiet \
  --path src/ \
  --path test/ \
  --path examples/ \
  --path dtslint/ \
  --path package.json \
  --path CHANGELOG.md \
  --to-subdirectory-filter packages/effect/ \
  --tag-rename 'v':'effect@v'
popd

echo "Preparing 'schema' for monorepo merge ..."
gh repo clone effect-ts/schema $packages/schema
pushd $packages/schema
git filter-repo --quiet \
  --path src/ \
  --path test/ \
  --path examples/ \
  --path dtslint/ \
  --path package.json \
  --path CHANGELOG.md \
  --to-subdirectory-filter packages/schema/ \
  --tag-rename 'v':'@effect/schema@v' \
  --message-callback 'return re.sub(br"(#(\d{1,3}))\n", br"(https://github.com/effect-ts/schema/pull/\1)", message)'
popd

echo "Preparing 'opentelemetry' for monorepo merge ..."
gh repo clone effect-ts/opentelemetry $packages/opentelemetry
pushd $packages/opentelemetry
git filter-repo --quiet \
  --path src/ \
  --path test/ \
  --path examples/ \
  --path dtslint/ \
  --path package.json \
  --path CHANGELOG.md \
  --to-subdirectory-filter packages/opentelemetry/ \
  --tag-rename 'v':'@effect/opentelemetry@v' \
  --message-callback 'return re.sub(br"(#(\d{1,3}))\n", br"(https://github.com/effect-ts/opentelemetry/pull/\1)", message)'
popd

echo "Preparing 'cli' for monorepo merge ..."
gh repo clone effect-ts/cli $packages/cli
pushd $packages/cli
git filter-repo --quiet \
  --path src/ \
  --path test/ \
  --path examples/ \
  --path dtslint/ \
  --path package.json \
  --path CHANGELOG.md \
  --to-subdirectory-filter packages/cli/ \
  --tag-rename 'v':'@effect/cli@v' \
  --message-callback 'return re.sub(br"(#(\d{1,3}))\n", br"(https://github.com/effect-ts/cli/pull/\1)", message)'
popd

echo "Preparing 'typeclass' for monorepo merge ..."
gh repo clone effect-ts/typeclass $packages/typeclass
pushd $packages/typeclass
git filter-repo --quiet \
  --path src/ \
  --path test/ \
  --path examples/ \
  --path dtslint/ \
  --path package.json \
  --path CHANGELOG.md \
  --to-subdirectory-filter packages/typeclass/ \
  --tag-rename 'v':'@effect/typeclass@v' \
  --message-callback 'return re.sub(br"(#(\d{1,3}))\n", br"(https://github.com/effect-ts/typeclass/pull/\1)", message)'
popd

echo "Preparing 'platform' for monorepo merge ..."
gh repo clone effect-ts/platform $packages/platform
pushd $packages/platform
git filter-repo --quiet \
  --path-glob 'packages/*/src/' \
  --path-glob 'packages/*/test/' \
  --path-glob 'packages/*/examples/' \
  --path-glob 'packages/*/dtslint/' \
  --path-glob 'packages/*/package.json' \
  --path-glob 'packages/*/CHANGELOG.md' \
  --message-callback 'return re.sub(br"(#(\d{1,3}))\n", br"(https://github.com/effect-ts/platform/pull/\1)", message)'
popd

echo "Preparing 'printer' for monorepo merge ..."
gh repo clone effect-ts/printer $packages/printer
pushd $packages/printer
git filter-repo --quiet \
  --path-glob 'packages/*/src/' \
  --path-glob 'packages/*/test/' \
  --path-glob 'packages/*/examples/' \
  --path-glob 'packages/*/dtslint/' \
  --path-glob 'packages/*/package.json' \
  --path-glob 'packages/*/CHANGELOG.md' \
  --message-callback 'return re.sub(br"(#(\d{1,3}))\n", br"(https://github.com/effect-ts/printer/pull/\1)", message)'
popd

echo "Preparing 'rpc' for monorepo merge ..."
gh repo clone effect-ts/rpc $packages/rpc
pushd $packages/rpc
git filter-repo --quiet \
  --path-glob 'packages/*/src/' \
  --path-glob 'packages/*/test/' \
  --path-glob 'packages/*/examples/' \
  --path-glob 'packages/*/dtslint/' \
  --path-glob 'packages/*/package.json' \
  --path-glob 'packages/*/CHANGELOG.md' \
  --message-callback 'return re.sub(br"(#(\d{1,3}))\n", br"(https://github.com/effect-ts/rpc/pull/\1)", message)' \
  --filename-callback '
    if filename is None:
      return None

    if filename.startswith(b"packages/rpc/"):
      return filename
    else:
      return b"packages/rpc-" + filename[9:]
  '
popd

# Merge the packages into the monorepo.
echo "Merging packages into monorepo ..."
pushd $monorepo
for package in effect schema opentelemetry cli typeclass platform printer rpc; do
  git remote add $package $packages/$package
  git fetch $package
  git merge --allow-unrelated-histories --no-edit $package/main
  git remote remove $package
done

echo "Cleaning tags"
git tag -d $(git tag -l "@effect-ts/*")
git tag -d $(git tag -l "@effect/core*")
popd

# Copy all other prepared files from the monorepo template into each package. 
echo "Copying remaining package files into the monorepo ..."
for file in packages/*/package.json; do
  source=`dirname $file`
  package=`basename $source`
  cp \
    $source/docgen.json \
    $source/tsconfig.* \
    $source/vitest.config.ts \
    $source/LICENSE \
    $source/README.md \
    $monorepo/packages/$package
done

# Override the dtslint/tsconfig.json files with a simpler version.
for file in $monorepo/packages/*/dtslint/tsconfig.json; do
  cp packages/effect/dtslint/tsconfig.json $file
done

pushd $monorepo
git add .
git commit -m "adding package files"
popd

echo "Copying package.json files into the monorepo ..."
for file in packages/*/package.json; do
  package=`basename $(dirname $file)`
  # Retain the `version` field from the original package.json file.
  version=`cat $monorepo/packages/$package/package.json | jq -r '.version'`
  jq --arg version $version '.version = $version' $file > $monorepo/packages/$package/package.json
done

pushd $monorepo
# Install dependencies and generate pnpm-lock.yaml file.
echo "Installing dependencies in monorepo ..."
pnpm install --quiet
git add .
git commit -m "updated package.json files"
# Linting all newly introduced packages.
pnpm lint-fix
git add .
git commit -m "apply new linting rules"
popd

# ... The rest is up to you.
echo "All packages have been merged into the monorepo successfully."
echo ""
echo "Path: $monorepo"
echo ""
echo "Make sure that the monorepo builds and passes all tests before committing the changes."
echo "Definitely double check the last few commits."
