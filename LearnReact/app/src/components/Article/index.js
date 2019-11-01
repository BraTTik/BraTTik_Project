import React from 'react';
import PropTypes from 'prop-types';
import './style.css'


const Article = (props) => {

    Article.propTypes = {
        id: PropTypes.string,
        text: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        onClick: PropTypes.func,
        isOpen: PropTypes.bool,
    }

    const {
        id,
        text,
        title,
        date,
        onClick,
        isOpen,
    } = props;
    let cardStyle = isOpen ? 'card-text__opened' : 'card-text__closed';
    return(
        <div key={ id } className="card mx-auto" style={{width: '50%'}}>
            <div className="card-header">
                <h3>
                    { title }   
                    <button 
                        className="btn btn-primary btn-sm float-right"
                        onClick={()=>onClick(id)}> {isOpen ? 'close' : 'open'}
                    </button>
                </h3>
            </div>
            <div className="card-body">
                <small className="card-subtitle text-muted">{ (new Date()).toDateString(date) }</small>
                <p className={`card-text animated-opening ${cardStyle}`}>{ text }</p>
            </div>
        </div>
    );
    
}

export default React.memo(Article);