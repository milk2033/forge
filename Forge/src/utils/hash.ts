// src/utils/hash.ts

/** 
 * Simple 32-bit string hash (FNV-1a variant), returns an 8-char hex string 
 */
export function usernameHash(username: string): string {
    let hash = 0x811c9dc5  // FNV offset basis
    for (let i = 0; i < username.length; i++) {
        hash ^= username.charCodeAt(i)
        hash = Math.imul(hash, 0x01000193) >>> 0  // FNV prime
    }
    // to 8-digit hex (pad leading zeros)
    return hash.toString(16).padStart(8, '0')
}

/**
 * Compute SHA-256 of a string, return as 64-char hex.
 */
export async function sha256Hex(input: string): Promise<string> {
    const data = new TextEncoder().encode(input)
    const digest = await crypto.subtle.digest('SHA-256', data)
    const bytes = Array.from(new Uint8Array(digest))
    return bytes.map(b => b.toString(16).padStart(2, '0')).join('')
}
