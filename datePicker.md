How to add the date range picker to your page

Add this to the header after the <link> for datatables
<link href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" rel="stylesheet">

Add this to the footer after <script src="js/index.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.js"></script>

Add this immediately after the </header> tag
<input type="text" id="daterange" />

Add a class pickerTable to your <table>