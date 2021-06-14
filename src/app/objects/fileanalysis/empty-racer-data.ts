import {RacerData} from './racer-data';
import {EnvironmentInfo} from '../environment-info';
import {HyperParameters} from '../hyper-parameters';

export class EmptyRacerData extends RacerData {
    constructor() {
        super([], emptyHyper, [], [], emptyEnvironment, 'TRAINING');
    }
}

const emptyEnvironment = new EnvironmentInfo('reinvent_base', 'Empty', 'Empty');
const emptyHyper: HyperParameters = {
    batch_size: -1,
    beta_entropy: -1,
    discount_factor: -1,
    e_greedy_value: -1,
    epsilon_steps: -1,
    exploration_type: '',
    loss_type: '',
    lr: -1,
    num_episodes_between_training: -1,
    num_epochs: -1,
    stack_size: -1,
    term_cond_avg_score: -1,
    term_cond_max_episodes: -1,
};
