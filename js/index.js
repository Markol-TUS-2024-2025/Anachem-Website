/*Side menu*/

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const mobileNavList = document.getElementById('mobileNavList');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileNavList.classList.toggle('active');
      hamburgerIcon.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mobileNavList.contains(event.target);
      const isClickInsideToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideMenu && !isClickInsideToggle && mobileNavList.classList.contains('active')) {
        mobileNavList.classList.remove('active');
        hamburgerIcon.classList.remove('active');
      }
    });

    // Prevent clicks within the menu from closing it
    mobileNavList.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Active link handling
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Remove active class from all links
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Close mobile menu if open
        if (mobileNavList.classList.contains('active')) {
          mobileNavList.classList.remove('active');
          hamburgerIcon.classList.remove('active');
        }
      });
    });
  });
  

/** 
 * this file is for including javaScript files in our project
 * it is loaded in the html footer so that it doesn't slow down content loading (non-blocking)
 */

jQuery(document).ready(function () {
    /**
     * This is for most datatables in the project
     */
    jQuery('#myTable').DataTable();

    /**
     * This is to get the delete functionality working on the Tasks List page in tasks.html
     */
    var taskTable = new DataTable('#taskTable');

    jQuery('#delete').on('click', function () {
        var data = taskTable
            .rows(function (idx, data, node) {
                return $(node).find('input[type="checkbox"][name="chkbx"]').prop('checked');
            }, { search: 'applied' })
            .data()
            .toArray();

        data.forEach(function (row) {
            var checkbox = $(row[0]);
            var checkboxID = checkbox.attr('id'); // Get the id of the checkbox
            taskTable
                .row($('#' + checkboxID).parents('tr'))
                .remove()
                .draw();
        });
    });

    
    /**
     * This code is for the Create order form.
     * It allows us to add rows to the order table and calculate totals
     * Tables with this id will calculate the total (as long as the total is in column)
     */
    jQuery('#table-with-total').DataTable({
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // converting to interger to find total
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // computing column Total of the complete result 
            var monTotal = api
                .column(5)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);


            // Update footer by showing the total with the reference of the column index 
            $(api.column(0).footer()).html('Total');
            $(api.column(5).footer()).html(monTotal);
        },
        "processing": true
    });


    var table = new DataTable('#table-with-total');
    /**
     * Add a new row
     */
    jQuery("#addRow").on('click', function () {
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
    jQuery("#product, #qty").on('change', function () {
        let unitCost = jQuery("#product").val();
        let qty = jQuery('#qty').val();
        let total = qty * unitCost;

        jQuery('#unit-price').html(unitCost);
        jQuery('#total').html(total);
    });


    /**
     * Date range picker for the orders table
     */
    var pickerTable = jQuery('#pickerTable').DataTable();

    // Initialize the date range picker
    $('#daterange').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    // When a date range is selected
    $('#daterange').on('apply.daterangepicker', function(ev, picker) {
        // Get the start and end date
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');

        console.log(startDate, endDate);

        // Filter the DataTable
        pickerTable.column(1).search(startDate + '|' + endDate, true, false).draw();
    });

    // Clear filter when the cancel button is clicked
    $('#daterange').on('cancel.daterangepicker', function(ev, picker) {
        // Reset DataTable filter
        pickerTable.column(1).search('').draw();
    });


    // end jQuery
});


