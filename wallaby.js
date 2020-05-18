module.exports = () => {
  return {
    files: ['index.html'],
    tests: ['test/**/*Spec.ts'],
    testFramework: 'jasmine',
    env: {
      type: 'node',
    },
  };
};
