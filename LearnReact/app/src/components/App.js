import React from 'react';
import articles from '../fixtures';
import ArticleList from './ArticleList';
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articles: articles,
            isOpen: {},
        }
    }

    handleIsOpen = (id) => {
        let newVal = !this.state.isOpen[id];
        this.setState((prevProps)=>{
            let obj = {...prevProps.isOpen}
            for(let id in obj){
                obj[id] = false
            }
            return ({isOpen:{
                ...obj,
                [id]: newVal,
            }})
        })
    
    }

    render(){
        return(
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">App name</h1>
                </div>
                <ArticleList articles={this.state.articles} isOpen={this.state.isOpen} onClick={this.handleIsOpen}/>        
            </div>
        )
    }
}

export default App;