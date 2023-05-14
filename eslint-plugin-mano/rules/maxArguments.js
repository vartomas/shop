module.exports = {
  create(context) {
    return {
      FunctionDeclaration: function (node) {
        if (node.params.length > 3) {
          context.report({
            node,
            message: 'Function declaration has more than 3 parameters.',
          });
        }
      },
      CallExpression(node) {
        const { callee, arguments: args } = node;
        if (args.length > 3) {
          context.report({
            node: callee,
            message: 'Function call has more than 3 arguments.',
          });
        }
      },
    };
  },
};
