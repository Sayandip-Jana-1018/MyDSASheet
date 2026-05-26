import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronRight, Database } from 'lucide-react';
import LeetCodeIcon from './LeetCodeIcon';
import { chapters } from '../data/chapters';
import { sqlChapters } from '../data/sqlChapters';
import './GlobalSearchModal.css';

export default function GlobalSearchModal({ isOpen, onClose, onSelectProblem }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Flatten all problems from all chapters
  const allProblems = useMemo(() => {
    const list = [];
    const addChapters = (chapterList, curriculumLabel) => {
      chapterList.forEach(chapter => {
        (chapter.problems || []).forEach(problem => {
          list.push({
            ...problem,
            chapterId: chapter.id,
            chapterName: chapter.name,
            chapterColor: chapter.color,
            curriculum: curriculumLabel,
          });
        });
      });
    };
    addChapters(chapters, 'DSA');
    addChapters(sqlChapters, 'SQL');
    return list;
  }, []);

  // Filter problems based on query
  const filteredProblems = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return allProblems.filter(p => 
      p.name?.toLowerCase().includes(lowerQuery) || 
      p.pattern?.toLowerCase().includes(lowerQuery) ||
      p.chapterName?.toLowerCase().includes(lowerQuery)
    ).slice(0, 15); // Limit to top 15 results
  }, [query, allProblems]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredProblems.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredProblems[selectedIndex]) {
          onSelectProblem(filteredProblems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredProblems, selectedIndex, onClose, onSelectProblem]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedEl = resultsRef.current.children[selectedIndex];
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="global-search-overlay" onClick={onClose}>
      <div className="global-search-modal" onClick={e => e.stopPropagation()}>
        <header className="global-search-header">
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all problems or patterns..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="close-btn" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </header>

        <div className="global-search-content">
          {!query.trim() && (
            <div className="global-search-empty">
              <p>Type to start searching...</p>
              <div className="search-tips">
                <span>Try: "Two Sum", "Sliding Window", or "JOIN"</span>
              </div>
            </div>
          )}

          {query.trim() && filteredProblems.length === 0 && (
            <div className="global-search-empty">
              <p>No results found for "{query}"</p>
            </div>
          )}

          {filteredProblems.length > 0 && (
            <div className="global-search-results" ref={resultsRef}>
              {filteredProblems.map((problem, idx) => (
                <div
                  key={problem.id}
                  className={`search-result-item ${idx === selectedIndex ? 'is-selected' : ''}`}
                  onClick={() => onSelectProblem(problem)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="result-icon" style={{ color: problem.chapterColor || 'var(--accent)' }}>
                    {problem.curriculum === 'SQL' ? <Database size={16} /> : <LeetCodeIcon size={16} />}
                  </div>
                  <div className="result-details">
                    <h4>{problem.name}</h4>
                    <div className="result-meta">
                      <span className={`diff-badge diff-${problem.difficulty?.toLowerCase()}`}>
                        {problem.difficulty}
                      </span>
                      <span className="meta-dot">•</span>
                      <span>{problem.chapterName}</span>
                      {problem.pattern && (
                        <>
                          <span className="meta-dot">•</span>
                          <span>{problem.pattern}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="enter-hint">
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="global-search-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>Enter</kbd> to select</span>
          <span><kbd>ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
