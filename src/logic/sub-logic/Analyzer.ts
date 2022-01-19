import AnalyticReader from '../readers/analytic-reader';
import AnalysisResult from '../data-objects/AnalysisResult';
import Step from '../data-objects/Step';
import Episode from '../data-objects/Episode';

class Analyzer {

    analyze(reader: AnalyticReader): AnalysisResult {

        const steps = reader.readSteps();

        return {
            steps,
            actionSpaces: reader.readActionSpaces(),
            episodes: this.toEpisodes(steps),
            environmentInfo: reader.readEnvironment(),
            hyperParams: reader.readHyperParams()
        };
    }


    private toEpisodes(steps: Step[]): Episode[] {
        const episodes: Episode[] = [];
        let temp: Step[] = [];

        let currentEpisode = 0;

        steps.forEach((step, index) => {

            if (index + 1 === steps.length) {
                episodes.push(this.makeEpisode(temp));
                temp.push(step);
                return;
            }

            if (step.episode !== currentEpisode) {
                episodes.push(this.makeEpisode(temp));
                temp = [];
                currentEpisode = step.episode;
            }

            temp.push(step);
        });

        return episodes;
    }

    private makeEpisode(steps: Step[]): Episode {
        return {
            steps
        };
    }

}

export default Analyzer;
