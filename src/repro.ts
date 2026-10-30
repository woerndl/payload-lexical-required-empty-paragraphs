import config from '@payload-config'
import { getPayload } from 'payload'

const paragraph = { type: 'paragraph', children: [], direction: null, format: '', indent: 0, textFormat: 0, textStyle: '', version: 1 }
const state = (children: object[]) => ({ root: { type: 'root', children, direction: null, format: '', indent: 0, version: 1 } })

const payload = await getPayload({ config })
for (const [label, body] of [
  ['one empty paragraph', state([paragraph])],
  ['two empty paragraphs', state([paragraph, paragraph])],
] as const) {
  try {
    const doc = await payload.create({ collection: 'posts', data: { body } as never })
    console.log(`${label}: saved ${doc.id}`)
  } catch (error) {
    console.log(`${label}: rejected (${(error as Error).message})`)
  }
}
process.exit(0)
