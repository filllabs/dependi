## Developer Guide for Preparing and Submitting PRs Conventional Commits:
The release-please package was used to automatically update the changelog.md file.
According to this package, commit messages must be in the Conventional Commits standard.
Thanks to commit messages written according to the Conventional Commits standard, the changelog.md file is dynamically updated and major.minor.patch versions are changed.
### [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) Structure:
```
<type>[optional  scope]:  <description>
[optional  body]
[optional  footer(s)]
```
**The most important prefixes you should have in mind are:**
1.  fix: which represents bug fixes, and correlates to a SemVer patch.
2. feat: which represents a new feature, and correlates to a SemVer minor.
3. feat!:, or fix!:, refactor!:, etc., which represent a breaking change (indicated by the !) and will result in a SemVer major.
4.  types other than fix: and feat: are allowed. build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, revert:
5. You can add any type you want to the release-please.yml file.

**Why Use Conventional Commits:**
1.  Automatically generating CHANGELOGs.
2.  Automatically determining a semantic version bump (based on the types of commits landed).
3.  Communicating the nature of changes to teammates, the public, and other stakeholders.
4.  Triggering build and publish processes.
5.  Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.
<br/>

**Example Conventional Commit Messages:**
1. Fixing a Bug
    - Correct: fix: resolve login page crash on invalid input v.1.0.0 => v.1.0.1
    - Incorrect: resolve login page crash on invalid input
2. Adding a New Feature
    - Correct: feat: introduce comment section v.1.0.1 => v1.1.0
    - Incorrect: added comments section
3. Making a Breaking Change
    - Correct: feat!: remove deprecated "user" API v.1.1.0 => v.2.0.0
    - Incorrect: removed old user API
4. Improving Performance
    - Correct: perf: enhance image loading speed v.2.0.0 => v.2.0.1
    - Incorrect: faster image loading
5. Refactoring Code
    - Correct: refactor: streamline user authentication flow v.2.0.0 => v.2.0.2
    - Incorrect: cleaned up authentication process
<br/>

![](https://lh7-us.googleusercontent.com/WL14Ohc2twE6xnC6ozrgnMVyvVX2iDraTkZdufXhQaVmQaWaeYH9iX47V1Nm3Axhbo4qc6715CE7T5HW1WwTuNEDU0KZ2vIfG0PDPRbaJPtU3NKkVKVzXMfrRevDOT4sNzaHNilmPDA4fM7a3bCWPeY)