// components/dashboard/Stats.tsx
interface StatsProps {
    stats: {
      totalWaitlists: number
      totalSubscribers: number
      activeWaitlists: number
    }
  }
  
  export function Stats({ stats }: StatsProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-[#6B7280] dark:text-gray-400">Total Waitlists</h3>
          <p className="text-2xl font-bold text-[#111827] dark:text-white mt-2">{stats.totalWaitlists}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-[#6B7280] dark:text-gray-400">Total Subscribers</h3>
          <p className="text-2xl font-bold text-[#111827] dark:text-white mt-2">{stats.totalSubscribers}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-[#6B7280] dark:text-gray-400">Active Waitlists</h3>
          <p className="text-2xl font-bold text-[#111827] dark:text-white mt-2">{stats.activeWaitlists}</p>
        </div>
      </div>
    )
  }