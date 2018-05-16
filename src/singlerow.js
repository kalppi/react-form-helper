import React, { Component } from 'react';

const allButLast = {
	paddingRight: '3px'
};

const allButFirst = {
	paddingLeft: '3px'
};

export class SingleRow extends Component {
	constructor(props) {
		super(props);

		this.elements = {};
	}

	getElements() {
		return this.elements;
	}

	render() {
		this.elements = {};
		
		let sizeLeft = 12;
		let withoutSize = this.props.children.length;

		for(let index in this.props.children) {
			const child = this.props.children[index];

			if(!child) continue;

			if(child.props && child.props.size) {
				sizeLeft -= child.props.size;
				withoutSize--;
			}
		}

		let className = 'row';

		if(this.props.className) {
			className += ` ${this.props.className}`;
		}

		return <div className={className}>
			{
				React.Children.map(this.props.children, (child, index) => {
					if(!child) return;

					let style = {};

					if(index < this.props.children.length - 1) {
						style = Object.assign(style, allButLast );
					}

					if(index > 0) {
						style = Object.assign(style, allButFirst );
					}

					let size = 0;

					if(child.props.size) size = child.props.size;
					else size = Math.floor(sizeLeft / withoutSize);

					return React.cloneElement(child, {
						sub: true,
						key: index,
						style: style,
						size: size,
						errors: this.props.errors,
						prefix: this.props.prefix,
						values: this.props.values,
						onChange: this.props.onChange,
						save: this.props.save,
						format: this.props.format,
						parse: this.props.parse,
						onBlur: this.props.onBlur,
						ref: ref => {
							if(ref && ref.getElements) {
								this.elements = Object.assign(this.elements, ref.getElements());
							}
						}
					});
				})
			}
		</div>;
	}
}