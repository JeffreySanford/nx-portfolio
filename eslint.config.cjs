const baseConfig = require('./eslint.base.config.cjs');
const nx = require('@nx/eslint-plugin');

module.exports = [
  ...baseConfig,
  {
    ignores: ['**/dist'],
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {
      // Enforce Module Boundaries
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],

      // Enforce Non-Standalone Components
      '@angular-eslint/prefer-standalone': [
        'error',
        {
          allow: false, // Standalone components are not allowed
        },
      ],

      // Component Selector Rules
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      // Directive Selector Rules
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],

      // Enforce File Naming Convention
      'filenames/match-regex': ['error', '^[a-z0-9.-]+$', true],
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.html'],
    rules: {
      // Enforce Best Practices for Templates
      '@angular-eslint/template/no-negated-async': 'error',
    },
  },
];
