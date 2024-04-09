export const paginateArray = <T>(inputArray: T[], pageSize: number, pageNumber: number) => {
  if (isNaN(pageNumber) || pageNumber < 1 || !isFinite(pageNumber)) {
    throw new Error('Invalid page number')
  }

  const startIndex = (pageNumber - 1) * pageSize
  const endIndex = startIndex + pageSize
  const pageCount = Math.ceil(inputArray.length / pageSize)
  const paginatedArray = inputArray.slice(startIndex, endIndex)

  return {
    paginatedArray,
    pageCount,
  }
}
