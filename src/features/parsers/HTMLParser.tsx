import {useAppSelector} from "../../hooks"
import {useEffect} from "react"
import {EditorType} from "../../editorconfig"
// @ts-ignore // TODO Remove when package is updated to re-enable TS types
import tinyhtml from "tiny-html-lexer"

// TODO Refactor to be generic parser component which will call parsing logic components for relevant lang
function HTMLParser() {
  const editorMode = useAppSelector(state => state.visualHTMLReducer.type)
  // const visualHTMLCode = useAppSelector(state => state.visualHTMLReducer.codeElements)
  const textualHTMLCode = useAppSelector(state => state.visualHTMLReducer.codeString)

  function errorGen(code: any) { //TODO Type code
    let stream = tinyhtml.chunks(code)

    function validateHtmlCode() {
      const chunk = stream.next()
      switch (chunk.type) {
        case "startTagStart":
          validateOpeningTag()
          validateHtmlCode()
          break
        // Cases: tagEnd, commentStart, plainText, EOF
        default:
          throw("Unexpected chunk")
      }
    }

    function validateOpeningTag() {
      validateAttributes()
      const type = stream.next().type
      switch (type) {
        case "tagEnd":
        case "tagEndClose":
          break
        default:
          throw(`Expected tagEnd or tagEndClose but got ${type}`)
      }
    }

    function validateAttributes() {
      // spaces -> attributes
      // attribute -> attributes
      // nothing
    }

    function validateAttribute() {
      // attributeName, attributeAssign, attributeValueStart, attributeValueData, attributeValueEnd
    }
  }

  useEffect(() => {
    if (editorMode === EditorType.Textual) {
      errorGen(textualHTMLCode)
    } else {
      console.log("In visual mode... cannot read code yet")
    }
  })

  return (
    <></>
  )
}

export default HTMLParser