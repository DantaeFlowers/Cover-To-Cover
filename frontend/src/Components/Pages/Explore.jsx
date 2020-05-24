import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

import Navbar from '../Support Files/Navbar'
import staticPostImg from '../../img/Unknown_location.png';

class Explore extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchBar: ''
        }
    }

    async componentDidMount() {
        try {
            let blogs = await axios.get('/blog/all');
            this.setState({
                data: blogs.data.payload
            });
            console.log("state:", this.state);
        } catch (err) {
            console.log("ERROR:", err);
        }
    }

    searchChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addDefaultSrc(ev){
        ev.target.src = staticPostImg
      }

    // showStory = (element) => {
    //     console.log('pasted', element);
    //     <Link to='/explore'> </Link>;
    // }

    render() {
        const filteredData = this.state.data.filter(
            (element) => {
                return element.caption.toLowerCase().indexOf(this.state.searchBar.toLowerCase()) !== -1;
            }
        )

        console.log("render method data:", filteredData);
        return (
            <div>
                <Navbar />
                <div className="inner-pages">
                    <div className='search-bar'>
                        <input type="text"
                            name="searchBar"
                            id="searchBar"
                            placeholder="Search"
                            onChange={this.searchChange}
                        />
                        {/* <button>Search</button> */}
                    </div>
                    <div className='blog-post'>

                        {
                            filteredData.map(element => {
                                return (
                                    <div className="blog-box">
                                        <div className="blog-img">
                                        <img onError={this.addDefaultSrc} src={element.file_src} alt='img' />
                                        </div>
                                        {/* <a onClick={this.showStory.bind(this, element)}> */}
                                        <Link to={{
                                            pathname: '/storypage',
                                            state: {
                                                storyProps: element
                                            }
                                        }}>
                                            <div className="blog-content">
                                                {/* <p>{element.id}</p> */}
                                                <h3>{element.p_username}</h3>
                                                <p>{element.caption}</p>
                                            </div>
                                        </Link>
                                        {/* </a> */}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default Explore;