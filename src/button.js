import React, { Component } from 'react';

export class Button extends Component {
	render() {
		const { text, enabled = true, className = '', onClick} = this.props;

		return <button className={`btn ${className}`} disabled={!enabled} onClick={onClick}>{text}</button>;
	}
}