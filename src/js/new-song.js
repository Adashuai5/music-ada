{
    let view = {
        el: '.newSong',
        template: `
        新建歌曲
        `,
        render(data) {
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let contrallor = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.active()
            window.eventHub.on('upload', (data) => {
                this.active()
            })
        },
        active(){
            $(this.view.el).addClass("active")
        }
    }
    contrallor.init(view, model)
}