export default function Header({ deleteAll }) {
    return (
        <>
        <div>
            <h2 className="mb-2 text-lg font-semibold text-black-900 dark:text-white">Marvelous v2.0</h2>
        </div>
        <div dir="ltr">
            <button onClick={deleteAll} className="text-cyan-500 background-transparent ps-10 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                Delete all Tasks
            </button>
        </div>
        </>
    )
  }
  