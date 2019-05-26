var arrLang = {
    'en': {
        'languageCenter':'Language Center',
        'profileCenter':'Profile Center',
        'profile':'<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</a>',
        'activity-logs':'<i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>Activity Logs</a>',
        'logout':'<i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout</a>',
        'search':"Search users with write user's name or surname...",
        'copyright':'Copyright &copy; 2019 - SBI Bilişim A.Ş. All Rights Reserved.',
        'dashboard':'Dashboard',
        'adminPanel':'Admin Panel',
        'adminComponents':'Admin Components',
        'admin':'Admin',
        'barChart':'Bar Chart',
        'users':'Users',
        'authorizations':'Authorizations',
        'adminUsers':'<h1 class="h3 mb-0 text-gray-800" id="title">Admin / <a class="lang" href="/users">Users</a></h1>',
        'adminAuth':'<h1 class="h3 mb-0 text-gray-800" id="title">Admin / <a class="lang" href="/authorizations">Authorizations</a></h1>',
        'send':'Send',
        'message':'Message',
        'messages':'Messages',
        'profileTitle':'Profile',
        'account':'Account',
        'image':'Image',
        'email':'E-Mail:',
        'firstName':'First Name:',
        'lastName':'Last Name:',
        'oldPass':'Old Password:',
        'newPass':'New Password:',
        'newPassAgain':'New Password Again:',
        'update':'Update',
        'turkish':'<img class="lang" src="img/turkish.png" width="16" height="16" key="turkish" /> Turkish',
        'english':'<img src="img/english.png" width="16" height="16" /> English',
        'activityTitle':'Activity Logs',
        'charts':'Charts',
        'pieChart':'Pie Chart'
    },
    'tr': {
        'languageCenter':'Dil Seçim Merkezi',
        'profileCenter':'Profil Merkezi',
        'profile':'<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profil</a>',
        'activity-logs':'<i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>Aktiviteler</a>',
        'logout':'<i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Çıkış</a>',
        'search':"Kullanıcının adını veya soyadını yazarak arama yapınız...",
        'copyright':'Telif Hakkı &copy; 2019 - SBI Bilişim A.Ş. Tüm hakları Saklıdır.',
        'dashboard':'Kontrol Paneli',
        'adminPanel':'Yönetici Paneli',
        'adminComponents':'Yönetici Elemanları',
        'admin':'Yönetici',
        'barChart':'Çubuk Grafiği',
        'users':'Kullanıcılar',
        'authorizations':'Yetkilendirmeler',
        'adminUsers':'<h1 class="h3 mb-0 text-gray-800" id="title">Yönetici / <a class="lang" href="/users">Kullanıcılar</a></h1>',
        'adminAuth':'<h1 class="h3 mb-0 text-gray-800" id="title">Yönetici / <a class="lang" href="/authorizations">Yetkilendirmeler</a></h1>',
        'send':'Gönder',
        'message':'Mesaj',
        'messages':'Mesajlar',
        'profileTitle':'Profil',
        'account':'Hesap',
        'image':'Resim',
        'email':'E-Posta:',
        'firstName':'Adınız:',
        'lastName':'Soyadınız:',
        'oldPass':'Eski Şifre:',
        'newPass':'Yeni Şifre:',
        'newPassAgain':'Yeni Şifre Tekrar:',
        'update':'Güncelle',
        'turkish':'<img class="lang" src="img/turkish.png" width="16" height="16" key="turkish" /> Türkçe',
        'english':'<img src="img/english.png" width="16" height="16" /> İngilizce',
        'activityTitle':'Aktiviteler',
        'charts':'Grafikler',
        'pieChart':'Pasta Grafiği'
    }
};
$(function () {
    $('.translate').click(function () {
        var lang = $(this).attr('id');
        $('.lang').each(function (index, element) {
            $(this).html(arrLang[lang][$(this).attr('key')]);
            $(this).attr("placeholder", arrLang[lang][$(this).attr('key')]);
        });
    });
});