import Pagination from './Pagination'

const PaginateList = ({page, setPage, perPage, data}) => {
  let start = page * perPage
  let end = start + perPage
  const paginatedDisplay = data.slice(start,end)
  let totalPages = Math.ceil(data.length / perPage)
  if (data.length<perPage) totalPages = 1  

  return (
    <div>
        <table className="table-auto mt-8 w-full">
            <thead>
                <tr>
                    <th className="text-left">Rank</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Symbol</th>
                    <th className="text-left">Last Price</th>
                    <th className="text-right">24h Change</th>
                    <th className="text-right">24h High</th>
                    <th className="text-right">24h Low</th>
                    <th className="text-right">Market Cap</th>
                    <th className="text-right">Total Volume</th>
                </tr>
            </thead>
            <tbody>
            {paginatedDisplay}
            </tbody>
        </table>
        {data.length>perPage && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
    </div>
  )

}

export default PaginateList