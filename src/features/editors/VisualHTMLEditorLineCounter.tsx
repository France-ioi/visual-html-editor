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
  const styles = {
    width: props.lineCount <= 9 ? '41px' : '49px'
  }

  return (
    <div className={'lines-counter-inner'} style={styles}>
      {lineCells.map((line, index) => {
        return <LineCounterCell key={index} line={line + 1}/>
      })}
    </div>
  )
}

export default LineCounter