{
    let view = {
        el: '.songList-Container',
        template: `
        <ul class="songList">
        </ul>
        `,
        render(data) {
            let $el = $(this.el)
            $el.html(this.template)            
            let {songs} = data
            let liList = songs.map((song)=>$('<li></li>').text(song.name))
            $el.find('ul').empty()
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data: {
            songs: [ ]
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs = songs.map((song)=>{
                    return { id: song.id, ...song.attributes }
                }) 
                return songs
            })
        }
    }
    let contrallor = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEventHub()
            this.getALLSongs()
        },
        bindEventHub(){
            window.eventHub.on('upload',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('create',(songData)=>{
                this.model.data.songs.push(songData) 
                this.view.render(this.model.data)
            })
        },
        getALLSongs(){
            this.model.find().then((data)=>{
                this.view.render(this.model.data)
            })
        }
    }
    contrallor.init(view, model)
}