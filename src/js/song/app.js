{
    let view = {
        el: '#app',
        template: `
        <audio src={{url}}></audio>
        <div>
            <button class="play">播放</button>
            <button class="pause">暂停</button>
        </div>
        `,
        render(data) {
            console.log('1')
            $(this.el).html(this.template.replace('{{url}}', data.url))
            // 由于Leanload SSL-ERR，此处 url 为手动 copy 七牛
            console.log(data)
        },
        play() {
            $(this.el).find('audio')[0].play()
        },
        pause() {
            $(this.el).find('audio')[0].pause()
        }
    }
    let model = {
        data: {
            id: '',
            name: '',
            singer: '',
            url: ''
        },
        get(id) {
            var query = new AV.Query('Song');
            return query.get(id).then((song) => {
                Object.assign(this.data, {
                    id: song.id,
                    ...song.attributes,
                })
                return song
                console.log(song)
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = this.getSongId()
            this.model.get(id).then(() => {
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents() {
            $(this.view.el).on('click', '.play', () => {
                this.view.play()
            })
            $(this.view.el).on('click', '.pause', () => {
                this.view.pause()
            })
        },
        getSongId() {
            let search = window.location.search
            console.log(search) // ?id=5bcdfb1b0b6160006a4ec888
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }

            let array = search.split('&').filter((v => v))
            let id = ''

            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if (key === 'id') {
                    id = value
                    break
                }
            }
            return id // 5bcdfb1b0b6160006a4ec888
        }
    }
    controller.init(view, model)
}