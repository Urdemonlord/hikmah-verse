const express = require('express');
const axios = require('axios');
const path = require('path'); 
const app = express();
const PORT = process.env.PORT || 3000;



// Set view engine untuk EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public'))); 

// Konfigurasi axios dengan timeout dan headers
const axiosConfig = {
    timeout: 10000,  
    headers: {
        'Content-Type': 'application/json'
    }
};

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.render('index'); 
});



// Data statis untuk deskripsi surah
const surahDescriptions = {
    1: "Al-Fatiha: Pembuka Al-Qur'an, berisi pujian kepada Allah.",
    2: "Al-Baqarah: Surah terpanjang, membahas hukum dan panduan hidup.",
    3: "Al-Imran: Memperkuat iman dan persatuan umat Islam.",
    4: "An-Nisa: Hukum sosial dan hak-hak perempuan.",
    5: "Al-Ma'idah: Hukum makanan dan keadilan.",
    6: "Al-An'am: Tauhid dan perdebatan dengan musyrikin.",
    7: "Al-A'raf: Kisah para nabi dan peringatan bagi yang ingkar.",
    8: "Al-Anfal: Hukum perang dan pentingnya persatuan.",
    9: "At-Tawbah: Peperangan dan kesetiaan pada janji.",
    10: "Yunus: Kisah Nabi Yunus dan pengharapan kepada Allah.",
    11: "Hud: Peringatan bagi umat manusia dan kisah Nabi Hud.",
    12: "Yusuf: Kisah Nabi Yusuf, kesabaran, dan pengampunan.",
    13: "Ar-Ra'd: Tanda-tanda kekuasaan Allah dan penjelasan wahyu.",
    14: "Ibrahim: Kisah Nabi Ibrahim dan pengajaran dari sejarah.",
    15: "Al-Hijr: Ancaman bagi kaum yang mendustakan nabi.",
    16: "An-Nahl: Tanda-tanda kekuasaan Allah dan seruan untuk bersyukur.",
    17: "Al-Isra: Perjalanan malam Nabi Muhammad dan perintah Allah.",
    18: "Al-Kahf: Kisah pemuda, orang kaya, dan Nabi Musa.",
    19: "Maryam: Kisah Maryam dan kelahiran Isa (Yesus).",
    20: "Taha: Kisah Nabi Musa dan perjuangannya melawan Fir'aun.",
    21: "Al-Anbiya: Kisah para nabi dan kebangkitan setelah mati.",
    22: "Al-Hajj: Haji dan hukum-hukum terkait ibadah.",
    23: "Al-Mu'minun: Karakteristik orang beriman.",
    24: "An-Nur: Hukum sosial dan etika dalam masyarakat.",
    25: "Al-Furqan: Pemisah antara kebenaran dan kebohongan.",
    26: "Ash-Shu'ara: Kisah para nabi dan penolakan mereka.",
    27: "An-Naml: Kisah Nabi Sulaiman dan ratu semut.",
    28: "Al-Qasas: Kisah Nabi Musa dan petunjuk bagi umat.",
    29: "Al-Ankabut: Ujian iman dan kekuatan spiritual.",
    30: "Ar-Rum: Kejayaan dan keruntuhan bangsa.",
    31: "Luqman: Nasihat Luqman kepada anaknya.",
    32: "As-Sajda: Kebenaran wahyu dan keesaan Allah.",
    33: "Al-Ahzab: Hukum-hukum keluarga dan komunitas.",
    34: "Saba: Tanda-tanda kekuasaan Allah dan syukur.",
    35: "Fatir: Ciptaan Allah dan kekuasaan-Nya.",
    36: "Ya-Sin: Surat hati Al-Qur'an, penekanan pada iman.",
    37: "As-Saffat: Perdebatan tentang keesaan Allah.",
    38: "Sad: Kisah Nabi Daud dan keadilan.",
    39: "Az-Zumar: Kesatuan umat dan hari kiamat.",
    40: "Ghafir: Doa dan pengampunan dari Allah.",
    41: "Fushilat: Penjelasan tentang wahyu dan kebenaran.",
    42: "Ash-Shura: Musyawarah dan pentingnya persatuan.",
    43: "Az-Zukhruf: Tanda-tanda Allah dan peringatan.",
    44: "Ad-Dukhan: Peringatan bagi umat dan azab.",
    45: "Al-Jathiya: Hukum dan keadilan Allah.",
    46: "Al-Ahqaf: Kisah umat yang ingkar dan kehancuran.",
    47: "Muhammad: Perjuangan Nabi Muhammad dan tawaran iman.",
    48: "Al-Fath: Kemenangan dalam perjanjian Hudaibiyah.",
    49: "Al-Hujurat: Etika sosial dan hubungan antar umat.",
    50: "Qaf: Peringatan tentang hari kebangkitan.",
    51: "Adh-Dhariyat: Tanda-tanda kekuasaan Allah.",
    52: "At-Tur: Ancaman bagi yang mendustakan wahyu.",
    53: "An-Najm: Kebenaran wahyu dan penglihatan Nabi.",
    54: "Al-Qamar: Peringatan tentang azab yang telah terjadi.",
    55: "Ar-Rahman: Rahmat Allah dan nikmat-nikmat-Nya.",
    56: "Al-Waqi'a: Hari kiamat dan pembagian orang-orang.",
    57: "Al-Hadid: Keberanian dan ketaatan kepada Allah.",
    58: "Al-Mujadila: Diskusi dan argumentasi yang benar.",
    59: "Al-Hashr: Perintah dan larangan dalam komunitas.",
    60: "Al-Mumtahanah: Hukum berhubungan dengan orang kafir.",
    61: "As-Saff: Kewajiban dalam memperjuangkan agama.",
    62: "Al-Jumu'a: Pentingnya shalat Jumat dan ilmu.",
    63: "Al-Munafiqun: Peringatan terhadap kemunafikan.",
    64: "At-Taghabun: Kehidupan dunia dan hari kiamat.",
    65: "At-Talaq: Hukum perceraian dan pernikahan.",
    66: "At-Tahrim: Larangan dan pengajaran bagi umat.",
    67: "Al-Mulk: Kebesaran Allah dan ciptaan-Nya.",
    68: "Al-Qalam: Penekanan pada akhlak dan pendidikan.",
    69: "Al-Haaqqa: Hari kiamat dan keadilan Allah.",
    70: "Al-Ma'arij: Jalan menuju Allah dan akhirat.",
    71: "Nuh: Kisah Nabi Nuh dan pengingkaran kaumnya.",
    72: "Al-Jinn: Kisah jinn dan pengakuan mereka kepada Allah.",
    73: "Al-Muzzammil: Perintah untuk beribadah dan sabar.",
    74: "Al-Muddathir: Peringatan dan tugas menyampaikan wahyu.",
    75: "Al-Qiyama: Hari kebangkitan dan kehidupan setelah mati.",
    76: "Al-Insan: Kisah penciptaan manusia dan imbalan.",
    77: "Al-Mursalat: Peringatan tentang hari kiamat.",
    78: "An-Naba: Hari kebangkitan dan pertanggungjawaban.",
    79: "An-Nazi'at: Kematian dan kehidupan setelah mati.",
    80: "Abasa: Peringatan bagi Nabi Muhammad untuk berfokus.",
    81: "At-Takwir: Tanda-tanda hari kiamat.",
    82: "Al-Infitar: Peristiwa-peristiwa hari kiamat.",
    83: "Al-Mutaffifin: Kecurangan dan keadilan Allah.",
    84: "Al-Inshiqaq: Hari kebangkitan dan pengadilan.",
    85: "Al-Buruj: Peringatan bagi orang-orang yang menindas.",
    86: "At-Takwir: Allah, pencipta langit dan bumi.",
    87: "Al-A'la: Pujian kepada Allah dan ciptaan-Nya.",
    88: "Al-Ghashiyah: Peringatan tentang azab dan nikmat.",
    89: "Al-Fajr: Peringatan tentang hari kiamat.",
    90: "Al-Balad: Peringatan tentang kota suci Makkah.",
    91: "Ash-Shams: Pujian kepada matahari dan cahaya.",
    92: "Al-Lail: Kebangkitan malam dan siang.",
    93: "Ad-Duha: Rahmat Allah bagi Nabi Muhammad.",
    94: "Al-Inshirah: Kesulitan dan kemudahan dalam hidup.",
    95: "At-Tin: Pujian kepada buah tin dan zaitun.",
    96: "Al-Alaq: Penciptaan manusia dan pentingnya membaca.",
    97: "Al-Qadr: Malam kemuliaan dan keutamaan Al-Qur'an.",
    98: "Al-Bayyina: Bukti yang jelas dan wahyu Allah.",
    99: "Az-Zalzalah: Kegemparan pada hari kiamat.",
    100: "Al-Adiyat: Kuda perang dan perjuangan.",
    101: "Al-Qari'a: Peringatan tentang hari kiamat.",
    101: "Al-Qari'a: Peringatan tentang hari kiamat.",
    102: "At-Takathur: Persaingan dunia dan kecintaan pada harta.",
    103: "Al-Asr: Pentingnya waktu dan amal saleh.",
    104: "Al-Humazah: Peringatan bagi pengumpat dan pencela.",
    105: "Al-Fil: Kisah tentara gajah dan kekuasaan Allah.",
    106: "Quraish: Pujian kepada suku Quraish dan perjalanan mereka.",
    107: "Al-Ma'un: Peringatan bagi yang mengabaikan amal kebaikan.",
    108: "Al-Kawthar: Anugerah Allah dan pentingnya shalat.",
    109: "Al-Kafirun: Penegasan bahwa tidak ada kompromi dalam iman.",
    110: "An-Nasr: Kemenangan Allah dan pentingnya syukur.",
    111: "Al-Masad: Peringatan bagi Abu Lahab dan keluarganya.",
    112: "Al-Ikhlas: Kesatuan Allah dan pentingnya tauhid.",
    113: "Al-Falaq: Permohonan perlindungan dari kejahatan.",
    114: "An-Nas: Perlindungan dari godaan syaitan."
};


app.get('/list-surah', async (req, res) => {
    try {
        const response = await axios.get('https://api.quran.com/api/v4/chapters');
        const surahs = response.data.chapters;

        // Fetch deskripsi untuk setiap surah dari data statis
        const surahsWithDescriptions = surahs.map((surah) => {
            const surahDescription = surahDescriptions[surah.id] || 'Deskripsi tidak tersedia'; // Ganti 'name' dengan 'id'
            return { ...surah, description: surahDescription }; // Memperbaiki 'description' menjadi 'surahDescription'
        });

        res.render('list-surah', { surahs: surahsWithDescriptions });
    } catch (error) {
        console.error('Error fetching list of Surahs:', error.message);
        res.status(500).send('Error fetching list of Surahs');
    }
});


// Route untuk detail surah
app.get('/surah/:number', async (req, res) => {
    const surahNumber = parseInt(req.params.number, 10); // Pastikan nomor surah adalah angka

    try {
        // Fetch detail surah dari Quran.com API
        const surahResponse = await axios.get(`https://api.quran.com/api/v4/chapters/${surahNumber}`);
        const surah = surahResponse.data.chapter;

        // Fetch ayat-ayat (Teks Arab)
        const versesResponse = await axios.get(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahNumber}`);
        const verses = versesResponse.data.verses;

        // Fetch terjemahan ayat (Bahasa Indonesia)
        const translationResponse = await axios.get(`https://api.quran.com/api/v4/quran/translations/33?chapter_number=${surahNumber}`);
        const translations = translationResponse.data.translations;

        // Fetch audio (jika tersedia di Quran.com)
        const audioResponse = await axios.get(`https://api.quran.com/api/v4/chapter_recitations/1/${surahNumber}`);
        const audio = audioResponse.data.audio_file;

        const description = surahDescriptions[surahNumber] || 'Tidak Tersedia';

        // Menentukan nomor surah sebelumnya dan berikutnya
        const previousSurah = surahNumber > 1 ? surahNumber - 1 : null; // Tidak ada surah sebelumnya untuk surah 1
        const nextSurah = surahNumber < 114 ? surahNumber + 1 : null; // Tidak ada surah berikutnya untuk surah 114

        // Render halaman surah dengan data lengkap
        res.render('surah', { surah, verses, translations, audio, description, previousSurah, nextSurah });
    } catch (error) {
        console.error('Error fetching Surah data:', error.message);
        res.status(500).send('Error fetching Surah data');
    }
});


// Route untuk menampilkan jadwal sholat
app.get('/jadwal-sholat', async (req, res) => {
    const city = req.query.city || 'Jakarta';
    const country = 'Indonesia'; 

    try {
        const response = await axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`, axiosConfig);
        const timings = response.data.data.timings;
        res.render('jadwal-sholat', { timings, city });
    } catch (error) {
        console.error('Error fetching prayer timings:', error.message);
        res.status(500).send('Error fetching prayer timings');
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
