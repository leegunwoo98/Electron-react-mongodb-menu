import React, { Component } from 'react';
import Item from "./items"

class Columns extends Component{
    render(){
        return (
            <div className="center">
                <div className="blur">
                    <div className="my_head">
                        <div className="description">
                            <div className="head">
                                {this.props.data.name}
                            </div>
                        </div>
                    </div >
                    {this.props.data.properties.map((data) => 
                         <Item data={data}
                         key={data._id}/>
                    )} 
                

                </div>
            </div>
        )
    }
}
export default Columns;