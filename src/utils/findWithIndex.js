export default function findWithIndex(list, id) {
  const index = list.findIndex(e => e.id === id)
  return {'item': list[index], 'index': index}
}
