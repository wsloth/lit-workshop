import { createDefaultConfig } from '@open-wc/building-rollup';
import cpy from 'rollup-plugin-cpy';

const config = createDefaultConfig({
  input: './index.html',
});

export default [
  {
    ...config,
    plugins: [
      ...config.plugins,
      cpy({
        files: ['**/*.png'],
        dest: 'dist',
        options: {
          parents: true,
        },
      }),
    ],
  },
];
