// Auto-generated from test.py — 22 chapters, 437 problems
// Enhanced: expanded concepts & must-know variations for every chapter

export const TOTAL_PROBLEMS = 437;
export const TOTAL_CHAPTERS = 22;

export const chapters = [
  {
    "id": "arrays",
    "num": "01",
    "icon": "📦",
    "name": "Arrays",
    "color": "#3B82F6",
    "concepts": [
  "Contiguous memory allocation; O(1) random access, O(n) insertion/deletion",
  "In-place operations to achieve O(1) space (swap, reverse, rotate)",
  "Prefix sums & difference arrays for range queries in O(1)",
  "Two-pointer technique for sorted arrays and pair problems",
  "Sliding window for contiguous subarray problems",
  "Edge cases: empty array, single element, all same elements, negative numbers",
  "Interview traps: off-by-one errors, overflow in sum/product, modifying array while iterating",
  "When to sort first: sorting costs O(n log n) but can unlock O(n) solutions",
  "Kadane's algorithm for maximum subarray sum in O(n) — track running max and global max",
  "Boyer-Moore Voting for finding majority element in O(n) time, O(1) space",
  "Difference array technique: range update in O(1), reconstruct with prefix sum",
  "Cyclic sort: place each element at its correct index for missing/duplicate problems",
  "Hashing for O(1) lookup: use hash maps/sets to reduce nested loops to single pass",
  "Matrix as 1D: row-major indexing formula — index = row * cols + col",
  "Reservoir sampling for random selection from stream of unknown size",
  "Dutch National Flag: three-way partition for problems with 3 distinct categories",
  "Subarray vs Subsequence vs Subset: understand the difference for correct approach",
  "Sparse Table: O(n log n) build, O(1) range-minimum/maximum queries (immutable arrays)",
  "Merge Sort for inversion count: count how many pairs (i,j) where i<j but arr[i]>arr[j]",
  "XOR tricks on arrays: find missing/duplicate numbers without extra space",
  "Bitmasking small arrays: represent presence/absence with a single integer",
  "Monotonic stack on array: next greater/smaller element in O(n)",
  "Coordinate compression: map large value range to small indices before processing",
  "Quickselect: O(n) average to find k-th smallest without full sort",
  "Trapping Water generalization: think in terms of left-max and right-max arrays",
  "Interval overlap check: two intervals [a,b] and [c,d] overlap iff a<=d && c<=b",
  "Binary parametric search: search over value range instead of indices for optimization problems"
],
    "patterns": [
      {
        "title": "Two Pointers",
        "desc": "Use two indices from opposite ends or same end to avoid nested loops."
      },
      {
        "title": "Sliding Window",
        "desc": "Maintain a window of elements satisfying a condition; expand/shrink dynamically."
      },
      {
        "title": "Prefix Sum",
        "desc": "Precompute cumulative sums to answer range queries in O(1)."
      },
      {
        "title": "Kadane's Algorithm",
        "desc": "Track max subarray ending at current index for O(n) max-sum subarray."
      },
      {
        "title": "Dutch National Flag",
        "desc": "Three-way partition to sort 0s, 1s, 2s in one pass."
      },
      {
        "title": "Merge Intervals",
        "desc": "Sort by start time, then greedily merge overlapping intervals."
      },
      {
        "title": "Monotonic Stack",
        "desc": "Maintain stack where elements are strictly increasing or decreasing."
      }
    ],
    "problems": [
      {
        "id": "arrays-0",
        "name": "Two Sum",
        "difficulty": "Easy",
        "pattern": "Hash Map",
        "url": "https://leetcode.com/problems/two-sum/"
      },
      {
        "id": "arrays-1",
        "name": "Best Time to Buy & Sell Stock",
        "difficulty": "Easy",
        "pattern": "Greedy / Array",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
      },
      {
        "id": "arrays-2",
        "name": "Contains Duplicate",
        "difficulty": "Easy",
        "pattern": "Hash Set",
        "url": "https://leetcode.com/problems/contains-duplicate/"
      },
      {
        "id": "arrays-3",
        "name": "Maximum Subarray (Kadane's)",
        "difficulty": "Medium",
        "pattern": "Kadane's Algorithm",
        "url": "https://leetcode.com/problems/maximum-subarray/"
      },
      {
        "id": "arrays-4",
        "name": "Product of Array Except Self",
        "difficulty": "Medium",
        "pattern": "Prefix / Suffix Product",
        "url": "https://leetcode.com/problems/product-of-array-except-self/"
      },
      {
        "id": "arrays-5",
        "name": "Maximum Product Subarray",
        "difficulty": "Medium",
        "pattern": "Dynamic Programming",
        "url": "https://leetcode.com/problems/maximum-product-subarray/"
      },
      {
        "id": "arrays-6",
        "name": "Find Minimum in Rotated Sorted Array",
        "difficulty": "Medium",
        "pattern": "Binary Search",
        "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
      },
      {
        "id": "arrays-7",
        "name": "Search in Rotated Sorted Array",
        "difficulty": "Medium",
        "pattern": "Binary Search",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
      },
      {
        "id": "arrays-8",
        "name": "3Sum",
        "difficulty": "Medium",
        "pattern": "Two Pointers",
        "url": "https://leetcode.com/problems/3sum/"
      },
      {
        "id": "arrays-9",
        "name": "Container With Most Water",
        "difficulty": "Medium",
        "pattern": "Two Pointers",
        "url": "https://leetcode.com/problems/container-with-most-water/"
      },
      {
        "id": "arrays-10",
        "name": "Merge Intervals",
        "difficulty": "Medium",
        "pattern": "Sorting / Greedy",
        "url": "https://leetcode.com/problems/merge-intervals/"
      },
      {
        "id": "arrays-11",
        "name": "Insert Interval",
        "difficulty": "Medium",
        "pattern": "Array Manipulation",
        "url": "https://leetcode.com/problems/insert-interval/"
      },
      {
        "id": "arrays-12",
        "name": "Non-overlapping Intervals",
        "difficulty": "Medium",
        "pattern": "Greedy / Sorting",
        "url": "https://leetcode.com/problems/non-overlapping-intervals/"
      },
      {
        "id": "arrays-13",
        "name": "Rotate Array",
        "difficulty": "Medium",
        "pattern": "Two Pointers / Reversal",
        "url": "https://leetcode.com/problems/rotate-array/"
      },
      {
        "id": "arrays-14",
        "name": "Sort Colors (Dutch National Flag)",
        "difficulty": "Medium",
        "pattern": "Three Pointers",
        "url": "https://leetcode.com/problems/sort-colors/"
      },
      {
        "id": "arrays-15",
        "name": "Subarray Sum Equals K",
        "difficulty": "Medium",
        "pattern": "Prefix Sum + Hash Map",
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
      },
      {
        "id": "arrays-16",
        "name": "Next Permutation",
        "difficulty": "Medium",
        "pattern": "Array Traversal",
        "url": "https://leetcode.com/problems/next-permutation/"
      },
      {
        "id": "arrays-17",
        "name": "Majority Element",
        "difficulty": "Easy",
        "pattern": "Boyer-Moore Voting",
        "url": "https://leetcode.com/problems/majority-element/"
      },
      {
        "id": "arrays-18",
        "name": "Move Zeroes",
        "difficulty": "Easy",
        "pattern": "Two Pointers",
        "url": "https://leetcode.com/problems/move-zeroes/"
      },
      {
        "id": "arrays-19",
        "name": "Remove Duplicates from Sorted Array",
        "difficulty": "Easy",
        "pattern": "Two Pointers",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
      },
      {
        "id": "arrays-20",
        "name": "Spiral Matrix",
        "difficulty": "Medium",
        "pattern": "Simulation",
        "url": "https://leetcode.com/problems/spiral-matrix/"
      },
      {
        "id": "arrays-21",
        "name": "Jump Game",
        "difficulty": "Medium",
        "pattern": "Greedy",
        "url": "https://leetcode.com/problems/jump-game/"
      },
      {
        "id": "arrays-22",
        "name": "Jump Game II",
        "difficulty": "Medium",
        "pattern": "Greedy",
        "url": "https://leetcode.com/problems/jump-game-ii/"
      },
      {
        "id": "arrays-23",
        "name": "Trapping Rain Water",
        "difficulty": "Hard",
        "pattern": "Two Pointers / Stack",
        "url": "https://leetcode.com/problems/trapping-rain-water/"
      },
      {
        "id": "arrays-24",
        "name": "Largest Rectangle in Histogram",
        "difficulty": "Hard",
        "pattern": "Monotonic Stack",
        "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
      },
      {
        "id": "arrays-25",
        "name": "First Missing Positive",
        "difficulty": "Hard",
        "pattern": "Index Hashing",
        "url": "https://leetcode.com/problems/first-missing-positive/"
      }
    ],
    "variations": [
      {
        "title": "Two Sum",
        "items": [
          "Two Sum II – Input Array is Sorted",
          "Three Sum",
          "Four Sum",
          "Two Sum BST",
          "Count Pairs with Given Sum",
          "Two Sum Less Than K",
          "Two Sum – Unique Pairs",
          "Three Sum Closest",
          "Three Sum Smaller"
        ]
      },
      {
        "title": "Maximum Subarray",
        "items": [
          "Maximum Sum Circular Subarray",
          "Maximum Sum of Non-Adjacent Elements",
          "Maximum Sum of 3 Non-Overlapping Subarrays",
          "Maximum Product Subarray",
          "Maximum Subarray with One Deletion",
          "Minimum Subarray Sum"
        ]
      },
      {
        "title": "Sliding Window",
        "items": [
          "Maximum Sum Subarray of Size K",
          "Longest Substring with K Distinct",
          "Fruit Into Baskets",
          "Minimum Window Substring",
          "Max Consecutive Ones III",
          "Longest Subarray of 1s After Deleting One Element"
        ]
      },
      {
        "title": "Binary Search on Array",
        "items": [
          "Search in Rotated Sorted Array II",
          "Find Peak Element",
          "Search a 2D Matrix",
          "Kth Smallest in Sorted Matrix",
          "Find First and Last Position",
          "Count Occurrences in Sorted Array"
        ]
      },
      {
        "title": "Prefix Sum",
        "items": [
          "Range Sum Query – Immutable",
          "Subarray Sum Equals K",
          "Continuous Subarray Sum",
          "Product of Array Except Self",
          "Count Subarrays with Sum in Range",
          "Binary Subarrays With Sum"
        ]
      },
      {
        "title": "Interval Problems",
        "items": [
          "Merge Intervals",
          "Insert Interval",
          "Non-overlapping Intervals",
          "Meeting Rooms I",
          "Meeting Rooms II",
          "Employee Free Time",
          "Minimum Number of Arrows to Burst Balloons"
        ]
      },
      {
        "title": "Sorting & Partitioning",
        "items": [
          "Sort Colors (Dutch National Flag)",
          "Kth Largest Element in Array (Quickselect)",
          "Wiggle Sort",
          "Next Permutation",
          "Permutation Sequence",
          "Rotate Array"
        ]
      },
      {
        "title": "Missing / Duplicate Numbers",
        "items": [
          "Find the Missing Number (XOR / Math)",
          "Find the Duplicate Number (Floyd's Cycle)",
          "First Missing Positive (Index Hashing / Cyclic Sort)",
          "Find All Duplicates in an Array",
          "Set Mismatch",
          "Missing Ranges"
        ]
      }
    ],
    "totalEasy": 6,
    "totalMed": 17,
    "totalHard": 3
  },
  {
    "id": "strings",
    "num": "02",
    "icon": "🔤",
    "name": "Strings",
    "color": "#10B981",
    "concepts": [
      "Strings are immutable in many languages; building strings requires StringBuilder / list",
      "ASCII tricks: 'a'=97, 'A'=65, '0'=48; difference gives alphabetic index",
      "Anagram check via character frequency array (26 letters) or sorting",
      "Palindrome: two-pointer from center or from both ends",
      "Rolling hash / Rabin-Karp for substring search in O(n)",
      "KMP algorithm for O(n) pattern matching — build failure function first",
      "Edge cases: empty string, single char, all same chars, mixed case",
      "Interview traps: Unicode vs ASCII, whitespace handling, case sensitivity",
      "Manacher's algorithm: find all palindromic substrings in O(n)",
      "Suffix array / suffix tree for advanced substring queries",
      "Sliding window with hash map for substring with distinct/repeating chars",
      "String hashing: polynomial hash for O(1) substring comparison after O(n) preprocess",
      "Run-length encoding: compress consecutive repeated characters",
      "Trie-based solutions: autocomplete, word search, prefix matching in O(L) per query",
      "Z-function: z[i] = length of longest substring starting at i that matches a prefix of s; O(n)",
      "Aho-Corasick: multi-pattern matching in a single O(n+m) pass; used in firewalls",
      "Longest Common Substring vs LCS: substring must be contiguous; use DP or rolling hash",
      "String rotation: s2 is rotation of s1 iff s1 is substring of s1+s1",
      "Lexicographic comparison: compare character-by-character; stop at first mismatch",
      "Interleaving strings: DP to check if s3 is interleaved from s1 and s2",
      "Wildcard vs regex matching: '*' matches zero or more vs '.' matches any single char",
      "Edit distance (Levenshtein): O(mn) DP for insert/delete/replace operations"
    ],
    "patterns": [
      {
        "title": "Sliding Window",
        "desc": "Find longest/shortest substring satisfying a constraint."
      },
      {
        "title": "Two Pointers",
        "desc": "Palindrome check, reverse, pair matching from both ends."
      },
      {
        "title": "Hash Map / Frequency Count",
        "desc": "Anagram detection, character frequency problems."
      },
      {
        "title": "Z-Function / KMP",
        "desc": "Efficient pattern matching without backtracking."
      },
      {
        "title": "Expand Around Center",
        "desc": "Find palindromic substrings by expanding from each center."
      },
      {
        "title": "Trie",
        "desc": "Prefix-based string search and autocomplete."
      }
    ],
    "problems": [
      {
        "id": "strings-0",
        "name": "Valid Anagram",
        "difficulty": "Easy",
        "pattern": "Frequency Count",
        "url": "https://leetcode.com/problems/valid-anagram/"
      },
      {
        "id": "strings-1",
        "name": "Valid Palindrome",
        "difficulty": "Easy",
        "pattern": "Two Pointers",
        "url": "https://leetcode.com/problems/valid-palindrome/"
      },
      {
        "id": "strings-2",
        "name": "Valid Parentheses",
        "difficulty": "Easy",
        "pattern": "Stack",
        "url": "https://leetcode.com/problems/valid-parentheses/"
      },
      {
        "id": "strings-3",
        "name": "Longest Common Prefix",
        "difficulty": "Easy",
        "pattern": "Horizontal Scan",
        "url": "https://leetcode.com/problems/longest-common-prefix/"
      },
      {
        "id": "strings-4",
        "name": "Reverse Words in a String",
        "difficulty": "Medium",
        "pattern": "Two Pointers / Split",
        "url": "https://leetcode.com/problems/reverse-words-in-a-string/"
      },
      {
        "id": "strings-5",
        "name": "Longest Substring Without Repeating Characters",
        "difficulty": "Medium",
        "pattern": "Sliding Window",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      },
      {
        "id": "strings-6",
        "name": "Longest Repeating Character Replacement",
        "difficulty": "Medium",
        "pattern": "Sliding Window",
        "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
      },
      {
        "id": "strings-7",
        "name": "Permutation in String",
        "difficulty": "Medium",
        "pattern": "Sliding Window + Freq",
        "url": "https://leetcode.com/problems/permutation-in-string/"
      },
      {
        "id": "strings-8",
        "name": "Group Anagrams",
        "difficulty": "Medium",
        "pattern": "Sorting / Hashing",
        "url": "https://leetcode.com/problems/group-anagrams/"
      },
      {
        "id": "strings-9",
        "name": "Longest Palindromic Substring",
        "difficulty": "Medium",
        "pattern": "Expand Around Center",
        "url": "https://leetcode.com/problems/longest-palindromic-substring/"
      },
      {
        "id": "strings-10",
        "name": "Palindromic Substrings",
        "difficulty": "Medium",
        "pattern": "Expand Around Center",
        "url": "https://leetcode.com/problems/palindromic-substrings/"
      },
      {
        "id": "strings-11",
        "name": "String to Integer (atoi)",
        "difficulty": "Medium",
        "pattern": "Parsing / Edge Cases",
        "url": "https://leetcode.com/problems/string-to-integer-atoi/"
      },
      {
        "id": "strings-12",
        "name": "Zigzag Conversion",
        "difficulty": "Medium",
        "pattern": "Simulation",
        "url": "https://leetcode.com/problems/zigzag-conversion/"
      },
      {
        "id": "strings-13",
        "name": "Count and Say",
        "difficulty": "Medium",
        "pattern": "Simulation / Recursion",
        "url": "https://leetcode.com/problems/count-and-say/"
      },
      {
        "id": "strings-14",
        "name": "Decode Ways",
        "difficulty": "Medium",
        "pattern": "Dynamic Programming",
        "url": "https://leetcode.com/problems/decode-ways/"
      },
      {
        "id": "strings-15",
        "name": "Word Break",
        "difficulty": "Medium",
        "pattern": "DP / BFS",
        "url": "https://leetcode.com/problems/word-break/"
      },
      {
        "id": "strings-16",
        "name": "Find All Anagrams in a String",
        "difficulty": "Medium",
        "pattern": "Sliding Window",
        "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
      },
      {
        "id": "strings-17",
        "name": "Encode and Decode Strings",
        "difficulty": "Medium",
        "pattern": "Length Prefix Encoding",
        "url": "https://leetcode.com/problems/encode-and-decode-strings/"
      },
      {
        "id": "strings-18",
        "name": "Roman to Integer",
        "difficulty": "Easy",
        "pattern": "Hash Map",
        "url": "https://leetcode.com/problems/roman-to-integer/"
      },
      {
        "id": "strings-19",
        "name": "Integer to Roman",
        "difficulty": "Medium",
        "pattern": "Greedy",
        "url": "https://leetcode.com/problems/integer-to-roman/"
      },
      {
        "id": "strings-20",
        "name": "Minimum Window Substring",
        "difficulty": "Hard",
        "pattern": "Sliding Window",
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      },
      {
        "id": "strings-21",
        "name": "Regular Expression Matching",
        "difficulty": "Hard",
        "pattern": "Dynamic Programming",
        "url": "https://leetcode.com/problems/regular-expression-matching/"
      },
      {
        "id": "strings-22",
        "name": "Wildcard Matching",
        "difficulty": "Hard",
        "pattern": "Dynamic Programming",
        "url": "https://leetcode.com/problems/wildcard-matching/"
      },
      {
        "id": "strings-23",
        "name": "Text Justification",
        "difficulty": "Hard",
        "pattern": "Simulation / Greedy",
        "url": "https://leetcode.com/problems/text-justification/"
      }
    ],
    "variations": [
      {
        "title": "Palindrome",
        "items": [
          "Valid Palindrome",
          "Valid Palindrome II (one deletion allowed)",
          "Palindromic Substrings",
          "Longest Palindromic Subsequence",
          "Palindrome Pairs",
          "Minimum Insertions to Make String Palindrome",
          "Shortest Palindrome (KMP)"
        ]
      },
      {
        "title": "Anagram",
        "items": [
          "Valid Anagram",
          "Group Anagrams",
          "Find All Anagrams in a String",
          "Minimum Number of Steps to Make Two Strings Anagram",
          "Permutation in String"
        ]
      },
      {
        "title": "Word Break",
        "items": [
          "Word Break (DP/BFS)",
          "Word Break II (backtracking + memo)",
          "Word Ladder (BFS graph)",
          "Word Ladder II (all shortest paths)"
        ]
      },
      {
        "title": "Substring Search",
        "items": [
          "Longest Substring Without Repeating",
          "Minimum Window Substring",
          "Longest Repeating Character Replacement",
          "Substring with Concatenation of All Words",
          "Longest Substring with At Most K Distinct Characters",
          "Find All Anagrams in a String"
        ]
      },
      {
        "title": "Parentheses & Brackets",
        "items": [
          "Valid Parentheses",
          "Generate Parentheses",
          "Longest Valid Parentheses",
          "Remove Invalid Parentheses",
          "Minimum Add to Make Parentheses Valid",
          "Score of Parentheses"
        ]
      },
      {
        "title": "String Encoding & Compression",
        "items": [
          "Encode and Decode Strings",
          "String Compression",
          "Decode String (k[encoded_string])",
          "Serialize and Deserialize Binary Tree",
          "Run-Length Encoding"
        ]
      },
      {
        "title": "Pattern Matching",
        "items": [
          "Implement strStr() – KMP",
          "Repeated Substring Pattern (Z-function)",
          "Shortest Palindrome (KMP failure function)",
          "Find the Index of the First Occurrence in a String"
        ]
      },
      {
        "title": "Edit Distance Family",
        "items": [
          "Edit Distance (Levenshtein)",
          "One Edit Distance",
          "Delete Operation for Two Strings",
          "Minimum ASCII Delete Sum for Two Strings",
          "Longest Common Subsequence"
        ]
      }
    ],
    "totalEasy": 5,
    "totalMed": 15,
    "totalHard": 4
  },
  {
    "id": "linked-list",
    "num": "03",
    "icon": "🔗",
    "name": "Linked List",
    "color": "#8B5CF6",
    "concepts": [
      "Singly vs Doubly vs Circular Linked Lists; Sentinel/dummy nodes simplify edge cases",
      "Fast & Slow pointers (Floyd's Cycle Detection): O(n) cycle detection",
      "Reverse a linked list iteratively: prev→cur→next pointer dance",
      "Merge two sorted lists: compare heads and recurse/iterate",
      "Find middle: fast pointer moves 2x, slow moves 1x",
      "Edge cases: null head, single node, two nodes, cycle at tail/head",
      "Interview traps: losing references before moving pointers, off-by-one in k-th from end",
      "Dummy node pattern prevents special-casing head deletion",
      "XOR Linked List: doubly linked list using XOR of prev and next for O(1) space",
      "Skip List: multi-level linked list for O(log n) search — used in Redis and LevelDB",
      "LRU Cache: combine doubly linked list + hash map for O(1) get/put",
      "Flatten a multi-level doubly linked list: DFS approach with child pointers",
      "Deep copy with random pointers: interleave or hash map approach",
      "Partition list: maintain two separate lists (< pivot, >= pivot) then merge",
      "In-place reversal in k-group: count k nodes, reverse, connect, repeat",
      "Detecting start of cycle: after meeting point, reset one pointer to head — they meet at cycle start",
      "Palindrome check on linked list: find mid, reverse second half, compare, restore",
      "Merge Sort on linked list: preferred over QuickSort since no random access; O(n log n) time, O(log n) space",
      "Intersection of two lists: equalize lengths by advancing longer list's pointer; O(n+m)",
      "Doubly linked list enables O(1) removal of any node when pointer is given"
    ],
    "patterns": [
      {
        "title": "Fast & Slow Pointers",
        "desc": "Detect cycle, find middle, find cycle start using two-speed traversal."
      },
      {
        "title": "Dummy Node",
        "desc": "Prepend a fake head to simplify insertion/deletion at head."
      },
      {
        "title": "In-place Reversal",
        "desc": "Reverse a sublist by relinking next pointers without extra space."
      },
      {
        "title": "Merge Two Lists",
        "desc": "Compare heads of two sorted lists and greedily pick smaller."
      },
      {
        "title": "Two Passes",
        "desc": "First pass count length or find tail; second pass operate at specific index."
      },
      {
        "title": "Recursion",
        "desc": "Elegant reversal and merge; mind the call stack depth for large lists."
      }
    ],
    "problems": [
      {
        "id": "linked-list-0",
        "name": "Reverse Linked List",
        "difficulty": "Easy",
        "pattern": "Iterative / Recursive",
        "url": "https://leetcode.com/problems/reverse-linked-list/"
      },
      {
        "id": "linked-list-1",
        "name": "Merge Two Sorted Lists",
        "difficulty": "Easy",
        "pattern": "Two Pointers / Merge",
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
      },
      {
        "id": "linked-list-2",
        "name": "Linked List Cycle",
        "difficulty": "Easy",
        "pattern": "Fast & Slow Pointers",
        "url": "https://leetcode.com/problems/linked-list-cycle/"
      },
      {
        "id": "linked-list-3",
        "name": "Middle of the Linked List",
        "difficulty": "Easy",
        "pattern": "Fast & Slow Pointers",
        "url": "https://leetcode.com/problems/middle-of-the-linked-list/"
      },
      {
        "id": "linked-list-4",
        "name": "Palindrome Linked List",
        "difficulty": "Easy",
        "pattern": "Reverse Half + Compare",
        "url": "https://leetcode.com/problems/palindrome-linked-list/"
      },
      {
        "id": "linked-list-5",
        "name": "Remove Linked List Elements",
        "difficulty": "Easy",
        "pattern": "Dummy Node",
        "url": "https://leetcode.com/problems/remove-linked-list-elements/"
      },
      {
        "id": "linked-list-6",
        "name": "Intersection of Two Linked Lists",
        "difficulty": "Easy",
        "pattern": "Two Pointers",
        "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/"
      },
      {
        "id": "linked-list-7",
        "name": "Remove Nth Node From End of List",
        "difficulty": "Medium",
        "pattern": "Two Pointers / Two Pass",
        "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
      },
      {
        "id": "linked-list-8",
        "name": "Swap Nodes in Pairs",
        "difficulty": "Medium",
        "pattern": "Recursion / Iterative",
        "url": "https://leetcode.com/problems/swap-nodes-in-pairs/"
      },
      {
        "id": "linked-list-9",
        "name": "Odd Even Linked List",
        "difficulty": "Medium",
        "pattern": "Two Pointers",
        "url": "https://leetcode.com/problems/odd-even-linked-list/"
      },
      {
        "id": "linked-list-10",
        "name": "Reorder List",
        "difficulty": "Medium",
        "pattern": "Find Mid + Reverse + Merge",
        "url": "https://leetcode.com/problems/reorder-list/"
      },
      {
        "id": "linked-list-11",
        "name": "Add Two Numbers",
        "difficulty": "Medium",
        "pattern": "Simulation / Carry",
        "url": "https://leetcode.com/problems/add-two-numbers/"
      },
      {
        "id": "linked-list-12",
        "name": "Copy List with Random Pointer",
        "difficulty": "Medium",
        "pattern": "Hash Map / Interweaving",
        "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
      },
      {
        "id": "linked-list-13",
        "name": "Linked List Cycle II",
        "difficulty": "Medium",
        "pattern": "Fast & Slow (Find Start)",
        "url": "https://leetcode.com/problems/linked-list-cycle-ii/"
      },
      {
        "id": "linked-list-14",
        "name": "Sort List",
        "difficulty": "Medium",
        "pattern": "Merge Sort on List",
        "url": "https://leetcode.com/problems/sort-list/"
      },
      {
        "id": "linked-list-15",
        "name": "Rotate List",
        "difficulty": "Medium",
        "pattern": "Find Tail + Reconnect",
        "url": "https://leetcode.com/problems/rotate-list/"
      },
      {
        "id": "linked-list-16",
        "name": "Partition List",
        "difficulty": "Medium",
        "pattern": "Two Dummy Nodes",
        "url": "https://leetcode.com/problems/partition-list/"
      },
      {
        "id": "linked-list-17",
        "name": "LRU Cache",
        "difficulty": "Medium",
        "pattern": "Doubly LL + Hash Map",
        "url": "https://leetcode.com/problems/lru-cache/"
      },
      {
        "id": "linked-list-18",
        "name": "Remove Duplicates from Sorted List II",
        "difficulty": "Medium",
        "pattern": "Dummy + Skip Dups",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/"
      },
      {
        "id": "linked-list-19",
        "name": "Reverse Linked List II",
        "difficulty": "Medium",
        "pattern": "In-place Reversal",
        "url": "https://leetcode.com/problems/reverse-linked-list-ii/"
      },
      {
        "id": "linked-list-20",
        "name": "Flatten a Multilevel Doubly Linked List",
        "difficulty": "Medium",
        "pattern": "DFS / Recursion",
        "url": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/"
      },
      {
        "id": "linked-list-21",
        "name": "Merge K Sorted Lists",
        "difficulty": "Hard",
        "pattern": "Min-Heap / Divide & Conquer",
        "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
      },
      {
        "id": "linked-list-22",
        "name": "Reverse Nodes in k-Group",
        "difficulty": "Hard",
        "pattern": "In-place Reversal",
        "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/"
      },
      {
        "id": "linked-list-23",
        "name": "Find the Duplicate Number",
        "difficulty": "Hard",
        "pattern": "Floyd's Cycle Detection",
        "url": "https://leetcode.com/problems/find-the-duplicate-number/"
      }
    ],
    "variations": [
      {
        "title": "Reverse Linked List",
        "items": [
          "Reverse Linked List (full list)",
          "Reverse Linked List II (sublist from m to n)",
          "Reverse Nodes in k-Group",
          "Reverse Every 2k Characters",
          "Swap Nodes in Pairs"
        ]
      },
      {
        "title": "Linked List Cycle",
        "items": [
          "Linked List Cycle I (detect)",
          "Linked List Cycle II (find start of cycle)",
          "Find the Duplicate Number (Floyd's as cycle in array)",
          "Happy Number (cycle in sequence)"
        ]
      },
      {
        "title": "Merge Lists",
        "items": [
          "Merge Two Sorted Lists",
          "Merge K Sorted Lists (min-heap)",
          "Sort List (merge sort on list)",
          "Insertion Sort List",
          "Add Two Numbers (carry through list)"
        ]
      },
      {
        "title": "Remove Nodes",
        "items": [
          "Remove Nth Node From End",
          "Remove Duplicates from Sorted List I",
          "Remove Duplicates from Sorted List II (all dupes gone)",
          "Delete Node in a Linked List (O(1) without head)",
          "Remove Linked List Elements (by value)"
        ]
      },
      {
        "title": "Reorder / Rearrange",
        "items": [
          "Reorder List (L0→Ln→L1→Ln-1)",
          "Odd Even Linked List",
          "Partition List (< x and >= x)",
          "Rotate List (rotate by k)",
          "Flatten a Multilevel Doubly Linked List"
        ]
      },
      {
        "title": "Design & Caching",
        "items": [
          "LRU Cache (doubly LL + hash map)",
          "LFU Cache (frequency-aware eviction)",
          "Design Linked List (custom implementation)",
          "Design Browser History (doubly LL navigation)",
          "All O(1) Data Structure"
        ]
      }
    ],
    "totalEasy": 7,
    "totalMed": 14,
    "totalHard": 3
  },
  {
    "id": "stack",
    "num": "04",
    "icon": "📚",
    "name": "Stack",
    "color": "#F59E0B",
    "concepts": [
      "LIFO: push O(1), pop O(1), peek O(1); implemented via array or linked list",
      "Monotonic stack: keeps elements in monotonically increasing or decreasing order",
      "Used for: next greater element, span problems, histogram area, balanced parens",
      "Simulate recursion iteratively using explicit stack",
      "Two stacks can implement a queue (amortized O(1) dequeue)",
      "Edge cases: empty stack pop/peek, unbalanced parentheses, all-increasing sequences",
      "Interview traps: forgetting to check empty before pop, using wrong monotonicity",
      "Min stack: track running minimum in O(1) using auxiliary stack or tuple (val, min)",
      "Postfix/Infix/Prefix evaluation: convert using Shunting-yard or direct evaluation",
      "Stack-based DFS: replace recursion call stack with explicit stack for iterative tree/graph traversal",
      "Decreasing monotonic stack: for Next Greater Element; increasing for Next Smaller Element",
      "Largest rectangle in histogram: classic monotonic stack application — O(n) solution",
      "Undo/Redo functionality: two-stack approach — actions stack and undo stack",
      "Call stack simulation: function call frames stored as objects on explicit stack",
      "Parenthesis score: use stack to compute score of nested parentheses in O(n)",
      "Trapping Rain Water: precompute left-max / right-max, or use monotonic stack in one pass",
      "Browser history: stack for back navigation, separate stack for forward",
      "Simplify path: split by '/', use stack to handle '..' and '.' components"
    ],
    "patterns": [
      {
        "title": "Monotonic Stack",
        "desc": "Push elements; pop when current element violates monotonicity. Finds NGE in O(n)."
      },
      {
        "title": "Balanced Parentheses",
        "desc": "Push opening brackets; on closing, check stack top for matching opener."
      },
      {
        "title": "Stack + Hash Map",
        "desc": "Match opening/closing chars or track last seen character."
      },
      {
        "title": "Two Stacks for Queue",
        "desc": "Inbox stack for push; rotate to outbox stack for pop (amortized O(1))."
      },
      {
        "title": "Expression Evaluation",
        "desc": "Two stacks: one for operands, one for operators; respect precedence."
      }
    ],
    "problems": [
      {
        "id": "stack-0",
        "name": "Valid Parentheses",
        "difficulty": "Easy",
        "pattern": "Stack + Matching",
        "url": "https://leetcode.com/problems/valid-parentheses/"
      },
      {
        "id": "stack-1",
        "name": "Min Stack",
        "difficulty": "Medium",
        "pattern": "Auxiliary Min Stack",
        "url": "https://leetcode.com/problems/min-stack/"
      },
      {
        "id": "stack-2",
        "name": "Implement Queue using Stacks",
        "difficulty": "Easy",
        "pattern": "Two Stacks",
        "url": "https://leetcode.com/problems/implement-queue-using-stacks/"
      },
      {
        "id": "stack-3",
        "name": "Baseball Game",
        "difficulty": "Easy",
        "pattern": "Stack Simulation",
        "url": "https://leetcode.com/problems/baseball-game/"
      },
      {
        "id": "stack-4",
        "name": "Backspace String Compare",
        "difficulty": "Easy",
        "pattern": "Stack / Two Pointers",
        "url": "https://leetcode.com/problems/backspace-string-compare/"
      },
      {
        "id": "stack-5",
        "name": "Daily Temperatures",
        "difficulty": "Medium",
        "pattern": "Monotonic Stack (NGE)",
        "url": "https://leetcode.com/problems/daily-temperatures/"
      },
      {
        "id": "stack-6",
        "name": "Next Greater Element I",
        "difficulty": "Easy",
        "pattern": "Monotonic Stack + Map",
        "url": "https://leetcode.com/problems/next-greater-element-i/"
      },
      {
        "id": "stack-7",
        "name": "Next Greater Element II",
        "difficulty": "Medium",
        "pattern": "Circular Monotonic Stack",
        "url": "https://leetcode.com/problems/next-greater-element-ii/"
      },
      {
        "id": "stack-8",
        "name": "Evaluate Reverse Polish Notation",
        "difficulty": "Medium",
        "pattern": "Stack Evaluation",
        "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
      },
      {
        "id": "stack-9",
        "name": "Generate Parentheses",
        "difficulty": "Medium",
        "pattern": "Backtracking / Stack",
        "url": "https://leetcode.com/problems/generate-parentheses/"
      },
      {
        "id": "stack-10",
        "name": "Decode String",
        "difficulty": "Medium",
        "pattern": "Stack (count + string)",
        "url": "https://leetcode.com/problems/decode-string/"
      },
      {
        "id": "stack-11",
        "name": "Asteroid Collision",
        "difficulty": "Medium",
        "pattern": "Stack Simulation",
        "url": "https://leetcode.com/problems/asteroid-collision/"
      },
      {
        "id": "stack-12",
        "name": "Remove All Adjacent Duplicates in String II",
        "difficulty": "Medium",
        "pattern": "Stack + Count",
        "url": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/"
      },
      {
        "id": "stack-13",
        "name": "Online Stock Span",
        "difficulty": "Medium",
        "pattern": "Monotonic Stack",
        "url": "https://leetcode.com/problems/online-stock-span/"
      },
      {
        "id": "stack-14",
        "name": "Car Fleet",
        "difficulty": "Medium",
        "pattern": "Monotonic Stack",
        "url": "https://leetcode.com/problems/car-fleet/"
      },
      {
        "id": "stack-15",
        "name": "Flatten Nested List Iterator",
        "difficulty": "Medium",
        "pattern": "Stack",
        "url": "https://leetcode.com/problems/flatten-nested-list-iterator/"
      },
      {
        "id": "stack-16",
        "name": "Basic Calculator II",
        "difficulty": "Medium",
        "pattern": "Stack + Operator Precedence",
        "url": "https://leetcode.com/problems/basic-calculator-ii/"
      },
      {
        "id": "stack-17",
        "name": "Remove K Digits",
        "difficulty": "Medium",
        "pattern": "Greedy + Monotonic Stack",
        "url": "https://leetcode.com/problems/remove-k-digits/"
      },
      {
        "id": "stack-18",
        "name": "Largest Rectangle in Histogram",
        "difficulty": "Hard",
        "pattern": "Monotonic Stack",
        "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
      },
      {
        "id": "stack-19",
        "name": "Trapping Rain Water",
        "difficulty": "Hard",
        "pattern": "Monotonic Stack / Two Ptrs",
        "url": "https://leetcode.com/problems/trapping-rain-water/"
      },
      {
        "id": "stack-20",
        "name": "Basic Calculator",
        "difficulty": "Hard",
        "pattern": "Stack + Recursion",
        "url": "https://leetcode.com/problems/basic-calculator/"
      },
      {
        "id": "stack-21",
        "name": "Maximal Rectangle",
        "difficulty": "Hard",
        "pattern": "Histogram + Stack",
        "url": "https://leetcode.com/problems/maximal-rectangle/"
      }
    ],
    "variations": [
      {
        "title": "Valid Parentheses",
        "items": [
          "Valid Parentheses (multiple bracket types)",
          "Generate Parentheses (backtracking)",
          "Minimum Add to Make Parentheses Valid",
          "Minimum Remove to Make Valid Parentheses",
          "Score of Parentheses",
          "Longest Valid Parentheses"
        ]
      },
      {
        "title": "Next Greater / Smaller Element",
        "items": [
          "Next Greater Element I (with hash map)",
          "Next Greater Element II (circular array)",
          "Daily Temperatures (days until warmer)",
          "Online Stock Span (consecutive ≤ days)",
          "Previous Smaller Element",
          "Next Smaller Element"
        ]
      },
      {
        "title": "Calculator / Expression",
        "items": [
          "Basic Calculator I (with parentheses)",
          "Basic Calculator II (no parentheses)",
          "Evaluate Reverse Polish Notation",
          "Decode String (k[s] nesting)",
          "Expression Add Operators",
          "Build an Expression Tree"
        ]
      },
      {
        "title": "Histogram / Area",
        "items": [
          "Largest Rectangle in Histogram",
          "Maximal Rectangle (2D extension)",
          "Trapping Rain Water",
          "Container With Most Water"
        ]
      },
      {
        "title": "Min Stack / Special Stack",
        "items": [
          "Min Stack (O(1) getMin)",
          "Max Stack (with popMax O(log n))",
          "Implement Queue using Stacks",
          "Implement Stack using Queues",
          "Sort a Stack using recursion"
        ]
      },
      {
        "title": "String Reductions",
        "items": [
          "Remove All Adjacent Duplicates in String",
          "Remove All Adjacent Duplicates in String II (k count)",
          "Remove K Digits (smallest number)",
          "Simplify Path (Unix-style path)",
          "Minimum String Length After Removing Substrings"
        ]
      }
    ],
    "totalEasy": 5,
    "totalMed": 13,
    "totalHard": 4
  },
  {
    "id": "queue",
    "num": "05",
    "icon": "🚶",
    "name": "Queue",
    "color": "#EC4899",
    "concepts": [
      "FIFO: enqueue O(1), dequeue O(1); implemented via array (circular) or linked list",
      "Deque (double-ended queue): insert/delete from both ends in O(1)",
      "BFS uses a queue to process nodes level by level",
      "Monotonic deque for sliding window maximum in O(n)",
      "Priority queue (heap-based) gives O(log n) insert and O(log n) extract-min/max",
      "Edge cases: empty queue dequeue, single-element queue",
      "Circular queue: wrap around with modular arithmetic (head + 1) % capacity",
      "Multi-source BFS: enqueue all sources initially for simultaneous expansion",
      "0-1 BFS: use deque — push weight-0 edges to front, weight-1 to back",
      "Topological sort (Kahn's): use queue to process nodes with in-degree 0",
      "Task scheduling: queue-based round-robin simulation with cooldown",
      "Level-order traversal: track level boundary using queue size or sentinel",
      "Interview traps: forgetting to mark visited in BFS, infinite loops in cyclic graphs",
      "Bidirectional BFS: expand from both source and target simultaneously; cuts complexity from O(b^d) to O(b^(d/2))",
      "BFS on implicit graphs: state = node in BFS; e.g., word ladder, lock combinations",
      "Deque as monotonic deque: maintain candidates for window max/min — pop from back if violating, pop from front if out of window",
      "Queue for round-robin scheduling: rotate queue after processing each element"
    ],
    "patterns": [
      {
        "title": "BFS",
        "desc": "Process level by level; enqueue neighbors when visiting each node."
      },
      {
        "title": "Monotonic Deque",
        "desc": "Maintain deque with indices; front always holds max/min of current window."
      },
      {
        "title": "Two Queues / Stack+Queue",
        "desc": "Implement one data structure using another with amortized complexity."
      },
      {
        "title": "Circular Queue",
        "desc": "Fixed-size buffer with head/tail pointers for O(1) enqueue/dequeue."
      }
    ],
    "problems": [
      {
        "id": "queue-0",
        "name": "Implement Queue using Stacks",
        "difficulty": "Easy",
        "pattern": "Two Stacks",
        "url": "https://leetcode.com/problems/implement-queue-using-stacks/"
      },
      {
        "id": "queue-1",
        "name": "Implement Stack using Queues",
        "difficulty": "Easy",
        "pattern": "Two Queues",
        "url": "https://leetcode.com/problems/implement-stack-using-queues/"
      },
      {
        "id": "queue-2",
        "name": "Design Circular Queue",
        "difficulty": "Medium",
        "pattern": "Array + Head/Tail Ptrs",
        "url": "https://leetcode.com/problems/design-circular-queue/"
      },
      {
        "id": "queue-3",
        "name": "Design Circular Deque",
        "difficulty": "Medium",
        "pattern": "Doubly Linked List / Array",
        "url": "https://leetcode.com/problems/design-circular-deque/"
      },
      {
        "id": "queue-4",
        "name": "Number of Recent Calls",
        "difficulty": "Easy",
        "pattern": "Queue / Sliding Window",
        "url": "https://leetcode.com/problems/number-of-recent-calls/"
      },
      {
        "id": "queue-5",
        "name": "Binary Tree Level Order Traversal",
        "difficulty": "Medium",
        "pattern": "BFS Queue",
        "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
      },
      {
        "id": "queue-6",
        "name": "Rotting Oranges",
        "difficulty": "Medium",
        "pattern": "Multi-source BFS",
        "url": "https://leetcode.com/problems/rotting-oranges/"
      },
      {
        "id": "queue-7",
        "name": "Walls and Gates",
        "difficulty": "Medium",
        "pattern": "Multi-source BFS",
        "url": "https://leetcode.com/problems/walls-and-gates/"
      },
      {
        "id": "queue-8",
        "name": "01 Matrix",
        "difficulty": "Medium",
        "pattern": "BFS from 0s",
        "url": "https://leetcode.com/problems/01-matrix/"
      },
      {
        "id": "queue-9",
        "name": "Sliding Window Maximum",
        "difficulty": "Hard",
        "pattern": "Monotonic Deque",
        "url": "https://leetcode.com/problems/sliding-window-maximum/"
      },
      {
        "id": "queue-10",
        "name": "Jump Game VI",
        "difficulty": "Medium",
        "pattern": "Monotonic Deque + DP",
        "url": "https://leetcode.com/problems/jump-game-vi/"
      },
      {
        "id": "queue-11",
        "name": "First Unique Character in a String",
        "difficulty": "Easy",
        "pattern": "Queue + Frequency",
        "url": "https://leetcode.com/problems/first-unique-character-in-a-string/"
      },
      {
        "id": "queue-12",
        "name": "Task Scheduler",
        "difficulty": "Medium",
        "pattern": "Greedy + Queue/Count",
        "url": "https://leetcode.com/problems/task-scheduler/"
      },
      {
        "id": "queue-13",
        "name": "Shortest Path in Binary Matrix",
        "difficulty": "Medium",
        "pattern": "BFS Queue",
        "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
      },
      {
        "id": "queue-14",
        "name": "Shortest Bridge",
        "difficulty": "Medium",
        "pattern": "BFS + DFS",
        "url": "https://leetcode.com/problems/shortest-bridge/"
      }
    ],
    "variations": [
      {
        "title": "Sliding Window Maximum / Minimum",
        "items": [
          "Sliding Window Maximum (monotonic deque)",
          "Sliding Window Minimum",
          "Max Value of Equation",
          "Constrained Subsequence Sum",
          "Jump Game VI (deque + DP)"
        ]
      },
      {
        "title": "BFS Level Order",
        "items": [
          "Binary Tree Level Order Traversal",
          "Binary Tree Level Order Traversal II (bottom-up)",
          "Binary Tree Zigzag Level Order",
          "N-ary Level Order",
          "Average of Levels in Binary Tree",
          "Maximum Width of Binary Tree"
        ]
      },
      {
        "title": "Shortest Path BFS",
        "items": [
          "Shortest Path in Binary Matrix",
          "Shortest Bridge (BFS + DFS)",
          "Word Ladder (BFS on word graph)",
          "Open the Lock (BFS on state graph)",
          "Minimum Genetic Mutation",
          "Escape the Large Maze"
        ]
      },
      {
        "title": "Multi-source BFS",
        "items": [
          "Rotting Oranges",
          "Walls and Gates",
          "01 Matrix (nearest zero)",
          "Pacific Atlantic Water Flow",
          "As Far from Land as Possible",
          "Nearest Exit from Entrance in Maze"
        ]
      },
      {
        "title": "Task Scheduling",
        "items": [
          "Task Scheduler",
          "Process Tasks Using Servers",
          "Design Hit Counter",
          "Moving Average from Data Stream",
          "Reorganize String"
        ]
      },
      {
        "title": "Topological Sort / Dependencies",
        "items": [
          "Course Schedule I (cycle check)",
          "Course Schedule II (ordering)",
          "Alien Dictionary (topo on chars)",
          "Sequence Reconstruction",
          "Minimum Height Trees",
          "Parallel Courses"
        ]
      }
    ],
    "totalEasy": 4,
    "totalMed": 10,
    "totalHard": 1
  },
  {
    "id": "hashing",
    "num": "06",
    "icon": "#️⃣",
    "name": "Hashing",
    "color": "#6366F1",
    "concepts": [
      "Hash Map: O(1) average insert/lookup/delete; O(n) worst case (collisions)",
      "Hash Set: O(1) membership test; great for deduplication",
      "Open addressing vs chaining collision resolution",
      "Rolling hash / Polynomial hash for substring matching",
      "Frequency map: count characters, words, or elements",
      "Hash function properties: deterministic, uniform distribution, minimal collisions",
      "Load factor = n/k; resize (rehash) when load factor exceeds threshold (~0.75)",
      "Consistent hashing: distribute keys across nodes; minimizes redistribution on scale",
      "Two-sum pattern: store complement in map, check existence in O(1) per element",
      "Prefix sum + hash map: count subarrays with target sum in O(n)",
      "Bidirectional mapping: use two hash maps for isomorphic / word-pattern problems",
      "Bucket sort via hash map: group by frequency, then iterate buckets for Top-K",
      "Edge cases: null keys, hash collisions, very large keys, negative key values",
      "Interview traps: using mutable objects as keys, assuming O(1) always, hash overflow",
      "When to use: when you need O(1) lookup, grouping by some key, or deduplication",
      "Space-time trade-off: hash maps trade O(n) space for O(1) lookup vs O(n) scan",
      "Rabin-Karp rolling hash: remove contribution of outgoing element, add incoming — O(1) per step",
      "HashMap vs TreeMap: O(1) vs O(log n) — use TreeMap when sorted key iteration is needed",
      "Multimap pattern: map from key to list of values for grouping problems",
      "Counting vs presence: decide between HashMap<K, Integer> (count) vs HashSet<K> (exists)"
    ],
    "patterns": [
      {
        "title": "Frequency Count",
        "desc": "Count occurrences to find majority element, anagrams, or duplicates."
      },
      {
        "title": "Grouping by Key",
        "desc": "Group elements by transformed value (sorted anagram, pattern)."
      },
      {
        "title": "Two-Sum Pattern",
        "desc": "Store complement in map; check if current element's complement exists."
      },
      {
        "title": "Prefix Sum + Hash Map",
        "desc": "Store prefix sums; look up target difference in O(1)."
      },
      {
        "title": "Sliding Window + Hash Map",
        "desc": "Track character frequencies in window for substring constraint problems."
      },
      {
        "title": "Union-Find with Hashing",
        "desc": "Group connected components using hash map as parent store."
      },
      {
        "title": "Bidirectional Mapping",
        "desc": "Two maps for one-to-one correspondence checks (isomorphic, word pattern)."
      }
    ],
    "problems": [
      {
        "id": "hashing-0",
        "name": "Two Sum",
        "difficulty": "Easy",
        "pattern": "Hash Map (complement)",
        "url": "https://leetcode.com/problems/two-sum/"
      },
      {
        "id": "hashing-1",
        "name": "Valid Anagram",
        "difficulty": "Easy",
        "pattern": "Frequency Array",
        "url": "https://leetcode.com/problems/valid-anagram/"
      },
      {
        "id": "hashing-2",
        "name": "Contains Duplicate",
        "difficulty": "Easy",
        "pattern": "Hash Set",
        "url": "https://leetcode.com/problems/contains-duplicate/"
      },
      {
        "id": "hashing-3",
        "name": "Single Number",
        "difficulty": "Easy",
        "pattern": "XOR / Hash Set",
        "url": "https://leetcode.com/problems/single-number/"
      },
      {
        "id": "hashing-4",
        "name": "Intersection of Two Arrays",
        "difficulty": "Easy",
        "pattern": "Hash Set",
        "url": "https://leetcode.com/problems/intersection-of-two-arrays/"
      },
      {
        "id": "hashing-5",
        "name": "Happy Number",
        "difficulty": "Easy",
        "pattern": "Hash Set / Floyd's Cycle",
        "url": "https://leetcode.com/problems/happy-number/"
      },
      {
        "id": "hashing-6",
        "name": "Group Anagrams",
        "difficulty": "Medium",
        "pattern": "Sort + Hash Map",
        "url": "https://leetcode.com/problems/group-anagrams/"
      },
      {
        "id": "hashing-7",
        "name": "Top K Frequent Elements",
        "difficulty": "Medium",
        "pattern": "Hash Map + Bucket Sort",
        "url": "https://leetcode.com/problems/top-k-frequent-elements/"
      },
      {
        "id": "hashing-8",
        "name": "Subarray Sum Equals K",
        "difficulty": "Medium",
        "pattern": "Prefix Sum + Hash Map",
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/"
      },
      {
        "id": "hashing-9",
        "name": "Longest Consecutive Sequence",
        "difficulty": "Medium",
        "pattern": "Hash Set + Linear Scan",
        "url": "https://leetcode.com/problems/longest-consecutive-sequence/"
      },
      {
        "id": "hashing-10",
        "name": "4Sum II",
        "difficulty": "Medium",
        "pattern": "Two-pair Hash Map",
        "url": "https://leetcode.com/problems/4sum-ii/"
      },
      {
        "id": "hashing-11",
        "name": "Valid Sudoku",
        "difficulty": "Medium",
        "pattern": "Hash Set per row/col/box",
        "url": "https://leetcode.com/problems/valid-sudoku/"
      },
      {
        "id": "hashing-12",
        "name": "Isomorphic Strings",
        "difficulty": "Easy",
        "pattern": "Bidirectional Hash Map",
        "url": "https://leetcode.com/problems/isomorphic-strings/"
      },
      {
        "id": "hashing-13",
        "name": "Word Pattern",
        "difficulty": "Easy",
        "pattern": "Bidirectional Hash Map",
        "url": "https://leetcode.com/problems/word-pattern/"
      },
      {
        "id": "hashing-14",
        "name": "Copy List with Random Pointer",
        "difficulty": "Medium",
        "pattern": "Hash Map (old→new nodes)",
        "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
      },
      {
        "id": "hashing-15",
        "name": "LRU Cache",
        "difficulty": "Medium",
        "pattern": "Hash Map + Doubly LL",
        "url": "https://leetcode.com/problems/lru-cache/"
      },
      {
        "id": "hashing-16",
        "name": "Insert Delete GetRandom O(1)",
        "difficulty": "Medium",
        "pattern": "Hash Map + Array",
        "url": "https://leetcode.com/problems/insert-delete-getrandom-o1/"
      },
      {
        "id": "hashing-17",
        "name": "Find Duplicate Subtrees",
        "difficulty": "Medium",
        "pattern": "Serialization + Hash Map",
        "url": "https://leetcode.com/problems/find-duplicate-subtrees/"
      },
      {
        "id": "hashing-18",
        "name": "Max Points on a Line",
        "difficulty": "Hard",
        "pattern": "Slope + Hash Map",
        "url": "https://leetcode.com/problems/max-points-on-a-line/"
      },
      {
        "id": "hashing-19",
        "name": "Minimum Window Substring",
        "difficulty": "Hard",
        "pattern": "Sliding Window + Map",
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      }
    ],
    "variations": [
      {
        "title": "Two Sum Family",
        "items": [
          "Two Sum (unsorted, hash map)",
          "Two Sum II (sorted, two pointers)",
          "3Sum (fix + two pointer)",
          "4Sum (fix two + two pointer)",
          "Two Sum BST (inorder + set)",
          "Count Pairs with Given Sum",
          "4Sum II (two pair hash map)"
        ]
      },
      {
        "title": "Top K Frequent",
        "items": [
          "Top K Frequent Elements (bucket sort)",
          "Top K Frequent Words (heap + lex order)",
          "Sort Characters By Frequency",
          "K Closest Points to Origin",
          "Kth Largest Element"
        ]
      },
      {
        "title": "Anagram Detection",
        "items": [
          "Valid Anagram",
          "Group Anagrams",
          "Find All Anagrams in a String",
          "Minimum Swaps to Make Anagram",
          "Permutation in String"
        ]
      },
      {
        "title": "Subarray Sum",
        "items": [
          "Subarray Sum Equals K",
          "Continuous Subarray Sum (multiple of k)",
          "Count Subarrays with Score Less Than K",
          "Binary Subarrays With Sum",
          "Count Number of Nice Subarrays"
        ]
      },
      {
        "title": "Consecutive Sequence",
        "items": [
          "Longest Consecutive Sequence (hash set)",
          "Longest Harmonious Subsequence",
          "Max Consecutive Ones III",
          "Contains Duplicate II (within k distance)"
        ]
      },
      {
        "title": "Design with Hashing",
        "items": [
          "LRU Cache (hash map + doubly LL)",
          "LFU Cache (two maps + min-freq)",
          "Insert Delete GetRandom O(1)",
          "Design HashMap (from scratch)",
          "All O(1) Data Structure",
          "Time Based Key-Value Store"
        ]
      }
    ],
    "totalEasy": 8,
    "totalMed": 10,
    "totalHard": 2
  },
  {
    "id": "recursion",
    "num": "07",
    "icon": "🔄",
    "name": "Recursion",
    "color": "#14B8A6",
    "concepts": [
      "Base case stops recursion; recursive case reduces the problem toward the base",
      "Call stack depth: O(n) space for linear recursion, O(log n) for balanced divide",
      "Tail recursion: last call is recursive; can be optimized by compilers",
      "Memoization converts exponential recursion to polynomial time",
      "Mutual recursion: two functions calling each other",
      "Edge cases: n=0, n=1, empty input, very deep recursion → stack overflow",
      "Interview traps: forgetting base case, recomputing subproblems, wrong return type",
      "Trust the recursive leap: assume recursive call works correctly",
      "State preservation: pass variables by value vs reference in recursive calls",
      "Backtracking vs pure recursion: backtracking undoes state after the call",
      "Recursion tree: visualize execution to understand time/space complexity",
      "Time complexity of multiple recursive calls: often O(branches^depth)",
      "Space complexity must include the implicit call stack, not just explicit arrays",
      "Converting recursion to iteration: use an explicit stack data structure",
      "Subproblems: overlapping (needs memoization) vs independent (divide & conquer)",
      "Master Theorem: T(n) = aT(n/b) + f(n); determines time complexity of divide & conquer",
      "Fibonacci: naive O(2^n) → memoized O(n) → bottom-up O(n) → matrix exponentiation O(log n)",
      "Head recursion (process after return) vs tail recursion (process before call)",
      "Accumulator pattern: pass result as argument to tail-recursive calls to avoid stack buildup"
    ],
    "patterns": [
      {
        "title": "Divide and Conquer",
        "desc": "Split into subproblems, solve independently, combine results."
      },
      {
        "title": "Top-Down Memoization",
        "desc": "Cache results of recursive calls to avoid redundant work."
      },
      {
        "title": "Tree Recursion",
        "desc": "Each call branches into multiple sub-calls (Fibonacci, subsets)."
      },
      {
        "title": "Decrease and Conquer",
        "desc": "Reduce problem by 1 each time (factorial, reverse list)."
      },
      {
        "title": "Post-order Processing",
        "desc": "Process children first, then use their results to compute current node."
      },
      {
        "title": "String / Array Reversal",
        "desc": "Swap outer elements, recurse on inner elements (two pointers style)."
      }
    ],
    "problems": [
      {
        "id": "recursion-0",
        "name": "Fibonacci Number",
        "difficulty": "Easy",
        "pattern": "Recursion / Memoization",
        "url": "https://leetcode.com/problems/fibonacci-number/"
      },
      {
        "id": "recursion-1",
        "name": "Climbing Stairs",
        "difficulty": "Easy",
        "pattern": "Recursion + Memoization",
        "url": "https://leetcode.com/problems/climbing-stairs/"
      },
      {
        "id": "recursion-2",
        "name": "Power of Two",
        "difficulty": "Easy",
        "pattern": "Recursion / Bit Trick",
        "url": "https://leetcode.com/problems/power-of-two/"
      },
      {
        "id": "recursion-3",
        "name": "Reverse String",
        "difficulty": "Easy",
        "pattern": "Two Pointers / Recursion",
        "url": "https://leetcode.com/problems/reverse-string/"
      },
      {
        "id": "recursion-4",
        "name": "Merge Two Sorted Lists",
        "difficulty": "Easy",
        "pattern": "Recursion",
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
      },
      {
        "id": "recursion-5",
        "name": "Reverse Linked List",
        "difficulty": "Easy",
        "pattern": "Recursion",
        "url": "https://leetcode.com/problems/reverse-linked-list/"
      },
      {
        "id": "recursion-6",
        "name": "Maximum Depth of Binary Tree",
        "difficulty": "Easy",
        "pattern": "DFS Recursion",
        "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      {
        "id": "recursion-7",
        "name": "Same Tree",
        "difficulty": "Easy",
        "pattern": "Structural Recursion",
        "url": "https://leetcode.com/problems/same-tree/"
      },
      {
        "id": "recursion-8",
        "name": "Invert Binary Tree",
        "difficulty": "Easy",
        "pattern": "Structural Recursion",
        "url": "https://leetcode.com/problems/invert-binary-tree/"
      },
      {
        "id": "recursion-9",
        "name": "Pow(x, n) – Fast Exponentiation",
        "difficulty": "Medium",
        "pattern": "Divide & Conquer",
        "url": "https://leetcode.com/problems/powx-n/"
      },
      {
        "id": "recursion-10",
        "name": "Flatten Nested List Iterator",
        "difficulty": "Medium",
        "pattern": "Recursion / Stack",
        "url": "https://leetcode.com/problems/flatten-nested-list-iterator/"
      },
      {
        "id": "recursion-11",
        "name": "Generate Parentheses",
        "difficulty": "Medium",
        "pattern": "Backtracking Recursion",
        "url": "https://leetcode.com/problems/generate-parentheses/"
      },
      {
        "id": "recursion-12",
        "name": "Letter Combinations of a Phone Number",
        "difficulty": "Medium",
        "pattern": "Backtracking",
        "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
      },
      {
        "id": "recursion-13",
        "name": "Subsets",
        "difficulty": "Medium",
        "pattern": "Cascading / Backtracking",
        "url": "https://leetcode.com/problems/subsets/"
      },
      {
        "id": "recursion-14",
        "name": "Permutations",
        "difficulty": "Medium",
        "pattern": "Backtracking",
        "url": "https://leetcode.com/problems/permutations/"
      },
      {
        "id": "recursion-15",
        "name": "K-th Symbol in Grammar",
        "difficulty": "Medium",
        "pattern": "Recursive Pattern",
        "url": "https://leetcode.com/problems/k-th-symbol-in-grammar/"
      },
      {
        "id": "recursion-16",
        "name": "Different Ways to Add Parentheses",
        "difficulty": "Medium",
        "pattern": "Divide & Conquer",
        "url": "https://leetcode.com/problems/different-ways-to-add-parentheses/"
      },
      {
        "id": "recursion-17",
        "name": "Tower of Hanoi (simulate)",
        "difficulty": "Medium",
        "pattern": "Classic Recursion",
        "url": "https://leetcode.com/problems/sum-of-two-integers/"
      },
      {
        "id": "recursion-18",
        "name": "Merge Sort Implementation",
        "difficulty": "Medium",
        "pattern": "Divide & Conquer",
        "url": "https://leetcode.com/problems/sort-an-array/"
      },
      {
        "id": "recursion-19",
        "name": "Regular Expression Matching",
        "difficulty": "Hard",
        "pattern": "Recursion + Memoization",
        "url": "https://leetcode.com/problems/regular-expression-matching/"
      }
    ],
    "variations": [
      {
        "title": "Fibonacci Family",
        "items": [
          "Fibonacci Number",
          "Climbing Stairs",
          "Min Cost Climbing Stairs",
          "Tribonacci Number",
          "N-th Tribonacci Number",
          "Frog Jump"
        ]
      },
      {
        "title": "Tree / Graph Traversal",
        "items": [
          "Maximum Depth of Binary Tree",
          "Same Tree",
          "Invert Binary Tree",
          "Path Sum",
          "Symmetric Tree",
          "Diameter of Binary Tree"
        ]
      },
      {
        "title": "Divide & Conquer",
        "items": [
          "Pow(x, n) – fast exponentiation",
          "Merge Sort",
          "Different Ways to Add Parentheses",
          "Construct Binary Tree from Traversals",
          "Median of Two Sorted Arrays",
          "Closest Pair of Points"
        ]
      },
      {
        "title": "String Processing",
        "items": [
          "Reverse String",
          "Decode String",
          "Regular Expression Matching",
          "Wildcard Matching",
          "Count and Say"
        ]
      }
    ],
    "totalEasy": 9,
    "totalMed": 10,
    "totalHard": 1
  },
  {
    "id": "backtracking",
    "num": "08",
    "icon": "↩️",
    "name": "Backtracking",
    "color": "#EF4444",
    "concepts": [
      "Explore all possibilities by building solution incrementally; undo if dead end",
      "Backtrack = prune: avoid exploring clearly invalid paths early",
      "State space is a tree; DFS with undo at each step",
      "Choose → Explore → Unchoose (the backtracking template)",
      "Distinguish between permutations (order matters) and combinations (order doesn't)",
      "Avoid duplicates: sort input + skip duplicate siblings in recursion tree",
      "Edge cases: empty input, k > n, target sum = 0",
      "Interview traps: forgetting to undo state, duplicate results, missing base case",
      "State tracking: use a boolean array, bitmask, or hash set for visited elements",
      "Optimization: sort array first to enable early pruning (e.g., in Combination Sum)",
      "Time complexity is often O(2^n) for subsets, O(n!) for permutations, O(k^n) for grids",
      "Space complexity is O(N) for the recursion stack + space for the path/result",
      "Constraint satisfaction: N-Queens, Sudoku, graph coloring",
      "Memoization vs Backtracking: backtracking explores all paths, memoization caches overlapping subproblems",
      "String generation: building palindromes, balanced parentheses, or valid IP addresses",
      "Pruning strategies: current sum > target (stop early), remaining elements < needed (stop early)",
      "Bitmask backtracking: use integer bitmask to track used elements — useful for TSP, assignment",
      "Grid backtracking: mark cell as visited in-place (e.g., '#'), restore after recursion"
    ],
    "patterns": [
      {
        "title": "Subsets / Power Set",
        "desc": "Include/exclude each element; 2^n subsets total."
      },
      {
        "title": "Permutations",
        "desc": "Place each unused element at each position; n! total."
      },
      {
        "title": "Combinations",
        "desc": "Pick k from n without repetition; C(n,k) results."
      },
      {
        "title": "Constraint-Based Pruning",
        "desc": "Check validity at each step and prune invalid branches early."
      },
      {
        "title": "Grid / Matrix DFS",
        "desc": "Explore 4/8 directions; mark visited and unmark on backtrack."
      },
      {
        "title": "String Partitioning",
        "desc": "Slice string into valid substrings (palindromes, IPs, dictionary words)."
      },
      {
        "title": "Graph Coloring / Placement",
        "desc": "Assign states to nodes with constraints (N-Queens, Sudoku)."
      }
    ],
    "problems": [
      {
        "id": "backtracking-0",
        "name": "Subsets",
        "difficulty": "Medium",
        "pattern": "Inclusion / Exclusion",
        "url": "https://leetcode.com/problems/subsets/"
      },
      {
        "id": "backtracking-1",
        "name": "Subsets II (with duplicates)",
        "difficulty": "Medium",
        "pattern": "Sorted + Skip Dups",
        "url": "https://leetcode.com/problems/subsets-ii/"
      },
      {
        "id": "backtracking-2",
        "name": "Permutations",
        "difficulty": "Medium",
        "pattern": "Backtracking + Used Array",
        "url": "https://leetcode.com/problems/permutations/"
      },
      {
        "id": "backtracking-3",
        "name": "Permutations II (with duplicates)",
        "difficulty": "Medium",
        "pattern": "Sorted + Skip Dups",
        "url": "https://leetcode.com/problems/permutations-ii/"
      },
      {
        "id": "backtracking-4",
        "name": "Combination Sum",
        "difficulty": "Medium",
        "pattern": "Backtrack + No Limit",
        "url": "https://leetcode.com/problems/combination-sum/"
      },
      {
        "id": "backtracking-5",
        "name": "Combination Sum II",
        "difficulty": "Medium",
        "pattern": "Sorted + Skip Dups",
        "url": "https://leetcode.com/problems/combination-sum-ii/"
      },
      {
        "id": "backtracking-6",
        "name": "Combination Sum III",
        "difficulty": "Medium",
        "pattern": "Bounded Backtracking",
        "url": "https://leetcode.com/problems/combination-sum-iii/"
      },
      {
        "id": "backtracking-7",
        "name": "Combinations",
        "difficulty": "Medium",
        "pattern": "Classic C(n,k)",
        "url": "https://leetcode.com/problems/combinations/"
      },
      {
        "id": "backtracking-8",
        "name": "Letter Combinations of a Phone Number",
        "difficulty": "Medium",
        "pattern": "Backtracking on Map",
        "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
      },
      {
        "id": "backtracking-9",
        "name": "Generate Parentheses",
        "difficulty": "Medium",
        "pattern": "Count Open/Close",
        "url": "https://leetcode.com/problems/generate-parentheses/"
      },
      {
        "id": "backtracking-10",
        "name": "Word Search",
        "difficulty": "Medium",
        "pattern": "Grid DFS + Visited",
        "url": "https://leetcode.com/problems/word-search/"
      },
      {
        "id": "backtracking-11",
        "name": "Palindrome Partitioning",
        "difficulty": "Medium",
        "pattern": "Backtrack + Palindrome Check",
        "url": "https://leetcode.com/problems/palindrome-partitioning/"
      },
      {
        "id": "backtracking-12",
        "name": "Partition to K Equal Sum Subsets",
        "difficulty": "Medium",
        "pattern": "Backtracking + Pruning",
        "url": "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/"
      },
      {
        "id": "backtracking-13",
        "name": "Path Sum II",
        "difficulty": "Medium",
        "pattern": "Tree Backtracking",
        "url": "https://leetcode.com/problems/path-sum-ii/"
      },
      {
        "id": "backtracking-14",
        "name": "Restore IP Addresses",
        "difficulty": "Medium",
        "pattern": "Backtracking + Validation",
        "url": "https://leetcode.com/problems/restore-ip-addresses/"
      },
      {
        "id": "backtracking-15",
        "name": "Gray Code",
        "difficulty": "Medium",
        "pattern": "Bit Manipulation / BT",
        "url": "https://leetcode.com/problems/gray-code/"
      },
      {
        "id": "backtracking-16",
        "name": "N-Queens",
        "difficulty": "Hard",
        "pattern": "Classic Backtracking",
        "url": "https://leetcode.com/problems/n-queens/"
      },
      {
        "id": "backtracking-17",
        "name": "N-Queens II",
        "difficulty": "Hard",
        "pattern": "Count Solutions",
        "url": "https://leetcode.com/problems/n-queens-ii/"
      },
      {
        "id": "backtracking-18",
        "name": "Sudoku Solver",
        "difficulty": "Hard",
        "pattern": "Grid Backtracking",
        "url": "https://leetcode.com/problems/sudoku-solver/"
      },
      {
        "id": "backtracking-19",
        "name": "Word Search II",
        "difficulty": "Hard",
        "pattern": "Trie + Backtracking",
        "url": "https://leetcode.com/problems/word-search-ii/"
      },
      {
        "id": "backtracking-20",
        "name": "Expression Add Operators",
        "difficulty": "Hard",
        "pattern": "Backtrack + Eval",
        "url": "https://leetcode.com/problems/expression-add-operators/"
      }
    ],
    "variations": [
      {
        "title": "Subsets",
        "items": [
          "Subsets I (no duplicates)",
          "Subsets II (with duplicates — sort + skip)",
          "Power Set (iterative bitmask)",
          "Count Subsets with Sum K",
          "Partition to K Equal Sum Subsets"
        ]
      },
      {
        "title": "Permutations",
        "items": [
          "Permutations I (unique elements)",
          "Permutations II (with duplicates — sort + skip)",
          "Next Permutation (in-place)",
          "Permutation Sequence (k-th permutation)",
          "Find All Permutations of a String"
        ]
      },
      {
        "title": "N-Queens / Constraint Satisfaction",
        "items": [
          "N-Queens (all arrangements)",
          "N-Queens II (count only)",
          "Sudoku Solver",
          "Valid Sudoku",
          "Graph Coloring (m-coloring)"
        ]
      },
      {
        "title": "Combination Sum",
        "items": [
          "Combination Sum I (unlimited use)",
          "Combination Sum II (each used once)",
          "Combination Sum III (digits 1-9, k numbers)",
          "Combination Sum IV (order matters — DP)",
          "Factor Combinations"
        ]
      },
      {
        "title": "String Partitioning",
        "items": [
          "Palindrome Partitioning",
          "Palindrome Partitioning II (minimum cuts — DP)",
          "Restore IP Addresses",
          "Word Break II",
          "Split String Into Max Unique Substrings"
        ]
      },
      {
        "title": "Path Finding",
        "items": [
          "Word Search I",
          "Word Search II (Trie + backtracking)",
          "Unique Paths III (visit all non-obstacle cells)",
          "Robot Room Cleaner",
          "Path Sum II (root-to-leaf paths)"
        ]
      }
    ],
    "totalEasy": 0,
    "totalMed": 16,
    "totalHard": 5
  },
  {
    "id": "two-pointers",
    "num": "09",
    "icon": "👈👉",
    "name": "Two Pointers",
    "color": "#F97316",
    "concepts": [
      "Two indices traversing the array; reduces O(n²) naive to O(n)",
      "Sorted array prerequisite for opposite-direction two pointers",
      "Same-direction (slow/fast): remove duplicates, partition, cycle detection",
      "Opposite-direction: pair sum, container area, palindrome check",
      "Three pointers: 3Sum, Dutch national flag, partition",
      "Edge cases: empty array, duplicates, all same elements, negative numbers",
      "Interview traps: forgetting to skip duplicates, wrong pointer movement logic",
      "Read/Write pointer pattern: write pointer tracks where to place valid element; read pointer scans forward",
      "Merge two sorted arrays in-place: fill from end to avoid overwriting",
      "Squaring sorted array: use opposite pointers since squares can be out of order at center",
      "Minimum size subarray sum: variable window — expand right, shrink left when valid",
      "Partitioning with invariant: all elements before slow pointer satisfy condition",
      "Two pointers on two separate arrays: merge, intersection, union — compare and advance",
      "k-sum reduction: fix k-2 elements, reduce to two-pointer on remaining"
    ],
    "patterns": [
      {
        "title": "Opposite Ends",
        "desc": "Left and right pointers converge; move based on condition (pair sum, palindrome)."
      },
      {
        "title": "Fast & Slow",
        "desc": "Two pointers at different speeds; detect cycles, find midpoints."
      },
      {
        "title": "Partition",
        "desc": "Maintain boundary between two regions while scanning forward."
      },
      {
        "title": "Three Pointers",
        "desc": "Fix one element, then use two-pointer on rest (3Sum pattern)."
      }
    ],
    "problems": [
      {
        "id": "two-pointers-0",
        "name": "Valid Palindrome",
        "difficulty": "Easy",
        "pattern": "Opposite Two Pointers",
        "url": "https://leetcode.com/problems/valid-palindrome/"
      },
      {
        "id": "two-pointers-1",
        "name": "Move Zeroes",
        "difficulty": "Easy",
        "pattern": "Fast/Slow (Partition)",
        "url": "https://leetcode.com/problems/move-zeroes/"
      },
      {
        "id": "two-pointers-2",
        "name": "Remove Duplicates from Sorted Array",
        "difficulty": "Easy",
        "pattern": "Slow/Fast Pointers",
        "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
      },
      {
        "id": "two-pointers-3",
        "name": "Squares of a Sorted Array",
        "difficulty": "Easy",
        "pattern": "Opposite Pointers",
        "url": "https://leetcode.com/problems/squares-of-a-sorted-array/"
      },
      {
        "id": "two-pointers-4",
        "name": "Two Sum II – Input Sorted",
        "difficulty": "Medium",
        "pattern": "Opposite Pointers",
        "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
      },
      {
        "id": "two-pointers-5",
        "name": "3Sum",
        "difficulty": "Medium",
        "pattern": "Fix + Two Pointers",
        "url": "https://leetcode.com/problems/3sum/"
      },
      {
        "id": "two-pointers-6",
        "name": "3Sum Closest",
        "difficulty": "Medium",
        "pattern": "Fix + Two Pointers",
        "url": "https://leetcode.com/problems/3sum-closest/"
      },
      {
        "id": "two-pointers-7",
        "name": "4Sum",
        "difficulty": "Medium",
        "pattern": "Fix Two + Two Ptrs",
        "url": "https://leetcode.com/problems/4sum/"
      },
      {
        "id": "two-pointers-8",
        "name": "Container With Most Water",
        "difficulty": "Medium",
        "pattern": "Opposite Pointers",
        "url": "https://leetcode.com/problems/container-with-most-water/"
      },
      {
        "id": "two-pointers-9",
        "name": "Sort Colors",
        "difficulty": "Medium",
        "pattern": "Dutch National Flag",
        "url": "https://leetcode.com/problems/sort-colors/"
      },
      {
        "id": "two-pointers-10",
        "name": "Remove Nth Node From End of List",
        "difficulty": "Medium",
        "pattern": "Fast/Slow (LL)",
        "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
      },
      {
        "id": "two-pointers-11",
        "name": "Rotate Array",
        "difficulty": "Medium",
        "pattern": "Multi-step Reversal",
        "url": "https://leetcode.com/problems/rotate-array/"
      },
      {
        "id": "two-pointers-12",
        "name": "Partition Labels",
        "difficulty": "Medium",
        "pattern": "Last Occurrence + Greed",
        "url": "https://leetcode.com/problems/partition-labels/"
      },
      {
        "id": "two-pointers-13",
        "name": "Backspace String Compare",
        "difficulty": "Easy",
        "pattern": "Two Reverse Pointers",
        "url": "https://leetcode.com/problems/backspace-string-compare/"
      },
      {
        "id": "two-pointers-14",
        "name": "Longest Mountain in Array",
        "difficulty": "Medium",
        "pattern": "Expand from Peak",
        "url": "https://leetcode.com/problems/longest-mountain-in-array/"
      },
      {
        "id": "two-pointers-15",
        "name": "Trapping Rain Water",
        "difficulty": "Hard",
        "pattern": "Opposite Two Pointers",
        "url": "https://leetcode.com/problems/trapping-rain-water/"
      },
      {
        "id": "two-pointers-16",
        "name": "Minimum Window Substring",
        "difficulty": "Hard",
        "pattern": "Sliding Window (2-ptr)",
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      }
    ],
    "variations": [
      {
        "title": "k-Sum Family",
        "items": [
          "Two Sum (hash map)",
          "Two Sum II (sorted, two pointers)",
          "3Sum (fix + two pointers)",
          "3Sum Closest",
          "3Sum Smaller (count pairs)",
          "4Sum (fix two + two pointers)"
        ]
      },
      {
        "title": "Remove / Deduplicate",
        "items": [
          "Remove Duplicates from Sorted Array I (keep one)",
          "Remove Duplicates from Sorted Array II (keep at most 2)",
          "Remove Element (in-place by value)",
          "Move Zeroes to End"
        ]
      },
      {
        "title": "Palindrome Family",
        "items": [
          "Valid Palindrome (alphanumeric)",
          "Valid Palindrome II (one deletion allowed)",
          "Palindrome Linked List (reverse half)",
          "Longest Palindromic Substring (expand center)"
        ]
      },
      {
        "title": "Merge Sorted Arrays",
        "items": [
          "Merge Sorted Array (in-place from end)",
          "Merge Two Sorted Lists",
          "Squares of a Sorted Array (fill from end)",
          "Intersection of Two Arrays II"
        ]
      }
    ],
    "totalEasy": 5,
    "totalMed": 10,
    "totalHard": 2
  },
  {
    "id": "sliding-window",
    "num": "10",
    "icon": "🪟",
    "name": "Sliding Window",
    "color": "#06B6D4",
    "concepts": [
      "Fixed window: size k; slide one step at a time, add right, remove left",
      "Variable window: expand right when valid, shrink left when invalid",
      "Two-pointer variant; left pointer only moves forward (amortized O(n))",
      "Hash map tracks frequency of elements in window",
      "Monotonic deque for window maximum/minimum in O(n)",
      "Edge cases: window larger than array, all same elements, empty string",
      "Interview traps: not shrinking window correctly, off-by-one in window size",
      "Key invariant: what condition must the window always satisfy?",
      "At-most K trick: count(at most k) - count(at most k-1) = count(exactly k)",
      "Counting valid windows: for every right pointer, the number of valid left positions can be computed directly",
      "String window problems: use 'have' and 'need' counters to track when window is valid",
      "Binary array window: flip 0s to 1s (or vice versa) within the window — track count of non-dominant element",
      "Shrink on invalid vs expand until valid: two different styles for variable window"
    ],
    "patterns": [
      {
        "title": "Fixed-size Window",
        "desc": "Maintain exact k elements; update by adding right and removing left."
      },
      {
        "title": "Variable Window – Shrink on Invalid",
        "desc": "Expand right freely; shrink from left when window violates constraint."
      },
      {
        "title": "Frequency Map in Window",
        "desc": "Track character/element counts; valid = all target chars satisfied."
      },
      {
        "title": "Monotonic Deque Window",
        "desc": "Deque front = max/min; pop back if smaller, pop front if out of window."
      }
    ],
    "problems": [
      {
        "id": "sliding-window-0",
        "name": "Maximum Average Subarray I",
        "difficulty": "Easy",
        "pattern": "Fixed Window",
        "url": "https://leetcode.com/problems/maximum-average-subarray-i/"
      },
      {
        "id": "sliding-window-1",
        "name": "Longest Substring Without Repeating Characters",
        "difficulty": "Medium",
        "pattern": "Variable Window + Set",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
      },
      {
        "id": "sliding-window-2",
        "name": "Longest Repeating Character Replacement",
        "difficulty": "Medium",
        "pattern": "Variable Window + Freq",
        "url": "https://leetcode.com/problems/longest-repeating-character-replacement/"
      },
      {
        "id": "sliding-window-3",
        "name": "Permutation in String",
        "difficulty": "Medium",
        "pattern": "Fixed Window + Freq",
        "url": "https://leetcode.com/problems/permutation-in-string/"
      },
      {
        "id": "sliding-window-4",
        "name": "Find All Anagrams in a String",
        "difficulty": "Medium",
        "pattern": "Fixed Window + Freq",
        "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
      },
      {
        "id": "sliding-window-5",
        "name": "Fruit Into Baskets",
        "difficulty": "Medium",
        "pattern": "Variable Window ≤2 types",
        "url": "https://leetcode.com/problems/fruit-into-baskets/"
      },
      {
        "id": "sliding-window-6",
        "name": "Max Consecutive Ones III",
        "difficulty": "Medium",
        "pattern": "Variable Window (flips)",
        "url": "https://leetcode.com/problems/max-consecutive-ones-iii/"
      },
      {
        "id": "sliding-window-7",
        "name": "Subarray Product Less Than K",
        "difficulty": "Medium",
        "pattern": "Variable Window",
        "url": "https://leetcode.com/problems/subarray-product-less-than-k/"
      },
      {
        "id": "sliding-window-8",
        "name": "Longest Subarray of 1's After Deleting One Element",
        "difficulty": "Medium",
        "pattern": "Variable Window",
        "url": "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/"
      },
      {
        "id": "sliding-window-9",
        "name": "Number of Substrings Containing All Three Characters",
        "difficulty": "Medium",
        "pattern": "Variable Window",
        "url": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/"
      },
      {
        "id": "sliding-window-10",
        "name": "Minimum Size Subarray Sum",
        "difficulty": "Medium",
        "pattern": "Variable Window",
        "url": "https://leetcode.com/problems/minimum-size-subarray-sum/"
      },
      {
        "id": "sliding-window-11",
        "name": "Sliding Window Maximum",
        "difficulty": "Hard",
        "pattern": "Monotonic Deque",
        "url": "https://leetcode.com/problems/sliding-window-maximum/"
      },
      {
        "id": "sliding-window-12",
        "name": "Minimum Window Substring",
        "difficulty": "Hard",
        "pattern": "Variable Window + Map",
        "url": "https://leetcode.com/problems/minimum-window-substring/"
      },
      {
        "id": "sliding-window-13",
        "name": "Substring with Concatenation of All Words",
        "difficulty": "Hard",
        "pattern": "Fixed Window + Map",
        "url": "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
      },
      {
        "id": "sliding-window-14",
        "name": "Longest Substring with At Most K Distinct Characters",
        "difficulty": "Hard",
        "pattern": "Variable Window + Map",
        "url": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/"
      }
    ],
    "variations": [
      {
        "title": "Longest Substring Without Repeating",
        "items": [
          "Longest Substring Without Repeating Characters",
          "Longest Substring with At Most K Distinct Characters",
          "Longest Substring with At Most Two Distinct Characters",
          "Fruit Into Baskets (at most 2 types)"
        ]
      },
      {
        "title": "Minimum Window",
        "items": [
          "Minimum Window Substring (must contain all chars)",
          "Minimum Size Subarray Sum (sum >= target)",
          "Smallest Range Covering Elements from K Lists"
        ]
      },
      {
        "title": "Fixed Window",
        "items": [
          "Maximum Average Subarray I",
          "Permutation in String",
          "Find All Anagrams in a String",
          "Substring with Concatenation of All Words",
          "K Radius Subarray Averages"
        ]
      },
      {
        "title": "Binary / Flip Window",
        "items": [
          "Max Consecutive Ones III (flip 0s to 1s)",
          "Longest Subarray of 1s After Deleting One Element",
          "Minimum Number of Flips to Make Binary String Alternating"
        ]
      }
    ],
    "totalEasy": 1,
    "totalMed": 10,
    "totalHard": 4
  },
  {
    "id": "binary-search",
    "num": "11",
    "icon": "🔍",
    "name": "Binary Search",
    "color": "#7C3AED",
    "concepts": [
      "Requires sorted or monotonic search space; O(log n) per search",
      "Three templates: exact match, left boundary (lower_bound), right boundary (upper_bound)",
      "lo=0, hi=n-1, mid=lo+(hi-lo)/2 (avoid overflow)",
      "Decide which half to discard based on condition at mid",
      "Binary search on answer: find minimum/maximum value satisfying a predicate",
      "Edge cases: empty array, single element, target not found, duplicates",
      "Interview traps: infinite loop (wrong lo/hi update), off-by-one in boundaries",
      "Template: while lo <= hi; vs while lo < hi — know when to use each",
      "Lower bound: first index where arr[i] >= target (left boundary search)",
      "Upper bound: first index where arr[i] > target (right boundary search)",
      "Fractional binary search: search space is real numbers — use epsilon termination",
      "Binary search on 2D matrix: treat as flattened 1D array; index = row*cols + col",
      "Ternary search: find unimodal function extremum; can do with binary search on slope",
      "Exponential search: find range first (double bounds), then binary search — useful for unbounded arrays",
      "Predicate function design: key insight for 'binary search on answer' — must be monotonic yes/no"
    ],
    "patterns": [
      {
        "title": "Classic Binary Search",
        "desc": "Find exact target in sorted array; return -1 if not found."
      },
      {
        "title": "Find Left/Right Boundary",
        "desc": "Find first or last occurrence of target in array with duplicates."
      },
      {
        "title": "Binary Search on Answer",
        "desc": "Search for min/max feasible value; verify via a helper predicate."
      },
      {
        "title": "Binary Search on Rotated/Modified Array",
        "desc": "Handle rotation by identifying which half is sorted."
      }
    ],
    "problems": [
      {
        "id": "binary-search-0",
        "name": "Binary Search",
        "difficulty": "Easy",
        "pattern": "Classic BS",
        "url": "https://leetcode.com/problems/binary-search/"
      },
      {
        "id": "binary-search-1",
        "name": "First Bad Version",
        "difficulty": "Easy",
        "pattern": "Left Boundary BS",
        "url": "https://leetcode.com/problems/first-bad-version/"
      },
      {
        "id": "binary-search-2",
        "name": "Search Insert Position",
        "difficulty": "Easy",
        "pattern": "Lower Bound",
        "url": "https://leetcode.com/problems/search-insert-position/"
      },
      {
        "id": "binary-search-3",
        "name": "Count Negative Numbers in Sorted Matrix",
        "difficulty": "Easy",
        "pattern": "Row-wise BS",
        "url": "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/"
      },
      {
        "id": "binary-search-4",
        "name": "Guess Number Higher or Lower",
        "difficulty": "Easy",
        "pattern": "Classic BS",
        "url": "https://leetcode.com/problems/guess-number-higher-or-lower/"
      },
      {
        "id": "binary-search-5",
        "name": "Find Minimum in Rotated Sorted Array",
        "difficulty": "Medium",
        "pattern": "Modified BS",
        "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
      },
      {
        "id": "binary-search-6",
        "name": "Search in Rotated Sorted Array",
        "difficulty": "Medium",
        "pattern": "Modified BS",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
      },
      {
        "id": "binary-search-7",
        "name": "Search in Rotated Sorted Array II (duplicates)",
        "difficulty": "Medium",
        "pattern": "Modified BS",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/"
      },
      {
        "id": "binary-search-8",
        "name": "Find First and Last Position of Element",
        "difficulty": "Medium",
        "pattern": "Left + Right Boundary",
        "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
      },
      {
        "id": "binary-search-9",
        "name": "Peak Index in Mountain Array",
        "difficulty": "Easy",
        "pattern": "Ternary Search / BS",
        "url": "https://leetcode.com/problems/peak-index-in-a-mountain-array/"
      },
      {
        "id": "binary-search-10",
        "name": "Find Peak Element",
        "difficulty": "Medium",
        "pattern": "BS on Slope",
        "url": "https://leetcode.com/problems/find-peak-element/"
      },
      {
        "id": "binary-search-11",
        "name": "Koko Eating Bananas",
        "difficulty": "Medium",
        "pattern": "BS on Answer",
        "url": "https://leetcode.com/problems/koko-eating-bananas/"
      },
      {
        "id": "binary-search-12",
        "name": "Minimum Speed to Arrive on Time",
        "difficulty": "Medium",
        "pattern": "BS on Answer",
        "url": "https://leetcode.com/problems/minimum-speed-to-arrive-on-time/"
      },
      {
        "id": "binary-search-13",
        "name": "Capacity to Ship Packages",
        "difficulty": "Medium",
        "pattern": "BS on Answer",
        "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
      },
      {
        "id": "binary-search-14",
        "name": "Split Array Largest Sum",
        "difficulty": "Hard",
        "pattern": "BS on Answer",
        "url": "https://leetcode.com/problems/split-array-largest-sum/"
      },
      {
        "id": "binary-search-15",
        "name": "Time Based Key-Value Store",
        "difficulty": "Medium",
        "pattern": "BS on Timestamps",
        "url": "https://leetcode.com/problems/time-based-key-value-store/"
      },
      {
        "id": "binary-search-16",
        "name": "Search a 2D Matrix",
        "difficulty": "Medium",
        "pattern": "Virtual 1D BS",
        "url": "https://leetcode.com/problems/search-a-2d-matrix/"
      },
      {
        "id": "binary-search-17",
        "name": "Search a 2D Matrix II",
        "difficulty": "Medium",
        "pattern": "Staircase Search",
        "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/"
      },
      {
        "id": "binary-search-18",
        "name": "Median of Two Sorted Arrays",
        "difficulty": "Hard",
        "pattern": "Binary Search on Partition",
        "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
      },
      {
        "id": "binary-search-19",
        "name": "Find K-th Smallest Pair Distance",
        "difficulty": "Hard",
        "pattern": "BS on Answer + Sliding Win",
        "url": "https://leetcode.com/problems/find-k-th-smallest-pair-distance/"
      }
    ],
    "variations": [
      {
        "title": "Binary Search on Answer",
        "items": [
          "Koko Eating Bananas (minimum eating speed)",
          "Capacity to Ship Packages (minimum weight capacity)",
          "Split Array Largest Sum (minimize largest subarray sum)",
          "Minimum Time to Complete Trips",
          "Minimum Number of Days to Make m Bouquets",
          "Minimize Maximum Distance to Gas Station"
        ]
      },
      {
        "title": "Boundary Search",
        "items": [
          "Find First and Last Position (left + right boundary)",
          "Search Insert Position (lower bound)",
          "Count of Smaller Numbers After Self",
          "First Bad Version"
        ]
      },
      {
        "title": "Search in Rotated / Modified Array",
        "items": [
          "Find Minimum in Rotated Sorted Array I",
          "Find Minimum in Rotated Sorted Array II (with duplicates)",
          "Search in Rotated Sorted Array I",
          "Search in Rotated Sorted Array II (with duplicates)"
        ]
      },
      {
        "title": "2D / Matrix Binary Search",
        "items": [
          "Search a 2D Matrix (treat as 1D)",
          "Search a 2D Matrix II (staircase)",
          "Count Negative Numbers in Sorted Matrix",
          "Kth Smallest Element in Sorted Matrix"
        ]
      }
    ],
    "totalEasy": 6,
    "totalMed": 11,
    "totalHard": 3
  },
  {
    "id": "sorting",
    "num": "12",
    "icon": "🗂️",
    "name": "Sorting",
    "color": "#D97706",
    "concepts": [
      "Comparison sorts: merge O(n log n), quick O(n log n) avg, heap O(n log n)",
      "Non-comparison: counting O(n+k), radix O(nk), bucket O(n) average",
      "Stable sort preserves relative order of equal elements (merge, timsort)",
      "Quick sort: pivot selection, partition, recurse; worst O(n²) without randomization",
      "Merge sort: divide, sort halves, merge; O(n) extra space",
      "Know when to sort first: unlocks two-pointer, binary search, greedy approaches",
      "Edge cases: empty array, single element, already sorted, reverse sorted",
      "Custom comparator: sort by multiple criteria, reverse order, partial key",
      "Quickselect: O(n) average for k-th largest/smallest — same partition as quicksort",
      "Timsort (Python/Java default): adaptive merge sort; O(n log n) worst, O(n) nearly-sorted",
      "Counting sort: O(n+k) when value range k is small; good for chars, small ints",
      "Radix sort: sort by digit from LSD to MSD; O(nk) where k is number of digits",
      "Bucket sort: distribute into buckets, sort each, concatenate; O(n) average for uniform data",
      "External sort: sort data that doesn't fit in memory using merge sort on chunks",
      "Pancake sort / cycle sort: minimize writes; used in problems with specific operation constraints"
    ],
    "patterns": [
      {
        "title": "Sort + Two Pointers",
        "desc": "Sort first to enable O(n) two-pointer scan for pair/triplet problems."
      },
      {
        "title": "Sort + Binary Search",
        "desc": "Sort then binary search for target; O(n log n) preprocessing."
      },
      {
        "title": "Custom Comparator Sort",
        "desc": "Define comparison function for complex ordering (intervals, frequency)."
      },
      {
        "title": "Counting / Bucket Sort",
        "desc": "When values are bounded, O(n) sort without comparisons."
      },
      {
        "title": "Partial Sort (Quickselect)",
        "desc": "O(n) average to find k-th largest without full sort."
      }
    ],
    "problems": [
      {
        "id": "sorting-0",
        "name": "Sort an Array (implement merge sort)",
        "difficulty": "Medium",
        "pattern": "Merge Sort",
        "url": "https://leetcode.com/problems/sort-an-array/"
      },
      {
        "id": "sorting-1",
        "name": "Kth Largest Element in an Array",
        "difficulty": "Medium",
        "pattern": "Quickselect / Heap",
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
      },
      {
        "id": "sorting-2",
        "name": "Top K Frequent Elements",
        "difficulty": "Medium",
        "pattern": "Bucket Sort / Heap",
        "url": "https://leetcode.com/problems/top-k-frequent-elements/"
      },
      {
        "id": "sorting-3",
        "name": "Sort Characters By Frequency",
        "difficulty": "Medium",
        "pattern": "Counting + Sort",
        "url": "https://leetcode.com/problems/sort-characters-by-frequency/"
      },
      {
        "id": "sorting-4",
        "name": "Relative Sort Array",
        "difficulty": "Easy",
        "pattern": "Custom Sort / Counting",
        "url": "https://leetcode.com/problems/relative-sort-array/"
      },
      {
        "id": "sorting-5",
        "name": "Sort Colors (Dutch National Flag)",
        "difficulty": "Medium",
        "pattern": "3-Way Partition",
        "url": "https://leetcode.com/problems/sort-colors/"
      },
      {
        "id": "sorting-6",
        "name": "Largest Number",
        "difficulty": "Medium",
        "pattern": "Custom String Comparator",
        "url": "https://leetcode.com/problems/largest-number/"
      },
      {
        "id": "sorting-7",
        "name": "Merge Intervals",
        "difficulty": "Medium",
        "pattern": "Sort by Start + Merge",
        "url": "https://leetcode.com/problems/merge-intervals/"
      },
      {
        "id": "sorting-8",
        "name": "Meeting Rooms II",
        "difficulty": "Medium",
        "pattern": "Sort + Min-Heap",
        "url": "https://leetcode.com/problems/meeting-rooms-ii/"
      },
      {
        "id": "sorting-9",
        "name": "Task Scheduler",
        "difficulty": "Medium",
        "pattern": "Frequency Sort + Greedy",
        "url": "https://leetcode.com/problems/task-scheduler/"
      },
      {
        "id": "sorting-10",
        "name": "Wiggle Sort II",
        "difficulty": "Medium",
        "pattern": "Partial Sort",
        "url": "https://leetcode.com/problems/wiggle-sort-ii/"
      },
      {
        "id": "sorting-11",
        "name": "3Sum (with sort)",
        "difficulty": "Medium",
        "pattern": "Sort + Two Pointers",
        "url": "https://leetcode.com/problems/3sum/"
      },
      {
        "id": "sorting-12",
        "name": "Count of Smaller Numbers After Self",
        "difficulty": "Hard",
        "pattern": "Merge Sort / BIT",
        "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
      },
      {
        "id": "sorting-13",
        "name": "Reverse Pairs",
        "difficulty": "Hard",
        "pattern": "Merge Sort with Count",
        "url": "https://leetcode.com/problems/reverse-pairs/"
      },
      {
        "id": "sorting-14",
        "name": "Maximum Gap",
        "difficulty": "Hard",
        "pattern": "Radix/Bucket Sort",
        "url": "https://leetcode.com/problems/maximum-gap/"
      }
    ],
    "variations": [
      {
        "title": "Kth Element",
        "items": [
          "Kth Largest Element in Array (Quickselect)",
          "Kth Smallest Element in Sorted Matrix",
          "K Closest Points to Origin",
          "Top K Frequent Elements",
          "Find Median from Data Stream"
        ]
      },
      {
        "title": "Merge Intervals",
        "items": [
          "Merge Intervals",
          "Insert Interval",
          "Meeting Rooms I (any overlap?)",
          "Meeting Rooms II (min rooms needed)",
          "Employee Free Time",
          "Minimum Number of Arrows to Burst Balloons"
        ]
      },
      {
        "title": "Custom Comparator",
        "items": [
          "Largest Number (concat comparator)",
          "Sort Colors (Dutch National Flag)",
          "Sort Array by Parity",
          "Sort Array by Parity II",
          "Wiggle Sort II"
        ]
      },
      {
        "title": "Merge Sort Applications",
        "items": [
          "Count of Smaller Numbers After Self",
          "Reverse Pairs",
          "Count Inversions in Array",
          "Sort a Linked List"
        ]
      }
    ],
    "totalEasy": 1,
    "totalMed": 11,
    "totalHard": 3
  },
  {
    "id": "bit-manipulation",
    "num": "13",
    "icon": "💡",
    "name": "Bit Manipulation",
    "color": "#64748B",
    "concepts": [
      "AND(&): mask bits; OR(|): set bits; XOR(^): toggle/cancel; NOT(~): flip all",
      "Left shift (<<): multiply by 2; Right shift (>>): divide by 2",
      "x & (x-1): clear lowest set bit; x & (-x): isolate lowest set bit",
      "XOR cancels duplicates: a^a=0, a^0=a; useful for finding single number",
      "Bit count: __builtin_popcount or Brian Kernighan (count x&(x-1) loops)",
      "Edge cases: negative numbers, 32-bit overflow, zero input",
      "Interview traps: signed vs unsigned right shift, assuming 32 bits",
      "Bitmask DP: represent subsets as integers for exponential state spaces",
      "Check if bit i is set: (n >> i) & 1",
      "Set bit i: n | (1 << i)",
      "Clear bit i: n & ~(1 << i)",
      "Toggle bit i: n ^ (1 << i)",
      "Gray code: G(n) = n ^ (n >> 1); consecutive values differ by exactly 1 bit",
      "Two's complement: negative number = ~n + 1; -n = ~n + 1",
      "Bitwise trick for checking power of 2: n > 0 && (n & (n-1)) == 0",
      "Swap without temp: a ^= b; b ^= a; a ^= b (works but avoid in interviews — confusing)",
      "Bitmask for subset enumeration: for(int s=mask; s>0; s=(s-1)&mask) iterates all subsets of mask",
      "Bit parallelism: operate on 64 integers simultaneously using 64-bit word operations"
    ],
    "patterns": [
      {
        "title": "XOR for Duplicates",
        "desc": "XOR all elements; paired elements cancel to 0, leaving the single one."
      },
      {
        "title": "Bit Masking",
        "desc": "Use integer as subset representation; iterate 1<<n states."
      },
      {
        "title": "Kernighan Bit Count",
        "desc": "n &= (n-1) clears lowest set bit; count iterations."
      },
      {
        "title": "Check/Set/Clear/Toggle Bit",
        "desc": "Standard single-bit operations using shifts and masks."
      },
      {
        "title": "Two's Complement Tricks",
        "desc": "Negate: ~x+1; isolate lowest bit: x & -x."
      }
    ],
    "problems": [
      {
        "id": "bit-manipulation-0",
        "name": "Single Number",
        "difficulty": "Easy",
        "pattern": "XOR Cancellation",
        "url": "https://leetcode.com/problems/single-number/"
      },
      {
        "id": "bit-manipulation-1",
        "name": "Number of 1 Bits",
        "difficulty": "Easy",
        "pattern": "Kernighan / Popcount",
        "url": "https://leetcode.com/problems/number-of-1-bits/"
      },
      {
        "id": "bit-manipulation-2",
        "name": "Reverse Bits",
        "difficulty": "Easy",
        "pattern": "Bit-by-Bit Reversal",
        "url": "https://leetcode.com/problems/reverse-bits/"
      },
      {
        "id": "bit-manipulation-3",
        "name": "Power of Two",
        "difficulty": "Easy",
        "pattern": "n & (n-1) == 0",
        "url": "https://leetcode.com/problems/power-of-two/"
      },
      {
        "id": "bit-manipulation-4",
        "name": "Missing Number",
        "difficulty": "Easy",
        "pattern": "XOR or Sum Formula",
        "url": "https://leetcode.com/problems/missing-number/"
      },
      {
        "id": "bit-manipulation-5",
        "name": "Counting Bits",
        "difficulty": "Easy",
        "pattern": "DP with Bit Trick",
        "url": "https://leetcode.com/problems/counting-bits/"
      },
      {
        "id": "bit-manipulation-6",
        "name": "Hamming Distance",
        "difficulty": "Easy",
        "pattern": "XOR + Popcount",
        "url": "https://leetcode.com/problems/hamming-distance/"
      },
      {
        "id": "bit-manipulation-7",
        "name": "Single Number II (three times)",
        "difficulty": "Medium",
        "pattern": "Bit Counting per Bit",
        "url": "https://leetcode.com/problems/single-number-ii/"
      },
      {
        "id": "bit-manipulation-8",
        "name": "Single Number III (two singles)",
        "difficulty": "Medium",
        "pattern": "XOR + Partition",
        "url": "https://leetcode.com/problems/single-number-iii/"
      },
      {
        "id": "bit-manipulation-9",
        "name": "Sum of Two Integers (no + or -)",
        "difficulty": "Medium",
        "pattern": "XOR + Carry",
        "url": "https://leetcode.com/problems/sum-of-two-integers/"
      },
      {
        "id": "bit-manipulation-10",
        "name": "Subsets via Bitmask",
        "difficulty": "Medium",
        "pattern": "Bitmask Enumeration",
        "url": "https://leetcode.com/problems/subsets/"
      },
      {
        "id": "bit-manipulation-11",
        "name": "Majority Element",
        "difficulty": "Medium",
        "pattern": "Bit Voting",
        "url": "https://leetcode.com/problems/majority-element/"
      },
      {
        "id": "bit-manipulation-12",
        "name": "Decode XORed Array",
        "difficulty": "Easy",
        "pattern": "XOR Properties",
        "url": "https://leetcode.com/problems/decode-xored-array/"
      },
      {
        "id": "bit-manipulation-13",
        "name": "Maximum XOR of Two Numbers",
        "difficulty": "Medium",
        "pattern": "Trie / Greedy Bits",
        "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
      },
      {
        "id": "bit-manipulation-14",
        "name": "Total Hamming Distance",
        "difficulty": "Medium",
        "pattern": "Count 1s per Bit Position",
        "url": "https://leetcode.com/problems/total-hamming-distance/"
      },
      {
        "id": "bit-manipulation-15",
        "name": "Bitwise AND of Numbers Range",
        "difficulty": "Medium",
        "pattern": "Common Prefix",
        "url": "https://leetcode.com/problems/bitwise-and-of-numbers-range/"
      },
      {
        "id": "bit-manipulation-16",
        "name": "Maximum Product of Word Lengths",
        "difficulty": "Medium",
        "pattern": "Bitmask per Word",
        "url": "https://leetcode.com/problems/maximum-product-of-word-lengths/"
      },
      {
        "id": "bit-manipulation-17",
        "name": "Minimum Flips to Make a OR b Equal to c",
        "difficulty": "Medium",
        "pattern": "Bit-by-Bit Check",
        "url": "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/"
      }
    ],
    "variations": [
      {
        "title": "Single Number Family",
        "items": [
          "Single Number I (appears once, others twice — XOR)",
          "Single Number II (appears once, others three times — bit count mod 3)",
          "Single Number III (two numbers appear once — XOR + partition)",
          "Find Missing Number (XOR with indices)",
          "Find All Numbers Disappeared in Array"
        ]
      },
      {
        "title": "Subsets via Bitmask",
        "items": [
          "Subsets (bitmask enumeration)",
          "Bitmask DP – Travelling Salesman",
          "Bitmask DP – Assign Tasks",
          "Maximum AND Sum of Array",
          "Count Pairs With XOR in Range"
        ]
      },
      {
        "title": "Bit Counting",
        "items": [
          "Number of 1 Bits (Hamming weight)",
          "Counting Bits (0 to n)",
          "Hamming Distance (two numbers)",
          "Total Hamming Distance (array)",
          "Minimum Bit Flips to Convert Number"
        ]
      },
      {
        "title": "XOR Tricks",
        "items": [
          "XOR Queries of a Subarray (prefix XOR)",
          "Maximum XOR of Two Numbers (trie)",
          "Find the XOR Beauty of Array",
          "Decode XORed Permutation"
        ]
      }
    ],
    "totalEasy": 8,
    "totalMed": 10,
    "totalHard": 0
  },
  {
    "id": "matrix",
    "num": "14",
    "icon": "🔲",
    "name": "Matrix / 2D Arrays",
    "color": "#0EA5E9",
    "concepts": [
      "Row-major storage; matrix[r][c] at offset r*cols+c in flat array",
      "4-directional: (r±1,c), (r,c±1); 8-directional adds diagonals",
      "In-place rotation: transpose then reverse rows (90° clockwise)",
      "Visited array or in-place marking (e.g., set cell to '#') to avoid revisit",
      "Multi-source BFS: enqueue all sources first for simultaneous expansion",
      "Diagonal traversal: r-c constant for main diagonal groups",
      "Edge cases: 1×1 matrix, single row/column, all same values",
      "Interview traps: row/column order confusion, forgetting bounds check",
      "Anti-diagonal: r+c constant for anti-diagonal groups",
      "Layer-by-layer (onion) traversal: process outer ring, then shrink inward for spiral",
      "Matrix DP: dp[r][c] typically depends on dp[r-1][c] and dp[r][c-1]",
      "In-place sign trick: negate matrix[r][c] to mark visited while preserving original value (restore sign later)",
      "Flood fill: DFS/BFS from a cell to fill connected region — foundation of 'Number of Islands'",
      "Staircase search on sorted matrix: start top-right, go left if too big, go down if too small — O(m+n)",
      "2D prefix sum: prefix[r][c] = sum of all cells in rectangle (0,0) to (r-1,c-1); range sum in O(1)"
    ],
    "patterns": [
      {
        "title": "DFS / BFS on Grid",
        "desc": "Traverse connected components in 4 or 8 directions; mark visited."
      },
      {
        "title": "Multi-source BFS",
        "desc": "Enqueue all source cells first; BFS simultaneously from all sources."
      },
      {
        "title": "In-place Marking",
        "desc": "Overwrite cell value to mark visited; restore if needed (backtrack)."
      },
      {
        "title": "Layer-by-Layer Traversal",
        "desc": "Process matrix ring by ring for spiral or rotation problems."
      },
      {
        "title": "DP on Grid",
        "desc": "dp[r][c] depends on dp[r-1][c] and dp[r][c-1] for path counting."
      }
    ],
    "problems": [
      {
        "id": "matrix-0",
        "name": "Set Matrix Zeroes",
        "difficulty": "Medium",
        "pattern": "In-place Flag (first row/col)",
        "url": "https://leetcode.com/problems/set-matrix-zeroes/"
      },
      {
        "id": "matrix-1",
        "name": "Spiral Matrix",
        "difficulty": "Medium",
        "pattern": "Layer-by-Layer Simulation",
        "url": "https://leetcode.com/problems/spiral-matrix/"
      },
      {
        "id": "matrix-2",
        "name": "Spiral Matrix II",
        "difficulty": "Medium",
        "pattern": "Layer-by-Layer Fill",
        "url": "https://leetcode.com/problems/spiral-matrix-ii/"
      },
      {
        "id": "matrix-3",
        "name": "Rotate Image (90°)",
        "difficulty": "Medium",
        "pattern": "Transpose + Reverse",
        "url": "https://leetcode.com/problems/rotate-image/"
      },
      {
        "id": "matrix-4",
        "name": "Search a 2D Matrix",
        "difficulty": "Medium",
        "pattern": "Binary Search (flat)",
        "url": "https://leetcode.com/problems/search-a-2d-matrix/"
      },
      {
        "id": "matrix-5",
        "name": "Search a 2D Matrix II",
        "difficulty": "Medium",
        "pattern": "Staircase Search",
        "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/"
      },
      {
        "id": "matrix-6",
        "name": "Number of Islands",
        "difficulty": "Medium",
        "pattern": "DFS / BFS / Union-Find",
        "url": "https://leetcode.com/problems/number-of-islands/"
      },
      {
        "id": "matrix-7",
        "name": "Max Area of Island",
        "difficulty": "Medium",
        "pattern": "DFS with Size Count",
        "url": "https://leetcode.com/problems/max-area-of-island/"
      },
      {
        "id": "matrix-8",
        "name": "Surrounded Regions",
        "difficulty": "Medium",
        "pattern": "BFS from Border O's",
        "url": "https://leetcode.com/problems/surrounded-regions/"
      },
      {
        "id": "matrix-9",
        "name": "Pacific Atlantic Water Flow",
        "difficulty": "Medium",
        "pattern": "BFS from Both Oceans",
        "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
      },
      {
        "id": "matrix-10",
        "name": "Walls and Gates",
        "difficulty": "Medium",
        "pattern": "Multi-source BFS",
        "url": "https://leetcode.com/problems/walls-and-gates/"
      },
      {
        "id": "matrix-11",
        "name": "01 Matrix",
        "difficulty": "Medium",
        "pattern": "Multi-source BFS from 0s",
        "url": "https://leetcode.com/problems/01-matrix/"
      },
      {
        "id": "matrix-12",
        "name": "Unique Paths",
        "difficulty": "Medium",
        "pattern": "DP on Grid",
        "url": "https://leetcode.com/problems/unique-paths/"
      },
      {
        "id": "matrix-13",
        "name": "Unique Paths II (obstacles)",
        "difficulty": "Medium",
        "pattern": "DP on Grid",
        "url": "https://leetcode.com/problems/unique-paths-ii/"
      },
      {
        "id": "matrix-14",
        "name": "Minimum Path Sum",
        "difficulty": "Medium",
        "pattern": "DP on Grid",
        "url": "https://leetcode.com/problems/minimum-path-sum/"
      },
      {
        "id": "matrix-15",
        "name": "Count Sub Islands",
        "difficulty": "Medium",
        "pattern": "DFS / BFS",
        "url": "https://leetcode.com/problems/count-sub-islands/"
      },
      {
        "id": "matrix-16",
        "name": "Word Search",
        "difficulty": "Medium",
        "pattern": "Backtracking DFS on Grid",
        "url": "https://leetcode.com/problems/word-search/"
      },
      {
        "id": "matrix-17",
        "name": "Game of Life",
        "difficulty": "Medium",
        "pattern": "In-place State Encoding",
        "url": "https://leetcode.com/problems/game-of-life/"
      },
      {
        "id": "matrix-18",
        "name": "Maximal Square",
        "difficulty": "Medium",
        "pattern": "DP: min of 3 neighbors + 1",
        "url": "https://leetcode.com/problems/maximal-square/"
      },
      {
        "id": "matrix-19",
        "name": "Shortest Path in Binary Matrix",
        "difficulty": "Medium",
        "pattern": "BFS (8-directional)",
        "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
      },
      {
        "id": "matrix-20",
        "name": "Dungeon Game",
        "difficulty": "Hard",
        "pattern": "DP (bottom-right to top-left)",
        "url": "https://leetcode.com/problems/dungeon-game/"
      },
      {
        "id": "matrix-21",
        "name": "Maximal Rectangle",
        "difficulty": "Hard",
        "pattern": "Histogram + Stack",
        "url": "https://leetcode.com/problems/maximal-rectangle/"
      }
    ],
    "variations": [
      {
        "title": "Island Problems",
        "items": [
          "Number of Islands (DFS/BFS/Union-Find)",
          "Max Area of Island (DFS with size)",
          "Count Sub Islands",
          "Making A Large Island (flip one 0)",
          "Number of Distinct Islands (shape hashing)",
          "Island Perimeter"
        ]
      },
      {
        "title": "Spiral / Rotation",
        "items": [
          "Spiral Matrix (read)",
          "Spiral Matrix II (fill)",
          "Rotate Image (90° clockwise in-place)",
          "Transpose Matrix"
        ]
      },
      {
        "title": "Multi-source BFS",
        "items": [
          "Rotting Oranges",
          "Walls and Gates",
          "01 Matrix (nearest zero)",
          "Pacific Atlantic Water Flow",
          "As Far from Land as Possible"
        ]
      },
      {
        "title": "Grid DP",
        "items": [
          "Unique Paths I",
          "Unique Paths II (with obstacles)",
          "Minimum Path Sum",
          "Triangle (bottom-up DP)",
          "Dungeon Game (reverse DP)",
          "Maximal Square"
        ]
      }
    ],
    "totalEasy": 0,
    "totalMed": 20,
    "totalHard": 2
  },
  {
    "id": "heap",
    "num": "15",
    "icon": "⛰️",
    "name": "Heap / Priority Queue",
    "color": "#BE185D",
    "concepts": [
      "Binary heap: complete binary tree; parent ≤ children (min-heap)",
      "O(log n) insert/extract; O(1) peek-min/max; O(n) build",
      "Python: heapq (min-heap); negate for max-heap; Java: PriorityQueue",
      "k-th largest: maintain min-heap of size k; root is answer",
      "Top-K: push all, keep popping K times; or maintain size-k heap",
      "Merge K sorted lists: push (val, list_index) into heap",
      "Two heaps: left max-heap + right min-heap for median maintenance",
      "Edge cases: k=1, k=n, heap with one element, all same values",
      "Lazy deletion: mark elements as deleted; skip them when popping",
      "D-ary heap: each node has d children; reduces tree height, improves extract for large branching",
      "Fibonacci heap: O(1) amortized insert and decrease-key; used in Dijkstra for best theoretical complexity",
      "Heap sort: build max-heap O(n), extract n times O(n log n); in-place sort",
      "Running median: balance two heaps — max-heap (lower half), min-heap (upper half); rebalance after each insert",
      "Greedy + heap: always pick locally optimal candidate (cheapest, earliest, highest frequency)",
      "Event-driven simulation: use min-heap of (time, event) pairs for scheduling problems"
    ],
    "patterns": [
      {
        "title": "Top-K Elements",
        "desc": "Maintain heap of size k; discard rest. Min-heap for top-k largest."
      },
      {
        "title": "K-way Merge",
        "desc": "Push head of each sorted list; always extract min and push next."
      },
      {
        "title": "Two Heaps",
        "desc": "Max-heap for lower half, min-heap for upper half; balance for median."
      },
      {
        "title": "Greedy with Heap",
        "desc": "Always process the locally optimal element (shortest, cheapest, earliest)."
      }
    ],
    "problems": [
      {
        "id": "heap-0",
        "name": "Kth Largest Element in a Stream",
        "difficulty": "Easy",
        "pattern": "Min-Heap of Size K",
        "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/"
      },
      {
        "id": "heap-1",
        "name": "Last Stone Weight",
        "difficulty": "Easy",
        "pattern": "Max-Heap Simulation",
        "url": "https://leetcode.com/problems/last-stone-weight/"
      },
      {
        "id": "heap-2",
        "name": "K Closest Points to Origin",
        "difficulty": "Medium",
        "pattern": "Max-Heap of Size K",
        "url": "https://leetcode.com/problems/k-closest-points-to-origin/"
      },
      {
        "id": "heap-3",
        "name": "Kth Largest Element in an Array",
        "difficulty": "Medium",
        "pattern": "Quickselect / Min-Heap",
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
      },
      {
        "id": "heap-4",
        "name": "Top K Frequent Elements",
        "difficulty": "Medium",
        "pattern": "Heap + Frequency Map",
        "url": "https://leetcode.com/problems/top-k-frequent-elements/"
      },
      {
        "id": "heap-5",
        "name": "Sort Characters By Frequency",
        "difficulty": "Medium",
        "pattern": "Max-Heap + Freq",
        "url": "https://leetcode.com/problems/sort-characters-by-frequency/"
      },
      {
        "id": "heap-6",
        "name": "Task Scheduler",
        "difficulty": "Medium",
        "pattern": "Max-Heap + Cooldown Queue",
        "url": "https://leetcode.com/problems/task-scheduler/"
      },
      {
        "id": "heap-7",
        "name": "Reorganize String",
        "difficulty": "Medium",
        "pattern": "Max-Heap + Interleave",
        "url": "https://leetcode.com/problems/reorganize-string/"
      },
      {
        "id": "heap-8",
        "name": "Meeting Rooms II",
        "difficulty": "Medium",
        "pattern": "Min-Heap of End Times",
        "url": "https://leetcode.com/problems/meeting-rooms-ii/"
      },
      {
        "id": "heap-9",
        "name": "Ugly Number II",
        "difficulty": "Medium",
        "pattern": "Min-Heap + 3 Pointers",
        "url": "https://leetcode.com/problems/ugly-number-ii/"
      },
      {
        "id": "heap-10",
        "name": "Furthest Building You Can Reach",
        "difficulty": "Medium",
        "pattern": "Min-Heap (ladders)",
        "url": "https://leetcode.com/problems/furthest-building-you-can-reach/"
      },
      {
        "id": "heap-11",
        "name": "Process Tasks Using Servers",
        "difficulty": "Medium",
        "pattern": "Two Min-Heaps",
        "url": "https://leetcode.com/problems/process-tasks-using-servers/"
      },
      {
        "id": "heap-12",
        "name": "Seat Reservation Manager",
        "difficulty": "Medium",
        "pattern": "Min-Heap",
        "url": "https://leetcode.com/problems/seat-reservation-manager/"
      },
      {
        "id": "heap-13",
        "name": "Design Twitter",
        "difficulty": "Medium",
        "pattern": "Heap-based News Feed",
        "url": "https://leetcode.com/problems/design-twitter/"
      },
      {
        "id": "heap-14",
        "name": "K Pairs with Smallest Sums",
        "difficulty": "Medium",
        "pattern": "Min-Heap (i,j) pairs",
        "url": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/"
      },
      {
        "id": "heap-15",
        "name": "Merge K Sorted Lists",
        "difficulty": "Hard",
        "pattern": "K-way Min-Heap",
        "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
      },
      {
        "id": "heap-16",
        "name": "Find Median from Data Stream",
        "difficulty": "Hard",
        "pattern": "Two Heaps (balance)",
        "url": "https://leetcode.com/problems/find-median-from-data-stream/"
      },
      {
        "id": "heap-17",
        "name": "Sliding Window Median",
        "difficulty": "Hard",
        "pattern": "Two Heaps + Lazy Delete",
        "url": "https://leetcode.com/problems/sliding-window-median/"
      },
      {
        "id": "heap-18",
        "name": "IPO (maximize capital)",
        "difficulty": "Hard",
        "pattern": "Two Heaps (greedy)",
        "url": "https://leetcode.com/problems/ipo/"
      },
      {
        "id": "heap-19",
        "name": "Minimum Cost to Hire K Workers",
        "difficulty": "Hard",
        "pattern": "Sorting + Max-Heap",
        "url": "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/"
      }
    ],
    "variations": [
      {
        "title": "Find Median",
        "items": [
          "Find Median from Data Stream (two heaps)",
          "Sliding Window Median (two heaps + lazy delete)",
          "Running Median"
        ]
      },
      {
        "title": "Top K Frequent",
        "items": [
          "Top K Frequent Elements",
          "Top K Frequent Words (heap + lex)",
          "K Closest Points to Origin",
          "Kth Largest Element in a Stream",
          "Kth Largest Element in an Array (quickselect)"
        ]
      },
      {
        "title": "K-way Merge",
        "items": [
          "Merge K Sorted Lists",
          "Merge K Sorted Arrays",
          "Kth Smallest Element in Sorted Matrix",
          "Find K Pairs with Smallest Sums",
          "Smallest Range Covering Elements from K Lists"
        ]
      },
      {
        "title": "Greedy Scheduling",
        "items": [
          "Task Scheduler (max-heap + cooldown)",
          "Reorganize String (interleave most-frequent)",
          "Meeting Rooms II (min-heap of end times)",
          "Process Tasks Using Servers (two heaps)",
          "IPO (maximize capital with k projects)"
        ]
      }
    ],
    "totalEasy": 2,
    "totalMed": 13,
    "totalHard": 5
  },
  {
    "id": "greedy",
    "num": "16",
    "icon": "💰",
    "name": "Greedy Algorithms",
    "color": "#16A34A",
    "concepts": [
      "Make locally optimal choice at each step; prove global optimum follows",
      "Greedy works when: exchange argument holds, or optimal substructure + greedy choice",
      "Common proof: assume optimal solution, swap to greedy, show not worse",
      "Interval scheduling: sort by end time, greedily pick non-overlapping",
      "Activity selection: foundation of many scheduling problems",
      "Edge cases: single element, all same, already optimal arrangement",
      "Interview traps: greedy fails when future choices affect current ones (→ use DP)",
      "Sort is usually the first step in greedy algorithms",
      "Exchange argument: show swapping any two adjacent elements in an optimal solution to match greedy order doesn't improve it",
      "Fractional Knapsack (greedy works) vs 0/1 Knapsack (greedy fails, need DP)",
      "Huffman encoding: greedy construction of optimal prefix-free binary code",
      "Minimum spanning tree: Kruskal's (sort edges, add if no cycle) and Prim's (grow from cheapest neighbor)",
      "Gas station circular greedy: if total gas >= total cost, a solution exists; start from any point where running sum goes negative",
      "Candy problem: two-pass greedy (left-to-right for increasing neighbors, right-to-left for decreasing)",
      "Greedy invariant: define exactly what property the greedy solution maintains at each step"
    ],
    "patterns": [
      {
        "title": "Interval Greedy",
        "desc": "Sort by end time; always pick the interval that ends earliest."
      },
      {
        "title": "Jump Game Pattern",
        "desc": "Track maximum reachable index; greedy extend at each step."
      },
      {
        "title": "Greedy with Sorting",
        "desc": "Sort by a key that makes the locally optimal choice obvious."
      },
      {
        "title": "Gas Station / Circular Greedy",
        "desc": "Track running surplus; if negative, restart from next station."
      }
    ],
    "problems": [
      {
        "id": "greedy-0",
        "name": "Best Time to Buy and Sell Stock II",
        "difficulty": "Medium",
        "pattern": "Greedy (accumulate gains)",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/"
      },
      {
        "id": "greedy-1",
        "name": "Jump Game",
        "difficulty": "Medium",
        "pattern": "Greedy Max Reach",
        "url": "https://leetcode.com/problems/jump-game/"
      },
      {
        "id": "greedy-2",
        "name": "Jump Game II",
        "difficulty": "Medium",
        "pattern": "Greedy BFS-like",
        "url": "https://leetcode.com/problems/jump-game-ii/"
      },
      {
        "id": "greedy-3",
        "name": "Gas Station",
        "difficulty": "Medium",
        "pattern": "Circular Greedy",
        "url": "https://leetcode.com/problems/gas-station/"
      },
      {
        "id": "greedy-4",
        "name": "Candy",
        "difficulty": "Hard",
        "pattern": "Two-pass Greedy",
        "url": "https://leetcode.com/problems/candy/"
      },
      {
        "id": "greedy-5",
        "name": "Assign Cookies",
        "difficulty": "Easy",
        "pattern": "Sort + Two Pointers",
        "url": "https://leetcode.com/problems/assign-cookies/"
      },
      {
        "id": "greedy-6",
        "name": "Non-overlapping Intervals",
        "difficulty": "Medium",
        "pattern": "Sort by End + Count",
        "url": "https://leetcode.com/problems/non-overlapping-intervals/"
      },
      {
        "id": "greedy-7",
        "name": "Minimum Number of Arrows to Burst Balloons",
        "difficulty": "Medium",
        "pattern": "Sort by End",
        "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/"
      },
      {
        "id": "greedy-8",
        "name": "Partition Labels",
        "difficulty": "Medium",
        "pattern": "Last Occurrence + Expand",
        "url": "https://leetcode.com/problems/partition-labels/"
      },
      {
        "id": "greedy-9",
        "name": "Hand of Straights",
        "difficulty": "Medium",
        "pattern": "Greedy Group Formation",
        "url": "https://leetcode.com/problems/hand-of-straights/"
      },
      {
        "id": "greedy-10",
        "name": "Merge Triplets to Form Target Triplet",
        "difficulty": "Medium",
        "pattern": "Greedy Selection",
        "url": "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/"
      },
      {
        "id": "greedy-11",
        "name": "Valid Parenthesis String",
        "difficulty": "Medium",
        "pattern": "Greedy Range (lo,hi)",
        "url": "https://leetcode.com/problems/valid-parenthesis-string/"
      },
      {
        "id": "greedy-12",
        "name": "Task Scheduler",
        "difficulty": "Medium",
        "pattern": "Greedy Cooling",
        "url": "https://leetcode.com/problems/task-scheduler/"
      },
      {
        "id": "greedy-13",
        "name": "Reorganize String",
        "difficulty": "Medium",
        "pattern": "Greedy Max-Heap",
        "url": "https://leetcode.com/problems/reorganize-string/"
      },
      {
        "id": "greedy-14",
        "name": "Remove K Digits",
        "difficulty": "Medium",
        "pattern": "Greedy + Monotonic Stack",
        "url": "https://leetcode.com/problems/remove-k-digits/"
      },
      {
        "id": "greedy-15",
        "name": "Largest Number",
        "difficulty": "Medium",
        "pattern": "Custom Comparator Greedy",
        "url": "https://leetcode.com/problems/largest-number/"
      },
      {
        "id": "greedy-16",
        "name": "Minimum Number of Platforms",
        "difficulty": "Medium",
        "pattern": "Sort + Two Pointers",
        "url": "https://leetcode.com/problems/minimum-number-of-platforms/"
      },
      {
        "id": "greedy-17",
        "name": "Boats to Save People",
        "difficulty": "Medium",
        "pattern": "Sort + Two Pointers",
        "url": "https://leetcode.com/problems/boats-to-save-people/"
      },
      {
        "id": "greedy-18",
        "name": "Two City Scheduling",
        "difficulty": "Medium",
        "pattern": "Sort by Cost Diff",
        "url": "https://leetcode.com/problems/two-city-scheduling/"
      },
      {
        "id": "greedy-19",
        "name": "Minimum Cost to Connect Sticks",
        "difficulty": "Medium",
        "pattern": "Greedy + Min-Heap",
        "url": "https://leetcode.com/problems/minimum-cost-to-connect-sticks/"
      }
    ],
    "variations": [
      {
        "title": "Jump Game Family",
        "items": [
          "Jump Game I (can you reach end?)",
          "Jump Game II (minimum jumps)",
          "Jump Game III (reach any 0)",
          "Jump Game IV (BFS on indices)",
          "Jump Game V (DP + sorted order)",
          "Jump Game VI (DP + monotonic deque)"
        ]
      },
      {
        "title": "Interval Greedy",
        "items": [
          "Non-overlapping Intervals (max non-overlapping)",
          "Minimum Number of Arrows to Burst Balloons",
          "Meeting Rooms I (any conflict?)",
          "Activity Selection Problem",
          "Minimum Platforms"
        ]
      },
      {
        "title": "Stock Problems",
        "items": [
          "Best Time to Buy/Sell Stock I (once)",
          "Best Time to Buy/Sell Stock II (unlimited)",
          "Best Time to Buy/Sell Stock with Cooldown",
          "Best Time to Buy/Sell Stock with Fee"
        ]
      },
      {
        "title": "String / Number Greedy",
        "items": [
          "Remove K Digits (smallest number after k removals)",
          "Largest Number (custom comparator)",
          "Reorganize String",
          "Valid Parenthesis String ('*' wildcard)",
          "Minimum Add to Make Parentheses Valid"
        ]
      }
    ],
    "totalEasy": 1,
    "totalMed": 18,
    "totalHard": 1
  },
  {
    "id": "trees",
    "num": "17",
    "icon": "🌳",
    "name": "Trees",
    "color": "#15803D",
    "concepts": [
      "Binary tree: each node has at most 2 children; no cycles",
      "Height = max depth; balanced: |left height - right height| ≤ 1",
      "DFS: preorder (NLR), inorder (LNR), postorder (LRN)",
      "BFS: level-order traversal using queue",
      "Diameter = longest path between any two nodes (not necessarily through root)",
      "LCA: lowest common ancestor; two approaches: path comparison, recursive",
      "Edge cases: null root, single node, skewed (linear) tree, complete binary tree",
      "Interview traps: confusing height with depth, missing null checks in recursion",
      "Morris traversal: inorder traversal in O(1) space by threading right pointers temporarily",
      "Complete binary tree: nodes fill from left to right at each level; can count nodes in O(log²n)",
      "Segment tree / Fenwick tree builds on tree structure for range queries",
      "Tree DP: compute function over subtree, combine at parent — e.g., max path sum, rob on tree",
      "Serialization formats: preorder with nulls, level-order, bracket notation",
      "Virtual nodes: add parent pointers or convert to graph (adjacency list) for distance queries",
      "Centroid decomposition: partition tree on centroid; each node appears in O(log n) centroid subtrees"
    ],
    "patterns": [
      {
        "title": "DFS Recursion",
        "desc": "Most tree problems solved by combining left and right subtree results."
      },
      {
        "title": "BFS / Level Order",
        "desc": "Process nodes level-by-level using queue; detect levels easily."
      },
      {
        "title": "Post-order Processing",
        "desc": "Process children before parent; needed for height, diameter, LCA."
      },
      {
        "title": "Path Problems",
        "desc": "Track current path from root; pass running sum/string through recursion."
      },
      {
        "title": "Tree Serialization",
        "desc": "Convert tree to/from string; use preorder with null markers."
      }
    ],
    "problems": [
      {
        "id": "trees-0",
        "name": "Maximum Depth of Binary Tree",
        "difficulty": "Easy",
        "pattern": "DFS / BFS",
        "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
      },
      {
        "id": "trees-1",
        "name": "Invert Binary Tree",
        "difficulty": "Easy",
        "pattern": "DFS / BFS",
        "url": "https://leetcode.com/problems/invert-binary-tree/"
      },
      {
        "id": "trees-2",
        "name": "Same Tree",
        "difficulty": "Easy",
        "pattern": "DFS Structural Compare",
        "url": "https://leetcode.com/problems/same-tree/"
      },
      {
        "id": "trees-3",
        "name": "Symmetric Tree",
        "difficulty": "Easy",
        "pattern": "DFS Mirror Check",
        "url": "https://leetcode.com/problems/symmetric-tree/"
      },
      {
        "id": "trees-4",
        "name": "Path Sum",
        "difficulty": "Easy",
        "pattern": "DFS with Target",
        "url": "https://leetcode.com/problems/path-sum/"
      },
      {
        "id": "trees-5",
        "name": "Subtree of Another Tree",
        "difficulty": "Easy",
        "pattern": "DFS + Same Tree",
        "url": "https://leetcode.com/problems/subtree-of-another-tree/"
      },
      {
        "id": "trees-6",
        "name": "Diameter of Binary Tree",
        "difficulty": "Easy",
        "pattern": "Post-order DFS",
        "url": "https://leetcode.com/problems/diameter-of-binary-tree/"
      },
      {
        "id": "trees-7",
        "name": "Balanced Binary Tree",
        "difficulty": "Easy",
        "pattern": "Post-order Height Check",
        "url": "https://leetcode.com/problems/balanced-binary-tree/"
      },
      {
        "id": "trees-8",
        "name": "Binary Tree Level Order Traversal",
        "difficulty": "Medium",
        "pattern": "BFS Queue",
        "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
      },
      {
        "id": "trees-9",
        "name": "Binary Tree Right Side View",
        "difficulty": "Medium",
        "pattern": "BFS Level Last",
        "url": "https://leetcode.com/problems/binary-tree-right-side-view/"
      },
      {
        "id": "trees-10",
        "name": "Count Good Nodes in Binary Tree",
        "difficulty": "Medium",
        "pattern": "DFS with Max Path",
        "url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/"
      },
      {
        "id": "trees-11",
        "name": "Path Sum II",
        "difficulty": "Medium",
        "pattern": "DFS Backtracking",
        "url": "https://leetcode.com/problems/path-sum-ii/"
      },
      {
        "id": "trees-12",
        "name": "Binary Tree Maximum Path Sum",
        "difficulty": "Hard",
        "pattern": "Post-order + Global Max",
        "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/"
      },
      {
        "id": "trees-13",
        "name": "Lowest Common Ancestor",
        "difficulty": "Medium",
        "pattern": "Recursive LCA",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
      },
      {
        "id": "trees-14",
        "name": "Flatten Binary Tree to Linked List",
        "difficulty": "Medium",
        "pattern": "Pre-order Rewiring",
        "url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/"
      },
      {
        "id": "trees-15",
        "name": "Populating Next Right Pointers",
        "difficulty": "Medium",
        "pattern": "BFS / Constant Space",
        "url": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/"
      },
      {
        "id": "trees-16",
        "name": "Binary Tree Zigzag Level Order",
        "difficulty": "Medium",
        "pattern": "BFS + Direction Flag",
        "url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/"
      },
      {
        "id": "trees-17",
        "name": "Construct Tree from Preorder+Inorder",
        "difficulty": "Medium",
        "pattern": "Divide Recursion",
        "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
      },
      {
        "id": "trees-18",
        "name": "Serialize and Deserialize Binary Tree",
        "difficulty": "Hard",
        "pattern": "BFS / DFS Encoding",
        "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
      },
      {
        "id": "trees-19",
        "name": "Sum Root to Leaf Numbers",
        "difficulty": "Medium",
        "pattern": "DFS with Running Sum",
        "url": "https://leetcode.com/problems/sum-root-to-leaf-numbers/"
      },
      {
        "id": "trees-20",
        "name": "All Nodes Distance K in Binary Tree",
        "difficulty": "Medium",
        "pattern": "BFS on Annotated Graph",
        "url": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/"
      },
      {
        "id": "trees-21",
        "name": "Maximum Width of Binary Tree",
        "difficulty": "Medium",
        "pattern": "BFS with Indices",
        "url": "https://leetcode.com/problems/maximum-width-of-binary-tree/"
      }
    ],
    "variations": [
      {
        "title": "Level Order Traversal",
        "items": [
          "Level Order Traversal (standard BFS)",
          "Level Order Traversal II (bottom-up)",
          "Zigzag Level Order",
          "Average of Levels",
          "Right Side View",
          "Maximum Width of Binary Tree"
        ]
      },
      {
        "title": "Path Sum",
        "items": [
          "Path Sum I (root-to-leaf, exists?)",
          "Path Sum II (all root-to-leaf paths)",
          "Path Sum III (any path, count — prefix sum)",
          "Binary Tree Max Path Sum (any node to any node)"
        ]
      },
      {
        "title": "Construct Tree",
        "items": [
          "Construct from Preorder + Inorder",
          "Construct from Postorder + Inorder",
          "Construct from Preorder + Postorder",
          "Serialize and Deserialize Binary Tree"
        ]
      },
      {
        "title": "Tree DP",
        "items": [
          "Diameter of Binary Tree",
          "Binary Tree Maximum Path Sum",
          "House Robber III (tree rob)",
          "Distribute Coins in Binary Tree",
          "Count Good Nodes"
        ]
      },
      {
        "title": "LCA Family",
        "items": [
          "LCA of Binary Tree",
          "LCA of BST (use BST property)",
          "LCA of Deepest Leaves",
          "All Nodes Distance K in Binary Tree"
        ]
      }
    ],
    "totalEasy": 8,
    "totalMed": 12,
    "totalHard": 2
  },
  {
    "id": "bst",
    "num": "18",
    "icon": "🔀",
    "name": "Binary Search Tree",
    "color": "#065F46",
    "concepts": [
      "BST property: left < node < right for all nodes",
      "Inorder traversal of BST gives sorted sequence",
      "Search / Insert / Delete: O(h); O(log n) balanced, O(n) skewed",
      "Successor: smallest node > current (leftmost in right subtree)",
      "Predecessor: largest node < current (rightmost in left subtree)",
      "Augmented BST: store subtree size for order statistics (k-th smallest)",
      "Edge cases: empty BST, single node, duplicate values, skewed tree",
      "Interview traps: not validating BST correctly (use min/max bounds)",
      "AVL tree: self-balancing BST; rotations after insert/delete to maintain height ≤ 1 difference",
      "Red-Black tree: 5 properties; used in Java TreeMap and C++ std::map; O(log n) guaranteed",
      "BST deletion cases: leaf (just delete), one child (splice), two children (replace with successor)",
      "Floor/Ceiling in BST: floor = largest key ≤ k; ceiling = smallest key ≥ k; O(h) search",
      "Rank query: with subtree sizes, find rank of a key in O(h)",
      "Merge two BSTs: inorder both → merge sorted arrays → build BST; O(m+n)"
    ],
    "patterns": [
      {
        "title": "Inorder Traversal",
        "desc": "Exploits sorted property; k-th smallest = k-th inorder node."
      },
      {
        "title": "Min/Max Bound Validation",
        "desc": "Pass valid range [min,max] top-down to validate BST property."
      },
      {
        "title": "BST Search/Insert",
        "desc": "Compare with node, recurse left or right; O(h) operations."
      },
      {
        "title": "Merge / Combine BSTs",
        "desc": "Inorder both trees to get sorted arrays, then merge."
      }
    ],
    "problems": [
      {
        "id": "bst-0",
        "name": "Search in a Binary Search Tree",
        "difficulty": "Easy",
        "pattern": "BST Search O(h)",
        "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/"
      },
      {
        "id": "bst-1",
        "name": "Insert into a BST",
        "difficulty": "Medium",
        "pattern": "BST Insert",
        "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/"
      },
      {
        "id": "bst-2",
        "name": "Delete Node in a BST",
        "difficulty": "Medium",
        "pattern": "BST Delete (successor)",
        "url": "https://leetcode.com/problems/delete-node-in-a-bst/"
      },
      {
        "id": "bst-3",
        "name": "Validate Binary Search Tree",
        "difficulty": "Medium",
        "pattern": "Min/Max Bounds DFS",
        "url": "https://leetcode.com/problems/validate-binary-search-tree/"
      },
      {
        "id": "bst-4",
        "name": "Kth Smallest Element in a BST",
        "difficulty": "Medium",
        "pattern": "Inorder Traversal",
        "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
      },
      {
        "id": "bst-5",
        "name": "Lowest Common Ancestor of BST",
        "difficulty": "Medium",
        "pattern": "Use BST Property",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/"
      },
      {
        "id": "bst-6",
        "name": "Convert Sorted Array to BST",
        "difficulty": "Easy",
        "pattern": "Binary Mid as Root",
        "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/"
      },
      {
        "id": "bst-7",
        "name": "Convert Sorted List to BST",
        "difficulty": "Medium",
        "pattern": "Slow/Fast + Recursion",
        "url": "https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/"
      },
      {
        "id": "bst-8",
        "name": "Inorder Successor in BST",
        "difficulty": "Medium",
        "pattern": "BST Traversal",
        "url": "https://leetcode.com/problems/inorder-successor-in-bst/"
      },
      {
        "id": "bst-9",
        "name": "Two Sum in BST",
        "difficulty": "Easy",
        "pattern": "Inorder + Hash Set",
        "url": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/"
      },
      {
        "id": "bst-10",
        "name": "Recover Binary Search Tree",
        "difficulty": "Medium",
        "pattern": "Inorder Find Swapped",
        "url": "https://leetcode.com/problems/recover-binary-search-tree/"
      },
      {
        "id": "bst-11",
        "name": "Trim a Binary Search Tree",
        "difficulty": "Medium",
        "pattern": "Recursive Trim",
        "url": "https://leetcode.com/problems/trim-a-binary-search-tree/"
      },
      {
        "id": "bst-12",
        "name": "Balance a Binary Search Tree",
        "difficulty": "Medium",
        "pattern": "Inorder + Build",
        "url": "https://leetcode.com/problems/balance-a-binary-search-tree/"
      },
      {
        "id": "bst-13",
        "name": "Range Sum of BST",
        "difficulty": "Easy",
        "pattern": "DFS with Range Prune",
        "url": "https://leetcode.com/problems/range-sum-of-bst/"
      },
      {
        "id": "bst-14",
        "name": "Count Nodes Equal to Average of Subtree",
        "difficulty": "Medium",
        "pattern": "Post-order DFS",
        "url": "https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/"
      }
    ],
    "variations": [
      {
        "title": "Validate / Fix BST",
        "items": [
          "Validate Binary Search Tree (min/max bounds)",
          "Recover BST (find two swapped nodes via inorder)",
          "Convert Sorted Array to BST",
          "Balance a Binary Search Tree"
        ]
      },
      {
        "title": "Kth Element / Order Statistics",
        "items": [
          "Kth Smallest in BST (inorder)",
          "Kth Largest in BST (reverse inorder)",
          "Range Sum of BST (prune branches)",
          "Count Nodes in Range"
        ]
      },
      {
        "title": "Successor / Predecessor",
        "items": [
          "Inorder Successor in BST",
          "Inorder Predecessor in BST",
          "Find Floor and Ceiling in BST",
          "Find Closest Value in BST"
        ]
      },
      {
        "title": "BST Construction",
        "items": [
          "Convert Sorted Array to BST",
          "Convert Sorted List to BST",
          "Construct BST from Preorder Traversal",
          "All Possible BSTs (Catalan number — DP)"
        ]
      }
    ],
    "totalEasy": 4,
    "totalMed": 11,
    "totalHard": 0
  },
  {
    "id": "graphs",
    "num": "19",
    "icon": "🕸️",
    "name": "Graphs",
    "color": "#1D4ED8",
    "concepts": [
      "Representation: adjacency list O(V+E), adjacency matrix O(V²)",
      "BFS: shortest path in unweighted graph; O(V+E)",
      "DFS: cycle detection, topological sort, connected components; O(V+E)",
      "Topological sort: only for DAGs; BFS (Kahn's) or DFS (reverse post-order)",
      "Dijkstra: shortest path in weighted graph with non-negative edges; O((V+E)logV)",
      "Union-Find (DSU): O(α) near-constant for union/find operations",
      "Edge cases: disconnected graph, self-loops, parallel edges, no edges",
      "Interview traps: not marking visited causing infinite loops, wrong cycle detection",
      "Bellman-Ford: handles negative edges; detects negative cycles; O(VE)",
      "Floyd-Warshall: all-pairs shortest path; O(V³); detects negative cycles via diagonal",
      "Strongly Connected Components (Kosaraju's / Tarjan's): O(V+E)",
      "Articulation points & bridges (Tarjan's): find critical nodes/edges in O(V+E)",
      "Bipartite graph: 2-colorable; no odd-length cycles; BFS/DFS coloring",
      "Minimum Spanning Tree: Prim's (greedy + heap) or Kruskal's (sort edges + DSU); both O(E log V)",
      "Eulerian path: visits every edge exactly once; exists iff at most 2 odd-degree nodes",
      "Hamiltonian path: visits every vertex exactly once; NP-complete in general"
    ],
    "patterns": [
      {
        "title": "BFS Shortest Path",
        "desc": "Unweighted shortest path; enqueue neighbors, track distances."
      },
      {
        "title": "DFS Connected Components",
        "desc": "DFS from unvisited nodes; each DFS call = one component."
      },
      {
        "title": "Topological Sort",
        "desc": "Kahn's (in-degree BFS) or DFS post-order for DAG ordering."
      },
      {
        "title": "Union-Find (DSU)",
        "desc": "Efficiently merge and query connected components."
      },
      {
        "title": "Bipartite Check",
        "desc": "2-color graph with BFS/DFS; detect odd cycles."
      },
      {
        "title": "Multi-source BFS",
        "desc": "Multiple starting nodes; find distances from any source."
      }
    ],
    "problems": [
      {
        "id": "graphs-0",
        "name": "Number of Islands",
        "difficulty": "Medium",
        "pattern": "DFS / BFS / Union-Find",
        "url": "https://leetcode.com/problems/number-of-islands/"
      },
      {
        "id": "graphs-1",
        "name": "Clone Graph",
        "difficulty": "Medium",
        "pattern": "DFS / BFS + Hash Map",
        "url": "https://leetcode.com/problems/clone-graph/"
      },
      {
        "id": "graphs-2",
        "name": "Max Area of Island",
        "difficulty": "Medium",
        "pattern": "DFS with Size",
        "url": "https://leetcode.com/problems/max-area-of-island/"
      },
      {
        "id": "graphs-3",
        "name": "Pacific Atlantic Water Flow",
        "difficulty": "Medium",
        "pattern": "BFS from Both Coasts",
        "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
      },
      {
        "id": "graphs-4",
        "name": "Surrounded Regions",
        "difficulty": "Medium",
        "pattern": "BFS from Border",
        "url": "https://leetcode.com/problems/surrounded-regions/"
      },
      {
        "id": "graphs-5",
        "name": "Course Schedule I (cycle check)",
        "difficulty": "Medium",
        "pattern": "Topological Sort / DFS",
        "url": "https://leetcode.com/problems/course-schedule/"
      },
      {
        "id": "graphs-6",
        "name": "Course Schedule II (ordering)",
        "difficulty": "Medium",
        "pattern": "Topological Sort (Kahn's)",
        "url": "https://leetcode.com/problems/course-schedule-ii/"
      },
      {
        "id": "graphs-7",
        "name": "Number of Connected Components",
        "difficulty": "Medium",
        "pattern": "Union-Find / DFS",
        "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
      },
      {
        "id": "graphs-8",
        "name": "Graph Valid Tree",
        "difficulty": "Medium",
        "pattern": "Union-Find / DFS cycle",
        "url": "https://leetcode.com/problems/graph-valid-tree/"
      },
      {
        "id": "graphs-9",
        "name": "Redundant Connection",
        "difficulty": "Medium",
        "pattern": "Union-Find",
        "url": "https://leetcode.com/problems/redundant-connection/"
      },
      {
        "id": "graphs-10",
        "name": "Is Graph Bipartite?",
        "difficulty": "Medium",
        "pattern": "BFS 2-Coloring",
        "url": "https://leetcode.com/problems/is-graph-bipartite/"
      },
      {
        "id": "graphs-11",
        "name": "Find if Path Exists in Graph",
        "difficulty": "Easy",
        "pattern": "BFS / DFS / DSU",
        "url": "https://leetcode.com/problems/find-if-path-exists-in-graph/"
      },
      {
        "id": "graphs-12",
        "name": "Minimum Number of Vertices to Reach All Nodes",
        "difficulty": "Medium",
        "pattern": "In-degree = 0 check",
        "url": "https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/"
      },
      {
        "id": "graphs-13",
        "name": "Word Ladder",
        "difficulty": "Hard",
        "pattern": "BFS on Word Graph",
        "url": "https://leetcode.com/problems/word-ladder/"
      },
      {
        "id": "graphs-14",
        "name": "Alien Dictionary",
        "difficulty": "Hard",
        "pattern": "Topological Sort",
        "url": "https://leetcode.com/problems/alien-dictionary/"
      },
      {
        "id": "graphs-15",
        "name": "Network Delay Time",
        "difficulty": "Medium",
        "pattern": "Dijkstra's Algorithm",
        "url": "https://leetcode.com/problems/network-delay-time/"
      },
      {
        "id": "graphs-16",
        "name": "Cheapest Flights Within K Stops",
        "difficulty": "Medium",
        "pattern": "Bellman-Ford / BFS",
        "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
      },
      {
        "id": "graphs-17",
        "name": "Minimum Spanning Tree (Prim's)",
        "difficulty": "Medium",
        "pattern": "Greedy + Min-Heap",
        "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/"
      },
      {
        "id": "graphs-18",
        "name": "Critical Connections (Bridges)",
        "difficulty": "Hard",
        "pattern": "Tarjan's Algorithm",
        "url": "https://leetcode.com/problems/critical-connections-in-a-network/"
      },
      {
        "id": "graphs-19",
        "name": "Reconstruct Itinerary",
        "difficulty": "Hard",
        "pattern": "Hierholzer (Eulerian Path)",
        "url": "https://leetcode.com/problems/reconstruct-itinerary/"
      },
      {
        "id": "graphs-20",
        "name": "Keys and Rooms",
        "difficulty": "Medium",
        "pattern": "DFS / BFS",
        "url": "https://leetcode.com/problems/keys-and-rooms/"
      },
      {
        "id": "graphs-21",
        "name": "Rotting Oranges",
        "difficulty": "Medium",
        "pattern": "Multi-source BFS",
        "url": "https://leetcode.com/problems/rotting-oranges/"
      }
    ],
    "variations": [
      {
        "title": "Course Schedule / Topological Sort",
        "items": [
          "Course Schedule I (cycle detection)",
          "Course Schedule II (order output)",
          "Course Schedule IV (reachability queries)",
          "Parallel Courses (minimum semesters)",
          "Alien Dictionary",
          "Sequence Reconstruction"
        ]
      },
      {
        "title": "Union-Find (DSU)",
        "items": [
          "Redundant Connection",
          "Number of Connected Components",
          "Graph Valid Tree",
          "Accounts Merge",
          "Smallest String With Swaps",
          "Making A Large Island"
        ]
      },
      {
        "title": "Shortest Path",
        "items": [
          "Network Delay Time (Dijkstra)",
          "Cheapest Flights Within K Stops (Bellman-Ford)",
          "Path with Minimum Effort (Dijkstra on grid)",
          "Path with Maximum Probability (Dijkstra)",
          "Swim in Rising Water (binary search + BFS)"
        ]
      },
      {
        "title": "BFS on Implicit Graph",
        "items": [
          "Word Ladder (one-char difference graph)",
          "Open the Lock (4-wheel combination)",
          "Minimum Genetic Mutation",
          "Jump Game IV (index graph)"
        ]
      }
    ],
    "totalEasy": 1,
    "totalMed": 17,
    "totalHard": 4
  },
  {
    "id": "dp",
    "num": "20",
    "icon": "🧩",
    "name": "Dynamic Programming",
    "color": "#7E22CE",
    "concepts": [
      "Optimal substructure + overlapping subproblems → DP applicable",
      "Top-down (memoization): recursive + cache; bottom-up (tabulation): iterative",
      "Define state: what info needed to uniquely describe a subproblem?",
      "Define transition: how does dp[i] relate to dp[i-1], dp[i-2]…?",
      "1D DP: linear; 2D DP: grid/string problems; interval DP: [i..j]",
      "Common patterns: subsequence, knapsack, string edit, path counting",
      "Space optimization: often only previous row/column needed (O(n) → O(1))",
      "Edge cases: empty string, n=0, target=0, no valid transitions",
      "Bitmask DP: represent subset as bitmask for Travelling Salesman, subset-sum variations",
      "DP with binary search: combine LIS with patience sort for O(n log n)",
      "Digit DP: count numbers with specific digit properties in a range",
      "Always check if greedy works first — many DP problems have simpler greedy solutions",
      "Print the actual solution: backtrack through DP table using stored decisions",
      "State machine DP: multiple states per index — model FSM transitions (e.g., stock with cooldown)",
      "Interval DP: dp[i][j] = answer for substring/subarray i..j; fill by increasing interval length",
      "Tree DP: post-order — compute dp[node] from dp[children]",
      "Profile DP: process grid column by column with bitmask representing column state",
      "Broken profile DP: process cell by cell for grid tiling problems"
    ],
    "patterns": [
      {
        "title": "1D Linear DP",
        "desc": "dp[i] depends on dp[i-1] or dp[i-k] (stairs, rob, decode)."
      },
      {
        "title": "2D Grid DP",
        "desc": "dp[r][c] depends on dp[r-1][c] and dp[r][c-1] (paths, edit distance)."
      },
      {
        "title": "Subsequence DP",
        "desc": "dp[i][j] = LCS, LIS, or edit distance of first i and j chars."
      },
      {
        "title": "Knapsack Variants",
        "desc": "0/1 knapsack, unbounded, partition equal subset, coin change."
      },
      {
        "title": "Interval DP",
        "desc": "dp[i][j] = answer for subarray/substring from i to j."
      },
      {
        "title": "DP on Trees",
        "desc": "Compute subtree answers and combine at root."
      },
      {
        "title": "State Machine DP",
        "desc": "Multiple states per index (e.g., hold/not-hold stock)."
      }
    ],
    "problems": [
      {
        "id": "dp-0",
        "name": "Climbing Stairs",
        "difficulty": "Easy",
        "pattern": "1D Linear DP",
        "url": "https://leetcode.com/problems/climbing-stairs/"
      },
      {
        "id": "dp-1",
        "name": "Min Cost Climbing Stairs",
        "difficulty": "Easy",
        "pattern": "1D Linear DP",
        "url": "https://leetcode.com/problems/min-cost-climbing-stairs/"
      },
      {
        "id": "dp-2",
        "name": "House Robber",
        "difficulty": "Medium",
        "pattern": "1D DP (skip adjacent)",
        "url": "https://leetcode.com/problems/house-robber/"
      },
      {
        "id": "dp-3",
        "name": "House Robber II (circular)",
        "difficulty": "Medium",
        "pattern": "Two-pass Linear DP",
        "url": "https://leetcode.com/problems/house-robber-ii/"
      },
      {
        "id": "dp-4",
        "name": "House Robber III (tree)",
        "difficulty": "Medium",
        "pattern": "DP on Tree",
        "url": "https://leetcode.com/problems/house-robber-iii/"
      },
      {
        "id": "dp-5",
        "name": "Coin Change",
        "difficulty": "Medium",
        "pattern": "Unbounded Knapsack",
        "url": "https://leetcode.com/problems/coin-change/"
      },
      {
        "id": "dp-6",
        "name": "Coin Change II (ways count)",
        "difficulty": "Medium",
        "pattern": "Unbounded Knapsack Count",
        "url": "https://leetcode.com/problems/coin-change-ii/"
      },
      {
        "id": "dp-7",
        "name": "Word Break",
        "difficulty": "Medium",
        "pattern": "DP + Dict Lookup",
        "url": "https://leetcode.com/problems/word-break/"
      },
      {
        "id": "dp-8",
        "name": "Decode Ways",
        "difficulty": "Medium",
        "pattern": "1D DP with Conditions",
        "url": "https://leetcode.com/problems/decode-ways/"
      },
      {
        "id": "dp-9",
        "name": "Unique Paths",
        "difficulty": "Medium",
        "pattern": "2D Grid DP",
        "url": "https://leetcode.com/problems/unique-paths/"
      },
      {
        "id": "dp-10",
        "name": "Unique Paths II",
        "difficulty": "Medium",
        "pattern": "2D Grid DP + Obstacles",
        "url": "https://leetcode.com/problems/unique-paths-ii/"
      },
      {
        "id": "dp-11",
        "name": "Minimum Path Sum",
        "difficulty": "Medium",
        "pattern": "2D Grid DP",
        "url": "https://leetcode.com/problems/minimum-path-sum/"
      },
      {
        "id": "dp-12",
        "name": "Longest Common Subsequence",
        "difficulty": "Medium",
        "pattern": "2D Subsequence DP",
        "url": "https://leetcode.com/problems/longest-common-subsequence/"
      },
      {
        "id": "dp-13",
        "name": "Edit Distance",
        "difficulty": "Medium",
        "pattern": "2D DP (LCS variant)",
        "url": "https://leetcode.com/problems/edit-distance/"
      },
      {
        "id": "dp-14",
        "name": "Longest Increasing Subsequence",
        "difficulty": "Medium",
        "pattern": "1D DP / Patience Sort",
        "url": "https://leetcode.com/problems/longest-increasing-subsequence/"
      },
      {
        "id": "dp-15",
        "name": "Longest Palindromic Subsequence",
        "difficulty": "Medium",
        "pattern": "Interval DP",
        "url": "https://leetcode.com/problems/longest-palindromic-subsequence/"
      },
      {
        "id": "dp-16",
        "name": "Palindromic Substrings",
        "difficulty": "Medium",
        "pattern": "Expand Center / DP",
        "url": "https://leetcode.com/problems/palindromic-substrings/"
      },
      {
        "id": "dp-17",
        "name": "Partition Equal Subset Sum",
        "difficulty": "Medium",
        "pattern": "0/1 Knapsack",
        "url": "https://leetcode.com/problems/partition-equal-subset-sum/"
      },
      {
        "id": "dp-18",
        "name": "Target Sum (count ways)",
        "difficulty": "Medium",
        "pattern": "0/1 Knapsack Count",
        "url": "https://leetcode.com/problems/target-sum/"
      },
      {
        "id": "dp-19",
        "name": "Jump Game (can reach end)",
        "difficulty": "Medium",
        "pattern": "Greedy / DP",
        "url": "https://leetcode.com/problems/jump-game/"
      },
      {
        "id": "dp-20",
        "name": "Best Time to Buy Stock w/ Cooldown",
        "difficulty": "Medium",
        "pattern": "State Machine DP",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
      },
      {
        "id": "dp-21",
        "name": "Best Time to Buy Stock w/ Fee",
        "difficulty": "Medium",
        "pattern": "State Machine DP",
        "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/"
      },
      {
        "id": "dp-22",
        "name": "Burst Balloons",
        "difficulty": "Hard",
        "pattern": "Interval DP",
        "url": "https://leetcode.com/problems/burst-balloons/"
      },
      {
        "id": "dp-23",
        "name": "Regular Expression Matching",
        "difficulty": "Hard",
        "pattern": "2D DP",
        "url": "https://leetcode.com/problems/regular-expression-matching/"
      },
      {
        "id": "dp-24",
        "name": "Wildcard Matching",
        "difficulty": "Hard",
        "pattern": "2D DP",
        "url": "https://leetcode.com/problems/wildcard-matching/"
      },
      {
        "id": "dp-25",
        "name": "Distinct Subsequences",
        "difficulty": "Hard",
        "pattern": "2D Subsequence DP",
        "url": "https://leetcode.com/problems/distinct-subsequences/"
      },
      {
        "id": "dp-26",
        "name": "Maximum Rectangle (histogram)",
        "difficulty": "Hard",
        "pattern": "Stack / DP",
        "url": "https://leetcode.com/problems/maximal-rectangle/"
      }
    ],
    "variations": [
      {
        "title": "House Robber Family",
        "items": [
          "House Robber I (linear street)",
          "House Robber II (circular street)",
          "House Robber III (binary tree)",
          "Delete and Earn (reduce to robber)",
          "Maximum Sum of Non-Adjacent Elements"
        ]
      },
      {
        "title": "Coin Change / Knapsack",
        "items": [
          "Coin Change I (minimum coins)",
          "Coin Change II (count ways)",
          "Perfect Squares (BFS or DP)",
          "Combination Sum IV (order matters)",
          "Partition Equal Subset Sum (0/1 knapsack)",
          "Target Sum (count ways — knapsack)"
        ]
      },
      {
        "title": "Buy/Sell Stock",
        "items": [
          "Stock I (one transaction)",
          "Stock II (unlimited transactions)",
          "Stock III (at most 2 transactions)",
          "Stock IV (at most k transactions)",
          "Stock with Cooldown (state machine)",
          "Stock with Fee (state machine)"
        ]
      },
      {
        "title": "Subsequence DP",
        "items": [
          "Longest Common Subsequence",
          "Longest Increasing Subsequence (O(n log n))",
          "Edit Distance",
          "Distinct Subsequences",
          "Longest Palindromic Subsequence",
          "Minimum Deletions to Make String a Palindrome"
        ]
      },
      {
        "title": "Interval DP",
        "items": [
          "Burst Balloons",
          "Minimum Cost to Cut a Stick",
          "Strange Printer",
          "Palindrome Partitioning II (min cuts)",
          "Zuma Game"
        ]
      }
    ],
    "totalEasy": 2,
    "totalMed": 20,
    "totalHard": 5
  },
  {
    "id": "fenwick",
    "num": "21",
    "icon": "🌲",
    "name": "Fenwick Tree (BIT)",
    "color": "#92400E",
    "concepts": [
      "Binary Indexed Tree / Fenwick Tree: O(log n) prefix sum update and query",
      "bit[i] stores sum of a range ending at i determined by i & (-i)",
      "Update: add delta at i, propagate to i += i & (-i)",
      "Query prefix sum [1..i]: accumulate bit[i], move to i -= i & (-i)",
      "Range query [l..r] = query(r) - query(l-1)",
      "2D BIT: extend to matrix for 2D prefix sums; O(log² n)",
      "Edge cases: 1-indexed (BIT is 1-indexed), n=1, point update",
      "Interview traps: forgetting 1-indexing, not handling query/update order",
      "Segment Tree comparison: BIT is simpler and faster constants; Segment Tree supports range updates and more query types",
      "Coordinate compression: when values are large but count is small — map to 1..n before building BIT",
      "BIT for order statistics: count elements ≤ x in O(log n) after compression",
      "Range update + point query: use difference array on BIT — update(l, +1), update(r+1, -1)",
      "Range update + range query: use two BITs simultaneously for O(log n) range add, range sum",
      "Inversion count: for each element, query how many previous elements are greater — classic BIT application"
    ],
    "patterns": [
      {
        "title": "Prefix Sum with Update",
        "desc": "BIT maintains dynamic prefix sums with O(log n) update/query."
      },
      {
        "title": "Order Statistics",
        "desc": "Compress coordinates; BIT tracks frequency for k-th element queries."
      },
      {
        "title": "2D Range Sum",
        "desc": "2D BIT for range sum queries and point updates on matrix."
      },
      {
        "title": "Inversion Count",
        "desc": "Sort + BIT to count inversions in O(n log n)."
      }
    ],
    "problems": [
      {
        "id": "fenwick-0",
        "name": "Range Sum Query – Mutable",
        "difficulty": "Medium",
        "pattern": "BIT / Segment Tree",
        "url": "https://leetcode.com/problems/range-sum-query-mutable/"
      },
      {
        "id": "fenwick-1",
        "name": "Count of Smaller Numbers After Self",
        "difficulty": "Hard",
        "pattern": "BIT + Coord Compress",
        "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
      },
      {
        "id": "fenwick-2",
        "name": "Reverse Pairs",
        "difficulty": "Hard",
        "pattern": "BIT / Merge Sort",
        "url": "https://leetcode.com/problems/reverse-pairs/"
      },
      {
        "id": "fenwick-3",
        "name": "Count of Range Sum",
        "difficulty": "Hard",
        "pattern": "BIT / Segment Tree",
        "url": "https://leetcode.com/problems/count-of-range-sum/"
      },
      {
        "id": "fenwick-4",
        "name": "Create Sorted Array through Instructions",
        "difficulty": "Hard",
        "pattern": "BIT + Query",
        "url": "https://leetcode.com/problems/create-sorted-array-through-instructions/"
      },
      {
        "id": "fenwick-5",
        "name": "Number of Longest Increasing Subsequences",
        "difficulty": "Medium",
        "pattern": "DP + BIT Optimization",
        "url": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/"
      },
      {
        "id": "fenwick-6",
        "name": "Range Sum Query 2D – Mutable",
        "difficulty": "Hard",
        "pattern": "2D BIT",
        "url": "https://leetcode.com/problems/range-sum-query-2d-mutable/"
      },
      {
        "id": "fenwick-7",
        "name": "Queue Reconstruction by Height",
        "difficulty": "Medium",
        "pattern": "Greedy + BIT insight",
        "url": "https://leetcode.com/problems/queue-reconstruction-by-height/"
      },
      {
        "id": "fenwick-8",
        "name": "Maximum Sum of 3 Non-Overlapping Subarrays",
        "difficulty": "Hard",
        "pattern": "BIT / Prefix Max",
        "url": "https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/"
      },
      {
        "id": "fenwick-9",
        "name": "Falling Squares",
        "difficulty": "Hard",
        "pattern": "Coordinate Compress + BIT",
        "url": "https://leetcode.com/problems/falling-squares/"
      }
    ],
    "variations": [
      {
        "title": "Range Sum Query",
        "items": [
          "Range Sum Query – Immutable (prefix sum array)",
          "Range Sum Query – Mutable (BIT or Segment Tree)",
          "Range Sum Query 2D – Immutable (2D prefix sum)",
          "Range Sum Query 2D – Mutable (2D BIT)"
        ]
      },
      {
        "title": "Count Inversions",
        "items": [
          "Count Inversions in Array (merge sort or BIT)",
          "Count of Smaller Numbers After Self",
          "Reverse Pairs (i < j and nums[i] > 2*nums[j])",
          "Create Sorted Array Through Instructions"
        ]
      },
      {
        "title": "Segment Tree Alternatives",
        "items": [
          "Range Minimum Query (Segment Tree or Sparse Table)",
          "Interval Overlap Count (Segment Tree with lazy propagation)",
          "Falling Squares (coordinate compress + Segment Tree)",
          "Count of Range Sum"
        ]
      }
    ],
    "totalEasy": 0,
    "totalMed": 3,
    "totalHard": 7
  },
  {
    "id": "math",
    "num": "22",
    "icon": "🔢",
    "name": "Math & Number Theory",
    "color": "#B45309",
    "concepts": [
      "Sieve of Eratosthenes: O(n log log n) to find all primes up to n",
      "GCD: Euclidean algorithm O(log min(a,b)); LCM = a*b / gcd(a,b)",
      "Modular arithmetic: (a+b)%m, (a*b)%m; use for large number problems",
      "Fast exponentiation: x^n in O(log n) via repeated squaring",
      "Combinatorics: C(n,k) = n! / (k!(n-k)!); Pascal's triangle for small n",
      "Number theory: Euler's totient, Fermat's little theorem for modular inverse",
      "Edge cases: overflow (use long), n=0, n=1, negative inputs",
      "Interview traps: integer overflow in multiplication, forgetting % MOD",
      "Modular inverse: a^(m-2) mod m when m is prime (Fermat's little theorem)",
      "Chinese Remainder Theorem: solve system of congruences with coprime moduli",
      "Prime factorization: trial division up to √n; O(√n) per number",
      "Number of divisors: if n = p1^a1 * p2^a2 * ..., then divisors = (a1+1)(a2+1)...",
      "Perfect numbers, abundant numbers, deficient numbers — sum of proper divisors",
      "Catalan numbers: C(n) = C(2n,n)/(n+1); counts BSTs, valid parens, monotone paths",
      "Pigeonhole principle: n+1 items in n boxes → some box has ≥2 items; use for existence proofs",
      "Floyd's cycle detection in numeric sequences (e.g., Happy Number)",
      "Sum of 1..n = n*(n+1)/2; sum of squares = n(n+1)(2n+1)/6 — memorize for O(1) range sum"
    ],
    "patterns": [
      {
        "title": "Sieve of Eratosthenes",
        "desc": "Mark composites to find all primes up to n efficiently."
      },
      {
        "title": "Fast Exponentiation",
        "desc": "Halve exponent each step; handle odd exponent separately."
      },
      {
        "title": "GCD / LCM",
        "desc": "Euclidean GCD then LCM = a*b/gcd; useful for fraction problems."
      },
      {
        "title": "Digit DP / Digit Manipulation",
        "desc": "Process number digit by digit for counting or transformation."
      },
      {
        "title": "Mathematical Induction / Formula",
        "desc": "Derive closed-form formula instead of simulating."
      }
    ],
    "problems": [
      {
        "id": "math-0",
        "name": "Palindrome Number",
        "difficulty": "Easy",
        "pattern": "Digit Reversal",
        "url": "https://leetcode.com/problems/palindrome-number/"
      },
      {
        "id": "math-1",
        "name": "Reverse Integer",
        "difficulty": "Medium",
        "pattern": "Digit Manipulation + Overflow",
        "url": "https://leetcode.com/problems/reverse-integer/"
      },
      {
        "id": "math-2",
        "name": "Plus One",
        "difficulty": "Easy",
        "pattern": "Digit Carry Simulation",
        "url": "https://leetcode.com/problems/plus-one/"
      },
      {
        "id": "math-3",
        "name": "Add Binary",
        "difficulty": "Easy",
        "pattern": "Bit-by-bit Addition",
        "url": "https://leetcode.com/problems/add-binary/"
      },
      {
        "id": "math-4",
        "name": "Happy Number",
        "difficulty": "Easy",
        "pattern": "Cycle Detection (Floyd)",
        "url": "https://leetcode.com/problems/happy-number/"
      },
      {
        "id": "math-5",
        "name": "Ugly Number",
        "difficulty": "Easy",
        "pattern": "Prime Factor Check",
        "url": "https://leetcode.com/problems/ugly-number/"
      },
      {
        "id": "math-6",
        "name": "Ugly Number II",
        "difficulty": "Medium",
        "pattern": "DP + 3 Pointers",
        "url": "https://leetcode.com/problems/ugly-number-ii/"
      },
      {
        "id": "math-7",
        "name": "Count Primes",
        "difficulty": "Medium",
        "pattern": "Sieve of Eratosthenes",
        "url": "https://leetcode.com/problems/count-primes/"
      },
      {
        "id": "math-8",
        "name": "Power of Two",
        "difficulty": "Easy",
        "pattern": "n&(n-1)==0 or Log",
        "url": "https://leetcode.com/problems/power-of-two/"
      },
      {
        "id": "math-9",
        "name": "Power of Three",
        "difficulty": "Easy",
        "pattern": "Log or Divisor Check",
        "url": "https://leetcode.com/problems/power-of-three/"
      },
      {
        "id": "math-10",
        "name": "Pow(x, n)",
        "difficulty": "Medium",
        "pattern": "Fast Exponentiation",
        "url": "https://leetcode.com/problems/powx-n/"
      },
      {
        "id": "math-11",
        "name": "Factorial Trailing Zeroes",
        "difficulty": "Medium",
        "pattern": "Count Factor of 5",
        "url": "https://leetcode.com/problems/factorial-trailing-zeroes/"
      },
      {
        "id": "math-12",
        "name": "Excel Sheet Column Number",
        "difficulty": "Easy",
        "pattern": "Base-26 Conversion",
        "url": "https://leetcode.com/problems/excel-sheet-column-number/"
      },
      {
        "id": "math-13",
        "name": "Roman to Integer",
        "difficulty": "Easy",
        "pattern": "Map + Scan",
        "url": "https://leetcode.com/problems/roman-to-integer/"
      },
      {
        "id": "math-14",
        "name": "Integer to Roman",
        "difficulty": "Medium",
        "pattern": "Greedy Subtraction",
        "url": "https://leetcode.com/problems/integer-to-roman/"
      },
      {
        "id": "math-15",
        "name": "GCD of Strings",
        "difficulty": "Easy",
        "pattern": "GCD Length Formula",
        "url": "https://leetcode.com/problems/greatest-common-divisor-of-strings/"
      },
      {
        "id": "math-16",
        "name": "Fraction to Recurring Decimal",
        "difficulty": "Medium",
        "pattern": "Long Division + Hash Map",
        "url": "https://leetcode.com/problems/fraction-to-recurring-decimal/"
      },
      {
        "id": "math-17",
        "name": "Divide Two Integers",
        "difficulty": "Medium",
        "pattern": "Bit Shift Division",
        "url": "https://leetcode.com/problems/divide-two-integers/"
      },
      {
        "id": "math-18",
        "name": "Multiply Strings",
        "difficulty": "Medium",
        "pattern": "Grade School Mult",
        "url": "https://leetcode.com/problems/multiply-strings/"
      },
      {
        "id": "math-19",
        "name": "Perfect Squares",
        "difficulty": "Medium",
        "pattern": "DP / Math (Legendre)",
        "url": "https://leetcode.com/problems/perfect-squares/"
      },
      {
        "id": "math-20",
        "name": "Sqrt(x) – integer square root",
        "difficulty": "Easy",
        "pattern": "Binary Search",
        "url": "https://leetcode.com/problems/sqrtx/"
      },
      {
        "id": "math-21",
        "name": "Super Pow",
        "difficulty": "Medium",
        "pattern": "Modular Exponentiation",
        "url": "https://leetcode.com/problems/super-pow/"
      }
    ],
    "variations": [
      {
        "title": "Prime Numbers",
        "items": [
          "Count Primes (Sieve of Eratosthenes)",
          "Prime Factorization (trial division to √n)",
          "Largest Prime Factor",
          "Smallest Prime Factor Sieve",
          "Sum of Primes up to N"
        ]
      },
      {
        "title": "Power / Exponentiation",
        "items": [
          "Pow(x, n) — fast exponentiation",
          "Super Pow (modular exponentiation)",
          "Matrix Exponentiation (Fibonacci in O(log n))",
          "Power of Two / Three / Four (bit tricks)"
        ]
      },
      {
        "title": "GCD / LCM",
        "items": [
          "GCD of Two Numbers (Euclidean)",
          "GCD of Strings",
          "LCM of Array",
          "Count Array Pairs Divisible by K",
          "Simplified Fractions"
        ]
      },
      {
        "title": "Digit Manipulation",
        "items": [
          "Reverse Integer (overflow handling)",
          "Palindrome Number (no string conversion)",
          "Digit Sum",
          "Factorial Trailing Zeroes (count 5s)",
          "Number of Digit One"
        ]
      },
      {
        "title": "Ugly / Special Numbers",
        "items": [
          "Ugly Number I (is it ugly?)",
          "Ugly Number II (nth ugly — 3 pointers)",
          "Super Ugly Number (k prime factors)",
          "Happy Number (cycle detection)",
          "Perfect Number (sum of divisors)"
        ]
      }
    ],
    "totalEasy": 11,
    "totalMed": 11,
    "totalHard": 0
  }
];