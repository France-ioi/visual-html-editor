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

interface CodeSegment {
  type: string,
  value: string,
  fullValue: string,
  pos?: number
}

type CodeSegments = Array<CodeSegment>

export interface InitialEditorState {
  lockedCode: CodeSegments,
  userCode?: CodeSegments
}

let lockedCode: CodeSegments = []
let userCode: CodeSegments = []

function htmlSegment(html: string) {
  let trimmed = html.trim()
  const reg = /<([^\/]+?)>|<\/(.+?)>|((?<=>)[^<>][\S].+?(?=<))/g
  const matches = trimmed.matchAll(reg)
  let positionIncrement = -1
  for (const m of matches) {
    positionIncrement++
    if (m[1] !== undefined) { // 1st bounding group, opening tags
      if (m[1].charAt(0) === '?') { // Check for special ? syntax (editable block)
        userCode.push({
          type: 'opening',
          value: m[1].substring(1),
          fullValue: m[0].slice(0, 1) + m[0].slice(2), // Remove ?
          pos: positionIncrement
        })
      } else { // Else, readonly block
        lockedCode.push({
          type: 'opening',
          value: m[1],
          fullValue: m[0]
        })
      }
    } else if (m[2] !== undefined) { // 2nd bounding group, closing tags
      if (m[2].charAt(0) === '?') {
        userCode.push({
          type: 'closing',
          value: m[2].substring(1),
          fullValue: m[0].slice(0, 2) + m[0].slice(3), // Remove ?
          pos: positionIncrement
        })
      } else {
        lockedCode.push({
          type: 'closing',
          value: m[2],
          fullValue: m[0]
        })
      }
    } else if (m[3] !== undefined) { // 3rd bounding group, text
      lockedCode.push({
        type: 'text',
        value: m[3],
        fullValue: m[0]
      })
    }
  }
}

htmlSegment(initialCode)

const editorConfig: InitialEditorState = {
  lockedCode: lockedCode,
  userCode: userCode
}

console.log(editorConfig)

export default editorConfig