/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
//import apiFetch from '@wordpress/api-fetch';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Autocomplete } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
* A user mentions completer.
*
* @type {Completer}
*/


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {


		const autoConfigs = [
			{	
				//The name of the completer.
				name: "resorts",
				
				// The prefix that triggers this completer
				triggerPrefix: "/",
				
				//The raw options for completion. May be an array, a function that returns an array, or a function that returns a promise for an array
				options () {
					async function loadNames() {
					const response = await fetch('https://api.fnugg.no/search');
					const names = await response.json();

					console.log(names); 

					}
					loadNames();
				},

				//A function that returns the label for a given option. A label may be a string or a mixed array of strings, elements, and components.
				getOptionLabel: option => (
					<span>
					{ option.hits.hits[0]._source.name }
					</span>
				),

				// A function that returns the keywords for the specified option.
				getOptionKeywords: option => [ option.hits.hits[0]._source.name ],

				//A function that takes an option and responds with how the option should be completed. 
				getOptionCompletion: option => (
				<abbr title={ option.hits.hits[0]._source.name }>{ option.hits.hits[0]._source.name }</abbr>
			),
			}
		];

		return (
			<div { ...useBlockProps() }>
				<RichText
					autocompleters={ autoConfigs }
					value={attributes.name}
					onChange={ ( newValue ) => {
						setAttributes( { value: newValue } );
					} }
					placeholder={ __(`Type ${autoConfigs[0].triggerPrefix} to choose a ${autoConfigs[0].name}`) }
				/>
			</div>
		)
	}





	

