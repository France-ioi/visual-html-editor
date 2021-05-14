import {v4 as uuidv4} from 'uuid'

const initialCode = "<body>" +
  "<div>" +
  "<h1>" +
  "Example Domain" +
  "</h1>" +
  "<p>This domain is for use in illustrative examples in documents. " +
  "You may use this domain in literature without prior coordination or asking for permission.</p>" +
  "<p>More <i>information</i>...</p>" +
  "<span><?i>Hello world</?i></span>" +
  "<p>Hello!</p>" +
  "</div>" +
  "</body>"

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
}

export type CodeSegments = Array<CodeSegment>

export function htmlSegment(html: string, unlockAll: boolean) {
  let editorCode: CodeSegments = []
  let trimmed = html.trim()
  const reg = /<([^/]+?)>|<\/(.+?)>|([^<>\s][a-zA-Z.]+)/g
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
  let stringedHTML = ''
  if (typeof elements === "string") {
    stringedHTML = elements.replaceAll(/(?<=<|<\/)[?]/g, '')
  } else {
    elements.map(e => {
      let stripped = e.type === 'text' ? `${e.value} ` : e.value.replace('?', '')
      if (e.type === 'opening') {
        stripped = '<' + stripped + '>'
      } else if (e.type === 'closing') {
        stripped = '</' + stripped + '>'
      }
      stringedHTML += stripped
    })
  }
  return beautifyHTML(stringedHTML, {wrap_line_length: 0})
}

const editorConfig = {
  type: EditorType.Visual,
  codeElements: htmlSegment(initialCode, false),
  codeString: parseHTMLToString(initialCode)
}

export default editorConfig