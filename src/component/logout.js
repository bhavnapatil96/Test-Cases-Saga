import React from 'react';
class Logout extends React.Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('type')
        this.props.history.push('/')
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Logout;