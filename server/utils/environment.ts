import type { H3Event } from 'h3'

function getCloudflareBinding(event: H3Event, name: string): string | undefined {
  const platform = event.context._platform
  const cloudflare = platform && typeof platform === 'object' && 'cloudflare' in platform
    ? platform.cloudflare
    : event.context.cloudflare
  if (!cloudflare || typeof cloudflare !== 'object' || !('env' in cloudflare)) return

  const bindings = cloudflare.env
  if (!bindings || typeof bindings !== 'object' || !(name in bindings)) return

  const value = bindings[name]
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

export function getServerEnvironmentValue(
  event: H3Event,
  runtimeValue: unknown,
  ...names: string[]
): string | undefined {
  if (typeof runtimeValue === 'string' && runtimeValue.length > 0) return runtimeValue

  for (const name of names) {
    const binding = getCloudflareBinding(event, name)
    if (binding) return binding

    const environmentValue = typeof process === 'undefined' ? undefined : process.env[name]
    if (environmentValue) return environmentValue
  }
}
