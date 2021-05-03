interface ILine {
  break: string,
  children: any // TODO Type me
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

  // TODO count elements
  return (
    <>
      {breakStart ? <br/> : ''}
      <span className={'line'}>
        {props.children}
      </span>
      {breakEnd ? <br/> : ''}
    </>
  )
}

export default Line