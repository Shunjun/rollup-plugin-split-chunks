/* eslint-disable no-console */
/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-19 00:25:15
 */

import process from 'node:process'
import path from 'node:path'
import { rollup } from 'rollup'
import { toArray } from '@shunjun/utils'

const cwd = process.cwd()
const configPath = path.resolve(cwd, 'rollup.config.js')

async function compile() {
  const { default: config } = await import(configPath)
  const bundle = await rollup(config)

  const { output } = await bundle.generate(config.output || {})

  toArray(output).forEach((chunk) => {
    console.log(chunk)
  })

  bundle.write(config.output || {})
}

compile ()
