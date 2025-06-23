// src/utils/userTiers.ts
export interface Tier {
    name: string
    minPercentile: number  // inclusive
    maxPercentile: number  // exclusive, except for the top bracket
}

export const USER_TIERS: Tier[] = [
    { name: 'Legendary', minPercentile: 99, maxPercentile: 100 },
    { name: 'Elite', minPercentile: 95, maxPercentile: 99 },
    { name: 'Veteran', minPercentile: 90, maxPercentile: 95 },
    { name: 'Contributor', minPercentile: 75, maxPercentile: 90 },
    { name: 'Member', minPercentile: 50, maxPercentile: 75 },
    { name: 'Enthusiast', minPercentile: 25, maxPercentile: 50 },
    { name: 'Novice', minPercentile: 10, maxPercentile: 25 },
    { name: 'Initiate', minPercentile: 0, maxPercentile: 10 },
]

/**
 * Given a percentile (0–100), returns the matching Tier.
 * If percentile === 100, falls into Legendary.
 */
export function getUserTier(percentile: number): Tier {
    // Clamp to [0,100]
    const p = Math.min(100, Math.max(0, percentile))

    // Find first matching tier
    for (const tier of USER_TIERS) {
        // Handle top bracket inclusive of 100
        if (tier.minPercentile <= p && (p < tier.maxPercentile || (tier.maxPercentile === 100 && p === 100))) {
            return tier
        }
    }

    // Fallback (should never happen)
    return USER_TIERS[USER_TIERS.length - 1]
}
