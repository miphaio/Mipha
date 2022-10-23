const { createStorybookConfig } = require('@sudoo/storybook-config');

module.exports = createStorybookConfig(
    {
        stories: ['../stories/**/*.story.*'],
    },
);
