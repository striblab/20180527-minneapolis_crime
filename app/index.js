/**
 * Main JS file for project.
 */
// Define globals that are added through the config.json file, here like this:
// /* global _ */
'use strict';

// Dependencies
import utilsFn from './utils.js';

// Import local ES6 modules like this:
//import utilsFn from './utils.js';

// Or import libraries installed with npm like this:
// import module from 'module';

// Setup utils function
utilsFn({});

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }
}

var selected = $.urlParam('chart');

if (selected != null) {
    $(".slide").hide();
    $("#" + selected).show();
}
if (selected == "all") {
    $(".slide").show();
}


//CHARTS
function chartTrend() {
    var padding = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartTrend",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                // ['Rate',100.4956545,92.80404871,79.66950966,79.59245596,74.20189819,54.17179711,66.22293085,56.95042699,63.470021,50.68743188],
                ['Rate', 1173.755547,1082.244291,1097.98798,1201.689795,1261.767782,1437.152931,1671.520994,1458.945415,1253.168807,1116.653866,1063.051195,945.6703612,1036.365731,1021.105508,1008.81896,1084.803778,1104.650055,1077.504096,null],
                // ['Overall', 11515.83991,13377.14567,12756.24707,13601.60424,13888.19082,13524.27212,14352.36736,14428.57475,15773.16337,17192.67048,17998.04109,16765.0647,16035.30335,16800.89983,18188.39822,18978.62705,19245.04336,null,null]
            ],
            axes: {
                'Rate': 'y',
                'Overall': 'y2'
            },
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#3580A3',"#333333"]
        },
        axis: {
            // rotated: true,
            y: {
                max: 2000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 500, 1000, 1500, 2000],
                    format: d3.format(',.0f')
                }
            },
            y2: {
                show: false,
                max: 20000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 5000, 10000, 15000, 20000],
                    format: d3.format(',.0f')
                }
            },
            x: {
                // type: 'timeseries',
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [2000, 2006, 2012, 2018],
                    multiline: false,
                }
            }
        },
        grid: {
            focus:{
                show:false
              },
          },
         regions: [
        {axis: 'x', start: 2011, end: 2016, class: 'hottest'},
      ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip gray3">' +
            '<span class="tooltip-label">' + d[0].x + '</span></div><div class="chart-tooltip blue4">' +
            '<span class="tooltip-label">Rate:</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartTrend();


function smallChart(container,end,ceiling,data) {
    var padding = {
        top: 0,
        right: 10,
        bottom: 0,
        left: 0,
    };

    var chartTrend = c3.generate({
        bindto: container,
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                // ['Rate',100.4956545,92.80404871,79.66950966,79.59245596,74.20189819,54.17179711,66.22293085,56.95042699,63.470021,50.68743188],
                data,
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == end) { return 2.5;} else { return 0; } }
        },
        color: {
            pattern: ['#3580A3']
        },
        axis: {
            // rotated: true,
            y: {
                show: false,
                max: ceiling,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 500, 1000, 1500, 2000],
                    format: d3.format(',.1f')
                }
            },
            x: {
                // type: 'timeseries',
                show: false,
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [2000, 2006, 2012, 2018],
                    multiline: false,
                }
            }
        },
        grid: {
            focus:{
                show:false
              },
          },
      //    regions: [
      //   {axis: 'x', start: 2011, end: 2016, class: 'hottest'},
      // ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip blue4">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

smallChart("#violent",2017,2000,['Rate', 1173.755547,1082.244291,1097.98798,1201.689795,1261.767782,1437.152931,1671.520994,1458.945415,1253.168807,1116.653866,1063.051195,945.6703612,1036.365731,1021.105508,1008.81896,1084.803778,1104.650055,1077.504096,null]);
smallChart("#overall",2016,20000,['Rate', 19245.04336,18978.62705,18188.39822,16800.89983,16035.30335,16765.0647,17998.04109,17192.67048,15773.16337,14428.57475,14352.36736,13524.27212,13888.19082,13601.60424,12756.24707,13377.14567,11515.83991,null,null]);
smallChart("#arson",2016,100,['Rate', 70.04375121,67.98345387,69.50614058,65.39452517,63.80753138,57.51706813,63.40696446,49.48198546,40.49921693,35.94601374,31.10476818,36.09428859,30.62763083,30.67805995,28.69140449,28.12005323,20.71665333,null,null]);
smallChart("#mtv",2017,2000,['Rate', 1018.77068,1074.922996,917.951398,940.6348501,970.7112971,1017.252541,956.7750084,827.2769445,625.1746208,479.969795,492.7099833,463.0381594,488.4714456,396.8194584,378.5806508,421.8007985,478.1498838,568.6364156,null]);
smallChart("#homicide",2017,50,['Rate', 13.06786403,11.24341737,12.28116018,12.03259263,14.12133891,12.1224314,14.69185762,12.11277769,10.25296631,4.913483893,10.19399965,9.539204843,10.99453415,9.976604862,7.780719862,12.1207126,8.810530727,9.763020536,null]);
smallChart("#rape",2017,200,['Rate', 116.0426326,106.4202528,100.6009929,104.6312403,107.7405858,110.649427,122.9476506,122.4163703,101.2480423,107.3208324,134.874457,96.42331382,116.2279324,99.26721837,100.4199157,108.1167564,111.9175525,122.1568179,null]);
smallChart("#assault",2017,1000,['Rate', 526.6349205,452.8743927,508.7535929,503.7994219,541.3179916,637.3303827,739.7479187,664.656461,611.8457646,562.9818124,508.1316751,425.6547891,454.7025193,444.7071617,442.2852947,503.4944014,544.109803,522.9169048,null]);
smallChart("#burglary",2017,2000,['Rate', 1193.357343,1074.922996,1166.448916,1179.978812,1252.876569,1431.994449,1510.683816,1593.216844,1436.184256,1231.991435,1260.396573,1318.988432,1252.853343,1153.295522,1005.658042,864.4492227,817.474378,895.5785423,null]);
smallChart("#larceny",2017,4000,['Rate', 3898.143841,3812.564388,3856.545597,3231.797434,2810.40795,3361.524434,3397.169884,3415.54559,3287.613648,2946.0215,2987.103284,3195.375806,3351.238718,3315.724626,3303.401877,2940.000048,2905.57016,3132.977102,null]);
smallChart("#robbery",2017,1000,['Rate', 518.0101302,511.7062278,476.3522341,581.2265397,598.5878661,677.0506898,794.133567,659.7598062,529.8220341,441.4377371,409.8510631,414.0530534,454.4407447,467.1545226,458.3330294,461.0719073,439.812169,422.6673525,null]);


d3.json("./data/rates.json", function(error, dataLoadCounts) {

    var dataCounts = dataLoadCounts.rates;

    var aspect = 800 / 500,
        chart = $("#country svg");

    $(window).on("resize", function() {
        var targetWidth = chart.parent().width();
        chart.attr("width", targetWidth);
        chart.attr("height", targetWidth / aspect);
    });

    function mapColor(d, subject, dataCompare) {

        var color = "";

        var color_scale = d3.scale.linear().domain([0, 30]).range(['#D1E6E1','#0D4673']);

        for (var i = 0; i < dataCompare.length; i++) {
            if (d.properties.neighbor_1 == dataCompare[i].neighbor_1) {
                    return color_scale(dataCompare[i].rate);
            }
        }

        // for (var i = 0; i < dataCompare.length; i++) {
        //     if (d.properties.neighbor_1 == dataCompare[i].neighbor_1) {
        //         if (dataCompare[i].rate >= 30) {
        //             return "#0D4673";
        //         } else if (dataCompare[i].rate >= 20) {
        //             return "#3580A3";
        //         } else if (dataCompare[i].rate >= 10) {
        //             return "#67B4C2";
        //         } else if (dataCompare[i].rate >= 5) {
        //             return "#A7E6E3";
        //         } else if (dataCompare[i].rate >= 0) {
        //             return "#D1E6E1";
        //         }
        //     }
        // }
    }

    function mapTips(d, subject, dataCompare) {
        var color = "";
        var rate = 0;


        var color_scale = d3.scale.linear().domain([0, 30]).range(['#D1E6E1','#0D4673']);

        for (var i = 0; i < dataCompare.length; i++) {
            if (d.properties.neighbor_1 == dataCompare[i].neighbor_1) {
                    color = color_scale(dataCompare[i].rate);
                    rate = dataCompare[i].rate;
            }
        }

        // for (var i = 0; i < dataCompare.length; i++) {
        //     if (d.properties.neighbor_1 == dataCompare[i].neighbor_1) {
        //         if (dataCompare[i].rate >= 20) {
        //             color = "blue5";
        //             rate = dataCompare[i].rate;
        //         } else if (dataCompare[i].rate >= 15) {
        //             color = "blue4";
        //             rate = dataCompare[i].rate;
        //         } else if (dataCompare[i].rate >= 10) {
        //             color = "blue3";
        //             rate = dataCompare[i].rate;
        //         } else if (dataCompare[i].rate >= 5) {
        //             color = "blue2";
        //             rate = dataCompare[i].rate;
        //         } else if (dataCompare[i].rate >= 0) {
        //             color = "blue1";
        //             rate = dataCompare[i].rate;
        //         }
        //     }
        // }

        return "<div>" + d.properties.Name + "</div><div><span class='legendary' style='background-color:" + color + "'>" + d3.format(",.1f")(rate) + "</span> per 1,000 people</div>";

    }

    function mapBuild(container, boxContainer, chartContainer, shape, subject, geo, dataCompare, index, visible) {

        if (geo == "country") {
            var width = 800,
                height = 500,
                centered;
            var projection = d3.geo.albersUsa().scale(1000).translate([400, 260]);
        } else if (geo == "us") {
            var width = 800,
                height = 500,
                centered;
            var projection = d3.geo.albersUsa().scale(2000).translate([330, 430]);
        } else if (geo == "mn") {
            var width = 350,
                height = 500,
                centered;
            var projection = d3.geo.albersUsa().scale(5037).translate([50, 970]);
        } else if (geo == "metro") {
            var projection = d3.geo.mercator().scale([80000]).center([-93.070335, 44.930977]);
        }

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select(container + " svg")
            .attr("width", width)
            .attr("height", height);

        svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g");

        d3.json("shapefiles/" + shape, function(error, us) {
            d3.json("shapefiles/us_states_topo.json", function(error, st) {

                g.append("g")
                    .attr("class", "states")
                    .selectAll("path")
                    .data(us.features)
                    .enter().append("path")
                    .attr("d", path)
                    // .on("click", clicked)
                    .attr("id", function(d) {
                        var str = d.properties.Name;
                        return str.replace(new RegExp(" ", "g"), "-");
                    })
                    .style("fill", function(d) {
                        return mapColor(d, subject, dataCompare);
                    })
                    .on("mousedown", function(d, i) {

                    })
                    .style("stroke-width", ".5px")
                    .style("stroke", "#fff")
                    .call(d3.helper.tooltip(function(d, i) {
                        return mapTips(d, subject, dataCompare);
                    }));

                g.append("path")
                    //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
                    .attr("id", "state-borders")
                    .attr("d", path);

                //     if (subject == "national") { var marks = dataUS; var size = "2px"; }
                //     if (subject == "state") { var marks = dataMN; var size = "5px"; }

                // svg.selectAll("circle")
                //   .data(marks)
                //   .enter()
                //   .append("circle")
                //   .attr('class','mark')
                //   .attr('width', 10)
                //   .attr('height', 10)
                //   .style("opacity",0.5)
                //   .attr("r", size)
                //   .attr("fill", "#333")
                //   .attr("transform", function(d) { if(d.longitude != null) { return "translate(" + projection([d.longitude,d.latitude]) + ")";}})
                //   .call(d3.helper.tooltip(function(d, i){
                //       return "<div>" + d3.time.format("%Y-%m-%d")(new Date(d.datetime)) + "</div><div>" + d.comments + "</div>";
                //     }));

                // svg.insert("path", ".graticule")
                //   .datum(topojson.mesh(st, st.objects.us_states, function(a, b) { return a !== b; }))
                //   .attr("class", "state-boundary")
                //   .style("stroke-width", "1.2px")
                //   .attr("d", path);

                // svg.selectAll("text")
                //   .data(marks)
                //   .enter()
                //   .append("text")
                //   .attr('class','city-label')
                //   .attr("transform", function(d) {return "translate(" + projection([d.long+.23,d.lat-.09]) + ")";})
                //   .text(function(d) { return " " + d.name; });



            });
        });

        var zoom = d3.behavior.zoom()
            .on("zoom", function() {
                g.attr("transform", "translate(" +
                    d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
                g.selectAll("circle")
                    .attr("d", path.projection(projection));
                g.selectAll("path")
                    .attr("d", path.projection(projection));

            });

        $(".zoom").click(function() {
            clicked2();
            $('#filter input').val("");
            $("#districtName").html("Midwest");
            $(".district").removeClass("selected");
            $('.card, .card div').show();
        });

        function clicked(d) {
            var x, y, k;

            if (d && centered !== d) {
                var centroid = path.centroid(d);
                x = centroid[0];
                y = centroid[1];
                k = 6;
                centered = d;
            } else {
                x = width / 2;
                y = height / 2;
                k = 3;
                centered = null;
            }

            g.selectAll("path")
                .classed("faded", true)
                .classed("active", centered && function(d) {
                    return d === centered;
                });

            g.transition()
                .duration(750)
                // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }

        function clicked2(d) {
            var x, y, k;

            if (d && centered !== d) {
                var centroid = path.centroid(d);
                x = centroid[0];
                y = centroid[1];
                k = 1;
                centered = d;
            } else {
                x = width / 2;
                y = height / 2;
                k = 1;
                centered = null;
            }

            g.selectAll("path")
                .classed("faded", false)
                .classed("active", centered && function(d) {
                    return d === centered;
                });

            g.transition()
                .duration(750)
                // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }

        d3.helper = {};

        d3.helper.tooltip = function(accessor) {
            return function(selection) {
                var tooltipDiv;
                var bodyNode = d3.select('body').node();
                selection.on("mouseover", function(d, i) {
                        // Clean up lost tooltips
                        d3.select('body').selectAll('div.tooltip').remove();
                        // Append tooltip
                        tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
                        var absoluteMousePos = d3.mouse(bodyNode);
                        tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
                            .style('top', (absoluteMousePos[1] - 15) + 'px')
                            .style('position', 'absolute')
                            .style('z-index', 1001);
                        // Add text using the accessor function
                        var tooltipText = accessor(d, i) || '';
                        // Crop text arbitrarily
                        //tooltipDiv.style('width', function(d, i){return (tooltipText.length > 80) ? '300px' : null;})
                        //    .html(tooltipText);
                    })
                    .on('mousemove', function(d, i) {
                        // Move tooltip
                        var absoluteMousePos = d3.mouse(bodyNode);
                        tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
                            .style('top', (absoluteMousePos[1] - 15) + 'px');
                        var tooltipText = accessor(d, i) || '';
                        tooltipDiv.html(tooltipText);
                    })
                    .on("mouseout", function(d, i) {
                        // Remove tooltip
                        tooltipDiv.remove();
                    });

            };
        };

    }

    mapBuild("#map", "#districtName", "#chart", "minneapolis_neighborhoods.json", "state", "metro", dataCounts, 2, 1);

    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);

});

d3.json("shapefiles/minneapolis_neighborhoods.json", function(error, nb) {
d3.json("data/incidents.geojson", function(error, incidents) {
//crime rate map
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';

var map = new mapboxgl.Map({
    container: 'mapSearch', // container id
    style: 'mapbox://styles/shadowflare/ciqzo0bu20004bknkbrhrm6wf',
    center: [-93.264313, 44.973269], 
    zoom: 10,
    minZoom: 10,
    hash: false
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();
map.doubleClickZoom.disable();

map.on('load', function() {

 map.addSource('nb', {
   type: 'geojson',
   data: nb
 });

  map.addLayer({
       'id': 'nb-layer',
       'interactive': true,
       'source': 'nb',
       'layout': {},
       'type': 'fill',
            'paint': {
           'fill-antialias' : true,
           'fill-opacity': 0.7,
           'fill-color': "#888888",
           'fill-outline-color': 'rgba(0, 0, 0, 1)'
     }
   }, 'building');

 map.addSource('incidents', {
   type: 'geojson',
   data: incidents
 });

        //  map.addLayer({
        //           "id": "theft-layer",
        //           "type": "circle",
        //           "source": "incidents",
        //           "paint": {
        //              "circle-radius": 2,
        //              "circle-color": 'rgba(66, 134, 244, 0.09)'
        //           },
        //          "filter": [
        //           "==",
        //           "Offense",
        //           "THEFT"]
        // });

        //  map.addLayer({
        //           "id": "arson-layer",
        //           "type": "circle",
        //           "source": "incidents",
        //           "paint": {
        //              "circle-radius": 2,
        //              "circle-color": 'rgba(224,114,66, 0.09)'
        //           },
        //          "filter": [
        //           "==",
        //           "Offense",
        //           "ARSON"]
        // });

        //  map.addLayer({
        //           "id": "autoth-layer",
        //           "type": "circle",
        //           "source": "incidents",
        //           "paint": {
        //              "circle-radius": 2,
        //              "circle-color": 'rgba(41,158,61, 0.09)'
        //           },
        //          "filter": [
        //           "==",
        //           "Offense",
        //           "AUTOTH"]
        // });

        //  map.addLayer({
        //           "id": "incidents-layer",
        //           "type": "circle",
        //           "source": "incidents",
        //           "paint": {
        //              "circle-radius": 1,
        //              "circle-color": 'rgba(66, 134, 244, 0.09)'
        //           },
        //          "filter": [
        //           "==",
        //           "Offense",
        //           "THEFT"]
        // });


// var popup = new mapboxgl.Popup({
//     closeButton: false,
//     closeOnClick: false
// });

// map.on('mousemove', function(e) {
//     var features = map.queryRenderedFeatures(e.point, { layers: ['shootings-layer','shootings-layer2'] });
//     // Change the cursor style as a UI indicator.
//     map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

//     if (!features.length) {
//         popup.remove();
//         return;
//     }

//     var feature = features[0];

//     // Populate the popup and set its coordinates
//     // based on the feature found.
//     popup.setLngLat(e.lngLat)
//         .setHTML("<div>" + feature.properties.FirstName + " " + feature.properties.LastName + "</div><div>died in " + feature.properties.year + "</div><div>" + feature.properties.WeaponCategory + "</div>")
//         .addTo(map);
// });

});
});
});

function timeGrid(container){
    d3.json("data/time.json", function(error, dataLoad) {
        var data = dataLoad.time;

          d3.select(container).selectAll(".row")
            .data(data).enter().append("div")
            //.filter(function(d){ return d.rating == lean; })
            .attr("class", "row")
            .on("click", function(d) {

            })
            .html(function(d) {

                var times = [];
                times[0] = d.h0;
                times[1] = d.h1;
                times[2] = d.h2;
                times[3] = d.h3;
                times[4] = d.h4;
                times[5] = d.h5;
                times[6] = d.h6;
                times[7] = d.h7;
                times[8] = d.h8;
                times[9] = d.h9;
                times[10] = d.h10;
                times[11] = d.h11;
                times[12] = d.h12;
                times[13] = d.h13;
                times[14] = d.h14;
                times[15] = d.h15;
                times[16] = d.h16;
                times[17] = d.h17;
                times[18] = d.h18;
                times[19] = d.h19;
                times[20] = d.h20;
                times[21] = d.h21;
                times[22] = d.h22;
                times[23] = d.h23;

                var color_scale = d3.scale.linear().domain([0, 2500]).range(['#D1E6E1','#0D4673']);

                var timeGrid = "";
                var divide = "";

                for (var i=0; i < 24; i++) {
                    if (i == 3 || i == 7 || i == 11 || i == 15 || i == 19) {
                        divide = "divide";
                    } else { divide = ""; }

                    timeGrid += "<div class='time " + divide + "' style='background-color:" + color_scale(times[i]) + "'></div>"
                }


              return "<div class='type'>" + d.community + "</div>" + timeGrid;
            });


    });
}

timeGrid("#chartTime");

