import React from 'react';

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            filterTool: {
                minStar: "",
                maxStar: "",
            }
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => {
            prevState.filterTool[name] = value;
            return {filterTool: prevState.filterTool}
        })
    }

    render() {
        return(
             <div style={{height: '15vh', backgroundColor: '#07b5b2'}}>
                <form className="sortForm">
                    <div className="minBox">
                    <label htmlFor="minStar">Min. Stars</label><br/>
                    <input style={{width: "80%"}} type="text" id="minStar" name="minStar" 
                    value={this.state.filterTool.minStar}
                    onChange={this.handleChange}/>
                    </div>

                    <div className="maxBox">
                    <label htmlFor="maxStar">Max. Stars</label><br/>
                    <input style={{width: "80%"}} type="text" id="maxStar" name="maxStar" 
                    onChange={this.handleChange} value={this.state.filterTool.maxStar}
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