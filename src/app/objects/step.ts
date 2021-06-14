export interface Step {
    episode: number;
    steps: number;
    X: number;
    Y: number;
    yaw: number;
    steer: number;
    throttle: number;
    action: number;
    reward: number;
    done: boolean;
    all_wheels_on_track: boolean;
    progress: number;
    episode_status: 'prepare' | 'in_progress';
    closest_waypoint: number;
    track_len: number;
    tstamp: number;
    pause_duration: number;
}
