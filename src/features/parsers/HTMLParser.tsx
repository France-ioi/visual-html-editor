import {useAppSelector} from "../../hooks";

let tinyhtml = require('tiny-html-lexer')

function HTMLParser() {
  const editorMode = useAppSelector(state => state.visualHTMLReducer.type)
  const visualHTMLCode = useAppSelector(state => state.visualHTMLReducer.codeElements)
  const textualHTMLCode = useAppSelector(state => state.visualHTMLReducer.codeString)

  return (
    <></>
  )
}

export default HTMLParser