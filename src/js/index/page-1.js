{
    let view = {
        el: '.page-1',
        init() {
            this.$el = $(this.el)
        },
        show() {
            this.$el.addClass('active')
        },
        hide() {
            this.$el.removeClass('active')
        }
    }

    let model = {}

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            this.bindEventHub()
            this.bindModel1()
            this.bindModel2()
        },
        bindEventHub() {
            window.eventHub.on('selectTab', (tabName) => {
                if (tabName === 'page-1') {
                    this.view.show()
                } else {
                    this.view.hide()
                }
            })
        },
        bindModel1() {
            let script1 = document.createElement('script')
            script1.src = "./js/index/page-1-1.js"
            script1.onload = (() => {
                console.log('1')
            })
            document.body.appendChild(script1)
        },
        bindModel2() {
            let script2 = document.createElement('script')
            script2.src = "./js/index/page-1-2.js"
            script2.onload = (() => {
                console.log('2')
            })
            document.body.appendChild(script2)
        }
    }
    controller.init(view, model)
}