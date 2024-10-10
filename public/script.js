// script.js

// Fungsi untuk menampilkan notifikasi saat halaman dimuat
window.onload = function () {
    alert("Selamat datang di Baitul Hikmah! Silakan pilih menu di atas untuk melanjutkan.");
};

// Menambahkan event listener untuk link navigasi
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('mouseover', function() {
        this.style.textDecoration = 'underline'; // Menambahkan garis bawah saat hover
        this.style.color = '#0C8848'; // Mengubah warna saat hover
    });
    link.addEventListener('mouseout', function() {
        this.style.textDecoration = 'none'; // Menghapus garis bawah saat tidak hover
        this.style.color = ''; // Mengembalikan warna semula
    });
});

// Menambahkan fungsi untuk menghapus notifikasi setelah beberapa detik
setTimeout(function () {
    const alertBox = document.createElement('div');
    alertBox.innerHTML = 'Notifikasi: Anda dapat mengakses Al-Qur\'an dan jadwal sholat dari menu di atas.';
    alertBox.style.position = 'fixed';
    alertBox.style.top = '10px';
    alertBox.style.right = '10px';
    alertBox.style.backgroundColor = '#f8d7da';
    alertBox.style.color = '#721c24';
    alertBox.style.padding = '10px';
    alertBox.style.border = '1px solid #f5c6cb';
    alertBox.style.borderRadius = '5px';
    alertBox.style.zIndex = '1000';
    document.body.appendChild(alertBox);

    // Menghapus notifikasi setelah 5 detik
    setTimeout(function () {
        alertBox.remove();
    }, 5000);
}, 3000); // Tampilkan notifikasi setelah 3 detik
