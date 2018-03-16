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
						ref: ref => this.elements[child.props.name] = ref
					});
				})
			}
		</div>;
	}
}


class Field extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};

		if(props.value) {
			this.state.value = props.value;
		}
	}

	getElements() {
		return {[this.props.name]: this};
	}

	setValue(value) {
		return new Promise((resolve, reject) => {
			this.setState({value: value}, resolve);
		});
	}

	onChange(e) {
		return new Promise((resolve, reject) => {
			this.setState({value: e.target.value}, resolve);
		});
	}

	render() {
		const {form, onChange, prefix, name, text, value, sub, style, size, editable} = this.props;
		let id = name;

		if(prefix) {
			id = prefix + '-' + name;
		}

		let options = {
			type: 'text',
			id: id,
			value: typeof this.state.value === 'object' ? this.state.value.text : this.state.value,
			name: name,
			className: 'form-control',
			onChange: e => {
				this.onChange(e).then(() => {
					this.props.onChange(this.props.form);
				})
			}
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

	setValues(values) {
		return new Promise((resolve, reject) => {
			const promises = [];

			for(let key in this.elements) {
				if(values[key] !== undefined) {
					promises.push(this.elements[key].setValue(values[key]));
				}
			}

			Promise.all(promises).then(resolve);
		});
	}

	clearValues() {
		return new Promise((resolve, reject) => {
			const promises = [];

			for(let key in this.elements) {
				promises.push(this.elements[key].setValue(''));
			}

			Promise.all(promises).then(resolve);
		});
	}

	getValues() {
		const data = {};

		for(let name in this.elements) {
			data[name] = this.elements[name].state.value;
		}

		return data;
	}

	render() {
		this.elements = {};
		
		const opts = {
			ref: ref =>  ref && ref.getElements && Object.assign(this.elements, ref.getElements()),
			onChange: this.props.onChange,
			form: this
		};

		if(this.props.name) {
			opts.prefix = this.props.name;
		}

		const form = <form ref={ref => this.form = ref} onSubmit={e => {
				e.preventDefault();

				if(this.props.onSubmit) this.props.onSubmit(this);
			}}>
			{ this.props.children.map((child, index) => {
				if(!child) return null;

				const el = React.cloneElement(child, {
					...opts,
					key: index,
					value: this.props.values ? this.props.values[child.props.name] : null
				});

				return el;
			})}
		</form>;

		return form;
	}
}

export { SingleRow, Field, Form };

