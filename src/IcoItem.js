import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    //Icon,
    Label,
    Popup,
    Button,
    Table, Header
} from 'semantic-ui-react';
import { Line, LineChart } from 'recharts';
import numeral from 'numeral';
import moment from 'moment';

// More on using this icon library: http://wmira.github.io/react-icons-kit/
import { KitIcon } from './Icons';
//import { ic_trending_flat, ic_trending_up, ic_trending_down } from 'react-icons-kit/md';

import IcoHeadline from './IcoHeadline';
import { loadTrendingIcon } from './utils';

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

var IcoListTable = (props) => {
    const { list, dispatch } = props;
    console.info('Props -> @Draft2IcoListItems', props);
    if (!list) return null;

    const li = list.map(data => {
        return (
            <Table.Row key={data.key}>
                <Table.Cell singleLine>
                    <Popup inverted position="bottom center" trigger={<Label color="orange" size="big" className="badge" content={data.team_rating} />} content={<div>Our Score</div>} />
                </Table.Cell>
                <Table.Cell>
                    <Header as='h4'>
                        <Header.Content>
                            {data.name}
                            <Header.Subheader>
                                <Popup inverted position="bottom center"
                                    trigger={<span>{data.team}</span>} content={<div>ICO Team</div>} />
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Popup inverted position="bottom center"
                        trigger={<span>{numeral(data.coins_issued).format('0.0a')}</span>}
                        content={<div># of Coins issued</div>} />
                </Table.Cell>
                <Table.Cell>
                    <KitIcon icon={loadTrendingIcon(data.trend)} />
                </Table.Cell>
                <Table.Cell>
                    <Popup inverted position="bottom center"
                        trigger={<span>{moment(data.ico_date).fromNow()}</span>} content={<div>ICO Date</div>} />
                </Table.Cell>
                <Table.Cell>
                    <LineChart width={200} height={50} data={data.stats}>
                        <Line type='monotone' dataKey='amount' stroke='#8884d8' strokeWidth={2} />
                    </LineChart>
                </Table.Cell>
                <Table.Cell><Button icon="expand" size="mini" basic onClick={() => dispatch(userHasSelectedIco(data))} /></Table.Cell>
            </Table.Row>
        );
    });

    // "sortable" attribute won't work because of complex elements 
    return (
        <Table basic="very">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Score</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell># Issued</Table.HeaderCell>
                    <Table.HeaderCell>Trending</Table.HeaderCell>
                    <Table.HeaderCell>ICO Date</Table.HeaderCell>
                    <Table.HeaderCell>Mkt Cap Trend Chart</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>{li}</Table.Body>
        </Table>
    );

}

//export default IcoListItems;

export default IcoListTable;