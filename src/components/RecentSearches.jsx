export function RecentSearches({ recentSearches, onSelect }) {
  if (!recentSearches.length) {
    return null
  }

  return (
    <div className="recent-searches" aria-label="Recent searches">
      <span>Recent:</span>
      {recentSearches.map((entry) => (
        <button type="button" key={entry} onClick={() => onSelect(entry)}>
          {entry}
        </button>
      ))}
    </div>
  )
}
