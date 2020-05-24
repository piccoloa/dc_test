var carTypeChart = dc.rowChart('#carType'),
	gateNameChart = dc.rowChart('#gateName'),
	visCount = dc.dataCount('.dc-data-count')
//visTable = dc.DataTable('.dc-data-table')
const visTable = new dc.DataTable('.dc-data-table')

// Full dataset could give issues because of gzip
// var url = "Lekagul Sensor Data.csv.gz";
//var url = 'Lekagul_slice.csv'

// d3.csv('Lekagul_slice.csv', function(err, data) {
// 	// Timestamp,car-id,car-type,gate-name
// 	// 2015-05-01 00:43:28,20154301124328-262,4,entrance3
// 	// 2015-05-01 01:03:48,20154301124328-262,4,general-gate1
// 	// 2015-05-01 01:06:24,20154301124328-262,4,ranger-stop2
// 	// 2015-05-01 01:09:25,20154301124328-262,4,ranger-stop0
// 	if (err) throw err

// 	data.forEach(function(d) {
// 		d.Timestamp = new Date(d.Timestamp)
// 	})

// d3.csv('../templates/Lekagul_test.csv').then(data => {
//     // Since its a csv file we need to format the data a bit.
//     const dateFormatSpecifier = '%m/%d/%Y';
//     const dateFormat = d3.timeFormat(dateFormatSpecifier);
//     const dateFormatParser = d3.timeParse(dateFormatSpecifier);
//     const numberFormat = d3.format('.2f');

//     data.forEach(d => {
//         d.dd = dateFormatParser(d.date);
//         d.month = d3.timeMonth(d.dd); // pre-calculate month for better performance
//         d.close = +d.close; // coerce to number
//         d.open = +d.open;
//     });

d3.csv('/trials/test.csv').then((data) => {
	// Since its a csv file we need to format the data a bit.
	const dateFormatSpecifier = '%m/%d/%Y'
	const dateFormat = d3.timeFormat(dateFormatSpecifier)
	const dateFormatParser = d3.timeParse(dateFormatSpecifier)
	const numberFormat = d3.format('.2f')

	data.forEach((d) => {
		d.Timestamp = new dateFormatParser(d.Timestamp)
		//d.dd = dateFormatParser(d.date)
		d.month = d3.timeMonth(d.dd) // pre-calculate month for better performance
		d.close = +d.close // coerce to number
		d.open = +d.open
	})
	const ndx = crossfilter(data)
	const all = ndx.groupAll()

	const carTypeDim = ndx.dimension((d) => d['car-type'])
	const gateNameDim = ndx.dimension((d) => d['gate-name'])
	const dateDim = ndx.dimension((d) => d.Timestamp)

	const carTypeGroup = carTypeDim.group()
	const gateNameGroup = gateNameDim.group()
	const dateGroup = dateDim.group()

	carTypeChart.dimension(carTypeDim).group(carTypeGroup).elasticX(true)

	gateNameChart
		.dimension(gateNameDim)
		.group(gateNameGroup)
		.elasticX(true)
		.data(function(group) {
			return group.top(10)
		})

	visCount.dimension(ndx).group(all)

	visTable
		.dimension(dateDim)
		// Data table does not use crossfilter group but rather a closure
		// as a grouping function
		.group(function(d) {
			var format = d3.format('02d')
			return (
				d.Timestamp.getFullYear() +
				'/' +
				format(d.Timestamp.getMonth() + 1)
			)
		})
		.columns([
			'Timestamp',
			'car-id',
			'car-type',
			'gate-name'
		])

	dc.renderAll()
})
