import { motion } from 'framer-motion'
import { BookOpen, CheckCircle2, Compass, ExternalLink, Layers3, Lightbulb, ListChecks, Route, ShieldAlert, Target, Zap } from 'lucide-react'
import ProblemTable from './ProblemTable'
import TrackerBox from './TrackerBox'
import './ChapterDetail.css'

const tabs = [
  { key: 'overview', label: 'Overview', icon: BookOpen },
  { key: 'problems', label: 'Problems', icon: ListChecks },
  { key: 'tracker', label: 'Tracker', icon: Target },
]

const cleanText = value => String(value)
  .replaceAll('â€”', '-')
  .replaceAll('â€“', '-')
  .replaceAll('â€™', "'")
  .replaceAll('â€œ', '"')
  .replaceAll('â€\u009d', '"')
  .replaceAll('Â²', '^2')
  .replaceAll('Â', '')

const chapterPlaybooks = {
  arrays: {
    signal: 'Look for contiguous ranges, index movement, sorted input, or repeated scans that can collapse into one pass.',
    drill: 'Practice prefix sums, two pointers, Kadane, and in-place swaps until the state update feels automatic.',
    trap: 'Most misses come from off-by-one windows, overwritten values, and forgetting empty or single-element arrays.',
  },
  strings: {
    signal: 'Watch for character frequency, substring windows, palindrome symmetry, and normalization before comparison.',
    drill: 'Move between hash maps, sliding windows, tries, and two-pointer scans depending on whether order matters.',
    trap: 'Unicode, case folding, duplicate characters, and inclusive substring bounds can quietly break clean solutions.',
  },
  'linked-list': {
    signal: 'If the problem says cycle, kth node, reverse, merge, or reorder, think pointer choreography first.',
    drill: 'Draw dummy nodes and prev-current-next transitions before writing code.',
    trap: 'Null checks and losing the next pointer are the common failure points.',
  },
  stack: {
    signal: 'Nested structure, nearest greater/smaller, undo history, or expression parsing usually points to stack.',
    drill: 'Train monotonic stacks and bracket/state validation until pop conditions are crisp.',
    trap: 'Wrong comparison direction in monotonic stacks changes the whole answer.',
  },
  queue: {
    signal: 'Level-order traversal, streaming order, rate limiting, and shortest unweighted paths usually want queues.',
    drill: 'Practice BFS layers and deque patterns for window maximums.',
    trap: 'Mixing current layer and next layer counts creates distance bugs.',
  },
  hashing: {
    signal: 'When lookup, frequency, grouping, or complement search appears, reach for maps and sets.',
    drill: 'Practice turning O(n^2) pair checks into one-pass complement checks.',
    trap: 'Key shape matters: collisions in your own composite keys cause false matches.',
  },
  recursion: {
    signal: 'Self-similar subproblems, tree traversal, and divide-and-conquer are recursion territory.',
    drill: 'Define base case, work done at this node, and returned meaning before coding.',
    trap: 'Unclear return contracts make recursive solutions collapse quickly.',
  },
  backtracking: {
    signal: 'Generate all valid combinations, paths, partitions, or placements with constraints.',
    drill: 'Choose, explore, unchoose. Keep pruning rules close to the choice.',
    trap: 'Forgetting to undo state or copying too much state kills correctness or performance.',
  },
  'binary-search': {
    signal: 'Sorted space, monotonic answer, minimum feasible value, or first/last occurrence.',
    drill: 'Write the invariant first, then choose inclusive or half-open bounds.',
    trap: 'Midpoint updates that do not shrink the range create infinite loops.',
  },
  dp: {
    signal: 'Overlapping choices, optimal substructure, count ways, min/max cost, or constrained sequences.',
    drill: 'Name the state, transition, base case, and iteration order in that order.',
    trap: 'Most DP bugs are state definitions that omit one necessary dimension.',
  },
  graphs: {
    signal: 'Entities connected by relationships, reachability, components, ordering, or shortest path.',
    drill: 'Classify first: BFS, DFS, topological sort, DSU, or weighted shortest path.',
    trap: 'Visited timing changes behavior in cyclic graphs.',
  },
  trees: {
    signal: 'Hierarchical decisions, ancestor/descendant relation, depth, path, or subtree aggregation.',
    drill: 'Decide whether the answer is pre-order, in-order, post-order, or level-order.',
    trap: 'Path state shared across branches must be copied or reverted.',
  },
}

function getPlaybook(chapter) {
  const fallbackPattern = chapter.patterns[0]?.title || chapter.name
  const fallbackVariation = chapter.variations[0]?.title || 'core variations'

  return chapterPlaybooks[chapter.id] || {
    signal: `Start by spotting whether the prompt resembles ${cleanText(fallbackPattern)} or one of the chapter's repeated patterns.`,
    drill: `Use the first practice pass to master ${cleanText(fallbackVariation)}, then revisit missed problems within 24 hours.`,
    trap: 'Do not code before naming the invariant, edge case, and expected complexity.',
  }
}

function StatBlock({ label, value, tone }) {
  return (
    <div className={`hero-stat ${tone || ''}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function Section({ eyebrow, title, icon: Icon, children }) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {Icon && <span className="section-icon"><Icon size={18} /></span>}
      </div>
      {children}
    </section>
  )
}

function PlaybookPanel({ chapter, playbook }) {
  return (
    <section className="insight-panel playbook-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Chapter playbook</p>
          <h2>{chapter.name} strategy</h2>
        </div>
        <Compass size={18} />
      </div>
      <div className="playbook-stack">
        <article>
          <span><Lightbulb size={15} /></span>
          <div>
            <strong>Recognition signal</strong>
            <p>{playbook.signal}</p>
          </div>
        </article>
        <article>
          <span><Zap size={15} /></span>
          <div>
            <strong>Best drill</strong>
            <p>{playbook.drill}</p>
          </div>
        </article>
        <article>
          <span><ShieldAlert size={15} /></span>
          <div>
            <strong>Failure trap</strong>
            <p>{playbook.trap}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default function ChapterDetail({
  chapter,
  chapterStats,
  activeView,
  onViewChange,
  onFilter,
  filteredProblems,
  isProblemChecked,
  toggleProblem,
  isTrackerChecked,
  toggleTracker,
}) {
  const { done, total } = chapterStats
  const pct = total ? Math.round((done / total) * 100) : 0
  const nextProblem = chapter.problems.find(problem => !isProblemChecked(problem.id))
  const playbook = getPlaybook(chapter)
  const reviewUnsolved = () => {
    onFilter('unsolved')
  }

  return (
    <motion.div
      className="chapter-detail"
      style={{ '--chapter-color': chapter.color, '--chapter-progress': `${pct}%` }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <header className="chapter-hero">
        <div className="hero-copy">
          <p className="eyebrow">Chapter {chapter.num}</p>
          <h1>{chapter.name}</h1>
          <p className="hero-summary">
            Master the core patterns, complete the curated set, and keep revision milestones visible while you practice.
          </p>
          <div className="hero-actions">
            {nextProblem ? (
              <a className="primary-action" href={nextProblem.url} target="_blank" rel="noopener noreferrer">
                Continue next problem
                <ExternalLink size={16} />
              </a>
            ) : (
              <button className="primary-action is-complete" disabled>
                Chapter complete
                <CheckCircle2 size={16} />
              </button>
            )}
            <button
              className="secondary-action"
              onClick={reviewUnsolved}
            >
              Review unsolved
            </button>
          </div>
        </div>

        <div className="hero-panel" aria-label={`${pct}% solved`}>
          <div className="progress-orbit">
            <span>{pct}%</span>
          </div>
          <div className="hero-stats">
            <StatBlock label="Easy" value={chapter.totalEasy} tone="easy" />
            <StatBlock label="Medium" value={chapter.totalMed} tone="medium" />
            <StatBlock label="Hard" value={chapter.totalHard} tone="hard" />
            <StatBlock label="Solved" value={`${done}/${total}`} />
          </div>
        </div>
      </header>

      <nav className="view-tabs" aria-label="Chapter views">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.key} className={activeView === tab.key ? 'is-active' : ''} onClick={() => onViewChange(tab.key)}>
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </nav>

      <div className="detail-layout">
        <div className="main-stack">
          <div className={`view-section overview-view ${activeView === 'overview' ? 'is-active' : ''}`}>
            <Section eyebrow="Foundation" title="Core concepts" icon={BookOpen}>
              <ul className="concept-grid">
                {chapter.concepts.map((concept, index) => (
                  <li key={index}>{cleanText(concept)}</li>
                ))}
              </ul>
            </Section>

            <Section eyebrow="Recognition" title="Important patterns" icon={Route}>
              <div className="pattern-grid">
                {chapter.patterns.map((pattern, index) => (
                  <article key={index} className="pattern-item">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{cleanText(pattern.title)}</h3>
                      <p>{cleanText(pattern.desc)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section eyebrow="Depth" title="Must-know variations" icon={Layers3}>
              <div className="variation-grid">
                {chapter.variations.map((variation, index) => (
                  <article key={index} className="variation-item">
                    <h3>{cleanText(variation.title)}</h3>
                    <div>
                      {variation.items.map((item, itemIndex) => (
                        <span key={itemIndex}>{cleanText(item)}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <div className="mobile-playbook">
              <PlaybookPanel chapter={chapter} playbook={playbook} />
            </div>
          </div>

          <div className={`view-section problems-view ${activeView === 'problems' ? 'is-active' : ''}`}>
            <Section eyebrow="Practice" title={`${filteredProblems.length} visible problems`} icon={ListChecks}>
              <ProblemTable
                problems={filteredProblems}
                isProblemChecked={isProblemChecked}
                toggleProblem={toggleProblem}
              />
            </Section>
          </div>

          <div className={`view-section mobile-tracker-view ${activeView === 'tracker' ? 'is-active' : ''}`}>
            <TrackerBox
              chapter={chapter}
              chapterStats={chapterStats}
              isTrackerChecked={isTrackerChecked}
              toggleTracker={toggleTracker}
            />
            <div className="mobile-playbook mobile-playbook-tracker">
              <PlaybookPanel chapter={chapter} playbook={playbook} />
            </div>
          </div>
        </div>

        <aside className="insight-rail">
          <TrackerBox
            chapter={chapter}
            chapterStats={chapterStats}
            isTrackerChecked={isTrackerChecked}
            toggleTracker={toggleTracker}
          />

          <PlaybookPanel chapter={chapter} playbook={playbook} />
        </aside>
      </div>
    </motion.div>
  )
}
