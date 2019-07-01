import React,{Fragment} from 'react';

export class MoneyInput extends React.Component {
    changeCurrency = (val) => {
        this.props.onChangeCurrency(val,this.props.name)
    }
    render() {
        return(
            <Fragment>
                <header style = {{position:'relative',top:this.props.header.top,color:this.props.header.color,left:this.props.header.left}}>
                <div className = {this.props.name == 'left' ? 'dropup' : 'dropleft'} >
                <button data-toggle = 'dropdown' id = {this.props.name == 'left' ? 'btnL' : 'btnR'} className = {this.props.name == 'left' ? 'btn btn-outline-secondary dropdown-toggle' : 'btn btn-outline-warning dropdown-toggle'}>Change</button>
                <div className = 'dropdown-menu'>
                    <ul type = 'none' id = 'menu'>
                        {this.props.items.length != 0 ? this.props.items.map((el,i) => <li onClick = {(e) => {this.changeCurrency(e.target.textContent)}} className ='list' key = {i}>{el.nameOfCurrency}</li>) : '' }
                    </ul>
                </div>
                </div>
                <p id = 'text_of_header'>{this.props.lan}</p>
                </header>
                <div className = 'converter' style = {this.props.styles}>
                    <span>Amount</span>
                    <input 
                    name = {this.props.name}
                    maxLength = '12' 
                    value = {this.props.value} 
                    onChange = {this.props.onchangeText}
                    className = 'form-control' />
                </div>
            </Fragment>
        )
        
    }
}
