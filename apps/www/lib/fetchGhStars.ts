// This is a SERVER component (no hooks needed)

async function getStars(): Promise<string> {
  const res = await fetch("https://api.github.com/repos/nolly-studio/cult-ui", {
    // Cache for 1 hour (3600 seconds)
    next: { revalidate: 3600 },
  })

  const data = await res.json()
  const count = data.stargazers_count

  if (count >= 1_000_000)
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  if (count >= 1_000)
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "k"
  return count.toString()
}

export async function ghStars() {
  const stars = await getStars()
  return stars
}

// export default async function GitHubStars() {

//   return <div>⭐ GitHub Stars: {stars}</div>
// }
