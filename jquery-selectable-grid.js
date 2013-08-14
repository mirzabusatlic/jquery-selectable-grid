/**
 * jQuery plugin for creating a selectable table grid.
 *
 * @requires jquery.ui
 *
 * @author Mirza Busatlic
 * @url http://github.com/mirzabusatlic/jquery-selectable-grid
 */
(function($) {
	
	$.fn.selectableGrid = function(options) {
		
		var defaults = {
			// The number of rows in the grid.
			rows: 0,
			// The number of columns in the grid.
			columns: 0,
			/**
			 * Definition for the element at the specified row and column.
			 * @param {object} $element
			 * @param {int} row
			 * @param {int} column
			 * @returns {object} The modified element.
			 */
			element: function($element, row, column) {
				return $element;	
			},
			/**
			 * Triggered when the selection has started.
			 * @param {object} $element
			 */
			onStart: function($table) {
				
			},
			/**
			 * Triggered when the specified element has been selected.
			 * @param {object} $element
			 */
			onSelected: function($element) {
				
			},
			/**
			 * Triggered when the specified element has been unselected.
			 * @param {object} $element
			 */
			onUnselected: function($element) {
				
			},
			/**
			 * Triggered when the start position element has been defined.
			 * @param {object} $element
			 */
			onSelectedStart: function($element) {
				
			},
			/**
			 * Triggered when the end position element has been defined.
			 * @param {object} $element
			 */
			onSelectedEnd: function($element) {
				
			}
		}
		
		var settings = $.extend(defaults, options);
		
		this.each(function() {
			
			var $table = $(this);
			var selected = new Array();
			
			// Initialize selectable.
			$table.selectable({
				filter: "td",
				start: function(event, ui) {
					selected = [];
					settings.onStart($table);
				},
				stop: function(event, ui) {
					if(selected.length) {
						var $start = selected[0];
						var $end = selected[selected.length - 1];
						settings.onSelectedStart($start);
						settings.onSelectedEnd($end);
					}
				},
				selected: function(event, ui) {
					var $item = $(ui.selected);
					selected.push($item);
					settings.onSelected($item);
				},
				unselected: function(event, ui) {
					var $item = $(ui.selected);
					settings.onUnselected($item);
				}
			});
			
			// Populate the table.
			for(var row = 0; row < settings.rows; row++) {
				var $row = $("<tr>");
				for(var column = 0; column < settings.columns; column++) {
					var $column = $("<td>");
					$column.data("row", row);
					$column.data("column", column);
					// Make custom modification to the element.
					$column = settings.element($column, row, column);
					$row.append($column);
				}
				$table.append($row);
			}
			
		});
		
		return this;
	};
	
})(jQuery);
