import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { PortalWithState, Portal } from 'react-portal';
import { Container, Row, Col } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import TextScramble from '../utils/TextScramble'
import Fireworks from 'fireworks-canvas'

const KEYCODES = {
    ESCAPE: 27
};

class RaffleWinnerPortal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: true
        }
        this.closePortal = this.closePortal.bind(this)
        this.handleKeydown = this.handleKeydown.bind(this)
    }

    componentDidMount() {
        const { firstName, lastName } = this.props
        document.addEventListener('keydown', this.handleKeydown);
        new TextScramble(this.scramblerNode).setText(`${firstName} ${lastName}`).then(() => {
            this.fireworks = new Fireworks(this.fireworksNode)
            this.fireworks.start()
        })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
    }

    closePortal() {
        this.fireworks.stop()
        this.setState({ active: false });
    }

    handleKeydown(e) {
        if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
            this.closePortal();
        }
    }
    componentWillReceiveProps(nextProps) {
        const { firstName, lastName } = this.props
        if (nextProps.firstName !== firstName || nextProps.lastName !== lastName) {
            this.setState({ active: true }, () => {
                new TextScramble(this.scramblerNode).setText(`${nextProps.firstName} ${nextProps.lastName}`).then(() => {
                    this.fireworks = new Fireworks(this.fireworksNode)
                    this.fireworks.start()
                })
            })
        }
    }

    render() {
        const { className, textSpacing, firstName, lastName } = this.props
        const { active } = this.state

        if (!active) {
            return null;
        }

        return (
            <Portal key="react-portal">
                <Container id="raffleWinnerPlayground" fluid style={{ background: '#2f0038' }}>
                    <div ref={node => { this.fireworksNode = node }} className="fireworksContainer" />
                    <style jsx>{`
                    .fireworksContainer {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .closePortal {
                        position: absolute;
                        bottom: 5%;
                        right: 5%;
                    }
                `}
                    </style>
                    <Container>
                        <Row>
                            <Col className="mt-5">
                                <h2 className="text-center text-white">Winner!</h2>
                                <p className="display-1 text-warning text-capitalize text-center"
                                    ref={node => { this.scramblerNode = node }}
                                />
                            </Col>
                        </Row>
                    </Container>
                    <button className="closePortal btn btn-secondary" type="button" onClick={this.closePortal}>Dismiss</button>
                </Container>
            </Portal>
        )
    }
}
export default RaffleWinnerPortal