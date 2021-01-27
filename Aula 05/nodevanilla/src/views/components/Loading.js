let Loading = {
    render : async () => {
        let view = `
            <div class="container d-flex justify-content-center p-3">
                <div class="loading"><div></div><div></div></div>
            </div>
        `

        return view
    },
    after_render: async () => {

    }
}

export default Loading;