import {toolboxBlocks} from "./appconfig";

export interface ToolboxCategoryBlocks {
  id: number,
  tag: string,
  paired: Boolean,
  desc: String,
}

export interface ToolboxCategory {
  id: number,
  name: String,
  highlight: String,
  blocks: ToolboxCategoryBlocks[],
  openDesc?: ToolboxCategoryBlocks["id"] | null
}

export interface ToolboxConfiguration {
  categories: ToolboxCategory[]
}

const tbConf: ToolboxConfiguration = toolboxBlocks

export default tbConf