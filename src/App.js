import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



console.clear()


class App extends React.Component {

  state={}
  componentDidMount() {
    const list = [
      ]
    const length = list.length
    this.setState({list})
    this.setState({length})
  }
  handleSubmit=event=>{
    event.preventDefault()
    this.setState((prevState,props)=>{
      const {value,list} = prevState
      if (typeof(value)==='string'&&value.length>0) {
        list.push({value})
        return {
          list, value:'',
        }
      }
      return null
    })
  }
  handleChange=event=>{
    const {value} = event.target
    this.setState((prevState,props)=>{
      if (typeof(value)==='string'&&value.length>=0) {
        return {value}
      }
      return null
    })
  }
  remove=i=>{
    this.setState((prevState,props)=>{
      const {list} = prevState
      if (typeof(i)==='number'&&i>=0&&i<list.length) {
        return {removing:i}
      }
      return null
    })
  }
  removeConfirm=i=>{
    this.setState((prevState,props)=>{
      const {list} = prevState
      if (typeof(i)==='number'&&i>=0&&i<list.length) {
        list.splice(i,1)
        return {list}
      }
      return null
    },this.removeCancel)
  }
  removeCancel=event=>{
    this.setState((prevState,props)=>{
      delete prevState.removing
      return prevState
    })
  }
  toggleEdit=i=>{
    this.setState({editing:i},()=>{
      if (typeof(this.input)==='object'&&this.input!==null) {
        this.input.focus()
      }
    })
  }
  handleBlur=event=>{
    this.setState((prevState,props)=>{
      delete prevState.editing
      return prevState
    })
  }

  toggleDone=i=>{
    this.setState((prevState,props)=>{
      const {list} = prevState
      if (typeof(i)==='number'&&i>=0&&i<list.length) {
        const {done} = list[i]
        list[i].done = !done
        return {list}
      }
      return null
    })
  }
  renderList() {
    const {list,value,deleteMode,removing,editing,length} = this.state
    if (Array.isArray(list)&&list.length>0) {
      return (
        <ul class="list-unstyled">
          {
            list.map((e,i)=>(
              <li className="media mb-3">

                <div className="media-body">
                  <h5 className={`mt-2 mb-1 ${e.done?'done':''}`}>
                    {
                      editing!==i&&
                      <span onClick={()=>this.toggleEdit(i)} className={typeof(e.value)==='string'&&e.value.length>0?'':'empty'}>{typeof(e.value)==='string'&&e.value.length>0?e.value:'<empty>'}</span>
                    }
                    
                  </h5>
                </div>
                {
                  deleteMode&&
                  <div className="media-foot">
                    <div className="btn-toolbar" role="toolbar">
                      {
                        removing!==i&&
                        <button className="btn btn-outline-danger btn-sm mr-2" onClick={()=>{
                          this.remove(i)
                        }}>{'\u{2718}'} Remove</button>
                      }
                      {
                        removing===i&&
                          <div>
                            <button className="btn btn-outline-danger btn-sm mr-2" onClick={()=>{
                          this.removeConfirm(i)
                        }}>Yes</button>
                            <button className="btn btn-outline-dark btn-sm mr-2" onClick={this.removeCancel}>No</button>
                        
                          </div>
                      }
                    </div>
                     
                  </div>
                }
              </li>
            ))
          }
        </ul>
      )
    }
    return null
  }
  renderlength(){
  }
  toggleDeleteMode=event=>{
    this.setState((prevState,props)=>{
      const {deleteMode} = prevState
      return {deleteMode:!deleteMode}
    })
  }
  renderDeleteToggle() {
    const {deleteMode} = this.state
    return (
      <button className={`btn ${deleteMode?'btn-danger':'btn-outline-danger'}`} onClick={this.toggleDeleteMode}>Remove</button>
    )
  }
  renderInput() {
    const {value} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="" value={value} onChange={this.handleChange} />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="submit">{'\u002b'} Add</button>
          </div>
        </div>
      </form>
    )
  }
  render() {
    return (
      <div className="container">
        <h1>TODO list</h1>
        <div className="row mb-3">
          <div className="col">
            <div className="btn-toolbar float-right">
              {this.renderDeleteToggle()}
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col">
            {this.renderList()}
            {this.renderInput()}
          <p>Number of list items: {this.state.length}</p>        
          </div>
        </div>
      </div>
    )
  }
}
;
export default App