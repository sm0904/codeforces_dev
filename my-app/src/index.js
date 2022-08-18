import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import './index.css';
import App from './App';
import {useState} from 'react';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

class Other extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user_id : "",
      password:""
    };
  }

  changeHandler=(event)=>{
    this.setState({username : event.target.value})
  }

  render(){
    return (
      <div> <h1> This is experimental </h1> 
        <form enctype = "plain / text"> 
          <input type = "text" name = "Enter username " onChange={this.changeHandler} />
        </form>
      </div>
    );
  }
};

class CardTest extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cards:[]
    };
  }

  render(){
    return(
      <div style={{}}>
      <h4>How to use CardComponent in ReactJS?</h4>
      <Card
        style={{
          width: 400,
          backgroundColor: "cyan",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
          >
            Greetings of the day
          </Typography>
          <Typography variant="h5" component="h2">
            How are you ?
          </Typography>
          <Typography
            style={{
              marginBottom: 12,
            }}
            color="textSecondary"
          >
            Keep Motivated
          </Typography>
          <Typography variant="body2" component="p">
            Stay Happy
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"> Stay Safe.....</Button>
        </CardActions>
      </Card>
    </div>
    );
  }
};

class Myform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: " ",
      age: null,
      errormessage: "",
      course: "Mathematics"
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = "";
    if (nam === "age") {
      if (val !== "" && !Number(val)) {
        err = <b> This is not a valid input </b>;
      }
    }
    this.setState({ errormessage: err });
    this.setState({ [nam]: val });
  };

  changeCourseHandler = (event) => {
    this.setState({ course: event.target.value });
  };

  alertMessage = () => {
    alert("Are you sure you want to submit?");
  };

  render() {
    return (
      <form enctype="plain/text">
        <h1> Hello {this.state.username}</h1>
        <p> Enter your name: </p>
        <input type="text" name="username" onChange={this.myChangeHandler} />
        <h2> Your age as entered by you is: {this.state.age} </h2>
        <p> Enter your age </p>
        <input type="text" name="age" onChange={this.myChangeHandler} />
        {this.state.errormessage};
        <h2> Which of these courses would you like to enroll for ? </h2>
        <select value={this.state.course} onChange={this.changeCourseHandler}>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="Humanities">Humanities</option>
        </select>
        <p> You have enrolled for {this.state.course} </p>
        <p align="center">
          <input
            type="submit"
            value="Submit response"
            onClick={this.alertMessage}
          />
        </p>
      </form>
    );
  }
};

class API extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:null
    };
  }

  /*callBackendAPI=()=>{
    fetch('/express_backend')
      .then(response => response.text())
      .then(response => this.setState({data : response}))
      .catch(err => console.log(err));
  
  }*/

  componentDidMount(){
    this.callBackendAPI()
        .then(response =>this.setState({data : response}))
        .catch(err => console.log(err));
  }

  callBackendAPI = async() =>{
      const response = await fetch('/express_backend');
      const body = await response.json();
      alert(body.test);
      if(response.status !== 200){
        throw Error;
      }
      return body.test;
  }

  render(){
    return(
      <form enctype ='plain/text'>
        <input type ='text' name ='username' />
        <h2> The data fetched from the server is {this.state.data}</h2>
      </form>
    );
  }
};

const components=[<Myform/> , <CardTest/>]
class Mulitple extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data : null
    };
  }

  render(){
    return(
      components.map((component, index)=>(
        <React.Fragment key={index}>
            { component }
        </React.Fragment>
      ))
    );
  }
};

const names=['Ram' , 'Shaayan' , 'Shaan' ,'Ricky'];
function Search(){
  const [searchTerm ,setSearchTerm] = useState('');
    return(
      <div align = "center">
        <input type='text' placeholder='Search for indicators...' onChange={(event)=>{
          setSearchTerm(event.target.value)
        }}/>
        {
          names.filter((value)=>{
            if(searchTerm === ''){
              return value;
            }
            else if(value.toLowerCase().includes(searchTerm.toLowerCase())){
              return value;
            }
          }).map((value, key)=>{
            return (
            <p> {value} </p>
            );
          })
        }
      </div>
    );
}

ReactDOM.render(<API/>, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

