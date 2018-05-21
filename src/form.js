import React, { Component } from 'react';

export class Form extends Component {
	constructor(props) {
		super(props);

		this.elements = {};
	}

	setValue(name, value) {
		const el = this.elements[name];

		if(el) {
			el.setValue(value);
		}
	}

	setText(name, text) {
		const el = this.elements[name];

		if(el) {
			el.setState({ text });
		}
	}

	render() {
		this.elements = {};
		
		const opts = {
			ref: ref =>  {
				if(ref && ref.getElements) {
					this.elements = Object.assign(this.elements, ref.getElements());
				}
			},
			onChange: this.props.onChange,
			form: this,
			save: this.props.save,
			format: this.props.format,
			parse: this.props.parse,
			onBlur: this.props.onBlur,
			errors: this.props.errors
		};

		if(this.props.name) {
			opts.prefix = this.props.name;
		}

		const values = this.props.values || {};

		const form = <form ref={ref => this.form = ref} onSubmit={e => {
				e.preventDefault();

				if(this.props.onSubmit) this.props.onSubmit(this);
			}}>
			{ React.Children.map(this.props.children, (child, index) => {
				if(!child) return null;
				
				const el = React.cloneElement(child, {
					...opts,
					key: index,
					values: values
				});

				return el;
			})}
		</form>;

		return form;
	}
}