// More on using this icon library: http://wmira.github.io/react-icons-kit/
//import { KitIcon } from './Icons';
import {
    ic_trending_flat, ic_trending_up, ic_trending_down
} from 'react-icons-kit/md';

export const loadTrendingIcon = (trend) => {
    switch (trend) {
        case 'up':
            return ic_trending_up;

        case 'down':
            return ic_trending_down;

        default:
            return ic_trending_flat;
    }
};