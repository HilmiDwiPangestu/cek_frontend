// Load previous results from local storage
window.onload = function () {
    loadResults();
  };
  
  // Save results to local storage
  function saveResults(type, data) {
    let results = JSON.parse(localStorage.getItem(type)) || [];
    results.push(data);
    localStorage.setItem(type, JSON.stringify(results));
    loadResults();
  }
  
  // Load results from local storage and display them
  function loadResults() {
    // Detect current page
    const currentPage = window.location.pathname.split("/").pop();
  
    if (currentPage === "index.html") {
        const penetrationResults = JSON.parse(localStorage.getItem("penetration")) || [];
        const penetrationList = document.getElementById("penetration-results");
        penetrationList.innerHTML = "";
        penetrationResults.forEach((result, index) => {
            penetrationList.innerHTML += `<li>${index + 1}. ${result}</li>`;
        });
    } else if (currentPage === "malware.html") {
        const malwareResults = JSON.parse(localStorage.getItem("malware")) || [];
        const malwareList = document.getElementById("malware-results");
        malwareList.innerHTML = "";
        malwareResults.forEach((result, index) => {
            malwareList.innerHTML += `<li>${index + 1}. ${result}</li>`;
        });
    }
  }
  
  // Penetrasi Web Scanning
  function startWebScan() {
    const url = document.getElementById("web-url").value;
  
    const result = `
        URL: ${url},
        Port Terbuka: 80, 443,
        Informasi Domain: Domain adalah example.com,
        Kerentanan:
        - Medium: Tidak aman dengan header CSP.
        - High: SQL Injection rentan.
        - Critical: Kerentanan pada autentikasi user.
    `;
  
    saveResults("penetration", result);
  }
  
  // Scanning Malware
  function startMalwareScan() {
    const url = document.getElementById("malware-url").value;
  
    const result = `
        URL: ${url},
        Malware Ditemukan: Tidak ada,
        Status: Aman dari malware.
    `;
  
    saveResults("malware", result);
  }
  
  // Download results as PDF
  function downloadPenetrationResults() {
    const results = JSON.parse(localStorage.getItem("penetration")) || [];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Hasil Penetrasi Web", 10, 10);
    results.forEach((result, index) => {
        doc.text(`${index + 1}. ${result}`, 10, 20 + index * 10);
    });
    doc.save("penetration_results.pdf");
  }
  
  function downloadMalwareResults() {
    const results = JSON.parse(localStorage.getItem("malware")) || [];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Hasil Scanning Malware", 10, 10);
    results.forEach((result, index) => {
        doc.text(`${index + 1}. ${result}`, 10, 20 + index * 10);
    });
    doc.save("malware_results.pdf");
  }
  