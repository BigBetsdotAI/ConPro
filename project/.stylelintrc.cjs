module.exports = {
  // Minimal stylelint config to avoid external dependencies in this repo
  defaultSeverity: 'warning',
  rules: {
    // Allow Tailwind at-rules like @tailwind and @apply
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'screen']
      }
    ],
    // Allow unknown pseudo-classes used by Tailwind
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
};
