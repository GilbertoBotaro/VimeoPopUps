<?php
/**
 * Vimeo Popup Shortcode (Wordpress)
 * Creates a Vimeo Popup vid link
 * @param id - vimeo id
 * @param btn - button class name via icon font (btn, etc)
 * @param icon - show icon or not {fake boolean}
 * @example [vimeo_popup id="333916706" btn="btn-line"]Heyç Popup[/vimeo_popup]
 */
add_shortcode('vimeo_popup', 'vimeo_popup_shortcode');

function vimeo_popup_shortcode( $atts, $content = null ) {
   $atts = shortcode_atts( array(
    'id'  => '',
    'btn'   => '',
    'icon'  => '',
	), $atts, 'vimeo_popup' );

  $has_icon = (!empty($atts['icon'])) ? '<i class="icon-play"></i>' : '';

  return
    "<a class='popup-link {$atts['btn']}' data-vimeo-popup='{$atts['id']}'>
      $has_icon
      <span class='popup-link__text'>{$content}</span>
    </a>";
}
