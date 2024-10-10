const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine untuk EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Konfigurasi axios dengan timeout dan headers
const axiosConfig = {
    timeout: 10000,  // Timeout 10 detik
    headers: {
        'Content-Type': 'application/json'
    }
};

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.render('index'); // Render halaman index.ejs
});

// Route untuk menampilkan daftar surah
app.get('/list-surah', async (req, res) => {
    try {
        // Fetch daftar surah dari API
        const response = await axios.get('http://api.alquran.cloud/v1/surah', axiosConfig);
        const surahs = response.data.data;
        
        // Render halaman daftar surah
        res.render('list-surah', { surahs });
    } catch (error) {
        console.error('Error fetching list of Surahs:', error.message);
        res.status(500).send('Error fetching list of Surahs');
    }
});

// Route untuk menampilkan surah dengan terjemahan
app.get('/surah/:number', async (req, res) => {
    const surahNumber = req.params.number;

    try {
        console.log(`Fetching surah number: ${surahNumber}`);
        
        // Fetch surah dari API
        const response = await axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}`, axiosConfig);
        console.log('Surah fetched successfully');

        // Fetch terjemahan surah dari API
        const translationResponse = await axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}/id.indonesian`, axiosConfig);
        const surah = response.data.data;
        const translation = translationResponse.data.data;

        // Cek jika data terjemahan ada, jika tidak kosongkan
        if (!translation || !translation.ayahs) {
            translation.ayahs = [];
        }

        // Render halaman surah
        res.render('surah', { surah, translation });
    } catch (error) {
        console.error('Error fetching Surah data:', error.response?.data || error.message);
        res.status(500).send('Error fetching Surah data: ' + (error.response?.data?.message || error.message));
    }
});

// Route untuk menampilkan jadwal sholat dengan kota yang dipilih
app.get('/jadwal-sholat', async (req, res) => {
    const city = req.query.city || 'Jakarta'; // Ambil parameter 'city' dari query string atau gunakan 'Jakarta' sebagai default
    const country = 'Indonesia'; // Tetap gunakan 'Indonesia' sebagai negara

    try {
        const response = await axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`, axiosConfig);
        const timings = response.data.data.timings;
        res.render('jadwal-sholat', { timings, city }); // Kirim 'city' dan 'timings' ke EJS
    } catch (error) {
        console.error('Error fetching prayer timings:', error.message);
        res.status(500).send('Error fetching prayer timings');
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
