type PaginatorProps = {
  currentPage: number;
  lastPage: number;
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
  onClickPage: (page: number) => void;
}

export default function Paginator(props: PaginatorProps) {
  return (
    <nav>
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => props.onClickPrevPage()}
          >
            Previous
          </button>
        </li>
        {
          Array.from({ length: props.lastPage }, (_, index) => index + 1).map(page => (
            <li key={page}>
              {page === props.currentPage ?
                <button aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                  {page}
                </button> :
                <button 
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => props.onClickPage(page)}
                >
                  {page}
                </button>
              }
            </li>
          ))
        }
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => props.onClickNextPage()}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
