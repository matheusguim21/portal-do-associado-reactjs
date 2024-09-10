interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
}
export function Pagination({
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  return (
    <div className="flex items-center justify-between">
      <span>Total de {totalCount} items </span>
      <div></div>
    </div>
  )
}
