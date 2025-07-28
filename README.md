[![CircleCI](https://circleci.com/gh/invoice-simple/is-packages/tree/master.svg?style=svg&circle-token=9c6d5b44b75b2dc709b4c8a731eeddf16b72ce26)](https://circleci.com/gh/invoice-simple/is-packages/tree/master)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=invoice-simple_is-packages&token=3ad0ea9f6df49f77cae272ef37e899bbcfe20725)](https://sonarcloud.io/summary/new_code?id=invoice-simple_is-packages)

Collection of company-wide standalone javascript packages

## Using the packages

```
yarn add @lenmor-invoicesimple/<package-name>
```

Make sure your environment is [configured](https://invoicesimple.atlassian.net/wiki/spaces/dev/pages/54001722/Private+NPM+registry) to access Github private registry.

## Development

1. Checkout the repository
2. Run `yarn util:fresh`, this will:
   1. Remove any existing builds/node_modules
   2. Install all the dependencies
   3. Build all the packages
3. Run `yarn lint` to check for linting errors
4. Run `yarn test` to run all the tests. Run `yarn jest filePath` to run a specific test file.
5. Run `yarn pretty` to check and fix any formatting issues
6. Some packages, like `invoice-viewer` use `storybook` for UI testing. you can run `yarn storybook` and then navigate to `http://localhost:6006` to load storybook stories.

- all version changes are handled by lerna at publish time
- do not change versions manually in PR

Make sure your environment is [configured](https://invoicesimple.atlassian.net/wiki/spaces/dev/pages/54001722/Private+NPM+registry) to access Github private registry.

### Canary releases

You'll want to test / preview development version of a package by publishing "dev" release of a package. You can do that by running:

```sh
# from project root
yarn run build
yarn run canary
```

That will create "development" only package, it won't be accidentaly used by dependant packages. Also, it won't commit any changes and won't create git tags.

### Production releases (all packages)

1. Create a new branch + PR
2. Commit all the changes (linter and prettifier will run automatically)
3. ensure tests pass
4. submit for review + get approval
5. merge with master
6. switch to master + pull
7. create new release branch, e.g. `git checkout -b release-yyyy-mm-dd`
8. run `yarn run release`
9. select new version for updated packages
10. confirm publish
11. commit changes
12. submit for review + get approval

Please follow the [semantic versioning](https://semver.org/) pattern. If you have concerns, discuss it with the team.

### Production releases (individual packages)

When releasing a single package make sure that all dependent package versions are released as well.

For example: you create a new version `is-packages/a@1.0.1`, which depends on `is-packages/b@2.2.2`, if `is-packages/b@2.2.2` is not released yet `is-package/a@1.0.1` will break consumers.

---

1. Create a new branch from master `git checkout -b release/<changed-package>@<new-version>`

2. Manually set the new version in `package.json` for desired package

3. Update dependencies within `is-packages` accordingly

4. CD into the individual package dir and run `yarn build` for each package you're releasing

5. commit the changes.

6. CD back into root of is-packages and run `npx lerna publish from-package`. This will publish all the packages with modified `package.json` version.

7. Save, commit, add tag `git tag "@invoice-simple/<changed-package>@<new-version>"`

8. Push to remote origin, include tags `git push origin --tags`

9. Open a PR for the branch

10. merge once approved

## Adding a new package

1. Create a new sub-directory in `packages` directory
2. Copy and adjust `tsconfig.json`, `tsconfig.prod.json`, `package.json` from one of the existing packages

make sure that your `package.json` contains at least the following fields:

```json
{
  "name": "@invoice-simple/<package-name>",
  "version": "pick the version from <root>/lerna.json",
  "main": "entry point for commonjs modules, e.g.: dist/index.js",
  "module": "entry point for es modules and webpack, e.g.: dist/index.esm.js",
  "typings": "location of TS type definitions, e.g.: dist/typings/index.d.ts",
  "repository": {
    "type": "git",
    "url": "https://github.com/invoice-simple/is-packages",
    "directory": "packages/<package-name>"
  },
  "files": [
    "glob pattern of files to include in the package",
    "Read more: https://docs.npmjs.com/files/package.json#files",
    "E.g.: dist/*"
  ],
  "scripts": {
    "build": "rollup -c && tsc -d -p tsconfig.prod.json --emitDeclarationOnly && BABEL_ENV=production babel ./dist/index.min.js --out-file ./dist/index.min.js && terser -c -m --ecma 5 -o ./dist/index.min.js -- ./dist/index.min.js",
    "lint": "eslint ./ --ext ts,tsx --fix",
    "test": "jest"
  }
}
```

3. Make sure that the package added has the correct access-control and visibility so that others can npm install
   https://docs.github.com/en/packages/learn-github-packages/configuring-a-packages-access-control-and-visibility

**Please note** that there are 3 different build methods that we're using, depending on the package.
Pick whichever build method that seems more suitable to your new package:

1. build with `tsc` (typescript compiler), using this build method will give you more control over your emmited code. usage examples: `parse-domain` and `is-errors`
2. build with `rollup`, a very popular full-fledged bundler with tons of plugins and config options. usage examples: `invoice-viewer` and `is-paypal-sdk`
3. build with `microbundle`, a zero-configuration bundler, powered internally by `rollup`. better suited for small packages. usage examples: `calculator` and `domain-invoicing`
