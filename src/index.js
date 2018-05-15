import React, { Component } from 'react';

const allButLast = {
	paddingRight: '3px'
};

const allButFirst = {
	paddingLeft: '3px'
};

class SingleRow extends Component {
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

			if(child.props.size) {
				sizeLeft -= child.props.size;
				withoutSize--;
			}
		}

		return <div className='row'>
			{
				this.props.children.map((child, index) => {
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
						prefix: this.props.prefix,
						values: this.props.values,
						onChange: this.props.onChange,
						save: this.props.save,
						format: this.props.format,
						parse: this.props.parse,
						onBlur: this.props.onBlur,
						errors: this.props.errors,
						ref: ref => {
							if(ref) {
								this.elements[child.props.name] = ref
							}
						}
					});
				})
			}
		</div>;
	}
}


class Field extends Component {
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
		let {form, format, onChange, prefix, name, text, values, sub, style, size, editable, errors} = this.props;
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
			type: 'text',
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

		if(this.props.label !== false) {
			label = <label htmlFor={id} className='col-form-label'>{text ? text : name}</label>;
		}

		return <div style={style} className={sub ? `form-group col-sm-${size}` : 'form-group'}>
			{label}
			<input {...options} />
		</div>;
	};
}

class Form extends Component {
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

	render() {
		this.elements = {};
		
		const opts = {
			ref: ref =>  {
				if(ref && ref.getElements) {
					Object.assign(this.elements, ref.getElements());
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
			{ this.props.children.map((child, index) => {
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

class Button extends Component {
	render() {
		const { text, enabled = true, className = '', onClick} = this.props;

		return <button className={`btn ${className}`} disabled={!enabled} onClick={onClick}>{text}</button>;
	}
}

export { SingleRow, Field, Form, Button };