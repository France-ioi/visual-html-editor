import {v4 as uuidv4} from 'uuid'
import {initialMode, initialCode} from './appconfig'

export enum TagType {
  Opening = 'opening',
  Closing = 'closing',
  Text = 'text'
}

export enum EditorType {
  Textual = 'textual',
  Visual = 'visual'
}

export interface CodeSegment {
  id: string,
  type: TagType,
  value: string,
  unlocked: boolean
  index?: number
}

export type CodeSegments = Array<CodeSegment>

export const makeTag = (tag: CodeSegment) => {
  let returnTag: string
  if (tag.type !== 'text') {
    returnTag = tag.type === 'closing' ? `</${tag.value}>` : `<${tag.value}>`
  } else {
    returnTag = tag.value + ' '
  }
  return returnTag
}

export function htmlSegment(html: string, unlockAll: boolean) {
  let editorCode: CodeSegments = []
  let trimmed = html.trim()
  const reg = /<([^/][^>]*?)>|<\/(.+?)>|([^<>\s][a-zA-Z.!]*)/g
  const matches = trimmed.matchAll(reg)

  for (const m of matches) {
    if (m[1] !== undefined) { // 1st bounding group, opening tags
      editorCode.push({
        id: uuidv4(),
        type: TagType.Opening,
        value: m[1].replace('?', ''),
        unlocked: m[1].charAt(0) === '?' || unlockAll
      })
    } else if (m[2] !== undefined) { // 2nd bounding group, closing tags
      editorCode.push({
        id: uuidv4(),
        type: TagType.Closing,
        value: m[2].replace('?', ''),
        unlocked: m[2].charAt(0) === '?' || unlockAll
      })
    } else if (m[3] !== undefined) { // 3rd bounding group, text
      editorCode.push({
        id: uuidv4(),
        type: TagType.Text,
        value: m[3],
        unlocked: false
      })
    }
  }

  return editorCode
}

const beautifyHTML = require('js-beautify').html

export function parseHTMLToString(elements: CodeSegments | string) {
  const selfClosingBlock = [
    'hr', 'br'
  ]
  let stringedHTML = ''
  // if (typeof elements === "string") {
  //   // Remove question mark modifier (locked/unlocked tag) if element (start < or </)
  //   // TODO Modify to ignore question marks that are not directly after tag opening
  //
  //   stringedHTML = elements.replaceAll(/(?:<|<\/)([?])/g, '')
  // } else {
  if (typeof elements !== 'string')
    elements.map((e, index) => {
      if (
        (e.value === 'p' && e.type === TagType.Closing)
        ||
        (selfClosingBlock.includes(e.value) && elements[index - 1].value !== 'p')
      ) stringedHTML += '\n'
      stringedHTML += makeTag(e)
      if (
        e.value === 'p'
        ||
        (selfClosingBlock.includes(e.value) && elements[index + 1].value !== 'p')
      ) stringedHTML += '\n'
      return stringedHTML
    })
  // }
  return beautifyHTML(stringedHTML, {wrap_line_length: 0, preserve_newlines: true})
}

const editorConfig = {
  type: initialMode,
  codeElements: htmlSegment(initialCode, false),
  codeString: parseHTMLToString(initialCode)
}

export default editorConfig