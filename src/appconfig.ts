// Set default editor mode (visual or textual)
export const initialMode = 'visual'
// Allow user to switch editor modes
export const allowModeSwitch: boolean = true

// =============================SET DEFAULT HTML CODE HERE============================================================
export const initialCode = "<body>" +
  "<div>" +
  "<h1>" +
  "Example Domain" +
  "</h1>" +
  "<p>This domain is for use in illustrative examples in documents. " +
  "You may use this domain in literature without prior coordination or asking for permission.</p>" +
  "<p>More <i>information</i>...</p>" +
  "<span><?i>Hello world</?i></span>" +
  "<p>Hello!</p>" +
  "</div>" +
  "</body>"
// ===================================================================================================================

// =============================SET AVAILABLE TOOLBOX CATEGORIES & BLOCKS HERE========================================
// Each category has id (manually increment for now)
// Name of category
// Color of category for side bar style
// Blocks contained within category
   // Blocks have id (manually increment for now)
   // Tag (actual HTML tag value)
   // Paired (whether the tag is self-closing or paired with a closing tag
   // Desc (block description)
export const toolboxBlocks = {
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
// ===================================================================================================================