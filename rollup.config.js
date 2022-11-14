import { babel } from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

const config = [
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.js',
    },
    external: [/@babel\/runtime/, 'react'],
    plugins: [
      babel({ babelHelpers: 'runtime', plugins: ['@babel/plugin-transform-runtime'] }),
      filesize(),
      typescript({
        clean: true,
        outDir: 'types',
        useTsconfigDeclarationDir: true,
      }),
      terser(),
    ],
  },
  {
    input: './types/index.d.ts',
    output: [{ file: 'dist/types.d.ts' }],
    plugins: [dts()],
  },
];

export default config;
