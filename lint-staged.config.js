module.exports = {
  'backend/**/*.{js,jsx,ts,tsx}': ['eslint --config backend/eslint.config.mjs --fix', 'prettier --write'],
  'frontend/**/*.{js,jsx,ts,tsx}': ['eslint --config frontend/eslint.config.mjs --fix', 'prettier --write'],
};
