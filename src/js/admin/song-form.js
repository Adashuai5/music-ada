{
    let view = {
        el: '.page > main',
        init() {
            this.$el = $(this.el)
        },
        template: `
        <form class="form">
            <div class="row">
                <label>
                    歌名
                </label>
                <input name="name" type="text" value="__name__">
            </div>
            <div class="row">
                <label>歌手
                </label>
                <input name="singer" type="text" value="__singer__">
            </div>
            <div class="row">
                <label>外链
                </label>
                <input name="url" type="text" value="__url__">
            </div>
            <div class="row">
                <label>封面
                </label>
                <input name="cover" type="text" value="__cover__">
            </div>
            <div class="row">
                <label>歌词
                </label>
                <textarea rows=20 cols= 50 name="lyrics">__lyrics__</textarea>
            </div>
            <div class="row actions">
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data = {}) {
            let placeholders = ['name', 'singer', 'url', 'id', 'cover', 'lyrics']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            if (data.id) {
                $(this.el).prepend('<h1>编辑歌曲</h1>')
            } else {
                $(this.el).prepend('<h1>新建歌曲</h1>')
            }
        }
    }
    let model = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: '',
            cover: '',
            lyrics: ''
        },
        create(data) {
            let Song = AV.Object.extend('Song')
            let song = new Song();
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            song.set('cover', data.cover)
            song.set('lyrics', data.lyrics)
            return song.save().then((newSong) => {
                let {
                    id,
                    attributes
                } = newSong
                this.data.id = id
                Object.assign(this.data, attributes)
                // this.data = { id, ...attributes }
            }, (error) => {
                console.error('error')
            });
        },
        update(data) {
            let song = AV.Object.createWithoutData('Song', this.data.id)
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            song.set('cover', data.cover)
            song.set('lyrics', data.lyrics)
            return song.save().then((response) => {
                Object.assign(this.data, data)
                return response
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.bindEventHub()
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('select', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new', (data) => {
                if (this.model.data.id) {
                    this.model.data = {
                        name: '',
                        singer: '',
                        url: '',
                        id: '',
                        cover: '',
                        lyrics: ''
                    }
                } else {
                    Object.assign(this.model.data, data)
                }
                this.view.render(this.model.data)
            })
        },
        create() {
            let needs = 'name singer url cover'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.create(data)
                .then(() => {
                    this.view.render({})
                    let string = JSON.stringify(this.model.data)
                    let object = JSON.parse(string)
                    window.eventHub.emit('create', object)
                })
        },
        update() {
            let needs = 'name singer url cover lyrics'.split(' ')
            let data = {}
            needs.map((string) => {
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.update(data)
                .then(() => {
                    window.eventHub.emit('update', JSON.parse(JSON.stringify(this.model.data)))
                })
        },
        bindEventHub() {
            this.view.$el.on('submit', 'form', (e) => {
                e.preventDefault()
                if (this.model.data.id) {
                    this.update()
                } else {
                    this.create()
                }
                return
            })
        }
    }
    controller.init(view, model)
}