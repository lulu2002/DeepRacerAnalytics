export type TrainingType = 'TRAINING' | 'EVALUATION';
export type RaceType = 'TIME_TRIAL' | 'OBJECT_AVOIDANCE' | 'HEAD_TO_HEAD_RACING';
export type SensorType = 'FRONT_FACING_CAMERA' | 'STEREO_CAMERAS' | 'LIDAR';


export type AnalysisState =
    'WAITING' |
    'UPLOADING' |
    'PARSING' |
    'ANALYSING' |
    'LOADING_TRACK' |
    'DONE';
