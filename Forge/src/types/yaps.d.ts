// src/types/yaps.d.ts

/**
 * Response payload for a user's Yaps score from Kaito's API.
 */
export interface YapsResponse {
    /** The user's ID */
    user_id: string;

    /** The user's username */
    username: string;

    /** Yaps score for all time */
    yaps_all: number;

    /** Yaps score for last 3 months */
    yaps_l3m: number;

    /** Yaps score for last 6 months */
    yaps_l6m: number;

    /** Yaps score for last 7 days */
    yaps_l7d: number;

    /** Yaps score for last 12 months */
    yaps_l12m: number;

    /** Yaps score for last 24 hours */
    yaps_l24h: number;

    /** Yaps score for last 30 days */
    yaps_l30d: number;

    /** Yaps score for last 48 hours */
    yaps_l48h: number;
}
