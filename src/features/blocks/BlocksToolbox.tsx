import './BlocksToolbox.css'

interface BlocksToolboxProps {
  categories: Object
}

function BlocksToolbox({categories}: BlocksToolboxProps) {
  return (
    <div className={'toolbox'}>
      <h1>Hi toolbox</h1>
    </div>
  )
}

export default BlocksToolbox