import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import store from '../store/store.js';
import axios from 'axios';


const checkboxes = [
    {
      name: 'See list of scope functional assumptions as part of appendix A - list of tasks',
      key: 'checkBox1',
      label: 'Check Box 1',
    },
    {
      name: 'RavTech will manage the project and allocations of developers according to each phase of development',
      key: 'checkBox2',
      label: 'Check Box 2',
    },
    {
      name: 'The development shall be based upon the flow above (in the user stories section). Any change may influence the price below and will be charge accordingly.',
      key: 'checkBox3',
      label: 'Check Box 3',
    },
    {
      name: 'Devices targeted for this release: Windows 10 + Chrome latest',
      key: 'checkBox4',
      label: 'Check Box 4',
    },
    {
      name: `Customer shall provide full UI and UX using invision, zeplin or any other web tool aimed for this purpose. While the entire UI is not required in order to start the development, it is essential that
      The UX will be 80% finalized when the dev starts
      The UI of the first 5 screens will be ready when the dev starts
      `,
      key: 'checkBox5',
      label: 'Check Box 5',
    },
    {
      name: 'Any change in the UX after the dev start and in any UI screen after it was delivered to RavTech may lead to additional dev costs and delay in the project delivery.',
      key: 'checkBox6',
      label: 'Check Box 6',
    },
  ];
  

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
    <input type={type} name={name} checked={checked} onChange={onChange} />
  );
  
//   Checkbox.propTypes = {
//     type: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     checked: PropTypes.bool,
//     onChange: PropTypes.func.isRequired,
//   }
  
class Assumptions extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          checkedItems: new Map(),
          assumptionsArr : []
        }
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(e) {
        var newAssumptionsArr = this.state.assumptionsArr.slice();
        newAssumptionsArr.push(e.target.name);
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked)}));
        this.setState({assumptionsArr : newAssumptionsArr})

        console.log(this.state.assumptionsArr); 
        console.log(this.props); 
      }

      sendToDB = (state, correctProject) => {
        axios.put(`http://10.2.1.119:3000/assumptions/${correctProject}` , { assumptions: state.assumptionsArr })
            .then(function (response) {
                console.log(response);
                // store.dispatch({ type: 'GET_PROJECTS_DB' });
            });
    }
    
      render() {
        return (     
          <div>
              {checkboxes.map(item => (
                <div className="assumption">
                <label key={item.key}>
                  <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
                  {item.name}
                  </label>
                </div>
              ))
            }
            <button onClick={()=>this.sendToDB(this.state, this.props.correctProject)}> SAVE </button>
          </div>
    );
    
  }
}
  export default connect(store => store)(Assumptions) ;