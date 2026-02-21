# DragonSecurity Renovate Presets

A comprehensive, production-ready Renovate configuration preset designed for enterprise-grade dependency management with intelligent scheduling, automerge strategies, and security-first updates.

## 🚀 Quick Start

Add this preset to your repository's Renovate configuration:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>DragonSecurity/renovate-presets"]
}
```

Or in YAML:

```yaml
$schema: "https://docs.renovatebot.com/renovate-schema.json"
extends:
  - github>DragonSecurity/renovate-presets
```

## 📋 Features

### ⏰ Intelligent Scheduling
- **Daily Blackout Window**: Only runs between 08:00-18:00 Europe/Dublin time
- **Ecosystem-Specific Days**: Different package managers update on different weekdays
  - Monday: JavaScript dev dependencies & TypeScript types
  - Tuesday: JavaScript production dependencies
  - Wednesday: Docker versions
  - Thursday: Go modules
  - Friday: GitHub Actions (before 10:00)
- **Monthly Major Upgrade Day**: All major version updates grouped to first Thursday of the month (09:00-12:00)
- **Early Morning Docker Digests**: Security-focused digest updates run before 07:00

### 🔐 Security First
- **Automatic Vulnerability Patching**: Security alerts are auto-merged
- **OSV Vulnerability Alerts**: Enabled for comprehensive security coverage
- **Pin Digests**: All Docker images and GitHub Actions are pinned by digest
- **Rollback Protection**: Automatic rollback PRs for failed updates

### 🤖 Smart Automerge
- **Branch Automerge**: Patches, pins, digests, and lockfile maintenance merge without PRs
- **PR Automerge with Tests Skipped**: Minor updates merge immediately (configurable)
- **Security Updates**: Vulnerabilities auto-merge with security label
- **Major Updates**: Require manual review

### 📦 Ecosystem Support
Out-of-the-box configuration for:
- JavaScript/TypeScript (npm, pnpm, yarn)
- Docker (Dockerfile, docker-compose)
- Go modules
- GitHub Actions
- TypeScript type definitions

### 🎯 Optimized Grouping
- JavaScript dependencies grouped by type (prod/dev)
- Test framework updates grouped together
- Docker updates grouped by type (digests vs versions)
- Go modules grouped
- Major updates grouped for monthly review

## 🔧 Configuration Options

### Default Preset (`default.json`)
The simplified preset without scheduling constraints. Best for:
- Testing Renovate in new repositories
- Environments where you want Renovate to run 24/7
- Simpler setups without complex scheduling needs

### Advanced Preset (`renovate.yaml`)
The full-featured preset with intelligent scheduling. Best for:
- Production environments with team-based workflows
- Organizations wanting controlled update windows
- Teams that prefer batched updates by ecosystem

## 📊 Update Strategy

### Automerge Hierarchy
1. **Instant (Branch)**: Patches, pins, digests, lockfile maintenance
2. **Fast (PR, no CI wait)**: Minor versions, GitHub Actions patches/minors
3. **Controlled (PR, manual merge)**: Major versions (monthly)

### Cooldown Periods
- JavaScript minor updates: 3-day minimum release age
- Prevents merging bleeding-edge releases with potential issues

### Rate Limiting
- **Concurrent PRs**: 20 maximum
- **Hourly PR Creation**: 10 maximum
- Prevents overwhelming CI/CD pipelines

## 🛠️ Customization

### Overriding Schedule
```json
{
  "extends": ["github>DragonSecurity/renovate-presets"],
  "schedule": ["at any time"]
}
```

### Disabling Automerge
```json
{
  "extends": ["github>DragonSecurity/renovate-presets"],
  "packageRules": [
    {
      "matchUpdateTypes": ["minor"],
      "automerge": false
    }
  ]
}
```

### Adding Custom Grouping
```json
{
  "extends": ["github>DragonSecurity/renovate-presets"],
  "packageRules": [
    {
      "matchPackagePatterns": ["^eslint"],
      "groupName": "ESLint packages"
    }
  ]
}
```

### Changing Timezone
```json
{
  "extends": ["github>DragonSecurity/renovate-presets"],
  "timezone": "America/New_York"
}
```

## 🔍 Monitoring

### Dependency Dashboard
Enabled by default. View at: `https://github.com/YOUR_ORG/YOUR_REPO/issues`

The dashboard shows:
- Pending updates
- Rate-limited updates
- Updates pending approval
- Rejected/ignored updates

### Labels
All PRs are tagged with:
- `dependencies` - Standard label for all dependency updates
- `security` - Added to vulnerability alerts

## 🚨 Troubleshooting

### Updates Not Running
1. Check if you're within the schedule window (08:00-18:00 Europe/Dublin)
2. Verify Renovate has repository access
3. Check rate limits haven't been exceeded
4. Review the dependency dashboard for pending updates

### Too Many PRs
- Reduce `prConcurrentLimit` (default: 20)
- Reduce `prHourlyLimit` (default: 10)
- Add more aggressive grouping rules

### Automerge Not Working
- Ensure branch protection rules allow Renovate to merge
- Check that CI is passing (or use `ignoreTests: true` for specific rules)
- Verify `platformAutomerge` setting matches your GitHub settings

### Major Updates Not Appearing
- Major updates are scheduled for the first Thursday of each month
- Check the dependency dashboard - they may be pending schedule

## 📚 Additional Resources

- [Renovate Documentation](https://docs.renovatebot.com/)
- [Configuration Options Reference](https://docs.renovatebot.com/configuration-options/)
- [Preset Config Documentation](https://docs.renovatebot.com/config-presets/)

## 🤝 Contributing

This preset is managed by github-org-manager. For changes:
1. Submit issues for configuration improvements
2. Test changes in a fork before proposing
3. Document any new features or changes

## 📄 License

This preset configuration is available for use by DragonSecurity and affiliated projects.
