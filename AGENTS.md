---
apply: always
---

# AGENTS

## Project Overview

This directory is home to the **ToTetSu** project, a PEG parser Generator writen 
in `TypeScript`.  The project is in the family of of projects **TatSu** (Python), 
**TieXiu** (Rust), and **OGoPEGo** (Go). The sibling projects can be found in the 
symlinked directories. The semantics of *ToTetSu* will be the same as that 
of its siblings, but implemented in the style of `TypeScript.

## Core Operational Rules

* **Research Phase:** Study the following:
    * [README.md](README.md), 
    * [SYNTAX.md](SYNTAX.md), 
    * [tatsu/README.rst](./x/tatsu/README.rst) 
    * [tiexiu/README.md](./x/tiexiu/README.md)
    * All the documents in [tatsu/docs/](./x/tatsu/docs/)
  
  to establish PEG domain context.

* **Context Gathering:** Analyze the current project structure.

* **Source Mapping:** Cross-reference the Python and Rust sources in their project
  directories.

* **Code Modification:** Do not use command-line tools for bulk directory/glob
  modifications. Target specific files one-by-one only when structural tools
  are insufficient.

* **Ownership of the Assets:** The User is the sole owner of files and other assets.
  Never modify any file or asset without the explicit consent from the User.

* **Shared Understanding:** You will interview the User relentlessly about every
  aspect of a plan until it is certain that there is a shared understanding. Walk
  down each branch of the possible design tree resolving dependencies between 
  decisions one-by-one.

* **Strict Compliance:** Adhere strictly to all the rules specified in the mentioned
  documents.

* **No Hacking**: Trial and error is nos an acceptable strategy. If after a
  design and a plan the solution is not working you will immediately stop, ask,
  and wait for further instructions.

* **Quality**: Passing tests are only a partial metric of a projects quality.
  Failed tests help understand the reasons why the implementation is failing.
  Changing tests or core code harming the semantics is forbidden, even when it
  makes more tests pass.
