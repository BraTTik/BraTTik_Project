import React from 'react'
import PropTypes from 'prop-types';
import Article from '../Article';
import './style.css'


const ArticleList = (props) => {
    ArticleList.propTypes = {
        articles: PropTypes.array,
        onClick: PropTypes.func,
        isOpen: PropTypes.object,
    }
    const {
        onClick,
        articles,
        isOpen,
    } = props;

    const articlesList = articles.map( (elem, index) => {
        return <li key={elem.id} className="article-list__li"> <Article { ...elem } isOpen={isOpen[elem.id]} onClick={onClick}/> </li>
        }
    )
    return articlesList;
}

export default ArticleList;