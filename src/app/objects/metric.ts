export class Metric {
    reward_score: number;
    metric_time: number;
    start_time: number;
    elapsed_time_in_milliseconds: number;
    episode: number;
    trial: number;
    phase: 'training' | 'evaluation';
    completion_percentage: number;
    episode_status: string;
}
