// FOR REFERENCE ONLY - DO NOT USE
/* Add a route GET request */
app.get('/', (request, response) => {   
    /* Create a dummy object */
    let name = {
        fName: "Amit",
        lName: "Kulkarni"
    }

    response.json("My name is " + name.fName);
})

app.get('/batman', (req, res) => {
    let name = "batman";
    res.json("I'm " + name);
})
