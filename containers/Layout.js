import React, { PureComponent } from 'react'
import NavMenu from '../components/NavMenu'
import Head from 'next/head'
import { string } from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';
import NProgress from 'nprogress'

class Layout extends PureComponent {
    static propTypes = {
        pageTitle: string
    }

    static defaultProps = {
        pageTitle: 'Raffle Manager'
    }

    componentDidMount() {
        NProgress.configure({ showSpinner: false });
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>{'Raffle Manager - ' + this.props.pageTitle}</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta charSet='utf-8' />
                    <link rel="shortcut icon" href="../static/favicons/favicon.ico" />
                    <link rel="icon" sizes="16x16 32x32 64x64" href="../static/favicons/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="196x196" href="../static/favicons/favicon-192.png" />
                    <link rel="icon" type="image/png" sizes="160x160" href="../static/favicons/favicon-160.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="../static/favicons/favicon-96.png" />
                    <link rel="icon" type="image/png" sizes="64x64" href="../static/favicons/favicon-64.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="../static/favicons/favicon-32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="../static/favicons/favicon-16.png" />
                    <link rel="apple-touch-icon" href="/favicon-57.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="../static/favicons/favicon-114.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="../static/favicons/favicon-72.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="../static/favicons/favicon-144.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="../static/favicons/favicon-60.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="../static/favicons/favicon-120.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="../static/favicons/favicon-76.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="../static/favicons/favicon-152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="../static/favicons/favicon-180.png" />
                    <meta name="msapplication-TileColor" content="#FFFFFF" />
                    <meta name="msapplication-TileImage" content="../static/favicons/favicon-144.png" />
                    <meta name="msapplication-config" content="../static/favicons/browserconfig.xml" />
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="//unpkg.com/react-table@latest/react-table.css" />
                    <link rel="stylesheet" href="//unpkg.com/nprogress@0.2.0/nprogress.css" />
                    <link rel="stylesheet" href="../static/customstyles.css" />
                </Head>
                <NavMenu />
                <ToastContainer position={toast.POSITION.TOP_CENTER} pauseOnHover={false} />
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default Layout