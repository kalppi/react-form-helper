import React, { Component } from 'react';

export class Field extends Component {
	constructor(props) {
		super(props);
	}

	getElements() {
		return {[this.props.name]: this};
	}

	setValue(value) {
		this.props.save({[this.props.name]: value});
	}

	onChange(e) {
		let value = e.target.value;

		if(this.props.parse) value = this.props.parse(this.props.name, value);

		this.setValue(value);

		if(this.props.onChange) this.props.onChange(this.props.form);
	}

	onBlur(e) {
		if(this.props.onBlur) {
			let value = this.props.values[this.props.name];
			
			value = this.props.onBlur(this.props.name, value);
			this.setValue(value);
		}
	}

	render() {
		let {form, format, onChange, prefix, name, text, values, sub, style, size, editable, errors, type} = this.props;
		let id = name;

		if(prefix) {
			id = prefix + '-' + name;
		}

		let value = undefined;

		if(values[name] !== undefined) {
			value = values[name];
		}

		if(format && value !== undefined) {
		 	value = format(name, value);	
		}

		if(value === undefined) value = '';

		let options = {
			type: type || 'text',
			id: id,
			value: value.toString(),
			name: name,
			className: 'form-control',
			onChange: this.onChange.bind(this),
			onBlur: this.onBlur.bind(this)
		};

		if(errors.includes(name)) {
			options.className += ' error';
		}

		if(editable === false) {
			options.className = 'form-control-plaintext';
			options.readOnly = 'readOnly';
		}

		let label = null;

		if(this.props.label !== false && type !== 'hidden') {
			label = <label htmlFor={id} className='col-form-label'>{text ? text : name}</label>;
		}

		if(type === 'hidden') {
			return <input {...options} />;
		} else {
			return <div style={style} className={sub ? ` col-sm-${size}` : ''}>
				{label}
				<input {...options} />
			</div>;
		}
	};
}