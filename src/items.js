import React, { Component } from 'react';

class Item extends Component{
    render(){
        console.log(this.props);
        return(
            <div className="items">
                <div className="description">
                    <div className="korean">
                        {this.props.data.korean}
                    </div>
                    <div className="english">
                        {this.props.data.english}
                    </div>
                </div>
                {/* {
                    this.state.items.length===4
                    ?<div className="price_ice_hot">
                        <div>
                            {this.props.data.Price_Ice}
                        </div>
                        <div>
                            {this.props.data.Price_Hot}
                        </div>
                    </div>
                    :<div className="price">
                        {this.props.data.Price}
                    </div>
                    } */}

            </div>
        );
    }
}

export default Item