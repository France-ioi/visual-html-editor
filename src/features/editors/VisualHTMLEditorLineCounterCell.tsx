import './VisualHTMLEditorLineCounterCell.css'

interface LineCounterCellProps {
  line: number
}

function LineCounterCell(props: LineCounterCellProps) {
  return (
    <div className={'lines-counter-cell'}>
      {props.line}
    </div>
  )
}

export default LineCounterCell