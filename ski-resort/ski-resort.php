<?php
/**
 * Plugin Name:       Ski Resort
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ski-resort
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 
function create_block_ski_resort_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_ski_resort_block_init' );


//Create a PHP class that handles all REST API calls that you use as a middleware

class fnugMiddleware{

	 public static function staticMethod(){

		$apiUrl = 'https://example.com/wp-json/wp/v2/posts?page=0&per_page=0';
		$response = wp_remote_get($apiUrl);
		$responseBody = wp_remote_retrieve_body( $response );
		$result = json_decode( $responseBody );
		if ( is_array( $result ) && ! is_wp_error( $result ) ) {
			// Work with the $result data
		} else {
			// Work with the error
		}
	}

}

