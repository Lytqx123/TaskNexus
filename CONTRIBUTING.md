# Contributing to TaskNexus

Keep contributions focused on a single product change. Read the component's README and preserve its existing architecture and dependency contracts.

## Local workflow

1. Start from the current local source and create an isolated branch when needed.
2. Make a small, reviewable change with relevant validation.
3. Review `git diff` and run `git diff --check` before committing.
4. Describe the problem, resulting behavior and verification in the change description.

This source checkout does not assume a TaskNexus GitHub account, repository or public domain. Configure your own remote before pushing changes.

## Validation

- Web UI and server: use the scripts in `webapp/package.json`.
- Python: validate the execution service using its existing environment and test configuration.
- Rust: `cargo metadata --no-deps --locked` validates package metadata; use the existing Cargo build/test commands for implementation changes.
- Deployment: run `docker compose config --quiet` and check service, image, volume and environment references.
- Brand assets: regenerate with `python scripts/generate_brand_assets.py` when intentionally changing the original TaskNexus artwork.

Some integration tests contact services or create database records. Run those against an isolated development environment.

## Product naming

Use `TaskNexus` in product copy and `tasknexus` in package names, images and internal product identifiers. Keep third-party package names and API contracts consistent with the implementations used by the application.

## Commit messages

Use a clear conventional commit, such as `feat: add a workflow option` or `fix: restore datasource progress updates`. Include the relevant test evidence when sharing a change.
