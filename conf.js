exports.config = {
  framework: 'jasmine',
  seleniumAddress: "http://localhost:4444/wd/hub",
  baseUrl: 'http://localhost:3000',
  specs: ['spec/*Spec.js']
};
