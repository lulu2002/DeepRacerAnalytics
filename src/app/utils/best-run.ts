import {SortType} from '../objects/sorts/sort-type';
import Episode from '../../logic/data-objects/Episode';
import Step from '../../logic/data-objects/Step';
import Metric from '../../logic/data-objects/Metric';

export class BestEpisode {
    public static sortEpisodes(runs: Episode[], sortType: SortType): Episode[] {
        runs = runs.filter(value => value.getLastStep().progress !== undefined);
        runs = sortType.sort(runs);

        return runs;
    }

    public static splitEpisodes(steps: Step[], metrics: Metric[]): Episode[] {
        const runs: Episode[] = [];
        let temp: Step[] = [];

        let currentEpisode = 0;

        steps.forEach((step, index) => {

            if (index + 1 === steps.length) {
                runs.push(new Episode(temp, metrics[step.episode]));
                temp.push(step);
                return;
            }

            if (step.episode !== currentEpisode) {
                runs.push(new Episode(temp, metrics[step.episode]));
                temp = [];
                currentEpisode = step.episode;
            }

            temp.push(step);
        });

        return runs;
    }

}
