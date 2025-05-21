function doPost(e) {
    try {
      // Log the incoming event to inspect it
      Logger.log('Incoming data: ' + JSON.stringify(e));
      
      var sheet = SpreadsheetApp.openById('1CG7EOvrZmPSu9QaprWJyBsqx3B1WQOvs0SBCrGXxn6k').getSheetByName('Sheet1'); // Replace with your Google Sheet ID
      
      if (e && e.parameter) {
        var data = e.parameter;
        
        // Log the individual data parameters for debugging
        Logger.log('Received data: ' + JSON.stringify(data));
        
        // Append data to the Google Sheet
        sheet.appendRow([
          data.ReasonForContact || '',
          data.ReceivedOrderStatus || '',
          data.Satisfied || '',
          data.ExperienceRating || '',
          data.TellUsMore || '',
          new Date()
        ]);
        
        // Return success message
        return ContentService.createTextOutput(
          JSON.stringify({ result: 'success' })
        ).setMimeType(ContentService.MimeType.JSON);
      } else {
        // Log error message if parameters are undefined or missing
        Logger.log('Error: No data received.');
        return ContentService.createTextOutput(
          JSON.stringify({ result: 'error', message: 'No data received.' })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    } catch (error) {
      // Log any unexpected errors
      Logger.log('Error: ' + error.message);
      return ContentService.createTextOutput(
        JSON.stringify({ result: 'error', message: error.message })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }
  