const initialCode = "<body><div><h1>Example Domain</h1><p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p><p>More <i>information</i>...</p></div></body>"

interface CodeSegment {
  type: string,
  value: string,
  fullValue: string,
  pos?: number
}

type InitialCode = string
type CodeSegments = Array<CodeSegment>

export interface InitialEditorState {
  lockedCode: CodeSegments,
  userCode?: CodeSegments
}


function htmlSegment(html: string) {
  let trimmed = html.trim()
  const reg = /<([^\/]+?)>|<\/(.+?)>|((?<=>)[^<>][\S].+?(?=<))/g
  const matches = trimmed.matchAll(reg)
  for (const m of matches) {
    if (m[1] !== undefined) {
      lockedCode.push({
        type: 'opening',
        value: m[1],
        fullValue: m[0]
      })
    } else if (m[2] !== undefined) {
      lockedCode.push({
        type: 'closing',
        value: m[2],
        fullValue: m[0]
      })
    } else if (m[3] !== undefined) {
      lockedCode.push({
        type: 'text',
        value: m[3],
        fullValue: m[0]
      })
    }
  }
}

let lockedCode: CodeSegments = []
let userCode: CodeSegments = []

htmlSegment(initialCode)

const editorConfig: InitialEditorState = {
  lockedCode: lockedCode
}

export default editorConfig