import React, { Component } from 'react';

export class Button extends Component {
	render() {
		const { text, enabled = true, className = '', onClick, sub, size, style} = this.props;

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
				}}>
					{text}
			</button></div>;
	}
}