import React, {Component} from 'react';
import './post-add-form.css'

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    onValueChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.onAdd(this.state.text);
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <form
                onSubmit={this.onSubmit}
                className='bottom-panel d-flex'>
                <input
                    onChange={this.onValueChange}
                    type='text'
                    placeholder='о чем вы сейчас думаете'
                    className='form-control new-post-label'
                    value={this.state.text}/>
                <button

                    type='submit'
                    className='btn btn-outline-secondary'>
                    Добавить
                </button>
            </form>
        )
    }
}

