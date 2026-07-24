export type DashboardTrend =
    | 'increase'
    | 'decrease'
    | 'neutral';

interface GrowthResult {
    growth: number;
    trend: DashboardTrend;
}

export function calculateGrowth(
    current: number,
    previous: number,
): GrowthResult {
    if (previous === 0) {
        return {
            growth: current > 0 ? 100 : 0,
            trend: current > 0 ? 'increase' : 'neutral',
        };
    }

    const percentage =
        ((current - previous) / previous) * 100;

    const growth = Number(
        percentage.toFixed(1),
    );

    let trend: DashboardTrend = 'neutral';

    if (growth > 0) {
        trend = 'increase';
    } else if (growth < 0) {
        trend = 'decrease';
    }

    return {
        growth: Math.abs(growth),
        trend,
    };
}