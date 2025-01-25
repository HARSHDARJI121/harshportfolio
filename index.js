
    document.getElementById("downloadLink").addEventListener("click", function(event) {
      setTimeout(function() {
        window.open('Harsh_Darji_Resume.pdf', '_blank');  // Opens the file after download
      }, 100);  // Wait for the download to start before opening
    });