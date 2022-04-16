import { markdownParse } from './markdown'

test('parses simple stuff', () => {
  const stuff = `
# Title 1
- todo 1
- todo 2
## Title 2
- x todo 1
- todo 2
- todo 3
# Title 3
### Title 4
    `

  const items = markdownParse(stuff)
  //console.log(JSON.stringify(items, null, 2))
  expect(items.length).toBe(4)
  expect(items[0].newTodos.length).toBe(2)
  expect(items[1].newTodos.length).toBe(3)
  expect(items[1].newTodos[0].done).toBe(true)
  expect(items[1].newTodos[1].done).toBe(false)
  expect(items[1].newTodos[2].done).toBe(false)
  expect(items[0].title).toBe('Title 1')
  expect(items[0].newTodos[0].title).toBe('todo 1')

  expect(items[0].children && items[0].children[0]).toBe('Title 2')
  expect(items[1].children).toHaveLength(0)
  expect(items[2].children && items[2].children[0]).toBe('Title 4')
})
