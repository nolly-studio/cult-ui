"use client"

type IconKey = "phone" | "compass" | "desktop" | "chrome"

const icons: Record<IconKey, React.ReactNode> = {
  phone: (
    <svg
      aria-hidden="true"
      focusable="false"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 0C3.73122 0 2.5 1.23122 2.5 2.75V13.25C2.5 14.7688 3.73122 16 5.25 16H10.75C12.2688 16 13.5 14.7688 13.5 13.25V2.75C13.5 1.23122 12.2688 0 10.75 0H5.25ZM4 2.75C4 2.05964 4.55964 1.5 5.25 1.5H10.75C11.4404 1.5 12 2.05964 12 2.75V13.25C12 13.9404 11.4404 14.5 10.75 14.5H5.25C4.55964 14.5 4 13.9404 4 13.25V2.75ZM6.25 4.75C6.80228 4.75 7.25 4.30228 7.25 3.75C7.25 3.19772 6.80228 2.75 6.25 2.75C5.69772 2.75 5.25 3.19772 5.25 3.75C5.25 4.30228 5.69772 4.75 6.25 4.75Z"
      />
    </svg>
  ),
  compass: (
    <svg
      aria-hidden="true"
      focusable="false"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM12.5925 3.40746L8.75908 4.93074L6.01936 6.0194L4.9307 8.75912L3.40742 12.5926L7.24089 11.0693L9.9806 9.98064L11.0693 7.24092L12.5925 3.40746ZM9.25 8C9.25 8.69036 8.69036 9.25 8 9.25C7.30964 9.25 6.75 8.69036 6.75 8C6.75 7.30964 7.30964 6.75 8 6.75C8.69036 6.75 9.25 7.30964 9.25 8Z"
      />
    </svg>
  ),
  desktop: (
    <svg
      aria-hidden="true"
      focusable="false"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2C0 1.44772 .447715 1 1 1H15C15.5523 1 16 1.44772 16 2V10.5C16 11.0523 15.5523 11.5 15 11.5H8.75V14.5H9.75H10.5V16H9.75H6.25H5.5V14.5H6.25H7.25V11.5H1C.447714 11.5 0 11.0523 0 10.5V2ZM1.5 2.5V10H14.5V2.5H1.5Z"
      />
    </svg>
  ),
  chrome: (
    <svg
      aria-hidden="true"
      focusable="false"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.53216 11.3333L6.77086 14.3839C3.76871 13.8094 1.5 11.1696 1.5 8C1.5 6.86643 1.79018 5.80063 2.3003 4.87284L5.006 9.55925C5.56913 10.6383 6.69854 11.375 8 11.375C8.18107 11.375 8.35881 11.3607 8.53216 11.3333ZM10.8505 9.80787L8.14234 14.4985C11.6665 14.4228 14.5 11.5423 14.5 8C14.5 7.2549 14.3746 6.53909 14.1438 5.8725L10.6201 5.8725C11.0921 6.45305 11.375 7.19349 11.375 8C11.375 8.66509 11.1826 9.28525 10.8505 9.80787ZM8.13109 4.6275L13.5577 4.6275C12.4175 2.7524 10.355 1.5 8 1.5C6.0376 1.5 4.27831 2.36964 3.08649 3.74456L4.84694 6.79376C5.33242 5.52553 6.56104 4.625 8 4.625C8.0439 4.625 8.0876 4.62584 8.13109 4.6275ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM5.875 8C5.875 6.8264 6.8264 5.875 8 5.875C9.1736 5.875 10.125 6.8264 10.125 8C10.125 9.1736 9.1736 10.125 8 10.125C6.8264 10.125 5.875 9.1736 5.875 8Z"
      />
    </svg>
  ),
}

function getPravatarUrl(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(i)
    hash |= 0
  }
  const id = (Math.abs(hash) % 70) + 1
  return `https://i.pravatar.cc/48?img=${id}`
}

function Avatar({
  name,
  color,
  size = 24,
}: {
  name: string
  color: string
  size?: number
}) {
  return (
    <div
      data-slot="collab-avatar"
      title={name}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.5px solid ${color}66`,
        overflow: "hidden",
        flexShrink: 0,
        background: "var(--card)",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: This decorative illustration intentionally uses a plain img. */}
      <img
        src={getPravatarUrl(name)}
        alt={name}
        width={size}
        height={size}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  )
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      data-slot="collab-code"
      style={{
        background: "var(--muted)",
        color: "var(--foreground)",
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: 13,
        fontFamily:
          '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      {children}
    </code>
  )
}

export function CommentBubble({
  user,
  color,
  deviceIcons = [],
  children,
  cursor,
}: {
  user: string
  color: string
  deviceIcons?: IconKey[]
  children: React.ReactNode
  cursor?: React.ReactNode
}) {
  return (
    <div
      data-slot="collab-comment-bubble"
      style={{
        position: "relative",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "14px 16px",
        boxShadow:
          "0 1px 2px rgb(0 0 0 / 0.16), 0 10px 28px rgb(0 0 0 / 0.24), 0 0 0 1px color-mix(in oklab, var(--border) 60%, transparent)",
        maxWidth: 300,
        fontFamily: '"Geist", Arial, sans-serif',
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        data-slot="collab-comment-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar name={user} color={color} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            {user}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            color: "var(--muted-foreground)",
          }}
        >
          {deviceIcons.map((icon) => (
            <span key={icon} style={{ display: "flex" }}>
              {icons[icon]}
            </span>
          ))}
        </div>
      </div>
      <div
        data-slot="collab-comment-content"
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--muted-foreground)",
        }}
      >
        {children}
      </div>
      {cursor}
    </div>
  )
}

export function CommentBubbleDemo() {
  return (
    <CommentBubble
      user="Jane"
      color="#000"
      deviceIcons={["desktop", "chrome", "phone"]}
    >
      Can we ship this behind <Code>beta</Code> first and roll out to everyone
      next week?
    </CommentBubble>
  )
}
