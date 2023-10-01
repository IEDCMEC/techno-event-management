# Contributing Guide

Hi! We're really excited that you're interested in contributing to Techno Event Management System! Before submitting your contribution, please read through the following guide.

## Repo Setup

To develop locally, fork the Techno Event Management repository and clone it in your local machine. This repo is a monorepo using turborepo. The package manager used to install and link dependencies must be [pnpm](https://pnpm.io/).

To develop and test:

1. Run `pnpm i` in root folder.

2. Run `pnpm run dev` in root folder.

# Contribution Guidelines

## Commit Conventions

### 1. Mood and Length

- Use imperative mood in the subject line. Example – "Add fix for dark mode toggle state."
- The first line should be <= 50 characters, and the body <= 72 characters.

### 2. Type of Commit

- Specify the type of commit; use consistent set of words to describe changes.
- Example commit types: feat, fix, chore, refactor, docs, style, test, perf, ci, build, revert.
- 

### 3. Commit Message Structure

- Follow the Conventional Commits specification for commit messages.
- Structure: `<type>[optional scope]: <description>`
- Optional body and footer(s) can provide additional context.

### Examples

- **Feature Addition:**
  ```
  feat: add search bar functionality
  ```

- **Documentation Update:**
  ```
  docs: add project description, abstract, hosted link
  ```

- **Breaking Change:**
  ```
  feat!: send an email to the customer when a product is shipped
  ```

- **Commit with Scope:**
  ```
  feat(api)!: send an email to the customer when a product is shipped
  ```

- **An example for reference (with breaking change)** : 

```
chore!: update website layout

BREAKING CHANGE: switch to modern CSS Grid for layout design
```

Explanation:

- **Type:** `chore` indicates that it's a maintenance or housekeeping task.
- **Attention Marker:** `!` signifies that it's an important change, requiring attention.
- **Description:** "update website layout" briefly describes the main purpose of the commit.
- **Breaking Change:** The footer indicates that there's a breaking change, and it explains that the website layout is now using a modern CSS Grid instead of the previous layout method.

The breaking change notice is important for users to be aware that updating their code might be necessary to accommodate the new layout structure.

## Conventional Commits Specification

### Types in detail 
- feat – a new feature is introduced with the changes
- fix – a bug fix has occurred
- chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- refactor – refactored code that neither fixes a bug nor adds a feature
- docs – updates to documentation such as a the README or other markdown files
- style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
test – including new or correcting previous tests
- perf – performance improvements
- ci – continuous integration related.
- build – changes that affect the build system or external dependencies.
- revert – reverts a previous commit.
Examples :  feat : add search bar functionality docs : add proj desc, abstract, hosted link

### Commit Message Structure

- Structure: `<type>[optional scope]: <description>`
- Optional body and footer(s) provide additional context.

### Examples

- **Breaking Change in Footer:**
  ```
  feat: allow provided config object to extend other configs

  BREAKING CHANGE: `extends` key in config file is now used for extending other config files
  ```

- **Commit with Scope and Breaking Change/Attention Marker:**
  ```
  feat(api)!: send an email to the customer when a product is shipped
  ```

- **Commit with Multiple Footers:**
  ```
  fix: prevent racing of requests

  Introduce a request id and a reference to the latest request.

  Remove timeouts which were used to mitigate the racing issue but are
  obsolete now.
  ```
### Some things to note 

- **Commit Types Case Sensitivity:**
  - Any casing may be used, but consistency is recommended.

- **Dealing with Multiple Commit Types:**
  - Make multiple commits whenever possible.

- **Handling Wrong Commit Types:**
  - Use `git rebase -i` to edit commit history before merging or releasing.

Follow these guidelines to maintain a clear and structured commit history, making it easier for automated tools, collaboration, and project maintenance.
