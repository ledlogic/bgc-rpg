/**
 * Table Edit - jQuery plugin for inline table editing
 * Control-click any th or td element to edit its content
 */
(function($) {
    'use strict';
    
    $(document).ready(function() {
        // Attach click handler to all table th and td elements
        $(document).on('click', 'table > tbody > tr > td, table > thead > tr > th, table > tbody > tr > th, table > tfoot > tr > td, table > tfoot > tr > th, table > tr > td, table > tr > th', function(e) {
            // Check if Control key (Ctrl on Windows/Linux, Cmd on Mac) is pressed
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                
                var $cell = $(this);
                var currentContent = $cell.html();
                
                // Show prompt with current content
                var newContent = prompt('Edit cell content:', currentContent);
                
                // Only update if user didn't cancel and content changed
                if (newContent !== null) {
                    $cell.html(newContent);
                }
            }
        });
    });
    
})(jQuery);
