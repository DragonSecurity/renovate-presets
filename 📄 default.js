/**
 * DragonSecurity Renovate Preset
 *
 * Features:
 *  - Global blackout window: only run between 08:00–18:00 Europe/Dublin
 *  - Weekly update cadence grouped by ecosystem
 *  - Monthly “upgrade day” for all major bumps
 *  - Automerge safe updates and lockfile maintenance
 *  - GitHub/OSV vulnerability alerts auto-merged
 */

module.exports = {
  $schema: "https://docs.renovatebot.com/renovate-schema.json",

  extends: [
    "config:recommended",
    ":semanticCommits",
    ":semanticCommitTypeAll(chore)",
    ":timezone(Europe/Dublin)",
    "helpers:pinGitHubActionDigests",
    "docker:pinDigests",
    ":pinDevDependencies",
  ],

  // PR cadence / hygiene
  rebaseWhen: "auto",
  recreateWhen: "auto",
  recreateClosed: true,
  prNotPendingHours: 12, // Delay PRs if CI checks are pending
  pruneStaleBranches: true,
  rollbackPrs: true,

  // Versioning / ranges
  rangeStrategy: "bump",

  // Dashboard
  dependencyDashboard: true,
  dependencyDashboardAutoclose: true,

  // PR defaults
  labels: ["dependencies"],
  prConcurrentLimit: 20,
  prHourlyLimit: 10,

  // Automerge behavior
  platformAutomerge: false,
  automergeStrategy: "squash",
  separateMinorPatch: true,
  separateMultipleMajor: true,
  separateMultipleMinor: true,

  // Global allowlist schedule (implements blackout outside 08:00–18:00)
  // Renovate schedules are "allowed times" — this defines the *active* window.
  schedule: ["after 08:00 and before 18:00"],

  // Keep lockfiles fresh (safe to automerge)
  lockFileMaintenance: {
    enabled: true,
    automerge: true,
  },

  // Security alerts (GitHub advisories)
  vulnerabilityAlerts: {
    enabled: true,
    automerge: true,
    addLabels: ["security"],
  },

  // OSV alerts (for registry-based vulnerabilities)
  osvVulnerabilityAlerts: {
    enabled: true,
    automerge: true,
  },

  packageRules: [
    // --- Safe & instant automerges -----------------------------------------
    {
      description: "Instant, no-PR updates for safest classes",
      matchUpdateTypes: ["patch", "pin", "digest", "lockFileMaintenance"],
      automerge: true,
      automergeType: "branch",
    },
    {
      description: "Minor updates: PR-based but merge immediately (skip waiting for CI)",
      matchUpdateTypes: ["minor"],
      automerge: true,
      automergeType: "pr",
      ignoreTests: true,
    },

    // --- Language/tool specific rules -------------------------------------
    {
      description: "Go tidy after updates",
      matchManagers: ["gomod"],
      postUpdateOptions: ["gomodTidy"],
    },
    {
      description: "GitHub Actions patch/minor allowed (Fridays AM)",
      matchManagers: ["github-actions"],
      matchUpdateTypes: ["patch", "minor"],
      automerge: true,
      automergeType: "pr",
      ignoreTests: true,
      groupName: "GitHub Actions",
      schedule: ["on friday before 10:00"],
    },

    // --- Group by ecosystem -----------------------------------------------

    // JS prod deps → Tuesdays
    {
      description: "Group JS prod deps",
      matchManagers: ["npm", "pnpm", "yarn"],
      matchDepTypes: ["dependencies", "optionalDependencies"],
      excludeUpdateTypes: ["major"],
      groupName: "JS prod dependencies",
      schedule: ["on tuesday before 10:00"],
    },
    // JS dev deps → Mondays
    {
      description: "Group JS dev deps",
      matchManagers: ["npm", "pnpm", "yarn"],
      matchDepTypes: ["devDependencies", "peerDependencies"],
      excludeUpdateTypes: ["major"],
      groupName: "JS dev dependencies",
      schedule: ["on monday before 10:00"],
    },
    // Type definitions → Mondays
    {
      description: "Group @types/* packages",
      matchManagers: ["npm", "pnpm", "yarn"],
      matchPackagePatterns: ["^@types/"],
      excludeUpdateTypes: ["major"],
      groupName: "TypeScript types",
      schedule: ["on monday before 10:00"],
    },
    // JS test tools → Mondays
    {
      description: "Group JS test tooling",
      matchManagers: ["npm", "pnpm", "yarn"],
      matchPackagePatterns: [
        "(?i)jest",
        "(?i)vitest",
        "^@testing-library/",
        "(?i)mocha",
        "(?i)chai",
        "(?i)playwright",
        "(?i)cypress",
      ],
      excludeUpdateTypes: ["major"],
      groupName: "JS test tools",
      schedule: ["on monday before 10:00"],
    },

    // Docker digests → early morning
    {
      description: "Group Docker digests",
      matchManagers: ["dockerfile", "docker-compose"],
      matchUpdateTypes: ["digest"],
      groupName: "Docker digests",
      schedule: ["before 07:00"], // runs outside blackout window intentionally
    },
    // Docker versions (no majors) → Wednesdays
    {
      description: "Group Docker version bumps",
      matchManagers: ["dockerfile", "docker-compose"],
      matchUpdateTypes: ["minor", "patch"],
      groupName: "Docker versions",
      schedule: ["on wednesday before 10:00"],
    },

    // Go modules (no majors) → Thursdays
    {
      description: "Group Go modules",
      matchManagers: ["gomod"],
      excludeUpdateTypes: ["major"],
      groupName: "Go modules",
      schedule: ["on thursday before 10:00"],
    },

    // JS minors cooldown
    {
      description: "JS minors: optional cool-down; remove if you want truly instant",
      matchManagers: ["npm", "pnpm", "yarn"],
      matchUpdateTypes: ["minor"],
      minimumReleaseAge: "3 days",
    },

    // --- Monthly Upgrade Day (Majors) -------------------------------------
    {
      description: "Route ALL major updates to a monthly upgrade day",
      matchUpdateTypes: ["major"],
      automerge: false,
      draftPR: false,
      prPriority: 2,
      groupName: "Monthly Upgrade Day (majors)",
      // First Thursday of each month, 09:00–12:00 Dublin time
      schedule: ["on the first thursday of the month after 09:00 and before 12:00"],
    },
  ],
};
