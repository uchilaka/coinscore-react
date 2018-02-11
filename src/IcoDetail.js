import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Button,
    Icon
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

    return (
        <Modal size="small" open={true}
            closeIcon={'window close'}
            onClose={() => {
                // clear selected ICO
                dispatch(userHasSelectedIco(null));
            }}>
            <Modal.Header><IcoHeadline data={selected} /></Modal.Header>
            <Modal.Content></Modal.Content>
            <Modal.Actions>
                <Button basic as="a" href={`http://${selected.whitepaper_link}`} target="_blank">
                    <Icon name="newspaper" /> White Paper
                </Button>
                <Button positive>Chat with an Adviser</Button>
            </Modal.Actions>
        </Modal>
    );
}
IcoDetailModal.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default IcoDetailModal;