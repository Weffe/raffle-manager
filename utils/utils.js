import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

export function withDefaultPageRedux(Component, mapStateToProps = null, mapDispatchToProps = null) {
    return withRedux(initStore, mapStateToProps, mapDispatchToProps, Component)
}