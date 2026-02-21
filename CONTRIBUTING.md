# Contributing to DragonSecurity Renovate Presets

Thank you for your interest in improving our Renovate presets! This guide will help you understand how to contribute effectively.

## Getting Started

### Prerequisites
- Understanding of Renovate Bot and its configuration options
- Familiarity with JSON and YAML
- Knowledge of dependency management best practices

### Repository Structure
```
.
├── default.json              # Simplified preset (no scheduling)
├── .github/
│   ├── renovate.json        # Self-configuration
│   ├── renovate.yaml        # Advanced preset with scheduling
│   └── agents/              # Agent instruction files
│       ├── renovate-expert.md
│       ├── documentation-expert.md
│       └── validation-expert.md
├── README.md                # Main documentation
└── CONTRIBUTING.md          # This file
```

## Types of Contributions

### 1. Configuration Improvements
Enhance the Renovate presets with:
- Support for additional package managers
- Improved grouping strategies
- Better scheduling logic
- Security enhancements
- Performance optimizations

### 2. Documentation Updates
Improve documentation by:
- Fixing typos or errors
- Adding examples
- Clarifying explanations
- Adding troubleshooting guides
- Improving structure

### 3. Bug Fixes
Fix issues such as:
- Invalid configuration syntax
- Conflicting package rules
- Incorrect schedule expressions
- Broken links in documentation

## Contribution Process

### 1. Fork and Clone
```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR_USERNAME/renovate-presets.git
cd renovate-presets
```

### 2. Create a Branch
```bash
git checkout -b feature/your-improvement-name
```

### 3. Make Changes
Follow these guidelines:
- Make minimal, focused changes
- Test configurations before committing
- Update documentation for any config changes
- Keep backward compatibility

### 4. Validate Your Changes

#### JSON Validation
```bash
# Validate JSON syntax
jq empty default.json
```

#### YAML Validation
```bash
# Validate YAML syntax
yamllint .github/renovate.yaml
```

#### Schema Validation
Ensure configurations comply with the Renovate schema:
- Check against https://docs.renovatebot.com/renovate-schema.json
- Verify all options are valid
- Check for deprecated options

### 5. Test Your Changes

#### Local Testing
1. Create a test repository
2. Add your modified preset
3. Run Renovate in dry-run mode
4. Verify expected behavior

#### Example Test Configuration
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["local>your-fork/renovate-presets"],
  "dryRun": "full"
}
```

### 6. Update Documentation
- Update README.md if adding features
- Add examples for new functionality
- Update CHANGELOG.md (if exists)
- Add inline comments for complex logic

### 7. Commit Your Changes
Follow semantic commit conventions:
```bash
# Format: <type>(<scope>): <subject>

git commit -m "feat(config): add Python dependency grouping"
git commit -m "docs(readme): add troubleshooting section"
git commit -m "fix(schedule): correct weekly schedule expression"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code restructuring
- `chore`: Maintenance tasks

### 8. Push and Create PR
```bash
git push origin feature/your-improvement-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference any related issues
- Explain the motivation for changes
- Include before/after examples
- List any breaking changes

## Code Review Process

### What to Expect
1. Automated validation checks
2. Review by maintainers
3. Possible request for changes
4. Approval and merge

### Review Criteria
- Configuration correctness
- Documentation quality
- Backward compatibility
- Security implications
- Performance impact

## Best Practices

### Configuration Changes

#### Do's ✅
- Test thoroughly before submitting
- Maintain backward compatibility
- Add descriptive comments
- Group related changes
- Update documentation
- Consider performance impact
- Think about security implications

#### Don'ts ❌
- Break existing functionality
- Add untested configurations
- Make undocumented changes
- Ignore schema validation
- Skip documentation updates
- Introduce security risks

### Documentation Changes

#### Do's ✅
- Use clear, simple language
- Provide complete examples
- Include code blocks with syntax highlighting
- Link to relevant resources
- Check spelling and grammar
- Test all code examples

#### Don'ts ❌
- Use jargon without explanation
- Provide incomplete examples
- Include broken links
- Make assumptions about user knowledge
- Copy-paste without verification

## Configuration Guidelines

### Adding Package Manager Support
```json
{
  "description": "Group [manager] dependencies",
  "matchManagers": ["manager-name"],
  "excludeUpdateTypes": ["major"],
  "groupName": "Manager dependencies"
}
```

Consider:
- Ecosystem-specific post-update options
- Appropriate update frequency
- Grouping strategy
- Common patterns in that ecosystem

### Creating Schedule Rules
```yaml
schedule:
  - "on monday after 09:00 and before 10:00"
```

Guidelines:
- Use the global schedule window (08:00-18:00 Europe/Dublin)
- Spread different ecosystems across the week
- Consider CI/CD load
- Document the reasoning

### Automerge Configuration
Be conservative with automerge:
- ✅ Patches, pins, digests
- ✅ Security updates
- ⚠️ Minor updates (consider test requirements)
- ❌ Major updates (require manual review)

## Getting Help

### Resources
- [Renovate Documentation](https://docs.renovatebot.com/)
- [Configuration Options](https://docs.renovatebot.com/configuration-options/)
- [Preset Configs](https://docs.renovatebot.com/config-presets/)

### Questions
For questions about contributing:
1. Check existing documentation
2. Search closed issues/PRs
3. Open a new discussion
4. Reach out to maintainers

## License and Attribution

By contributing, you agree that your contributions will be licensed under the same license as the project.

Give credit where due:
- Reference sources of inspiration
- Link to related discussions
- Acknowledge collaborators

## Thank You! 🎉

Every contribution, no matter how small, helps improve this project. We appreciate your time and effort in making dependency management better for everyone.
