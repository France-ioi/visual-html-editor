import './VisualHTMLEditorLineCounter.css'
import LineCounterCell from "./VisualHTMLEditorLineCounterCell";

interface LineCountProps {
  lineCount: number
}

function LineCounter(props: LineCountProps) {
  let lineCells = []
  for (let i = 0; i < props.lineCount; i++) {
    lineCells.push(i)
  }

  return (
    <div className={'lines-counter-inner'}>
      {lineCells.map((line, index) => {
        return <LineCounterCell key={index} line={line + 1}/>
      })}
    </div>
  )
}

export default LineCounter