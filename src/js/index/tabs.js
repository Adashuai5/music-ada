{
    let view = {
        el: '#tabs',
        init() {
            this.$el = $(this.el)
        },
        active(li) {
            li.addClass('active')
                .siblings('.active').removeClass('active')
        }
    }

    let model = {}

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEventHub()
        },
        bindEventHub() {
            this.view.$el.on('click', '.tabs-nav > li', (e) => {
                let $li = $(e.currentTarget)
                let tabName = $li.attr('data-tab-name')
                this.view.active($li)
                window.eventHub.emit('selectTab', tabName)
            })
        }
    }
    controller.init(view, model)
}