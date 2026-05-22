const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql'

const QUERY = `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
    questions: data {
      frontendQuestionId: questionFrontendId
      title
      titleSlug
      difficulty
    }
  }
}
`

interface LeetCodeQuestion {
  frontendQuestionId: string | number;
  title: string;
  titleSlug: string;
  difficulty: string;
}

declare const Deno: any;

Deno.serve(async (req: Request) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { problemNumber } = await req.json()
    const num = parseInt(problemNumber, 10)

    if (!num || num < 1) {
      return new Response(
        JSON.stringify({ found: false, error: 'Invalid problem number.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const response = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          categorySlug: '',
          skip: 0,
          limit: 1,
          filters: { searchKeywords: String(num) },
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`LeetCode responded with ${response.status}`)
    }

    const result = await response.json()
    const questions: LeetCodeQuestion[] = result?.data?.problemsetQuestionList?.questions || []
    const match = questions.find((q: LeetCodeQuestion) => String(q.frontendQuestionId) === String(num))

    if (!match) {
      return new Response(
        JSON.stringify({ found: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    return new Response(
      JSON.stringify({
        found: true,
        title: match.title,
        difficulty: match.difficulty,
        slug: match.titleSlug,
        url: `https://leetcode.com/problems/${match.titleSlug}/`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err)
    return new Response(
      JSON.stringify({ found: false, error: errMsg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})

