import React, {Component} from 'react';
import {MoneyInput} from './MoneyInput';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value : '',
      name : null,
      data : [],
      chars : false
    }
    this.valueOne = '';
    this.valueTwo = '';
    this.lanO = 'USD';
    this.lanT = 'RUB';
  }

  changeText = (e) => {
    this.setState({
        value : e.target.value,
        name : e.target.name
    });
  }

  getCourse =  (currency1,currency2,num,name) => {
    let a = this.rates[`${currency1}`];
    let b = this.rates[`${currency2}`];
    if (name == 'left') {
      let course = b/a;
      this.valueOne = num;
      this.valueTwo = (Number(num)*course).toFixed(2);
    } else {
      let course = a/b;
      this.valueOne = (Number(num)*course).toFixed(2);
      this.valueTwo = num;
    }
  }

  changeCurrency = (val,link) => {
    if (link == 'left') this.lanO = val;
    else this.lanT = val;
    this.forceUpdate();
  }
  //Life cycles
 componentWillUpdate(nextProps, nextState) { 
    if (nextState.name == 'left') this.getCourse(this.lanO,this.lanT,nextState.value,nextState.name);
    else if (nextState.name == 'right') this.getCourse(this.lanO,this.lanT,nextState.value,nextState.name);
  }

  componentDidMount () {
    fetch('https://openexchangerates.org/api/latest.json?app_id=674e3f426329476f9bc934e1b68167fd')
      .then(response => response.json())
      .then((data) => {
        this.rates = data.rates;
        var data = []; 
        for (let key in this.rates) {
           data.push({key:this.rates[key],nameOfCurrency:key})
        }
        this.setState({data})
      });
  }

  render() {
        if (navigator.userAgent.indexOf("iPhone") > -1 || navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf('Nokia') > -1 || navigator.userAgent.indexOf("iPad") > -1 ) {
          return (
            <div style = {{position:'absolute',height:'100%',background:'#59b300',width:'100%'}}>
              <h2 style = {{color:'white',marginTop:'50%',textAlign:'center'}}>Application is not supported on mobile devices</h2>
            </div>   
          ) 
      } 
       return (
            <div className = 'row'> 
              <marquee id = 'news'>{this.state.data.length !=0 ? this.state.data.map((item,i) => <p style= {{display:'inline-block',margin:'5px'}} key = {i}>Course USD TO {item.nameOfCurrency} - {item.key} </p>) : ''}</marquee>
              <i className ="dol fas fa-dollar-sign"></i>
              <div className = 'col-6 col-sm-6' id = 'Lblock'>
                  <MoneyInput 
                    name = 'left'
                    styles = {{'position':'relative','top':'65%','left':'10%'}}
                    onchangeText = {this.changeText}     
                    value = {this.state.chars ? '' : this.valueOne }   
                    header = {{'top':'60%','color':'black','left':'70px'}}  
                    lan = {this.lanO}
                    items = {this.state.data}
                    onChangeCurrency = {this.changeCurrency}
                  />
              </div>
              <div id = 'circle'></div>
              <div className = 'col-6 col-sm-6 offset-6' id = 'Rblock'>
                  <MoneyInput 
                    name = 'right'
                    styles = {{'position':'relative','top':'15%','left':'40%'}}
                    onchangeText = {this.changeText}    
                    value = {this.valueTwo}
                    header = {{'top':'10%','color':'white','left':'400px'}}
                    lan = {this.lanT}
                    items = {this.state.data}
                    onChangeCurrency = {this.changeCurrency}
                  />
                  <i className = "sign fas fa-euro-sign"></i>
              </div>
            </div>
      );
  }
}

export default App;
