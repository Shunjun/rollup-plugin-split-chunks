/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-19 00:03:57
 */

import cp from 'node:child_process'
import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const __childProcessPath = path.resolve(__dirname, './build-process.js')

export function build(callback) {
  const deleteFiles = (dir) => {
    const targetDir = path.resolve('dist', dir)

    if (path.extname(targetDir) === '') {
      fs.readdirSync(targetDir).forEach((file) => {
        deleteFiles(path.join(targetDir, file))
      })
    }
    else {
      fs.unlinkSync(targetDir)
    }
  }

  if (fs.existsSync('dist')) {
    for (const dir of fs.readdirSync('dist'))
      deleteFiles(dir)
  }

  let disconnectIO = null
  const connectIO = (subprocess) => {
    const { stdin, stdout, stderr } = process
    const { stdin: _stdin, stdout: _stdout, stderr: _stderr } = subprocess
    const inputPair = [[stdin, _stdin]]
    const outputPair = [[stdout, _stdout], [stderr, _stderr]]
    inputPair.forEach((pair) => {
      pair[0].pipe(pair[1])
    })
    outputPair.forEach((pair) => {
      pair[1].pipe(pair[0])
    })
    disconnectIO = () => {
      inputPair.forEach((pair) => {
        pair[0].unpipe(pair[1])
      })
      outputPair.forEach((pair) => {
        pair[1].unpipe(pair[0])
      })
    }
  }

  const subprocess = cp.exec(`node ${__childProcessPath}`, (error, stdout, stderr) => {
    disconnectIO && disconnectIO()
    if (stderr)
      // eslint-disable-next-line no-console
      console.log(stderr)
    if (error !== null)
      // eslint-disable-next-line no-console
      console.log(error)

    callback && callback()
  })

  connectIO(subprocess)
}
