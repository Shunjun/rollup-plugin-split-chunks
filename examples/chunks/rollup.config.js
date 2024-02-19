/* eslint-disable antfu/no-import-dist */
/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-19 02:22:53
 */

import splitChunks from '../../dist/index.mjs'

/**
 * Rollup configuration.
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'main.js',
  plugins: [splitChunks()],
  output: {
    dir: 'dist',
    // manualChunks: (chunk) => {
    //   if (/module\d/.test(chunk)) {
    //     let basename = path.basename(chunk)
    //     basename = basename.replace(/\.(c|m)?(j|t)s$/, '')
    //     return basename
    //   }

    //   return false
    // },
  },
}
