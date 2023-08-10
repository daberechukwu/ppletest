const express = require('express');
const path = require('path');
const axios = require('axios');
const exphbs = require('express-handlebars');

const app = express();
const port = 3002;
const hbs = exphbs.create({
    extname: 'handlebars',
    defaultLayout: 'main', // Replace with your layout file name if applicable
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));
// Define route to fetch and render ticket data
app.get('/ticket/:orderRef', async (req, res) => {
    try {
        const response = await axios.get("https://demoapi.ppleapp.com/api/v1/order/get-ticket-by-ref?orderRef=4D8ZVZ76EgmJql6");
        
        if (response.status === 200) {
            const ticketData = response.data.data;
            const startDate = ticketData.event.startDate;
            const lastFourDigits = ticketData.paymentCard.slice(-4);

            if (startDate) {
                const options = {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "America/Los_Angeles",
                    timeZoneName: "short",
                };

                const toParseDate = new Date(startDate);
                const formattedStartDate = new Intl.DateTimeFormat("en-US", options).format(toParseDate);

                res.render('ticket', { layout: false, ticket: ticketData, startDate: formattedStartDate, lastFourDigits: lastFourDigits });
            } else {
                res.render('notfound', { layout: false });
            }
        } else {
            res.render('notfound', { layout: false });
        }
    } catch (error) {
        console.error('Error fetching or processing ticket data:', error);
        res.render('error', { layout: false });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
