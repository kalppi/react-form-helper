import React, { Component } from 'react';

export class Group extends Component {
	constructor(props) {
		super(props);

		this.elements = {};
	}

	getElements() {
		return this.elements;
	}

	render() {
		this.elements = {};

		return <fieldset className='form-group group'>
		<legend>{this.props.text}</legend>
			{
				React.Children.map(this.props.children, (child, index) => {
					return React.cloneElement(child, {
						sub: true,
						key: index,
						errors: this.props.errors,
						prefix: this.props.prefix,
						values: this.props.values,
						onChange: this.props.onChange,
						save: this.props.save,
						format: this.props.format,
						parse: this.props.parse,
						onBlur: this.props.onBlur,
						ref: ref => {
							if(ref) {
								this.elements[child.props.name] = ref
							}
						}
					});
				})
			}
		</fieldset>;
	}
}