// Configure your desired categories as objects in categories array
// Configure category blocks as objects in blocks array
export interface ToolboxCategoryBlocks {
  tag: String,
  paired: Boolean,
  desc: String
}

export interface ToolboxCategory {
  id: Number,
  name: String,
  highlight: String,
  blocks: Array<ToolboxCategoryBlocks>
}

export interface ToolboxConfiguration {
  categories: Array<ToolboxCategory>
}

const tbConf: ToolboxConfiguration = {
  categories: [
    {
      id: 1,
      name: 'Blocks',
      highlight: '#4a90e2',
      blocks: [
        {
          tag: 'div',
          paired: true,
          desc: 'This is a div element'
        },
        {
          tag: 'span',
          paired: true,
          desc: 'This is a span element'
        },
        {
          tag: 'section',
          paired: true,
          desc: 'This is a section element'
        },
        {
          tag: 'p',
          paired: true,
          desc: 'This is a p element'
        },
        {
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
          tag: 'form',
          paired: true,
          desc: 'This is a form tag'
        },
        {
          tag: 'input',
          paired: false,
          desc: 'This is an input tag'
        },
        {
          tag: 'label',
          paired: true,
          desc: 'This is a label tag'
        },
        {
          tag: 'select',
          paired: true,
          desc: 'This is a select tag'
        },
        {
          tag: 'button',
          paired: true,
          desc: 'This is a button tag'
        },
        {
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
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
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
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        },
        {
          tag: 'textarea',
          paired: true,
          desc: 'This is a textarea tag'
        }
      ]
    }
  ]
}

export default tbConf