/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import axios from "axios";
import { Input, Card} from "antd";
import './custom.css';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

//import { SearchControl } from '@wordpress/components';
import { useState, useEffect, React } from '@wordpress/element';
//import apiFetch from '@wordpress/api-fetch';

export default function Edit() {	

	const blockProps = useBlockProps();

	const [users, setUsers] = useState([]);
	const [text, setText] = useState('');
	const [suggessions, setSuggessions] = useState([]);
	useEffect(() => {
		const loadUsers = async () => {
			const response = await axios.get('http://react-wordpress.local/wp-json/gutenberg/v1/resort/');
			console.log(response.data.hits.hits);
			setUsers(response.data.hits.hits)
		}
		loadUsers();
	}, [])
	const onSuggessionHandler = (text) => {
		setText(text);
		setSuggessions([]);
	}
	const onChangeHandler = (text) => {
		let matches = []
		if(text.length > 0){
			matches = users.filter(user => {
				const regex = new RegExp(`${text}`, "gi");
				return user._source.name.match(regex)
			})
		}
		console.log('matches', matches);
		setSuggessions(matches)
		setText(text)
	}
	return (
		<p { ...blockProps }>
			
			<div style={{padding: "50px"}}>
			<h2 style={{marginBottom: "5px"}}>Fnugg Resort Search</h2>
			<hr />
			<h4 style={{marginTop: "10px"}}>By Shams</h4>
			</div>
			<Input type="text" style={{width: "100%", height: "50px"}}
				onChange={e=>onChangeHandler(e.target.value)}
				value={text} 
				onBlur={() => {
					setTimeout(() => {
						setSuggessions([])
					}, 200);
			}}
			/>
			{suggessions && suggessions.map((suggession, i) => 
			<div key={i} className="suggession"
			onClick={() => onSuggessionHandler(suggession._source.name)}
			>{suggession._source.name}</div>
			)}
			
		</p>
		
	)
	
		
}


