import React from 'react';
import { loadTrendingIcon } from './utils';
// More on using this icon library: http://wmira.github.io/react-icons-kit/
import { KitIcon } from './Icons';
import {
    ic_note
} from 'react-icons-kit/md';
import numeral from 'numeral';

//import moment from 'moment';

var IcoHeadlineComponent = (props) => {
    const { data } = props;
    if (!data) return null;
    return (
        <span>
            <KitIcon icon={loadTrendingIcon(data.trend)} /> &nbsp;
            {data.name}
            <KitIcon icon={ic_note} /> {numeral(data.coins_issued).format('0.0a')}
            &nbsp;
        </span>
    );
};
export default IcoHeadlineComponent;