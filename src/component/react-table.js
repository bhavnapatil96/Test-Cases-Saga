import ReactTable  from 'react-table'
import React ,{Component} from 'react'
class React_Table extends Component{
    constructor(){
        super()
        this.state={
            dragData:{},
            data:[{
                id:1,
                name: 'Tanner Linsley',
                age: 26
                },
                {
                    id: 2,
                    name: 'Tanner Linsley',
                    age: 26
                },
                {
                    id: 3,
                    name: 'Tanner Linsley',
                    age: 26,
                },
                {
                    id: 4,
                    name: 'Tanner Linsley',
                    age: 26,
                },
                {
                    id:5,
                    name: 'Tanner Linsley',
                    age: 26
                }],
            columns : [{
                Header: 'Id',
                accessor: 'id' // String-based value accessors!
                },
                {
                    Header: 'Name',
                    accessor: 'name' // String-based value accessors!
                    }, {
                        Header: 'Age',
                        accessor: 'age',
                    }]

        }
    }
    dragStart=(obj)=>{
        //alert("Start")
        this.setState({
            dragData:obj
        })
    }
    dragOver=(index)=>{
        alert(index)
        // let newindex=this.state.data.findIndex((d)=>d.id===index)
        // const {data}=this.state
        // let newdata=data.filter((d)=>d.id!==index);
        //
        // data.splice(newindex)
    }
    render() {
        return(
            <div>
                <br/><br/><br/>
            <table border="1px" align="center">
                <tr>
                    <td>Move</td>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Age</td>
                </tr>
                {
                    this.state.data.map((d,index)=>{
                        return <tr draggable="true" onDragStart={()=>this.dragStart(d)} onDragEnd={()=>this.dragOver(index)}>
                            <td><input type="button" value="Drag" /></td>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.age}</td>
                        </tr>
                    })
                }
            </table>
            </div>
        )
    }
}
export default React_Table