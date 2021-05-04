import './VisualHTMLEditorLine.css'

interface ILine {
  break: string,
  indent: number,
  children: Array<JSX.Element> | JSX.Element
}

function Line(props: ILine) {
  let breakStart, breakEnd
  switch (props.break) {
    case 'end':
      breakStart = false
      breakEnd = true
      break
    case 'both':
      breakStart = true
      breakEnd = true
      break
    case 'none':
      breakStart = false
      breakEnd = false
      break
    default:
      break
  }

  return (
    <>
      {breakStart ? <br/> : ''}
      <span className={'line'} style={{paddingLeft: 25 * props.indent}}>
        {props.children}
      </span>
      {breakEnd ? <br/> : ''}
    </>
  )
}

export default Line