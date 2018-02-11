import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Button,
    Icon, Table
} from 'semantic-ui-react';

import {
    // action creator(s)
    userHasSelectedIco
} from './redux/factory';
import IcoHeadline from './IcoHeadline';

// static component
var IcoDetailModal = (props) => {
    const { selected, dispatch } = props;
    if (!selected) return null;

    // get fields 
    const fields = Object.keys(selected);

    const staticFields = ["team_market_percent", "ico_date", "vertical", "team", "team_rating", "needs_blockchain", "countries_ico_available", "scam_sale_probability", "smart_money_investors", "mining_difficulty", "arbitrage_activity", "created_at", "updated_at", "name", "link_to_wp", "number_of_coins_issued", "coin_release_date", "whitepaper_link", "coins_issued", "coin_image", "logo", "key", "trend"];

    console.log(`Field list -> ${fields.map((field) => `"${field}"`).join(',')}`);

    return (
        <Modal size="small" open={true}
            closeIcon={'window close'}
            onClose={() => {
                // clear selected ICO
                dispatch(userHasSelectedIco(null));
            }}>
            <Modal.Header><IcoHeadline data={selected} /></Modal.Header>
            <Modal.Content style={{ padding: 0 }}>

                <Table basic striped attached>
                    <Table.Body>
                        {staticFields.map((field, at) => {
                            const value = selected[field];
                            //console.warn(`Rendering -> (${typeof value})`, selected[field]);
                            if (!value) return null;

                            return (
                                <Table.Row key={at}>
                                    <Table.Cell>{field}</Table.Cell>
                                    <Table.Cell><span>{selected[field]}</span></Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>

            </Modal.Content>
            <Modal.Actions>
                <Button basic as="a" href={`http://${selected.whitepaper_link}`} target="_blank">
                    <Icon name="newspaper" /> White Paper
                </Button>
                <Button positive><Icon name="chat" /> Ask a Question</Button>
            </Modal.Actions>
        </Modal>
    );
}
IcoDetailModal.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default IcoDetailModal;