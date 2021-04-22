import tbConf from "./toolboxconfig"
import BlocksToolbox from './features/blocks/BlocksToolbox'

function App() {
  return (
    <div className="App">
      <BlocksToolbox categories={tbConf.categories}/>
    </div>
  )
}

export default App