// SQL & DBMS Practice Sheet — 11 levels, placement-focused
// Covers: TCS, Infosys, Wipro, Accenture, Capgemini, Cognizant, Deloitte, IBM
// Amazon, Microsoft, Google, Meta, Netflix, Product startups, Analytics roles

export const SQL_TOTAL_PROBLEMS = 70;
export const SQL_TOTAL_CHAPTERS = 11;

export const sqlChapters = [
  {
    "id": "sql-basics",
    "num": "01",
    "icon": "📋",
    "name": "SQL Basics",
    "color": "#0EA5E9",
    "concepts": [
      "SELECT retrieves data from one or more tables — always specify columns you need",
      "WHERE clause filters rows before grouping; supports =, <>, <, >, BETWEEN, IN, LIKE",
      "DISTINCT removes duplicate rows from result set — applies to entire selected row",
      "LIMIT/TOP restricts number of rows returned — essential for pagination",
      "ORDER BY sorts results; ASC (default) or DESC; can sort by multiple columns",
      "NULL represents missing data — use IS NULL / IS NOT NULL, never = NULL",
      "SQL execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
      "Aliases (AS) rename columns/tables for readability — required for self-joins"
    ],
    "patterns": [
      { "title": "Basic SELECT", "desc": "Retrieve specific columns from a table with filtering conditions." },
      { "title": "NULL Handling", "desc": "Identify and handle missing data using IS NULL, COALESCE, IFNULL." },
      { "title": "Pattern Matching", "desc": "Use LIKE with % and _ wildcards for flexible text search." }
    ],
    "problems": [
      {
        "id": "sql-basics-0",
        "name": "Recyclable and Low Fat Products",
        "difficulty": "Easy",
        "pattern": "SELECT + WHERE",
        "url": "https://leetcode.com/problems/recyclable-and-low-fat-products/",
        "company": "Amazon",
        "hint": "Filter with AND on two boolean columns"
      },
      {
        "id": "sql-basics-1",
        "name": "Find Customer Referee",
        "difficulty": "Easy",
        "pattern": "NULL Handling",
        "url": "https://leetcode.com/problems/find-customer-referee/",
        "company": "Expected in interviews",
        "hint": "NULL != 2 is NULL, not TRUE — handle with IS NULL or COALESCE"
      },
      {
        "id": "sql-basics-2",
        "name": "Big Countries",
        "difficulty": "Easy",
        "pattern": "SELECT + WHERE + OR",
        "url": "https://leetcode.com/problems/big-countries/",
        "company": "TCS / Infosys",
        "hint": "Filter with OR condition on area and population"
      },
      {
        "id": "sql-basics-3",
        "name": "Article Views I",
        "difficulty": "Easy",
        "pattern": "Self-filter + DISTINCT",
        "url": "https://leetcode.com/problems/article-views-i/",
        "company": "Expected in interviews",
        "hint": "Author viewed their own article means author_id = viewer_id"
      },
      {
        "id": "sql-basics-4",
        "name": "Invalid Tweets",
        "difficulty": "Easy",
        "pattern": "String Functions",
        "url": "https://leetcode.com/problems/invalid-tweets/",
        "company": "Expected in interviews",
        "hint": "Use LENGTH() or CHAR_LENGTH() to check content length > 15"
      },
      {
        "id": "sql-basics-5",
        "name": "Select All from Employees",
        "difficulty": "Easy",
        "pattern": "SELECT Fundamentals",
        "url": "https://www.hackerrank.com/challenges/select-all-sql/problem",
        "company": "TCS / Wipro",
        "hint": "SELECT * FROM table — basic retrieval"
      }
    ],
    "variations": [],
    "totalEasy": 6,
    "totalMed": 0,
    "totalHard": 0
  },
  {
    "id": "sql-filter-sort",
    "num": "02",
    "icon": "🔍",
    "name": "Filtering & Sorting",
    "color": "#06B6D4",
    "concepts": [
      "WHERE filters rows before aggregation; HAVING filters after GROUP BY",
      "ORDER BY with multiple columns: primary sort first, then secondary for ties",
      "BETWEEN is inclusive on both ends — BETWEEN 10 AND 20 includes 10 and 20",
      "IN (list) is shorthand for multiple OR conditions on same column",
      "LIKE patterns: % = any sequence of chars, _ = exactly one char",
      "Aggregate functions: COUNT, SUM, AVG, MIN, MAX — ignore NULLs except COUNT(*)",
      "COUNT(*) counts all rows; COUNT(column) counts non-NULL values only"
    ],
    "patterns": [
      { "title": "Multi-condition Filtering", "desc": "Combine AND, OR, NOT for complex row selection." },
      { "title": "Sorting Strategies", "desc": "Sort by computed columns, handle NULLs in ordering." },
      { "title": "Aggregate Basics", "desc": "COUNT, SUM, AVG, MIN, MAX for quick summaries." }
    ],
    "problems": [
      {
        "id": "sql-filter-0",
        "name": "Not Boring Movies",
        "difficulty": "Easy",
        "pattern": "WHERE + MOD + ORDER BY",
        "url": "https://leetcode.com/problems/not-boring-movies/",
        "company": "Amazon",
        "hint": "Filter odd id (id % 2 = 1) and description != 'boring', order by rating DESC"
      },
      {
        "id": "sql-filter-1",
        "name": "Average Selling Price",
        "difficulty": "Easy",
        "pattern": "Aggregate + JOIN",
        "url": "https://leetcode.com/problems/average-selling-price/",
        "company": "Expected in interviews",
        "hint": "Weighted average: SUM(price * units) / SUM(units)"
      },
      {
        "id": "sql-filter-2",
        "name": "Fix Names in a Table",
        "difficulty": "Easy",
        "pattern": "String Functions",
        "url": "https://leetcode.com/problems/fix-names-in-a-table/",
        "company": "Expected in interviews",
        "hint": "CONCAT(UPPER(LEFT(name,1)), LOWER(SUBSTRING(name,2)))"
      },
      {
        "id": "sql-filter-3",
        "name": "Patients With a Condition",
        "difficulty": "Easy",
        "pattern": "LIKE Pattern Matching",
        "url": "https://leetcode.com/problems/patients-with-a-condition/",
        "company": "Expected in interviews",
        "hint": "LIKE 'DIAB1%' OR LIKE '% DIAB1%' to match start or after space"
      },
      {
        "id": "sql-filter-4",
        "name": "Employee Bonus",
        "difficulty": "Easy",
        "pattern": "LEFT JOIN + NULL",
        "url": "https://leetcode.com/problems/employee-bonus/",
        "company": "Expected in interviews",
        "hint": "LEFT JOIN to include employees with no bonus (NULL), then filter < 1000 OR IS NULL"
      },
      {
        "id": "sql-filter-5",
        "name": "Nth Highest Salary",
        "difficulty": "Medium",
        "pattern": "LIMIT OFFSET / Subquery",
        "url": "https://leetcode.com/problems/nth-highest-salary/",
        "company": "Amazon / Microsoft",
        "hint": "SELECT DISTINCT salary ORDER BY DESC LIMIT 1 OFFSET N-1, handle NULL if not found"
      },
      {
        "id": "sql-filter-6",
        "name": "Second Highest Salary",
        "difficulty": "Medium",
        "pattern": "Subquery + IFNULL",
        "url": "https://leetcode.com/problems/second-highest-salary/",
        "company": "Amazon / Google / Microsoft",
        "hint": "Subquery with MAX(salary) WHERE salary < (SELECT MAX(salary)...)"
      }
    ],
    "variations": [],
    "totalEasy": 5,
    "totalMed": 2,
    "totalHard": 0
  },
  {
    "id": "sql-groupby",
    "num": "03",
    "icon": "📊",
    "name": "GROUP BY & Subqueries",
    "color": "#14B8A6",
    "concepts": [
      "GROUP BY collapses rows with same values into summary rows",
      "Every non-aggregated column in SELECT must appear in GROUP BY",
      "HAVING filters groups after aggregation — like WHERE but for groups",
      "Subquery in WHERE: filter based on result of another query",
      "Subquery in FROM: create a derived table (inline view)",
      "Subquery in SELECT: compute a scalar value per row (correlated subquery)",
      "Correlated subquery executes once per outer row — can be slow, consider JOIN alternative",
      "EXISTS vs IN: EXISTS stops at first match (often faster); IN materializes full subquery"
    ],
    "patterns": [
      { "title": "Group & Filter", "desc": "GROUP BY + HAVING to find groups meeting a condition." },
      { "title": "Nested Subquery", "desc": "Subquery in WHERE to filter based on aggregated results." },
      { "title": "Correlated Subquery", "desc": "Inner query references outer query for row-by-row computation." }
    ],
    "problems": [
      {
        "id": "sql-group-0",
        "name": "Duplicate Emails",
        "difficulty": "Easy",
        "pattern": "GROUP BY + HAVING",
        "url": "https://leetcode.com/problems/duplicate-emails/",
        "company": "Google / Amazon",
        "hint": "GROUP BY email HAVING COUNT(*) > 1"
      },
      {
        "id": "sql-group-1",
        "name": "Customers Who Never Order",
        "difficulty": "Easy",
        "pattern": "NOT IN / LEFT JOIN",
        "url": "https://leetcode.com/problems/customers-who-never-order/",
        "company": "Amazon / Microsoft",
        "hint": "WHERE id NOT IN (SELECT customerId FROM Orders) or LEFT JOIN where NULL"
      },
      {
        "id": "sql-group-2",
        "name": "Classes More Than 5 Students",
        "difficulty": "Easy",
        "pattern": "GROUP BY + HAVING COUNT",
        "url": "https://leetcode.com/problems/classes-more-than-5-students/",
        "company": "Expected in interviews",
        "hint": "GROUP BY class HAVING COUNT(DISTINCT student) >= 5"
      },
      {
        "id": "sql-group-3",
        "name": "Managers with At Least 5 Reports",
        "difficulty": "Medium",
        "pattern": "Self-reference + GROUP BY",
        "url": "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/",
        "company": "Meta / Microsoft",
        "hint": "JOIN Employee e ON e.managerId = m.id, GROUP BY manager HAVING COUNT >= 5"
      },
      {
        "id": "sql-group-4",
        "name": "Product Sales Analysis III",
        "difficulty": "Medium",
        "pattern": "Subquery + MIN",
        "url": "https://leetcode.com/problems/product-sales-analysis-iii/",
        "company": "Expected in interviews",
        "hint": "Find first year per product using MIN(year) subquery, then join back"
      },
      {
        "id": "sql-group-5",
        "name": "Monthly Transactions I",
        "difficulty": "Medium",
        "pattern": "GROUP BY + Conditional COUNT",
        "url": "https://leetcode.com/problems/monthly-transactions-i/",
        "company": "Expected in interviews",
        "hint": "DATE_FORMAT for month, SUM(CASE WHEN state='approved' THEN 1 END)"
      },
      {
        "id": "sql-group-6",
        "name": "Immediate Food Delivery II",
        "difficulty": "Medium",
        "pattern": "Subquery + Conditional Aggregation",
        "url": "https://leetcode.com/problems/immediate-food-delivery-ii/",
        "company": "DoorDash / Meta",
        "hint": "Find first order per customer, then check if order_date = customer_pref_delivery_date"
      }
    ],
    "variations": [],
    "totalEasy": 3,
    "totalMed": 4,
    "totalHard": 0
  },
  {
    "id": "sql-joins",
    "num": "04",
    "icon": "🔗",
    "name": "Joins",
    "color": "#0D9488",
    "concepts": [
      "INNER JOIN: only rows with matches in both tables",
      "LEFT JOIN: all rows from left table + matched rows from right (NULL if no match)",
      "RIGHT JOIN: all rows from right table + matched rows from left",
      "FULL OUTER JOIN: all rows from both tables, NULL where no match",
      "CROSS JOIN: every row from table A paired with every row from table B (Cartesian product)",
      "Join condition goes in ON clause; additional filters go in WHERE",
      "Multiple JOINs: chain them — FROM A JOIN B ON ... JOIN C ON ...",
      "Anti-join pattern: LEFT JOIN + WHERE right.id IS NULL finds unmatched rows"
    ],
    "patterns": [
      { "title": "Anti-Join", "desc": "LEFT JOIN + IS NULL to find records with no match." },
      { "title": "Multi-table JOIN", "desc": "Chain JOINs to combine 3+ tables." },
      { "title": "CROSS JOIN", "desc": "Generate all combinations for comparison queries." }
    ],
    "problems": [
      {
        "id": "sql-join-0",
        "name": "Combine Two Tables",
        "difficulty": "Easy",
        "pattern": "LEFT JOIN",
        "url": "https://leetcode.com/problems/combine-two-tables/",
        "company": "Meta / Amazon",
        "hint": "LEFT JOIN Person with Address on personId — address can be NULL"
      },
      {
        "id": "sql-join-1",
        "name": "Students and Examinations",
        "difficulty": "Easy",
        "pattern": "CROSS JOIN + LEFT JOIN + GROUP BY",
        "url": "https://leetcode.com/problems/students-and-examinations/",
        "company": "Expected in interviews",
        "hint": "CROSS JOIN students × subjects to get all combos, then LEFT JOIN exams"
      },
      {
        "id": "sql-join-2",
        "name": "Replace Employee ID With Unique Identifier",
        "difficulty": "Easy",
        "pattern": "LEFT JOIN",
        "url": "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/",
        "company": "Expected in interviews",
        "hint": "LEFT JOIN Employees with EmployeeUNI on id"
      },
      {
        "id": "sql-join-3",
        "name": "Rising Temperature",
        "difficulty": "Easy",
        "pattern": "Self-JOIN + Date Arithmetic",
        "url": "https://leetcode.com/problems/rising-temperature/",
        "company": "Amazon",
        "hint": "JOIN Weather w1, w2 WHERE DATEDIFF(w1.recordDate, w2.recordDate) = 1"
      },
      {
        "id": "sql-join-4",
        "name": "Confirmation Rate",
        "difficulty": "Medium",
        "pattern": "LEFT JOIN + Conditional AVG",
        "url": "https://leetcode.com/problems/confirmation-rate/",
        "company": "Meta",
        "hint": "LEFT JOIN, then AVG(CASE WHEN action='confirmed' THEN 1 ELSE 0 END)"
      },
      {
        "id": "sql-join-5",
        "name": "Employees Whose Manager Left",
        "difficulty": "Medium",
        "pattern": "LEFT JOIN + NULL Check",
        "url": "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
        "company": "Expected in interviews",
        "hint": "LEFT JOIN Employee e ON e.manager_id = m.id WHERE m.id IS NULL and salary < 30000"
      },
      {
        "id": "sql-join-6",
        "name": "Market Analysis I",
        "difficulty": "Medium",
        "pattern": "LEFT JOIN + Conditional COUNT",
        "url": "https://leetcode.com/problems/market-analysis-i/",
        "company": "Amazon",
        "hint": "LEFT JOIN Users with Orders (year=2019), COUNT orders per user"
      }
    ],
    "variations": [],
    "totalEasy": 4,
    "totalMed": 3,
    "totalHard": 0
  },
  {
    "id": "sql-advanced-joins",
    "num": "05",
    "icon": "🔀",
    "name": "Advanced & Self Joins",
    "color": "#059669",
    "concepts": [
      "Self-join: join a table with itself — requires aliases to distinguish the two copies",
      "Employee-manager hierarchy: join Employee e ON e.managerId = m.id",
      "Finding consecutive records: self-join on id+1 or date+1",
      "Triangle judge: self-join to check if three sides can form a triangle",
      "Anti-pattern detection: find pairs, duplicates, or gaps using self-join",
      "Recursive self-reference: for tree/hierarchy traversal (needs CTE in Level 6)"
    ],
    "patterns": [
      { "title": "Self-Join", "desc": "Join table with itself for comparisons between rows." },
      { "title": "Consecutive Pattern", "desc": "Self-join on sequential IDs or dates." },
      { "title": "Hierarchy Traversal", "desc": "Employee-manager or parent-child relationships." }
    ],
    "problems": [
      {
        "id": "sql-advjoin-0",
        "name": "Employees Earning More Than Their Managers",
        "difficulty": "Easy",
        "pattern": "Self-JOIN",
        "url": "https://leetcode.com/problems/employees-earning-more-than-their-managers/",
        "company": "Amazon / Microsoft",
        "hint": "Self-join Employee e1 JOIN Employee e2 ON e1.managerId = e2.id WHERE e1.salary > e2.salary"
      },
      {
        "id": "sql-advjoin-1",
        "name": "Delete Duplicate Emails",
        "difficulty": "Easy",
        "pattern": "Self-JOIN + DELETE",
        "url": "https://leetcode.com/problems/delete-duplicate-emails/",
        "company": "Meta / Amazon",
        "hint": "DELETE p1 FROM Person p1 JOIN Person p2 WHERE p1.email = p2.email AND p1.id > p2.id"
      },
      {
        "id": "sql-advjoin-2",
        "name": "Exchange Seats",
        "difficulty": "Medium",
        "pattern": "CASE + Self-logic",
        "url": "https://leetcode.com/problems/exchange-seats/",
        "company": "Expected in interviews",
        "hint": "CASE WHEN id is odd THEN next id's student, WHEN even THEN prev id's student"
      },
      {
        "id": "sql-advjoin-3",
        "name": "Consecutive Numbers",
        "difficulty": "Medium",
        "pattern": "Self-JOIN × 3",
        "url": "https://leetcode.com/problems/consecutive-numbers/",
        "company": "Amazon / Google",
        "hint": "Join Logs l1, l2, l3 WHERE l1.id = l2.id-1 AND l2.id = l3.id-1 AND all nums equal"
      },
      {
        "id": "sql-advjoin-4",
        "name": "Friend Requests II: Who Has the Most Friends",
        "difficulty": "Medium",
        "pattern": "UNION + GROUP BY",
        "url": "https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/",
        "company": "Meta",
        "hint": "UNION requester_id and accepter_id into one column, COUNT per user"
      },
      {
        "id": "sql-advjoin-5",
        "name": "Last Person to Fit in the Bus",
        "difficulty": "Medium",
        "pattern": "Self-JOIN + Running Sum",
        "url": "https://leetcode.com/problems/last-person-to-fit-in-the-bus/",
        "company": "Expected in interviews",
        "hint": "Running sum of weight ordered by turn; find last person where cumulative <= 1000"
      }
    ],
    "variations": [],
    "totalEasy": 2,
    "totalMed": 4,
    "totalHard": 0
  },
  {
    "id": "sql-window",
    "num": "06",
    "icon": "🪟",
    "name": "Window Functions",
    "color": "#10B981",
    "concepts": [
      "Window functions compute across a set of rows related to current row — without collapsing rows",
      "OVER(PARTITION BY col ORDER BY col) defines the window frame",
      "ROW_NUMBER(): unique sequential number per partition",
      "RANK(): same rank for ties, gaps after ties (1,2,2,4)",
      "DENSE_RANK(): same rank for ties, no gaps (1,2,2,3)",
      "LEAD(col, n) / LAG(col, n): access row n positions ahead/behind",
      "SUM/AVG/COUNT OVER(): running or cumulative aggregations",
      "NTILE(n): divide rows into n roughly equal groups",
      "Frame clause: ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW for running total",
      "Rolling average: ROWS BETWEEN 2 PRECEDING AND CURRENT ROW for 3-period moving average"
    ],
    "patterns": [
      { "title": "Ranking", "desc": "ROW_NUMBER, RANK, DENSE_RANK for top-N per group." },
      { "title": "Running Totals", "desc": "SUM() OVER(ORDER BY ...) for cumulative calculations." },
      { "title": "Lead/Lag Comparison", "desc": "Compare current row with previous/next row values." }
    ],
    "problems": [
      {
        "id": "sql-window-0",
        "name": "Rank Scores",
        "difficulty": "Medium",
        "pattern": "DENSE_RANK",
        "url": "https://leetcode.com/problems/rank-scores/",
        "company": "Amazon / Microsoft",
        "hint": "DENSE_RANK() OVER(ORDER BY score DESC)"
      },
      {
        "id": "sql-window-1",
        "name": "Department Top Three Salaries",
        "difficulty": "Hard",
        "pattern": "DENSE_RANK + Top N per Group",
        "url": "https://leetcode.com/problems/department-top-three-salaries/",
        "company": "Amazon / Google / Meta",
        "hint": "DENSE_RANK() OVER(PARTITION BY departmentId ORDER BY salary DESC) <= 3"
      },
      {
        "id": "sql-window-2",
        "name": "Department Highest Salary",
        "difficulty": "Medium",
        "pattern": "Window Function + Filter",
        "url": "https://leetcode.com/problems/department-highest-salary/",
        "company": "Google / Meta",
        "hint": "RANK() OVER(PARTITION BY dept ORDER BY salary DESC) = 1"
      },
      {
        "id": "sql-window-3",
        "name": "Weather Observation Station 20 (Median)",
        "difficulty": "Hard",
        "pattern": "ROW_NUMBER + Median",
        "url": "https://www.hackerrank.com/challenges/weather-observation-station-20/problem",
        "company": "Google",
        "hint": "Assign ROW_NUMBER, find middle position(s) using COUNT, then average"
      },
      {
        "id": "sql-window-4",
        "name": "Game Play Analysis IV",
        "difficulty": "Medium",
        "pattern": "Window + Date Diff",
        "url": "https://leetcode.com/problems/game-play-analysis-iv/",
        "company": "Expected in interviews",
        "hint": "First login per player (MIN), check if they logged in next day"
      },
      {
        "id": "sql-window-5",
        "name": "Highest-Grossing Items",
        "difficulty": "Medium",
        "pattern": "Window + Top N",
        "url": "https://datalemur.com/questions/sql-highest-grossing",
        "company": "Amazon",
        "hint": "RANK() OVER(PARTITION BY category ORDER BY spend DESC), filter rank <= 2"
      },
      {
        "id": "sql-window-6",
        "name": "Tweets' Rolling Averages",
        "difficulty": "Medium",
        "pattern": "Running Avg + Preceding",
        "url": "https://datalemur.com/questions/rolling-average-tweets",
        "company": "Twitter",
        "hint": "AVG(tweet_count) OVER(PARTITION BY user_id ORDER BY tweet_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)"
      }
    ],
    "variations": [],
    "totalEasy": 0,
    "totalMed": 4,
    "totalHard": 3
  },
  {
    "id": "sql-cte",
    "num": "07",
    "icon": "🔄",
    "name": "CTEs & Recursive CTEs",
    "color": "#34D399",
    "concepts": [
      "CTE (Common Table Expression): WITH clause creates a named temporary result set",
      "CTEs improve readability — break complex queries into logical steps",
      "Multiple CTEs: WITH cte1 AS (...), cte2 AS (SELECT ... FROM cte1)",
      "Recursive CTE: WITH RECURSIVE cte AS (base UNION ALL recursive_step)",
      "Recursive CTEs need a termination condition to avoid infinite loops",
      "Use recursive CTEs for: hierarchy traversal, number generation, graph traversal",
      "Employee-manager full hierarchy: recursive CTE walking managerId chain"
    ],
    "patterns": [
      { "title": "Multi-step CTE", "desc": "Chain CTEs to build complex logic step by step." },
      { "title": "Recursive Hierarchy", "desc": "Walk parent-child trees with recursive CTE." },
      { "title": "Number Generator", "desc": "Generate sequences with recursive UNION ALL." }
    ],
    "problems": [
      {
        "id": "sql-cte-0",
        "name": "Restaurant Growth (Moving Average)",
        "difficulty": "Medium",
        "pattern": "CTE + Window Function",
        "url": "https://leetcode.com/problems/restaurant-growth/",
        "company": "Expected in interviews",
        "hint": "CTE with SUM() OVER(ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)"
      },
      {
        "id": "sql-cte-1",
        "name": "Trips and Users",
        "difficulty": "Hard",
        "pattern": "CTE + Conditional Aggregation",
        "url": "https://leetcode.com/problems/trips-and-users/",
        "company": "Uber / Amazon",
        "hint": "CTE to filter banned users, then cancellation rate = cancelled/total per day"
      },
      {
        "id": "sql-cte-2",
        "name": "Count Salary Categories",
        "difficulty": "Medium",
        "pattern": "CTE + UNION + CASE",
        "url": "https://leetcode.com/problems/count-salary-categories/",
        "company": "Expected in interviews",
        "hint": "Use UNION to create category list, LEFT JOIN with CASE-counted accounts"
      },
      {
        "id": "sql-cte-3",
        "name": "Human Traffic of Stadium",
        "difficulty": "Hard",
        "pattern": "CTE + Consecutive Pattern",
        "url": "https://leetcode.com/problems/human-traffic-of-stadium/",
        "company": "Expected in interviews",
        "hint": "CTE: id - ROW_NUMBER() gives same group for consecutives, filter groups with COUNT >= 3"
      },
      {
        "id": "sql-cte-4",
        "name": "Generate Number Series (1-100)",
        "difficulty": "Medium",
        "pattern": "Recursive CTE",
        "url": "https://www.hackerrank.com/challenges/print-prime-numbers/problem",
        "company": "Expected in interviews",
        "hint": "WITH RECURSIVE nums AS (SELECT 1 AS n UNION ALL SELECT n+1 FROM nums WHERE n < 100)"
      },
      {
        "id": "sql-cte-5",
        "name": "Employee Hierarchy (All Reports)",
        "difficulty": "Hard",
        "pattern": "Recursive CTE + Self-Reference",
        "url": "https://leetcode.com/problems/all-people-report-to-the-given-manager/",
        "company": "Microsoft / Google",
        "hint": "Recursive CTE: base = direct reports of manager, recurse on managerId chain"
      }
    ],
    "variations": [],
    "totalEasy": 0,
    "totalMed": 3,
    "totalHard": 3
  },
  {
    "id": "sql-datetime",
    "num": "08",
    "icon": "📅",
    "name": "Date & Time Problems",
    "color": "#22D3EE",
    "concepts": [
      "DATE functions: YEAR(), MONTH(), DAY(), DATEDIFF(), DATE_ADD(), DATE_SUB()",
      "DATE_FORMAT(date, '%Y-%m') for year-month grouping",
      "DATEDIFF(d1, d2) returns number of days between two dates",
      "TIMESTAMPDIFF(unit, d1, d2) for difference in specific units",
      "Consecutive days: self-join where DATEDIFF = 1, or ROW_NUMBER trick",
      "Gaps in dates: compare actual date with expected date using LAG/LEAD"
    ],
    "patterns": [
      { "title": "Date Arithmetic", "desc": "Add/subtract days, compare date ranges." },
      { "title": "Period Grouping", "desc": "GROUP BY year-month for monthly reporting." },
      { "title": "Consecutive Days", "desc": "Detect streaks and gaps in date sequences." }
    ],
    "problems": [
      {
        "id": "sql-date-0",
        "name": "Daily Leads and Partners",
        "difficulty": "Easy",
        "pattern": "GROUP BY Date",
        "url": "https://leetcode.com/problems/daily-leads-and-partners/",
        "company": "Expected in interviews",
        "hint": "GROUP BY date_id, make_name with COUNT(DISTINCT ...)"
      },
      {
        "id": "sql-date-1",
        "name": "The Number of Rich Customers",
        "difficulty": "Easy",
        "pattern": "Subquery + COUNT DISTINCT",
        "url": "https://leetcode.com/problems/the-number-of-rich-customers/",
        "company": "Expected in interviews",
        "hint": "COUNT(DISTINCT customer_id) WHERE amount > 500"
      },
      {
        "id": "sql-date-2",
        "name": "Active Users (Consecutive Login Days)",
        "difficulty": "Medium",
        "pattern": "Window + Date Gap",
        "url": "https://leetcode.com/problems/active-users/",
        "company": "Meta / Netflix",
        "hint": "ROW_NUMBER trick: login_date - ROW_NUMBER() gives same date for consecutive logins"
      },
      {
        "id": "sql-date-3",
        "name": "Monthly Revenue Growth (YoY)",
        "difficulty": "Medium",
        "pattern": "LAG + Date Grouping",
        "url": "https://datalemur.com/questions/yoy-growth-rate",
        "company": "Amazon / Google",
        "hint": "GROUP BY year, product; use LAG to get prev year revenue, compute growth %"
      },
      {
        "id": "sql-date-4",
        "name": "User Activity for Past 30 Days",
        "difficulty": "Medium",
        "pattern": "Date Range Filter",
        "url": "https://leetcode.com/problems/user-activity-for-the-past-30-days-i/",
        "company": "Expected in interviews",
        "hint": "DATEDIFF('2019-07-27', activity_date) < 30 AND >= 0, COUNT DISTINCT users"
      },
      {
        "id": "sql-date-5",
        "name": "Number of Calls Between Two Persons",
        "difficulty": "Medium",
        "pattern": "Normalize + GROUP BY",
        "url": "https://leetcode.com/problems/number-of-calls-between-two-persons/",
        "company": "Expected in interviews",
        "hint": "Use LEAST/GREATEST to normalize caller/callee pair, then GROUP BY and SUM"
      }
    ],
    "variations": [],
    "totalEasy": 2,
    "totalMed": 4,
    "totalHard": 0
  },
  {
    "id": "sql-case",
    "num": "09",
    "icon": "⚖️",
    "name": "CASE & Conditional Logic",
    "color": "#A3E635",
    "concepts": [
      "CASE WHEN condition THEN result ELSE default END — SQL's if-else",
      "Pivot with CASE: turn row values into columns using conditional aggregation",
      "SUM(CASE WHEN ... THEN 1 ELSE 0 END) for conditional counting",
      "COALESCE(a, b, c) returns first non-NULL value — great for defaults",
      "IF(condition, true_val, false_val) — MySQL shorthand for simple CASE",
      "Conditional aggregation avoids multiple subqueries — one pass through data"
    ],
    "patterns": [
      { "title": "Pivot / Unpivot", "desc": "Transform rows to columns or columns to rows." },
      { "title": "Conditional Count", "desc": "SUM(CASE) for category-wise counting in one query." },
      { "title": "Data Classification", "desc": "Bucket data into categories with CASE." }
    ],
    "problems": [
      {
        "id": "sql-case-0",
        "name": "Calculate Special Bonus",
        "difficulty": "Easy",
        "pattern": "CASE + MOD",
        "url": "https://leetcode.com/problems/calculate-special-bonus/",
        "company": "Expected in interviews",
        "hint": "CASE WHEN id % 2 = 1 AND name NOT LIKE 'M%' THEN salary ELSE 0 END"
      },
      {
        "id": "sql-case-1",
        "name": "Reformat Department Table",
        "difficulty": "Easy",
        "pattern": "Pivot with CASE",
        "url": "https://leetcode.com/problems/reformat-department-table/",
        "company": "Expected in interviews",
        "hint": "SUM(CASE WHEN month='Jan' THEN revenue END) AS Jan_Revenue per department"
      },
      {
        "id": "sql-case-2",
        "name": "Tree Node",
        "difficulty": "Medium",
        "pattern": "CASE + Subquery",
        "url": "https://leetcode.com/problems/tree-node/",
        "company": "Expected in interviews",
        "hint": "CASE WHEN p_id IS NULL THEN Root WHEN id IN (SELECT p_id...) THEN Inner ELSE Leaf"
      },
      {
        "id": "sql-case-3",
        "name": "Swap Salary",
        "difficulty": "Easy",
        "pattern": "CASE in UPDATE",
        "url": "https://leetcode.com/problems/swap-salary/",
        "company": "Expected in interviews",
        "hint": "UPDATE SET sex = CASE WHEN sex='m' THEN 'f' ELSE 'm' END"
      },
      {
        "id": "sql-case-4",
        "name": "Product Price at a Given Date",
        "difficulty": "Medium",
        "pattern": "CASE + Subquery + COALESCE",
        "url": "https://leetcode.com/problems/product-price-at-a-given-date/",
        "company": "Expected in interviews",
        "hint": "Find latest price change on or before date, COALESCE with 10 (default)"
      },
      {
        "id": "sql-case-5",
        "name": "Capital Gain/Loss",
        "difficulty": "Medium",
        "pattern": "Conditional SUM",
        "url": "https://leetcode.com/problems/capital-gainloss/",
        "company": "Expected in interviews",
        "hint": "SUM(CASE WHEN operation='Sell' THEN price ELSE -price END) per stock"
      }
    ],
    "variations": [],
    "totalEasy": 3,
    "totalMed": 3,
    "totalHard": 0
  },
  {
    "id": "sql-business",
    "num": "10",
    "icon": "💼",
    "name": "Interview Business Problems",
    "color": "#84CC16",
    "concepts": [
      "Customer retention: find users active in consecutive months",
      "Churn analysis: users who were active but stopped — compare month M with M+1",
      "Conversion funnel: track users across steps using conditional joins",
      "Top N per group: use ROW_NUMBER/DENSE_RANK OVER(PARTITION BY group ORDER BY metric)",
      "Gaps and islands: group consecutive values using id - ROW_NUMBER() trick",
      "Rolling averages: SUM/AVG with ROWS BETWEEN frame clause",
      "Percentile/Median: use PERCENTILE_CONT or ROW_NUMBER-based approach"
    ],
    "patterns": [
      { "title": "Retention & Churn", "desc": "Track user engagement over time periods." },
      { "title": "Gaps & Islands", "desc": "Group consecutive sequences in data." },
      { "title": "Top-N per Group", "desc": "Rank within partitions and filter top results." }
    ],
    "problems": [
      {
        "id": "sql-biz-0",
        "name": "Products Never Sold",
        "difficulty": "Easy",
        "pattern": "Anti-JOIN",
        "url": "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/",
        "company": "Amazon",
        "hint": "LEFT JOIN Visits with Transactions WHERE transaction_id IS NULL"
      },
      {
        "id": "sql-biz-1",
        "name": "Top Travellers",
        "difficulty": "Easy",
        "pattern": "LEFT JOIN + SUM",
        "url": "https://leetcode.com/problems/top-travellers/",
        "company": "Expected in interviews",
        "hint": "LEFT JOIN Users with Rides, SUM distance, COALESCE for 0, ORDER BY DESC"
      },
      {
        "id": "sql-biz-2",
        "name": "Customer Retention (Consecutive Months)",
        "difficulty": "Medium",
        "pattern": "Self-JOIN on Month",
        "url": "https://datalemur.com/questions/card-launch-success",
        "company": "Meta / Netflix",
        "hint": "JOIN same user in month M and M+1; retained = present in both"
      },
      {
        "id": "sql-biz-3",
        "name": "Most Active Users",
        "difficulty": "Medium",
        "pattern": "GROUP BY + ORDER BY COUNT",
        "url": "https://datalemur.com/questions/supercloud-customer",
        "company": "Microsoft / Meta",
        "hint": "COUNT products per customer, filter those who bought from ALL categories"
      },
      {
        "id": "sql-biz-4",
        "name": "Odd and Even Transactions",
        "difficulty": "Medium",
        "pattern": "Conditional SUM + GROUP BY",
        "url": "https://leetcode.com/problems/odd-and-even-transactions/",
        "company": "Expected in interviews",
        "hint": "SUM(CASE WHEN amount % 2 = 1 THEN amount ELSE 0 END) per day"
      },
      {
        "id": "sql-biz-5",
        "name": "List the Products Ordered in a Period",
        "difficulty": "Easy",
        "pattern": "Date Filter + GROUP BY",
        "url": "https://leetcode.com/problems/list-the-products-ordered-in-a-period/",
        "company": "Expected in interviews",
        "hint": "Filter February 2020, GROUP BY product, HAVING SUM(unit) >= 100"
      },
      {
        "id": "sql-biz-6",
        "name": "Sending vs. Opening Snaps",
        "difficulty": "Medium",
        "pattern": "Conditional Aggregation",
        "url": "https://datalemur.com/questions/time-spent-snaps",
        "company": "Snapchat",
        "hint": "SUM(CASE WHEN activity = 'open' THEN time ELSE 0 END) / total_time * 100"
      }
    ],
    "variations": [],
    "totalEasy": 3,
    "totalMed": 4,
    "totalHard": 0
  },
  {
    "id": "sql-faang",
    "num": "11",
    "icon": "🏆",
    "name": "FAANG-Level Problems",
    "color": "#65A30D",
    "concepts": [
      "Combine multiple advanced techniques: CTEs + window functions + conditional aggregation",
      "Think in terms of data transformations: raw → aggregated → ranked → filtered",
      "Optimization: avoid correlated subqueries when window functions work",
      "Edge cases: empty results, ties in ranking, NULL propagation in aggregates",
      "Real interview approach: clarify schema, write step-by-step, test with edge cases",
      "Time complexity matters: avoid O(n²) self-joins when O(n) window functions exist"
    ],
    "patterns": [
      { "title": "Multi-technique", "desc": "Combine CTEs, window functions, and conditional logic." },
      { "title": "Optimization", "desc": "Replace correlated subqueries with efficient alternatives." },
      { "title": "Edge Case Handling", "desc": "Handle NULLs, ties, and empty results gracefully." }
    ],
    "problems": [
      {
        "id": "sql-faang-0",
        "name": "Movie Rating (Union + Window + Aggregation)",
        "difficulty": "Medium",
        "pattern": "UNION ALL + Window",
        "url": "https://leetcode.com/problems/movie-rating/",
        "company": "Amazon / Netflix",
        "hint": "Two separate queries UNIONed: most active reviewer + highest avg rated movie in Feb"
      },
      {
        "id": "sql-faang-1",
        "name": "15 Days of Learning SQL",
        "difficulty": "Hard",
        "pattern": "CTE + Window + Subquery",
        "url": "https://www.hackerrank.com/challenges/15-days-of-learning-sql/problem",
        "company": "IBM / FAANG",
        "hint": "Need running count of unique days per hacker and the daily max submitter"
      },
      {
        "id": "sql-faang-2",
        "name": "Server Utilization Time",
        "difficulty": "Hard",
        "pattern": "LEAD + Date Diff + SUM",
        "url": "https://datalemur.com/questions/total-server-utilization",
        "company": "Amazon",
        "hint": "Use LEAD/LAG to pair 'start' and 'stop' events, then sum the differences"
      },
      {
        "id": "sql-faang-3",
        "name": "Projects (Gaps & Islands)",
        "difficulty": "Medium",
        "pattern": "CTE + ROW_NUMBER logic",
        "url": "https://www.hackerrank.com/challenges/projects/problem",
        "company": "Google / Meta",
        "hint": "End_Date - ROW_NUMBER() creates groups for consecutive days (Islands)"
      },
      {
        "id": "sql-faang-4",
        "name": "New Users Daily Count",
        "difficulty": "Medium",
        "pattern": "Subquery + GROUP BY",
        "url": "https://leetcode.com/problems/new-users-daily-count/",
        "company": "Meta",
        "hint": "First login per user (MIN), filter last 90 days, GROUP BY date"
      }
    ],
    "variations": [],
    "totalEasy": 0,
    "totalMed": 2,
    "totalHard": 3
  }
];
