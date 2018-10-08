import React from 'react';

class Sort extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state= {
    //         filterTool: {
    //             minStar: undefined,
    //             maxStar: undefined,
    //         }
    //     }
    // }

    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.props.onFilter(name, value)
    }

    render() {
        return(
             <div style={{height: '15vh', backgroundColor: '#07b5b2'}}>
                <form className="sortForm">
                    <div className="minBox">
                    Min. Stars<br/>
                    <input style={{width: "80%"}} type="text" id="minStar" name="minStar" 
                    value={this.props.minStar}
                    onChange={this.handleChange}/>
                    </div>

                    <div className="maxBox">
                    Max. Stars<br/>
                    <input style={{width: "80%"}} type="text" id="maxStar" name="maxStar" 
                    onChange={this.handleChange} value={this.props.maxStar}
                    /> 
                    </div>
                    <br /><br />
                    <button type="submit" className="infoButton" value="Filter">Filter</button> 
                    <button type="reset" className="infoButton" value="Reset">Clear</button> 
                </form>
            </div>
        )
    }
}

export default Sort