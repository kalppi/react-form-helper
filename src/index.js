import React from 'react';

const allButLast = {
	paddingRight: '3px'
};

const allButFirst = {
	paddingLeft: '3px'
};

const SingleRow = (props) => {
	let sizeLeft = 12;
	let withoutSize = props.children.length;

	for(let index in props.children) {
		const child = props.children[index];

		if(child.props.size) {
			sizeLeft -= child.props.size;
			withoutSize--;
		}
	}

	return <div className='row'>
		{
			props.children.map((child, index) => {
				let style = {};

				if(index < props.children.length - 1) {
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
					size: size
				});
			})
		}
	</div>;
}

const Field = ({name, text, value, sub, style, size}) =>
	<div style={style} className={sub ? `form-group col-sm-${size}` : 'form-group'}>
		<label htmlFor={`info-${name}`} className='col-form-label'>{text ? text : name}</label>
		<input type='text' id={`info-${name}`} value={value || ''} className='form-control' />
	</div>;

export { SingleRow, Field };

