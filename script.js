// ===== GLOBAL VARIABLES =====
let currentService = null;
let cart = [];
let chatOpen = false;

// ===== SERVICE DETAILS DATA =====
const serviceDetails = {
    perawatan1: {
        title: "Perawatan Luka Profesional",
        description: "Pilih jenis perawatan luka yang Anda butuhkan",
        type: "checkbox",
        options: [
            {
                id: "luka-diabetes",
                name: "Luka Diabetes",
                description: "Perawatan khusus untuk luka pada penderita diabetes dengan penanganan ekstra hati-hati",
                price: "Rp 300.000 - 450.000",
                image: "🩺",
                features: [
                    "Pembersihan luka steril",
                    "Perawatan luka diabetes khusus",
                    "Monitoring perkembangan",
                    "Konsultasi perawatan lanjutan"
                ],
                duration: "45-60 menit"
            },
            {
                id: "luka-bakar",
                name: "Luka Bakar",
                description: "Penanganan profesional untuk luka bakar derajat 1 dan 2",
                price: "Rp 250.000 - 400.000",
                image: "🔥",
                features: [
                    "Penanganan luka bakar",
                    "Pencegahan infeksi",
                    "Perawatan kulit pasca luka bakar",
                    "Konsultasi perawatan harian"
                ],
                duration: "30-45 menit"
            }
        ]
    },
    perawatan2: {
        title: "Perawatan Kecantikan",
        description: "Pilih jenis perawatan kecantikan yang Anda butuhkan",
        type: "checkbox",
        options: [
            {
                id: "laser-tato",
                name: "Laser Tato",
                description: "Penghapusan tato dengan teknologi laser modern yang aman dan efektif",
                price: "Rp 500.000 - 1.500.000 per sesi",
                image: "⚡",
                features: [
                    "Teknologi laser modern",
                    "Konsultasi sebelum perawatan",
                    "Perawatan pasca laser",
                    "Evaluasi hasil perawatan"
                ],
                duration: "60-90 menit"
            },
            {
                id: "kutil",
                name: "Perawatan Kutil",
                description: "Penanganan medis untuk berbagai jenis kutil dengan hasil optimal",
                price: "Rp 200.000 - 600.000",
                image: "🔍",
                features: [
                    "Diagnosis jenis kutil",
                    "Penanganan medis yang tepat",
                    "Pencegahan penyebaran",
                    "Perawatan pasca tindakan"
                ],
                duration: "30-45 menit"
            }
        ]
    },
    perawatan3: {
        title: "Layanan Sunat Modern",
        description: "Pilih metode sunat yang sesuai dengan kebutuhan",
        type: "checkbox",
        options: [
            {
                id: "sunat-ring",
                name: "Sunat Ring",
                description: "Teknik sunat modern menggunakan ring dengan proses cepat dan minim rasa sakit",
                price: "Rp 1.500.000 - 2.500.000",
                image: "💍",
                features: [
                    "Teknik sunat modern",
                    "Minim rasa sakit",
                    "Proses cepat",
                    "Perawatan pasca sunat",
                    "Konsultasi gratis"
                ],
                duration: "30-45 menit"
            }
        ]
    },
    perawatan4: {
        title: "Terapi Hipnoterapi",
        description: "Pilih jenis terapi hipnoterapi yang sesuai dengan kebutuhan Anda",
        type: "checkbox",
        options: [
            {
                id: "berhenti-merokok",
                name: "Berhenti Merokok",
                description: "Program hipnoterapi khusus untuk mengatasi kecanduan rokok secara permanen",
                price: "Rp 600.000 - 900.000",
                image: "🚭",
                features: [
                    "Konsultasi awal mendalam",
                    "Sesi hipnoterapi intensif",
                    "Teknik self-hypnosis",
                    "Follow-up dan evaluasi"
                ],
                duration: "90-120 menit"
            }
        ]
    },
    perawatan5: {
        title: "Produk Kecantikan",
        description: "Pilih produk kecantikan yang sesuai dengan kebutuhan kulit Anda",
        type: "checkbox",
        options: [
            {
                id: "serum-vitamin-c",
                name: "Serum Vitamin C",
                description: "Serum dengan kandungan vitamin C tinggi untuk mencerahkan dan meremajakan kulit",
                price: "Rp 250.000",
                image: "✨",
                features: [
                    "Kandungan Vitamin C 20%",
                    "Brightening dan anti-aging",
                    "Tekstur ringan cepat menyerap",
                    "Cocok untuk semua jenis kulit"
                ],
                duration: "Konsultasi 15 menit"
            },
            {
                id: "facial-cleanser",
                name: "Facial Cleanser",
                description: "Pembersih wajah lembut yang membersihkan tanpa mengeringkan kulit",
                price: "Rp 120.000",
                image: "🧼",
                features: [
                    "Formula lembut pH balanced",
                    "Membersihkan menyeluruh",
                    "Tidak membuat kulit kering",
                    "Cocok untuk kulit sensitif"
                ],
                duration: "Konsultasi 15 menit"
            }
        ]
    }
};

// ===== MODAL MANAGEMENT SYSTEM =====
class ModalManager {
    constructor() {
        this.modals = {};
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || 
                e.target.classList.contains('close') ||
                (e.target.classList.contains('modal') && !e.target.closest('.modal-content'))) {
                this.closeAll();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeAll();
        });
    }

    registerModal(id, element) {
        this.modals[id] = element;
    }

    openModal(id) {
        this.closeAll();
        if (this.modals[id]) {
            this.modals[id].style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(id) {
        if (this.modals[id]) {
            this.modals[id].style.display = 'none';
        }
    }

    closeAll() {
        Object.values(this.modals).forEach(modal => {
            if (modal) modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
}

const modalManager = new ModalManager();

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll untuk semua anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip untuk link yang mengarah ke modal atau admin
            if (href === '#admin' || href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu jika terbuka
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Register modals
    const modals = {
        'serviceModal': document.getElementById('serviceModal'),
        'adminLoginModal': document.getElementById('adminLoginModal'),
        'adminDashboard': document.getElementById('adminDashboard'),
        'cartModal': document.getElementById('cartModal')
    };
    
    Object.entries(modals).forEach(([id, element]) => {
        if (element) {
            modalManager.registerModal(id, element);
        }
    });
    
    // Initialize cart
    updateCart();
    
    console.log('Klinik Sehat Website initialized successfully!');
});

// ===== NAVIGATION FUNCTIONS =====
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

function showBookingModal() {
    const selectedData = JSON.parse(localStorage.getItem('selectedService') || '{}');
    if (selectedData.serviceId) {
        showBookingForm();
    } else {
        showNotification('Silakan pilih layanan terlebih dahulu', 'warning');
    }
}

// ===== SERVICE DETAIL MODAL FUNCTIONS =====
function showServiceDetail(serviceId) {
    const service = serviceDetails[serviceId];
    if (!service) return;

    let content = '';

    if (service.type === "checkbox") {
        const optionsHTML = service.options.map(option => `
            <div class="option-card">
                <div class="option-header">
                    <div class="option-checkbox">
                        <input type="checkbox" id="${option.id}" name="service-option" value="${option.id}">
                    </div>
                    <div class="option-icon">${option.image}</div>
                    <div class="option-title">
                        <h3>${option.name}</h3>
                        <p class="option-description">${option.description}</p>
                    </div>
                </div>
                
                <div class="option-details">
                    <div class="option-features">
                        <h4>Fitur Perawatan:</h4>
                        <ul>
                            ${option.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="option-meta">
                        <div class="option-price">
                            <strong>Harga:</strong> ${option.price}
                        </div>
                        <div class="option-duration">
                            <strong>Durasi:</strong> ${option.duration}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        content = `
            <div class="service-modal-header">
                <h2>${service.title}</h2>
                <p class="service-description">${service.description}</p>
                <p class="selection-info">✓ Pilih satu atau beberapa perawatan</p>
            </div>
            
            <div class="options-container">
                ${optionsHTML}
            </div>
            
            <div class="selection-summary" id="selectionSummary" style="display: none;">
                <h4>Perawatan yang Dipilih:</h4>
                <div id="selectedOptionsList"></div>
                <div class="total-price">
                    <strong>Total Estimasi: <span id="totalPrice">Rp 0</span></strong>
                </div>
            </div>
            
            <div class="service-modal-footer">
                <button class="cta-button secondary" onclick="modalManager.closeAll()">
                    Kembali
                </button>
                <button class="cta-button" id="bookingBtn" onclick="proceedToBooking('${serviceId}')" disabled>
                    📅 Lanjut ke Booking
                </button>
            </div>
        `;

    } else {
        content = `
            <div class="service-modal-header">
                <h2>${service.title}</h2>
                <p class="service-description">${service.description}</p>
            </div>
            <div class="service-modal-footer">
                <button class="cta-button secondary" onclick="modalManager.closeAll()">
                    Tutup
                </button>
            </div>
        `;
    }

    document.getElementById('serviceModalContent').innerHTML = content;
    modalManager.openModal('serviceModal');

    if (service.type === "checkbox") {
        attachCheckboxListeners(serviceId);
    }
}

function attachCheckboxListeners(serviceId) {
    const checkboxes = document.querySelectorAll('input[name="service-option"]');
    const bookingBtn = document.getElementById('bookingBtn');
    const selectionSummary = document.getElementById('selectionSummary');
    const selectedOptionsList = document.getElementById('selectedOptionsList');
    const totalPriceElement = document.getElementById('totalPrice');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectionSummary(serviceId);
        });
    });

    function updateSelectionSummary(serviceId) {
        const service = serviceDetails[serviceId];
        const selectedCheckboxes = document.querySelectorAll('input[name="service-option"]:checked');
        
        bookingBtn.disabled = selectedCheckboxes.length === 0;
        
        if (selectedCheckboxes.length > 0) {
            selectionSummary.style.display = 'block';
            
            let optionsHTML = '';
            let totalPrice = 0;
            
            selectedCheckboxes.forEach(checkbox => {
                const option = service.options.find(opt => opt.id === checkbox.value);
                if (option) {
                    optionsHTML += `
                        <div class="selected-option">
                            <span class="option-name">${option.name}</span>
                            <span class="option-price">${option.price}</span>
                        </div>
                    `;
                    
                    const priceRange = option.price.match(/(\d+\.?\d*)/g);
                    if (priceRange && priceRange.length > 0) {
                        const minPrice = parseInt(priceRange[0].replace('.', ''));
                        const maxPrice = priceRange[1] ? parseInt(priceRange[1].replace('.', '')) : minPrice;
                        const avgPrice = (minPrice + maxPrice) / 2;
                        totalPrice += avgPrice;
                    }
                }
            });
            
            selectedOptionsList.innerHTML = optionsHTML;
            totalPriceElement.textContent = `Rp ${Math.round(totalPrice).toLocaleString('id-ID')}`;
            
        } else {
            selectionSummary.style.display = 'none';
        }
    }
}

function proceedToBooking(serviceId) {
    const selectedCheckboxes = document.querySelectorAll('input[name="service-option"]:checked');
    const selectedOptions = [];
    
    selectedCheckboxes.forEach(checkbox => {
        const option = serviceDetails[serviceId].options.find(opt => opt.id === checkbox.value);
        if (option) {
            selectedOptions.push({
                id: option.id,
                name: option.name,
                price: option.price,
                duration: option.duration
            });
        }
    });
    
    localStorage.setItem('selectedService', JSON.stringify({
        serviceId: serviceId,
        serviceName: serviceDetails[serviceId].title,
        selectedOptions: selectedOptions,
        type: 'checkbox'
    }));
    
    showBookingForm();
}

// ===== BOOKING FORM FUNCTIONS =====
function showBookingForm() {
    const selectedData = JSON.parse(localStorage.getItem('selectedService') || '{}');
    
    const timeOptions = generateTimeOptions();
    const today = new Date().toISOString().split('T')[0];
    
    const content = `
        <div class="booking-form-modal">
            <div class="booking-header">
                <h2>Formulir Booking Perawatan</h2>
                <p class="form-description">Lengkapi data diri Anda untuk melanjutkan booking</p>
            </div>
            
            <div class="selected-services-summary">
                <h4>Layanan yang Dipilih:</h4>
                ${selectedData.selectedOptions ? selectedData.selectedOptions.map(option => `
                    <div class="service-summary-item">
                        <span class="service-name">${option.name}</span>
                        <span class="service-price">${option.price}</span>
                    </div>
                `).join('') : '<p>Tidak ada layanan yang dipilih</p>'}
            </div>
            
            <form id="patientBookingForm" class="booking-form">
                <div class="form-section">
                    <h4>Data Diri Pasien</h4>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="patientName">Nama Lengkap *</label>
                            <input type="text" id="patientName" name="patientName" required 
                                   placeholder="Masukkan nama lengkap">
                        </div>
                        <div class="form-group">
                            <label for="patientPhone">Nomor Telepon *</label>
                            <input type="tel" id="patientPhone" name="patientPhone" required 
                                   placeholder="Contoh: 081234567890">
                        </div>
                    </div>
                    
                    <div class="form-group full-width">
                        <label for="patientAddress">Alamat Lengkap *</label>
                        <textarea id="patientAddress" name="patientAddress" rows="3" required 
                                  placeholder="Masukkan alamat lengkap (jalan, RT/RW, kelurahan, kecamatan, kota)"></textarea>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Jadwal Perawatan</h4>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="appointmentDate">Tanggal Perawatan *</label>
                            <input type="date" id="appointmentDate" name="appointmentDate" 
                                   min="${today}" required>
                            <small class="date-note">Pilih tanggal mulai hari ini</small>
                        </div>
                        <div class="form-group">
                            <label for="appointmentTime">Jam Perawatan *</label>
                            <select id="appointmentTime" name="appointmentTime" required>
                                <option value="">Pilih Jam</option>
                                ${timeOptions}
                            </select>
                            <small class="time-note">Jam praktik: 08:00 - 17:00</small>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Informasi Tambahan</h4>
                    <div class="form-group full-width">
                        <label for="patientNotes">Catatan Tambahan (opsional)</label>
                        <textarea id="patientNotes" name="patientNotes" rows="3" 
                                  placeholder="Keluhan khusus, alergi, riwayat penyakit, atau informasi lain yang perlu kami ketahui..."></textarea>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="cta-button secondary" onclick="goBackToServiceSelection()">
                        ← Kembali ke Pilihan Layanan
                    </button>
                    <button type="submit" class="cta-button">
                        📅 Konfirmasi Booking
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('serviceModalContent').innerHTML = content;
    modalManager.openModal('serviceModal');

    setDefaultAppointmentDate();
    setupFormValidation();
    
    document.getElementById('patientBookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitBookingForm();
    });
}

function generateTimeOptions() {
    let options = '';
    for (let hour = 8; hour <= 17; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        options += `<option value="${time}">${time}</option>`;
    }
    return options;
}

function setDefaultAppointmentDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
    
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        dateInput.value = tomorrowFormatted;
    }
}

function setupFormValidation() {
    const phoneInput = document.getElementById('patientPhone');
    if (phoneInput) {