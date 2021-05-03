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
  type: string,
  value: string,
  fullValue: string,
  pos?: number,
  locked?: boolean
}

export type CodeSegments = Array<CodeSegment>

export interface InitialEditorState {
  lockedCode: CodeSegments,
  userCode: CodeSegments,
}

let lockedCode: CodeSegments = []
let userCode: CodeSegments = []

function htmlSegment(html: string) {
  let trimmed = html.trim()
  const reg = /<([^\/]+?)>|<\/(.+?)>|((?<=>)[^<>][\S].+?(?=<))/g
  const matches = trimmed.matchAll(reg)
  let positionIncrement = -1 // Set initial index to -1
  for (const m of matches) {
    positionIncrement++ // 0 on start, ++ every iteration
    if (m[1] !== undefined) { // 1st bounding group, opening tags
      if (m[1].charAt(0) === '?') { // Check for special ? syntax (editable block)
        userCode.push({
          type: 'opening',
          value: m[1].substring(1),
          fullValue: m[0].slice(0, 1) + m[0].slice(2), // Remove ?
          pos: positionIncrement,
          locked: false
        })
      } else { // Else, readonly block
        lockedCode.push({
          type: 'opening',
          value: m[1],
          fullValue: m[0],
          locked: true
        })
      }
    } else if (m[2] !== undefined) { // 2nd bounding group, closing tags
      if (m[2].charAt(0) === '?') { // Check for special ? syntax (editable block)
        userCode.push({
          type: 'closing',
          value: m[2].substring(1),
          fullValue: m[0].slice(0, 2) + m[0].slice(3), // Remove ?
          pos: positionIncrement,
          locked: false
        })
      } else {
        lockedCode.push({
          type: 'closing',
          value: m[2],
          fullValue: m[0],
          locked: true
        })
      }
    } else if (m[3] !== undefined) { // 3rd bounding group, text
      lockedCode.push({
        type: 'text',
        value: m[3],
        fullValue: m[0],
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