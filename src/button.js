import React, { Component } from 'react';

export class Button extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: this.props.text
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.text) {
			this.setState({
				text: nextProps.text
			});
		}
	}

	getElements() {
		return {[this.props.name]: this};
	}
	
	render() {
		const { enabled = true, className = '', onClick, sub, size, style} = this.props;

		let cl = '';

		if(sub) {
			cl = `col-sm-${size}`;
		}

		return <div
				style={style}
				className={cl}
			><button
				className={`btn ${className}`}
				disabled={!enabled}
				onClick={e => {
					if(onClick) {
						e.preventDefault();
						
						onClick();
					}
				}}>{this.state.text}{this.props.children}
			</button></div>;
	}
}