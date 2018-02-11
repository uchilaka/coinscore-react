import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    //Icon,
    //Label,
    Popup,
    Button
} from 'semantic-ui-react';
import { Line, LineChart } from 'recharts';
//import numeral from 'numeral';
import moment from 'moment';

// More on using this icon library: http://wmira.github.io/react-icons-kit/
//import { KitIcon } from './Icons';
//import {ic_trending_flat, ic_trending_up, ic_trending_down} from 'react-icons-kit/md';

import IcoHeadline from './IcoHeadline';

//import ReactIntl from 'react-intl';

import { userHasSelectedIco } from './redux/factory';

var IcoListItems = (props) => {
    const { list, dispatch } = props;
    console.info('Props -> @Draft2IcoListItems', props);
    if (!list) return null;

    const li = list.map(ico => {
        return (
            <List.Item key={ico.key}>

                <List.Content floated="right">

                    <LineChart width={200} height={50} data={ico.stats}>
                        <Line type='monotone' dataKey='amount' stroke='#8884d8' strokeWidth={2} />
                    </LineChart>
                    {/* 
                    <a href={`http://${ico.whitepaper_link}`} target="_blank">
                        <Icon name="newspaper" />
                    </a>
                    */}
                </List.Content>
                <List.Content>
                    {/* More about using the number formattter: http://numeraljs.com/ */}
                    <List.Header as="h2">
                        <IcoHeadline data={ico} />
                        <Button icon="expand" size="mini" basic onClick={() => dispatch(userHasSelectedIco(ico))} />
                    </List.Header>

                    <Popup inverted position="bottom center" trigger={<strong>{ico.team}</strong>} content={<div>ICO Team</div>} />
                    &nbsp;<Popup inverted position="bottom center" trigger={<span>{moment(ico.ico_date).fromNow()}</span>} content={<div>ICO Date</div>} />

                </List.Content>
            </List.Item>
        );
    });
    return (
        <List size="huge" divided verticalAlign={'middle'}>{li}</List>
    );
}
IcoListItems.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default IcoListItems;