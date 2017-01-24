var React = require('react');
var ReactDOM = require('react-dom');



var DefaultButton = require('pui-react-buttons').DefaultButton;

var Button=require('pui-css-buttons').Button;

var Dropdown = require('pui-react-dropdowns').Dropdown; var DropdownItem =
require('pui-react-dropdowns').DropdownItem;
require('../dist/myComponents.css');

/*import Header from "./Header.js";
  import Footer from "./Footer.js";
*/
var Panel = require('pui-react-panels').Panel;

/*const Banner = require('pui-react-ribbons').Banner;*/

// Bootstrap Javascript is required for some PUI CSS components, such as accordians, collapse, dropdowns,
// modals, and tooltips
// require('bootstrap');

// Required modules here like so:
// var DefaultButton = require('pui-react-buttons').DefaultButton;




var MainBox  = React.createClass({
   render:function(){
       return(
           <App/>
       );
   }
});
var App = React.createClass({
   //setting up initial state
   getInitialState:function(){
       return{
           data:[]
       };
   },
   componentDidMount(){
       this.getDataFromServer('http://fcctop100.herokuapp.com/api/fccusers/top/recent');
   },
   //showResult Method
       showResult: function(response) {

           this.setState({
               data: response
           });
   },
   //making ajax call to get data from server
   getDataFromServer:function(URL){
       $.ajax({
           type:"GET",
           dataType:"json",
           url:URL,
           success: function(response) {
               this.showResult(response);
           }.bind(this),
           error: function(xhr, status, err) {
               console.error(this.props.url, status, err.toString());
           }.bind(this)
       });
   },
   render:function(){
       return(
           <div>
               <Result result={this.state.data}/>
           </div>
       );
   }
});
var Result = React.createClass({
   render:function(){
       var result = this.props.result.map(function(result,index){
           return <ResultItem key={index} user={ result } />
           });
       return(
           <div className="row">
               <div className="col-md-12">
                   <table className="table table-bordered">
                       <thead>
                           <tr>
                               <th className="col-md-4">UserName</th>
                               <th >Points In Last 30 Days</th>
                               <th>Points All Time</th>
                           </tr>
                       </thead>
                       <tbody>
                           {result}
                       </tbody>
                   </table>
               </div>
           </div>

       );
   }
});
var ResultItem = React.createClass({
   render:function(){
       var camper = this.props.user;
       return(
              <tr >
               <td>{camper.username}</td>
               <td>{camper.recent}</td>
               <td>{camper.alltime}</td>
           </tr>  

       );
   }
});
ReactDOM.render(
   <MainBox />,
   document.querySelector("#app")
);
