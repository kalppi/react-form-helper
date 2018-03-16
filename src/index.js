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
		this.setValue(e.target.value);

		this.props.onChange(this.props.form);

		return;
		return new Promise((resolve, reject) => {
			const value = e.target.value;

			this.setValue(value);

			resolve();
		});
	}

	render() {
		const {form, onChange, prefix, name, text, values, sub, style, size, editable} = this.props;
		let id = name;

		if(prefix) {
			id = prefix + '-' + name;
		}

		let value = '';

		if(values[name]) {
			value = values[name];
		}

		let options = {
			type: 'text',
			id: id,
			value: typeof value === 'object' ? value.text : value,
			name: name,
			className: 'form-control',
			onChange: this.onChange.bind(this)
		}

		if(editable === false) {
			options.className = 'form-control-plaintext';
			options.readOnly = 'readOnly';
		}

		return <div style={style} className={sub ? `form-group col-sm-${size}` : 'form-group'}>
			<label htmlFor={id} className='col-form-label'>{text ? text : name}</label>
			<input {...options} />
		</div>;
	};
}

class Form extends Component {
	constructor(props) {
		super(props);

		this.elements = [];
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
			save: this.props.save
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
		const { text, enabled = true} = this.props;

		return <button className='btn' disabled={!enabled}>{text}</button>;
	}
}

export { SingleRow, Field, Form, Button };

