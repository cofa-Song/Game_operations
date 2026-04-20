import { ApiResponse } from '@/types'
import { WhitelistEntry, CreateWhitelistRequest, UpdateWhitelistRequest } from '@/types/whitelist'
import { mockWhitelist } from '@/mocks/whitelist'

const delay = (ms = 200) => new Promise(res => setTimeout(res, ms))

// Very small IPv4 CIDR helper (supports single IP or a.b.c.d/n)
function ipToInt(ip: string) {
  if (typeof ip !== 'string') return null
  const parts = ip.split('.').map(s => parseInt(s, 10))
  if (parts.length !== 4 || parts.some(isNaN)) return null
  return ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3]
}

function cidrContains(cidr: string, ip: string) {
  if (!cidr) return false
  if (cidr.indexOf('/') === -1) {
    return cidr === ip
  }
  const [net, prefixStr] = cidr.split('/')
  const prefix = parseInt(prefixStr || '32', 10)
  const ipInt = ipToInt(ip)
  const netInt = ipToInt(net)
  if (ipInt === null || netInt === null) return false
  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0
  return (ipInt & mask) === (netInt & mask)
}

export const whitelistApi = {
  async list(): Promise<ApiResponse<WhitelistEntry[]>> {
    await delay()
    return { code: 0, msg: 'success', data: mockWhitelist }
  },

  async create(req: CreateWhitelistRequest): Promise<ApiResponse<WhitelistEntry>> {
    await delay()
    const id = `W${Math.floor(Math.random() * 100000)}`
    const now = new Date().toISOString()
    const entry: WhitelistEntry = {
      id,
      cidr: req.cidr,
      remark: req.remark,
      enabled: req.enabled === undefined ? true : req.enabled,
      created_at: now,
      updated_at: now
    }
    mockWhitelist.unshift(entry)
    return { code: 0, msg: 'success', data: entry }
  },

  async update(id: string, req: UpdateWhitelistRequest, currentClientIp?: string): Promise<ApiResponse<void>> {
    await delay()
    const idx = mockWhitelist.findIndex(x => x.id === id)
    if (idx === -1) return { code: 404, msg: 'Not found' }

    // Prevent self-lock: if currentClientIp provided and this update would disable the last matched rule for that ip, block
    if (currentClientIp && req.enabled === false) {
      // compute enabled entries after this update
      const simulated = mockWhitelist.map((e, i) => ({ ...e, ...(i === idx ? { ...e, ...req } : e) }))
      const matched = simulated.some(e => e.enabled && cidrContains(e.cidr, currentClientIp))
      if (!matched) return { code: 403, msg: 'Operation would lock out current IP' }
    }

    mockWhitelist[idx] = { ...mockWhitelist[idx], ...req, updated_at: new Date().toISOString() }
    return { code: 0, msg: 'success' }
  },

  async remove(id: string, currentClientIp?: string): Promise<ApiResponse<void>> {
    await delay()
    const idx = mockWhitelist.findIndex(x => x.id === id)
    if (idx === -1) return { code: 404, msg: 'Not found' }

    // Prevent self-lock: if entry to be removed matches currentClientIp and it's the last enabled, block
    if (currentClientIp && cidrContains(mockWhitelist[idx].cidr, currentClientIp) && mockWhitelist[idx].enabled) {
      const others = mockWhitelist.filter((e, i) => i !== idx && e.enabled)
      const matchedOther = others.some(e => cidrContains(e.cidr, currentClientIp))
      if (!matchedOther) return { code: 403, msg: 'Cannot remove last rule matching your current IP' }
    }

    mockWhitelist.splice(idx, 1)
    return { code: 0, msg: 'success' }
  },

  // Utility: check if IP is allowed (used by middleware in real system)
  async isAllowed(ip: string): Promise<ApiResponse<{ allowed: boolean }>> {
    await delay()
    const allowed = mockWhitelist.some(e => e.enabled && cidrContains(e.cidr, ip))
    return { code: 0, msg: 'success', data: { allowed } }
  }
}
