/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-19 02:22:53
 */

import resolve from '@rollup/plugin-node-resolve'

/**
 * Rollup configuration.
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'main.js',
  plugins: [resolve()],
  output: {
    dir: 'dist',
  },
}
