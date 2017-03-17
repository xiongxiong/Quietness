import React from 'react'
import {AppRegistry} from 'react-native'
import {Provider} from 'react-redux'

import Main, {store} from './containers/Main'


const AppWithStore = () => (
    <Provider store={store}>
        <Main />
    </Provider>
)

AppRegistry.registerComponent('Quietness', () => AppWithStore)
