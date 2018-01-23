import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap'
import NavMenu from '../components/NavMenu'
import Head from 'next/head'
import { string } from 'prop-types'

class Layout extends PureComponent {
    static propTypes = {
        pageTitle: string
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>{this.props.pageTitle}</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta charSet='utf-8' />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                </Head>
                <Container>
                    <Row>
                        <NavMenu />
                    </Row>

                    <Row>
                        {this.props.children}
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default Layout