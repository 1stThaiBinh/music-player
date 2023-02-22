const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd');
const playBtn = $('.btn-toggle-play')
const player = $('.player')
progress = $('#progress')
nextBtn = $('.btn-next')
prevBtn = $('.btn-prev')
randomBtn = $('.btn-random')
repeatBtn = $('.btn-repeat')
playlist = $('.playlist')




const app = {
    currentIndex: 0,
    songs: [{
            name: 'Mtp1',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music1.mp3',
            image: './assets/img/img1.jpg'

        },
        {
            name: 'Mtp2',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music2.mp3',
            image: './assets/img/img2.jpg'

        },
        {
            name: 'Mtp3',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music3.mp3',
            image: './assets/img/img3.jpg'

        },
        {
            name: 'Mtp4',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music4.mp3',
            image: './assets/img/img4.jpg'

        },
        {
            name: 'Mtp5',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music5.mp3',
            image: './assets/img/img5.jpg'

        },
        {
            name: 'Mtp6',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music6.mp3',
            image: './assets/img/img6.jpg'

        },
        {
            name: 'Mtp7',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music7.mp3',
            image: './assets/img/img7.jpg'

        },
        {
            name: 'Mtp8',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music8.mp3',
            image: './assets/img/img8.jpg'

        },
        {
            name: 'Mtp9',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music9.mp3',
            image: './assets/img/img9.jpg'

        },
        {
            name: 'Mtp10',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/music10.mp3',
            image: './assets/img/img10.jpg'

        },

    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''} " data-index ="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
             </div>`
        })
        $('.playlist').innerHTML = htmls.join('')

    },
    handleEvents: function() {
        _this = this;
        isPlaying = false;
        isRandom = false;
        isReapeat = false;


        // xử lí cd quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, //10s
            iterations: Infinity //quay vô hạn
        })
        cdThumbAnimate.pause()

        // xử lí phóng to / thu nhỏ đĩa CD
        const cdWith = cd.offsetWidth;

        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const newCdWith = cdWith - scrollTop;

            cd.style.width = newCdWith + 'px';
            cd.style.opacity = newCdWith / cdWith;
        }

        // xử lí khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // khi song duoc play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;

            }
        }

        progress.onchange = function(e) {
            const seek = audio.duration / 100 * e.target.value;
            audio.currentTime = seek;

        }

        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)

        }

        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()

        }

        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
        }

        repeatBtn.onclick = function() {
            _this.isReapeat = !_this.isReapeat
            repeatBtn.classList.toggle('active', _this.isReapeat)
        }


        audio.onended = function() {
            if (_this.isReapeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')

            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.getAttribute('data-index'))
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()

                }
            }
        }




    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },


    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300)
    },

    loadCurrentSong: function() {


        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path

        console.log(heading, cdThumb, audio)
    },

    nextSong: function() {
        this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong()
    },

    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    start: function() {
        this.defineProperties();
        this.handleEvents();
        this.render();
        this.loadCurrentSong();



    }


}
app.start();