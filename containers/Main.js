import React, {Component} from 'react'
import {View, AsyncStorage} from 'react-native'
import {createStore} from 'redux'
import {connect} from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'

import {reducer, actionCreators} from './todoListRedux'
import List from '../components/List'
import Input from '../components/Input'
import Title from '../components/Title'

export const store = createStore(reducer, undefined, autoRehydrate())
const mapStateToProps = (state) => ({todos: state.todos})

class Main extends Component {
    componentWillMount() {
        persistStore(store, {
            storage: AsyncStorage
        }, () => {
            this.setState({rehydrated: true})
        })
    }
    onAddTodo = (text) => {
        const {dispatch} = this.props
        dispatch(actionCreators.add(text))
    }
    onRemoveTodo = (index) => {
        const {dispatch} = this.props
        dispatch(actionCreators.remove(index))
    }
    render() {
        const {todos} = this.props

        return (
            <View>
                <Title>
                    To-Do List
                </Title>
                <Input placeholder={'Type a todo, then hit enter!'} onSubmitEditing={this.onAddTodo}/>
                <List list={todos} onPressItem={this.onRemoveTodo}/>
            </View>
        )
    }
}

export default connect(mapStateToProps)(Main)
