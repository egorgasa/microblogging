import React from 'react'
import PostListItem from '../post-list-item';
import './post-list.css'

const PostList = ({allPosts, onDelete, onToggleImportant, onToggleLiked}) => {

    const elements = allPosts.map((item) => {
        const {id, ...itemPosts} = item;
        return (
            <li key={id} className='list-group-item'>
                <PostListItem
                    {...itemPosts}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}/>
            </li>
        )
    })

    return (
        <ul className='app-list list-group'>
            {elements}
        </ul>
    )
}
export default PostList