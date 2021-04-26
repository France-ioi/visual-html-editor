// Configure your desired categories as objects in categories array
// Configure category blocks as objects in blocks array
export interface ToolboxCategoryBlocks {
  id?: number,
  tag: string,
  paired: Boolean,
  desc: String
}

export interface ToolboxCategory {
  id: number,
  name: String,
  highlight: String,
  toggled?: boolean,
  maxHeight?: Number
  blocks: ToolboxCategoryBlocks[]
}

export interface ToolboxConfiguration {
  categories: ToolboxCategory[]
}

const tbConf: ToolboxConfiguration = {
  categories: [
    {
      id: 1,
      name: 'Blocks',
      highlight: '#4a90e2',
      blocks: [
        {
          id: 1,
          tag: 'div',
          paired: true,
          desc: 'This is a div element'
        },
        {
          id: 2,
          tag: 'span',
          paired: true,
          desc: 'This is a span element'
        },
        {
          id: 3,
          tag: 'section',
          paired: true,
          desc: 'This is a section element'
        },
        {
          id: 4,
          tag: 'p',
          paired: true,
          desc: 'This is a p element'
        },
        {
          id: 5,
          tag: 'br',
          paired: false,
          desc: 'This is a br element'
        }
      ]
    },
    {
      id: 2,
      name: 'Forms',
      highlight: '#b8e986',
      blocks: [
        {
          id: 6,
          tag: 'form',
          paired: true,
          desc: 'This is a form tag'
        },
        {
          id: 7,
          tag: 'input',
          paired: false,
          desc: 'This is an input tag'
        },
        {
          id: 8,
          tag: 'label',
          paired: true,
          desc: 'This is a label tag'
        },
        {
          id: 9,
          tag: 'select',
          paired: true,
          desc: 'This is a select tag'
        },
        {
          id: 10,
          tag: 'button',
          paired: true,
          desc: 'This is a button tag'
        },
        {
          id: 11,
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        }
      ]
    },
    {
      id: 3,
      name: 'Inline',
      highlight: '#4a51e2',
      blocks: [
        {
          id: 12,
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          id: 13,
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          id: 14,
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        }
      ]
    },
    {
      id: 4,
      name: 'Attributes',
      highlight: '#c346f0',
      blocks: [
        {
          id: 15,
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          id: 16,
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          id: 17,
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          id: 18,
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        }
      ]
    }
  ]
}

export default tbConf