sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/app/fiorielements/test/integration/FirstJourney',
		'com/app/fiorielements/test/integration/pages/employeeList',
		'com/app/fiorielements/test/integration/pages/employeeObjectPage',
		'com/app/fiorielements/test/integration/pages/AddressObjectPage'
    ],
    function(JourneyRunner, opaJourney, employeeList, employeeObjectPage, AddressObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/app/fiorielements') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheemployeeList: employeeList,
					onTheemployeeObjectPage: employeeObjectPage,
					onTheAddressObjectPage: AddressObjectPage
                }
            },
            opaJourney.run
        );
    }
);