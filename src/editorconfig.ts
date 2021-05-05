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

export interface CodeSegment {
  id: string,
  type: string,
  value: string,
  unlocked: boolean
}

export type CodeSegments = Array<CodeSegment>
let editorCode: CodeSegments = []

function htmlSegment(html: string) {
  let trimmed = html.trim()
  const reg = /<([^/]+?)>|<\/(.+?)>|((?<=>)[^<>][\S].+?(?=<))/g
  const matches = trimmed.matchAll(reg)

  for (const m of matches) {
    if (m[1] !== undefined) { // 1st bounding group, opening tags
      editorCode.push({
        id: uuidv4(),
        type: 'opening',
        value: m[1].replace('?', ''),
        unlocked: m[1].charAt(0) === '?'
      })
    } else if (m[2] !== undefined) { // 2nd bounding group, closing tags
      editorCode.push({
        id: uuidv4(),
        type: 'closing',
        value: m[2].replace('?', ''),
        unlocked: m[2].charAt(0) === '?'
      })
    } else if (m[3] !== undefined) { // 3rd bounding group, text
      editorCode.push({
        id: uuidv4(),
        type: 'text',
        value: m[3],
        unlocked: false
      })
    }
  }
}

htmlSegment(initialCode)

const editorConfig = {
  codeElements: editorCode
}

export default editorConfig