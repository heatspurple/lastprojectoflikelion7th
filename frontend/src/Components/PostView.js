import React, { Component } from 'react'
import "./PostView.css"


export default class PostView extends Component {
    render() {
        const { id, title, content } = this.props
        return (
        <article className="Post" ref="Post">
            <header>
                <div className="Post-id">
                    <h3>{id}번째 글</h3>
                </div>
                <div className="Post-title">
                    <h3>{title}</h3>
                </div>
            </header>
            <div className="Post-content">
                <p>내용 : {content}</p>
            </div>
        </article>
        );
    }
}