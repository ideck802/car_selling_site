const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  plugins: ['stylelint-order'],
  extends: 'stylelint-config-wikimedia',
  rules: {
    'order/properties-order': [
      sortOrderSmacss({ emptyLineBefore: 'always' })
    ],
    'declaration-empty-line-before': null,
    'selector-max-id': 2,
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': [ true,
      {
        'ignoreShorthands': ["/flex/"]
      }
    ],
  },
};
