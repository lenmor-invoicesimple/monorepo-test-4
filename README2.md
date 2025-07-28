git init

# uses lerna 8 with Nx under the hood
npx lerna init

npx lerna create demo-is-odd

# every script named "build" will run
npx lerna run build

npx lerna run build --scope=demo-is-odd

npx lerna run test --scope=demo-is-odd


# create new release
npx lerna version

# publish
npx lerna publish from-package

test