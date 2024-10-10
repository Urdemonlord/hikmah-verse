// script.js

// Fungsi untuk menampilkan notifikasi saat halaman dimuat
window.onload = function () {
    alert("Selamat datang di Baitul Hikmah! Silakan pilih menu di atas untuk melanjutkan.");
};

// Menambahkan event listener untuk link navigasi
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('mouseover', function() {
        this.style.textDecoration = 'underline'; // Menambahkan garis bawah saat hover
    });
    link.addEventListener('mouseout', function() {
        this.style.textDecoration = 'none'; // Menghapus garis bawah saat tidak hover
    });
});
