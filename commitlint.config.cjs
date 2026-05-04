module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: 'conventional-changelog-conventionalcommits',
    ignores: [(message) => message.indexOf('chore(release)') === 0],
};
