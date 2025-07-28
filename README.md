# Integrating Lerna into CI/CD

Lerna already has features to automatically determine which packages need 
an update after a set of changes are made.

We can improve the release process by:

1. Using Conventional commits to automate the process of selecting version bumps
  - Lerna identifies which package changed and the dependees that need to be updated
  - Dont squash to specify version per package
  - Default bump is patch

2. Adding `lerna` to CI via Github Actions
  - No need to run `lerna release` anymore
  - After merging a PR, Lerna determines all needed package changes then:
    - bumps each package.json
    - updates CHANGELOG for each package
    - publishes new version to npm
    - pushes a commit directly to `main`
  
2. 

# Lerna 5 vs latest

5.6.2  vs 8.2.3

- removed useWorkspaces