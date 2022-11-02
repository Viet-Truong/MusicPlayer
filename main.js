
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      "name": "Sau Lưng Anh Có Ai Kìa",
      "singer": "Thiều Bảo Trâm",
      "path": "../music/Sau-Lưng-Anh-Có-Ai-Kìa-_Lofi-Ver._-Thiều-Bảo-Trâm-x-Freak-D.mp3",
      "image": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/8/0/7/1807c6b5fcc7058a14e1a288801221c7.jpg"
    },
    {
      "name": "Bao tiền một mớ bình yên",
      "singer": "14 Casper",
      "path": "../music/bao-tiền-một-mớ-bình-yên.mp3",
      "image": "https://images.genius.com/90950bae35ab36a6c0aa0a721d8764a5.1000x1000x1.jpg"
    },
    {
      "name": "Dù cho mai về sau",
      "singer": "Buitruonglinh",
      "path": "../music/Dù-Cho-Mai-Về-Sau-_Lofi-Ver._-buitruonglinh-x-Freak-D.mp3",
      "image": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0a/ea/c3/0aeac351-5532-0ea2-27d2-a14c118d1964/190296442711.jpg/400x400cc.jpg"
    },
    {
      "name": "Đường tôi chở em về",
      "singer": "Buitruonglinh",
      "path": "../music/Đường-Tôi-Chở-Em-Về-_Lofi-Ver._-buitruonglinh-x-Freak-D.mp3",
      "image": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/75/8d/0e/758d0e4c-2228-c9aa-f7b6-2f6c70004387/20UMGIM52129.rgb.jpg/400x400cc.jpg"
    },
    {
      "name": "Hạnh phúc bỏ rơi em",
      "singer": "Hương Ly",
      "path": "../music/Hạnh-Phúc-Bỏ-Rơi-Em-_Lofi-Ver._-Hương-Ly-x-Freak-D.mp3",
      "image": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/a6/f3/d0/a6f3d074-5fbf-ed77-1cdf-85d28465503e/cover.jpg/600x600bf-60.jpg"
    },
    {
      "name": "Kẻ cô đơn trong thành phố",
      "singer": "Khải",
      "path": "../music/Kẻ-Cô-Đơn-Trong-Thành-Phố-_Lofi-Ver._-Khải-x-Freak-D.mp3",
      "image": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/3b/f6/21/3bf62118-7fb1-c5f7-1b9c-e21541cb9060/cover.jpg/400x400cc.jpg"
    },
    {
      "name": "Một mình có buồn không",
      "singer": "Thiều Bảo Trâm",
      "path": "../music/Một-Mình-Có-Buồn-Không-_Freak-D-Lofi-Ver._-Thiều-Bảo-Trâm-ft.-Lou-Hoàng.mp3",
      "image": "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/e6/67/2d/e6672d99-3e5b-4ac4-f559-1392c2d37dcc/190296443022.jpg/400x400cc.jpg"
    },
    {
      "name": "Thương em là điều anh không thể ngờ",
      "singer": "Noo Phước Thịnh",
      "path": "../music/Thương-Em-Là-Điều-Anh-Không-Thể-Ngờ-_Lofi-Ver._-Noo-Phước-Thịnh-x-Freak-D.mp3",
      "image": "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/49/94/ba/4994bab7-65a3-a1e8-7086-5a2da321efcb/886447494011.jpg/400x400bb.jpg"
    },
    {
      "name": "Xem như ta chẳng may",
      "singer": "Chu Thuý Quỳnh, Trung Ngon",
      "path": "../music/Xem-Như-Anh-Chẳng-May-_Lofi-Ver._-Chu-Thúy-Quỳnh-x-Trung-Ngon-x-Freak-D.mp3",
      "image": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/3/5/9/53598d9828967f15b90f52c9d8c58af6.jpg"
    },
    {
      "name": "Ngày đầu tiên",
      "singer": "Đức Phúc",
      "path": "../music/Ngày Đầu Tiên (Lofi Ver.) - Đức Phúc x Freak D.mp3",
      "image": "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/02/faa13fe1-57f2-4333-9025-d5262a68425e-5570.jpeg?fit=660%2C20000&quality=95&ssl=1"
    },
    {
      "name": "Đừng xem ai đó là cả thế giới",
      "singer": "Reddy",
      "path": "../music/Đừng Xem Ai Đó Là Cả Thế Giới (Lofi Ver.) - Reddy x Freak D.mp3",
      "image": "https://i1.sndcdn.com/artworks-ogecHcPIYemtgzys-Lozwyg-t500x500.jpg"
    },
    {
      "name": "Sài gòn hôm nay mưa",
      "singer": "JSOL, Hoàng Duyên",
      "path": "../music/Sài Gòn Hôm Nay Mưa - JSOL ft. Hoàng Duyên「Lo - Fi Version by 1 9 6 7」_ Audio Lyrics.mp3",
      "image": "https://i.scdn.co/image/ab67616d0000b27377e4346732223fbfe92d0866"
    },
    {
      "name": "Kẻ điên tin vào tình yêu",
      "singer": "Lil Z Poet",
      "path": "../music/Kẻ Điên Tin Vào Tình Yêu (Lofi Ver.) - Lil Z Poet x Freak D.mp3",
      "image": "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/17/66/7a/17667ae5-7bdf-590c-2ec8-f4109673db2c/5060836964162.png/400x400cc.jpg"
    },
    {
      "name": "Thế Thái",
      "singer": "Hương Ly",
      "path": "../music/Thế Thái (Lofi Ver.) - Hương Ly x Freak D.mp3",
      "image": "https://avatar-ex-swe.nixcdn.com/song/2020/10/22/2/5/7/8/1603351803665_500.jpg"
    }
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')"></div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option"><i class="fas fa-ellipsis-h"></i></div>
        </div>
      `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
