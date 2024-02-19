/* eslint-disable no-console */
/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-19 14:40:00
 */

// import { bb } from 'b'

export async function module2Fn() {
  const { bb } = await import ('b')
  console.log(bb)
}
