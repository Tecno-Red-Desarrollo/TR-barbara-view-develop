const credentials = {
    _userId: '6308',
    _token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImVvdmllZG8iLCJ1c2VySWQiOjYzMDgsImF2aXNvUHJ1ZWJhIjpmYWxzZSwiYXNlZ3VyYWRvcmFzIjpbNjcsNDgsMTAsMzgsNzAsMzUsNCw1Nyw2OSw1OSw3NCw2Myw3NSw0Niw3Myw5LDMyLDQ1LDY2LDQ3LDI4LDcxLDQyLDM2LDYyLDIxLDEyLDQwLDI5LDcyLDc4LDE0LDc3LDYsNTEsNjAsMTgsMzEsMTEsMzQsMTMsNzYsNDMsNSw3LDU4LDY4LDUwLDMzXSwicm9sIjo0LCJpYXQiOjE3MzA4MzUwMDAsImV4cCI6MTczMjA0NDYwMH0.nvF7mzao4zYN0_xKzntMKXoaXy3ThrmaPoQ-7ZpiFJQ',
    _aseguradoras: '|67|48|10|38|70|35|4|57|69|59|63|46|9|32|45|66|47|28|71|42|36|62|21|12|40|29|72|14|6|51|60|18|31|11|34|13|43|5|7|58|68|50|33|'
}

localStorage.clear()

localStorage.setItem('userId', credentials._userId);
localStorage.setItem('token', credentials._token);
localStorage.setItem('aseguradoras', credentials._aseguradoras);