import React from 'react';

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            minStar: "",
            maxStar: "",
        }
    }

    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleFilter = (e) => {
        e.preventDefault();
        if(this.state.minStar !== "" && this.state.maxStar !== "") {
        this.props.onFilter(this.state.minStar, this.state.maxStar);
        }
    }

    clearFilter = (e) => {
        e.preventDefault();
        this.setState({
            minStar: "",
            maxStar: ""
        })
        this.props.onClearFilter()
    }

    render() {
        return(
             <div style={{backgroundColor: '#07b5b2', paddingTop: '2px'}}>
                <form className="sortForm">
                    <div className="minBox">
                    <b>Min. Stars</b><br/>
                    <input style={{width: "80%"}} type="number" id="minStar" name="minStar" 
                    value={this.state.minStar} min="1" max="5"
                    onChange={this.handleChange}/>
                    </div>

                    <div className="maxBox">
                    <b>Max. Stars</b><br/>
                    <input style={{width: "80%"}} type="number" id="maxStar" name="maxStar" 
                    onChange={this.handleChange} 
                    value={this.state.maxStar} min="1" max="5"
                    /> 
                    </div>
                    <br /><br />
                    <button type="button" className="infoButton" value="Filter" onClick={this.handleFilter}>Filter</button> 
                    <button type="button" className="infoButton" value="Reset" onClick={this.clearFilter}>Clear</button> 
                </form>
            </div>
        )
    }
}

export default Sort