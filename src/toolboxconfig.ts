import {tbConf} from "./appconfig";

export interface ToolboxCategoryBlocks {
  id: number,
  tag: string,
  paired: boolean,
  desc: String,
}

export interface ToolboxCategory {
  id: number,
  name: string,
  highlight: string,
  blocks: ToolboxCategoryBlocks[],
  openDesc?: ToolboxCategoryBlocks["id"] | null
}

export interface ToolboxConfiguration {
  categories: ToolboxCategory[]
}

export default tbConf