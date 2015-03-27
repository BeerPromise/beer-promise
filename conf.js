exports.config = {
  framework: 'jasmine2',
  seleniumAddress: "http://localhost:4444/wd/hub",
  baseUrl: 'http://localhost:3000',
  specs: ['specs/features/*.spec.js']
};