import { NewItem, NewTodo } from 'api/apiTypes'

/**
 * Simple, kind of statemachine parser,
 * just keeps the previously read item, todo and parents.
 *
 * For children we dont know their ids, use the title as an id.
 * Problem A: Collision when there is two items with same title.
 *
 *
 * Problem B: Item should naturally have many content and todo areas:
 * # item
 * first content
 * - todo a
 *
 * second content
 * - todo b
 * - todo c
 *
 * Parser nor item supports this,
 * "todo a" will get content:  "\nsecond content"
 *
 * Problem C: children levels have fuzzy logic.
 * Let's not force levels to increase in order
 * # Item 1
 * ### Item 2
 * ## Item 3
 *
 * Item 1 children:  Item 2 - level 3, Item 3 - level 2.
 */
export function markdownParse(fileContent: string): NewItem[] {
  const items: NewItem[] = []

  const lines = fileContent.split('\n')
  if (lines.length === 0) throw new Error('Content has no lines')

  let level = 0
  const emptyItem = { content: '', title: 'no title', level, newTodos: [], children: [] }
  const emptyTodo: NewTodo = { done: false, title: 'no title', content: '' }

  // state machine variables
  let item: NewItem = { ...emptyItem }
  let todo: NewTodo = { ...emptyTodo }
  let parentOne: NewItem | null = null
  let parentTwo: NewItem | null = null

  function hasReadTodo() {
    return todo.title !== emptyTodo.title
  }
  function hasReadItem() {
    return item.title !== emptyItem.title
  }
  function saveReadTodo() {
    if (hasReadTodo()) {
      item.newTodos.push(todo)
      todo = { ...emptyTodo }
    }
  }
  function saveReadItem() {
    if (hasReadItem()) {
      items.push(item)
      item = { ...emptyItem, newTodos: [], children: [] }
    }
  }

  lines.forEach((line, i) => {
    if (line.startsWith('### ')) {
      saveReadTodo()
      saveReadItem()
      item.title = line.substring(4)
      item.level = 3
      if (parentTwo) parentTwo.children?.push(item.title)
      else if (parentOne) parentOne.children?.push(item.title)
      return
    }
    if (line.startsWith('## ')) {
      saveReadTodo()
      saveReadItem()
      item.title = line.substring(3)
      item.level = 2
      parentTwo = item
      if (parentOne) parentOne.children?.push(item.title)
      return
    }
    if (line.startsWith('# ')) {
      saveReadTodo()
      saveReadItem()
      item.title = line.substring(2)
      item.level = 1
      parentTwo = null
      parentOne = item
      return
    }
    if (line.startsWith('- ')) {
      saveReadTodo()
      todo.done = line.startsWith('- x ')
      todo.title = line.substring(todo.done ? 4 : 2)
      return
    }

    if (hasReadTodo()) {
      todo.content += '\n' + line
    } else if (hasReadItem()) {
      item.content += '\n' + line
    }
  })
  if (hasReadTodo()) {
    item.newTodos.push(todo)
  }
  if (hasReadItem()) {
    items.push(item)
  }

  return items
}
