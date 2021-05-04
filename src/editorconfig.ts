import {v4 as uuidv4} from 'uuid'

const initialCode = "<body>" +
  "<div>" +
  "<?h1>" +
  "Example Domain" +
  "</?h1>" +
  "<p>This domain is for use in illustrative examples in documents. " +
  "You may use this domain in literature without prior coordination or asking for permission.</p>" +
  "<?p>More <i>information</i>...</?p>" +
  "</div>" +
  "</body>"

export interface CodeSegment {
  id: number,
  type: string,
  value: string,
  locked: boolean
}

export type CodeSegments = Array<CodeSegment>

let editorCode: CodeSegments = []

function htmlSegment(html: string) {
  let trimmed = html.trim()
  const reg = /<([^\/]+?)>|<\/(.+?)>|((?<=>)[^<>][\S].+?(?=<))/g
  const matches = trimmed.matchAll(reg)
  for (const m of matches) {
    if (m[1] !== undefined) { // 1st bounding group, opening tags
      editorCode.push({
        id: 1,
        type: 'opening',
        value: m[1].substring(1),
        locked: m[1].charAt(0) === '?'
      })
    } else if (m[2] !== undefined) { // 2nd bounding group, closing tags
      editorCode.push({
        id: 2,
        type: 'closing',
        value: m[2].substring(1),
        locked: m[2].charAt(0) === '?'
      })
    } else if (m[3] !== undefined) { // 3rd bounding group, text
      editorCode.push({
        id: 3,
        type: 'text',
        value: m[3],
        locked: true
      })
    }
  }
}

htmlSegment(initialCode)

const editorConfig: InitialEditorState = {
  lockedCode: lockedCode,
  userCode: userCode
}

export default editorConfig