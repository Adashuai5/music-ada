{
    let view = {
        el: '.songList-Container',
        template: `
        <ul class="songList">
            <div>
                <li>歌曲1</li>
            </div>
            <div>
                <li>歌曲2</li>
            </div>
            <div>
                <li>歌曲3</li>
            </div>
            <div>
                <li>歌曲4</li>
            </div>
            <div>
                <li>歌曲5</li>
            </div>
            <div>
                <li>歌曲6</li>
            </div>
            <div>
                <li>歌曲7</li>
            </div>
            <div>
                <li>歌曲8</li>
            </div>
            <div>
                <li>歌曲9</li>
            </div>
            <div>
                <li>歌曲10</li>
            </div>
        </ul>
        `,
        render(data) {
            $(this.el).html(this.template)
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {}
    let contrallor = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('upload',()=>{
                this.view.clearActive()
            })
        }
    }
    contrallor.init(view, model)
}