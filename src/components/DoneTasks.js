export default function DoneTasks({ tasks, undoTask }) {
    return (
        <>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Done</h2>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {
                tasks.map(t => {
                    return(
                    <li key={t.taskId} className="flex items-center space-x-3">
                        <input checked type="checkbox" value={t.taskId} onChange={undoTask} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <span className="truncate ...">{t.description}</span>
                    </li>
                    )
                })
            }
            </ul>
        </>
    )
}
  