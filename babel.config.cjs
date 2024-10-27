// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Esto es importante para que Babel sepa que está apuntando a la versión actual de Node.js
        },
      },
    ],
  ],
};
