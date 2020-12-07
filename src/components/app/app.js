import React, {Component} from 'react'
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import './app.css'


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textToFilter: '',
            filteringByButtons: 'all',
            allPosts: [
                {
                    label: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci,e?',
                    important: true,
                    like: false,
                    id: 1
                },
                {
                    label: 'Lorem ipsum dolor sit amet.',
                    important: false,
                    like: false,
                    id: 2
                },
                {
                    label: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
                    important: false,
                    like: false,
                    id: 3
                }]
        }
        this.maxid = 4;
    }


    deleteItem = (id) => {
        this.setState(({allPosts}) => {
            const postIndex = allPosts.findIndex(elem => elem.id === id);

            const newPosts = [...allPosts.slice(0, postIndex), ...allPosts.slice(postIndex + 1)];

            return {
                allPosts: newPosts,
                textToFilter: ''
            }
        });
    };


    addItem = (body) => {
        const newPost = {
            label: body,
            important: false,
            id: this.maxid++
        }
        this.setState(({allPosts}) => {
            const newArr = [...allPosts, newPost];
            return {
                allPosts: newArr,
            }
        })
    };

    onToggleImportant = (id) => {
        this.setState(({allPosts}) => {
            const postIndex = allPosts.findIndex(elem => elem.id === id);

            const postImportant = allPosts[postIndex];
            const newItem = {...postImportant, important: !postImportant.important};

            const newArrPosts = [...allPosts.slice(0, postIndex), newItem, ...allPosts.slice(postIndex + 1)]
            return {
                allPosts: newArrPosts
            }
        })
    };

    onToggleLiked = (postId) => {
        this.setState(({allPosts}) => {
            const postIndex = allPosts.findIndex(elem => elem.id === postId);

            const postLiked = allPosts[postIndex];
            const newItem = {...postLiked, like: !postLiked.like};

            const newArrPosts = [...allPosts.slice(0, postIndex), newItem, ...allPosts.slice(postIndex + 1)]
            return {
                allPosts: newArrPosts
            }
        })
    };

    onUpdateSearch = (textToFilter) => {
        this.setState({textToFilter})
    };

    searchPost = (allPosts, textToFilter) => {
        if (textToFilter.length === 0) {
            return allPosts
        }
        return allPosts.filter((post) => {
            return post.label.indexOf(textToFilter) > -1
        });
    };

    filterPost = (allPosts, filter) => {
        if (filter === 'like') {
            return allPosts.filter(item => item.like)
        } else return allPosts
    };

    onFilterSelect = (filteringByButtons) => {
        this.setState({filteringByButtons})
    };

    render() {
        const {allPosts, textToFilter, filteringByButtons} = this.state;
        const liked = allPosts.filter(item => item.like).length;
        const allPost = allPosts.length;

        const visiblePosts = this.filterPost(this.searchPost(allPosts, textToFilter), filteringByButtons);

        return (<div className='app'>
            <AppHeader
                like={liked}
                allPosts={allPost}/>
            <div className='search-panel d-flex'>
                <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                <PostStatusFilter
                    filter={filteringByButtons}
                    onFilterSelect={this.onFilterSelect}/>
            </div>
            <PostList
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}
                onDelete={this.deleteItem}
                allPosts={visiblePosts}/>
            <PostAddForm
                onAdd={this.addItem}/>
        </div>)
    }
};



