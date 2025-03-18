/** 
 * this file is for including javaScript files in our project
 * it is loaded in the html footer so that it doesn't slow down content loading (non-blocking)
 */

jQuery(document).ready(function(){
    jQuery('#myTable').DataTable();
    
    /**
     * Tables with this id will calculate the total (as long as the total is in column)
     */
    jQuery('#table-with-total').DataTable({
    	"footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
            // converting to interger to find total
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            // computing column Total of the complete result 
            var monTotal = api
                .column( 5 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
			
				
            // Update footer by showing the total with the reference of the column index 
	    $( api.column( 0 ).footer() ).html('Total');
            $( api.column( 5 ).footer() ).html(monTotal);
        },
        "processing": true
    });


    var table = new DataTable('#table-with-total');
    /**
     * Add a new row
     */
    jQuery("#addRow").on('click', function(){
        let product = jQuery(this).parent().parent().find('#product option:selected').text();
        let quantity = jQuery(this).parent().parent().find('#qty').val();
        let unit = jQuery(this).parent().parent().find('#unit-price').text();
        let tot = jQuery(this).parent().parent().find('#total').text();
        table.row
    .add([product, 'R45435', quantity, 12, unit, tot])
    .draw();
    });

    /**
     * when we change the product or the quantity, when adding a product, this updates the unit price
     */
    jQuery("#product, #qty").on('change', function(){
        let unitCost = jQuery("#product").val();
        let qty = jQuery('#qty').val();
        let total = qty * unitCost;

        jQuery('#unit-price').html(unitCost);
        jQuery('#total').html(total);
    });

    
// end jQuery
});


