module.exports = {
  create(context) {
    return {
      Identifier: function (node) {
        if (node.name.includes('tomas') || node.name.includes('Tomas'))
          context.report({
            node,
            message: 'Avoid word Tomas/tomas in variable names',
          });
      },
    };
  },
};
