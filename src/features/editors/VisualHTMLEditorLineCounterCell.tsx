import './VisualHTMLEditorLineCounterCell.css'

type TLineCounterCell = {
  line: number
}

function LineCounterCell(props: TLineCounterCell) {
  return (
    <div className={'lines-counter-cell'}>
      {props.line}
    </div>
  )
}

export default LineCounterCell