import type { Plugin } from 'rollup'

export default function SplitChunks(): Plugin {
  return {
    name: 'split-chunks',
    buildStart() {
      // eslint-disable-next-line no-console
      console.log('Hello, world!')
    },
  }
}
