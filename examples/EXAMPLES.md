# Renovate Preset Examples

This directory contains example configurations demonstrating different ways to use and customize the DragonSecurity Renovate presets.

## Quick Reference

| Example | Use Case | Best For |
|---------|----------|----------|
| [simple.json](#simple) | Basic usage | Getting started, standard projects |
| [security-focused.json](#security-focused) | Maximum security | High-security environments, production systems |
| [conservative.json](#conservative) | Manual control | Teams preferring review, critical systems |
| [monorepo.json](#monorepo) | Large codebases | Monorepos, multiple package managers |
| [custom-timezone.json](#custom-timezone) | Regional teams | Non-Europe/Dublin timezones |

## Examples

### Simple

**File:** `examples/simple.json`

The simplest possible configuration - just extend the preset and you're done.

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>DragonSecurity/renovate-presets"]
}
```

**Features:**
- All preset defaults applied
- Intelligent scheduling enabled
- Automerge for safe updates
- Security updates prioritized

**When to use:**
- Starting with Renovate
- Standard project setup
- Trust the preset defaults
- Want hands-off dependency management

---

### Security-Focused

**File:** `examples/security-focused.json`

Maximizes security by allowing vulnerability patches to run at any time, bypassing normal schedules.

**Key Changes:**
- Security updates run 24/7
- Additional "critical" label for visibility
- Patches bypass schedule restrictions
- Immediate vulnerability response

**When to use:**
- Production systems
- Security-critical applications
- Compliance requirements
- Zero-day vulnerability response needed

**Trade-offs:**
- May create PRs during off-hours
- More frequent updates
- Potentially more CI/CD resource usage

---

### Conservative

**File:** `examples/conservative.json`

Reduces automation and requires manual review for most updates.

**Key Changes:**
- Automerge disabled for minor updates
- Automerge disabled for patches (except security)
- Lower PR limits (5 concurrent, 2 per hour)
- Dependency dashboard approval required

**When to use:**
- Highly regulated environments
- Small teams with limited CI/CD resources
- Projects where stability is paramount
- Learning Renovate behavior

**Trade-offs:**
- More manual work required
- Slower dependency updates
- Reduced automation benefits

---

### Monorepo

**File:** `examples/monorepo.json`

Optimized for large monorepos with multiple projects and package managers.

**Key Changes:**
- Aggressive grouping (all non-major into single PR)
- Automerge respects tests (doesn't ignore)
- Ignores build/dist directories
- Lower concurrent PRs to reduce CI load

**When to use:**
- Monorepo structures
- Multiple interdependent packages
- Consistent update strategy across projects
- Want to reduce PR noise

**Trade-offs:**
- Larger PRs (more changes per PR)
- If one update fails tests, entire PR blocked
- May need more CI resources per PR

**Tips:**
- Customize `ignorePaths` for your structure
- Adjust `prConcurrentLimit` based on CI capacity
- Consider splitting by workspace in very large repos

---

### Custom Timezone

**File:** `examples/custom-timezone.json`

Adapts the schedule to a different timezone and team working hours.

**Key Changes:**
- Timezone set to America/New_York
- Working hours: 9am-5pm weekdays
- JavaScript updates Monday morning
- Docker updates Wednesday morning

**When to use:**
- Team in different timezone
- Non-standard working hours
- Want updates during team availability
- Regional compliance requirements

**How to customize:**
1. Change `timezone` to your region
2. Adjust `schedule` to your working hours
3. Update ecosystem schedules to match team calendar
4. Consider holidays and team meetings

**Common timezones:**
- `America/New_York` - US Eastern
- `America/Los_Angeles` - US Pacific
- `Europe/London` - UK
- `Europe/Dublin` - Ireland (default)
- `Asia/Tokyo` - Japan
- `Australia/Sydney` - Australia

---

## Combining Examples

You can combine concepts from multiple examples:

### Example: Security-focused with custom timezone

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>DragonSecurity/renovate-presets"],
  "timezone": "America/New_York",
  "schedule": ["after 9am and before 5pm every weekday"],
  "vulnerabilityAlerts": {
    "enabled": true,
    "automerge": true,
    "schedule": ["at any time"],
    "addLabels": ["security", "critical"]
  }
}
```

### Example: Conservative monorepo

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>DragonSecurity/renovate-presets"],
  "prConcurrentLimit": 5,
  "dependencyDashboardApproval": true,
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": false,
      "groupName": "All non-major updates"
    }
  ]
}
```

## Testing Your Configuration

### Dry Run Mode
Test any configuration without making actual changes:

```json
{
  "extends": ["github>DragonSecurity/renovate-presets"],
  "dryRun": "full"
}
```

### Validation
Before committing your configuration:

```bash
# Validate JSON syntax
jq empty renovate.json

# If you have Renovate CLI
renovate-config-validator
```

## Common Customization Patterns

### Adjust Rate Limits
```json
{
  "prConcurrentLimit": 10,
  "prHourlyLimit": 5
}
```

### Change Automerge Strategy
```json
{
  "automergeStrategy": "merge",  // or "squash", "rebase"
}
```

### Add Custom Labels
```json
{
  "labels": ["dependencies", "renovate", "automerge"]
}
```

### Ignore Specific Packages
```json
{
  "ignoreDeps": ["package-name", "another-package"]
}
```

### Pin Specific Versions
```json
{
  "packageRules": [
    {
      "matchPackageNames": ["nodejs"],
      "allowedVersions": ">=18.0.0"
    }
  ]
}
```

## Getting Help

- Review the [main README](../README.md) for detailed documentation
- Check [Renovate documentation](https://docs.renovatebot.com/)
- See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines
- Open an issue for questions or problems

## Contributing Examples

Have a useful configuration pattern? Contribute it!

1. Create a new example file
2. Add description and use case
3. Document key features and trade-offs
4. Update this README
5. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.
