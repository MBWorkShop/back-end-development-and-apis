import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Do not change code above this line

const timestampHandler = (req, res) => {
    const { date } = req.params; // URL-Parameter als String extrahieren

    const timestamp = Number(date); // Versucht, den String in eine Zahl umzuwandeln; bei Nicht-Zahlen entsteht NaN

    let parsedDate; // zunächst undefined, wird später mit einem Date-Objekt gefüllt

    // Prüfen, ob der URL-String eine Zahl enthält.
    // Falls ja, wird er als Unix-Timestamp interpretiert.
    // Andernfalls wird er als Datumsstring interpretiert. (kann Objekt mit "Invalid Date" erzeugen)

    if (!Number.isNaN(timestamp)) {
        parsedDate = new Date(timestamp);
    } else {
        parsedDate = new Date(date);
    }

    // Prüfen, ob das erzeugte Date-Objekt ein gültiges Datum enthält

    if (Number.isNaN(parsedDate.getTime())) {
        return res.json({ error: "Invalid Date" });
    }

    res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
    });
};


app.get("/api", timestampHandler);
app.get("/api/:date", timestampHandler);



// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});