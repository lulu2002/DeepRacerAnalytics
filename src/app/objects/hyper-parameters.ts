export interface HyperParameters {
    batch_size: number;
    beta_entropy: number;
    discount_factor: number;
    e_greedy_value: number;
    epsilon_steps: number;
    exploration_type: string;
    loss_type: string;
    lr: number;
    num_episodes_between_training: number;
    num_epochs: number;
    stack_size: number;
    term_cond_avg_score: number;
    term_cond_max_episodes: number;
}
