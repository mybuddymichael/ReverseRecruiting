function UpdateColleges() {
	$("#collegeOutput").empty();
	for (i=0; i < colleges.length; i++){
		var name = colleges[i].schoolName;
		name = name.split("(")[0];
          $("#collegeOutput").append("<tr><td data-index="+i+">"+name+"</td></tr>");
      }
      $("td").click(function(e){
       var index = $(this).data('index');
       var college = colleges[index];
       $("td").removeClass('active');
       $(this).addClass('active');
       $('#schoolName').text(college.schoolName);
       $('#conference').text(college.conference);
       $('#overallRecord').text(college.overallRecord);
       $('#winPercent').text(college.winPercent);
       $('#conferenceRecord').text(college.conferenceRecord);
       $('#state').text(college.state);
       $('#city').text(college.city);
       $('#headCoach').text(college.headCoach);
       $('#coachPhone').text(college.coachPhone);
       $('#nickname').text(college.nickname);
       $('#rpiRanking').text(college.rpiRanking);
       $('#goalsFor').text(college.goalsFor);
       $('#goalsAgainst').text(college.goalsAgainst);
       $('#description').text(college.description);
       $('#schoolUrl').text(college.schoolUrl);
       $('#schoolSize').text(college.schoolSize);
       $('#undergradPopulation').text(college.undergradPopulation);
       $('#inStateTuition').text(college.inStateTuition);
       $('#outOfStateTuition').text(college.outOfStateTuition);
       $('#address').text(college.address);
       $('#facultyRatio').text(college.facultyRatio);
       $('#acceptanceLevel').text(college.acceptanceLevel);
       $('#acceptanceRate').text(college.acceptanceRate);
       $('#allSchoolInfo').removeClass('hide');
       var rosterDist = compileRosterData(college.rosterDistribution);
       updateRosterDistChart(rosterDist);
   });
}

function compileRosterData(rosterData) {
    var data = rosterData;
    var newData = [["Freshmen", 0],["Sophomores", 0],["Juniors", 0],["Seniors", 0]];
    for (var i = 0; i < data.length; i++) {
        switch(data[i]) {
            case "FR": newData[0][1]++; break;
            case "SO": newData[1][1]++; break;
            case "JR": newData[2][1]++; break;
            case "SR": newData[3][1]++; break;
        }
    }
    for (var j = 0; j < newData.length; j++) {
        if (newData[j][1] == 0) {
           newData.splice(j, 1);
           j--;
        }
    }
    return newData;
}

function updateRosterDistChart(compiledData) {
        var charts = Highcharts.charts;
        charts[0].series[0].update({
            data: compiledData}, true
            );
        charts[0].redraw();
}

function filterByState() {
	colleges = [];
	var filtered = [];
    var map = $('#map').vectorMap('get', 'mapObject');
    var regions = map.getSelectedRegions();
    
    if (regions.length > 0) {
        for (i=0; i < data.length; i++) {
            for (j=0; j < regions.length; j++) {
                if(data[i].state == map.getRegionName(regions[j])) {
                    filtered.push(data[i]);
                }
            }
        }
    }

    if (filtered.length >= 0 && regions.length >= 1) {
        colleges = filtered;
    } else {  
        colleges = data;
    }
    UpdateColleges();
}