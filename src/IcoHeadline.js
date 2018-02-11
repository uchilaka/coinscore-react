import React from 'react';
import { Popup, Label } from 'semantic-ui-react';
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
            {data.name} <Popup inverted position="bottom center" trigger={<Label color="orange" size="big" className="badge" content={data.team_rating} />} content={<div>Our Score</div>} />
            <Popup inverted position="bottom center" trigger={<span><KitIcon icon={ic_note} /> {numeral(data.coins_issued).format('0.0a')}</span>} content={<div># of Coins issued</div>} />
            &nbsp;
        </span>
    );
};
export default IcoHeadlineComponent;