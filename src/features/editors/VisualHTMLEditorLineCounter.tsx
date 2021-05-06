import './VisualHTMLEditorLineCounter.css'
import LineCounterCell from "./VisualHTMLEditorLineCounterCell";

type TLineCount = {
  lineCount: number
}

function LineCounter(props: TLineCount) {
  let lineCells = []
  for (let i = 0; i < props.lineCount; i++) {
    lineCells.push(i)
  }

  return (
    <div className={'lines-counter-inner'}>
      {lineCells.map(line => {
        return <LineCounterCell line={line}/>
      })}
    </div>
  )
}

export default LineCounter