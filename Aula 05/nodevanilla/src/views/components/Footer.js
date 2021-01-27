let Footer = {
    render : async () => {
        let view = `
        <footer class="container pt-md-5 pb-md-5 border-top mt-5">
          <div class="d-flex justify-content-center">
            <img class="mb-2" src="https://logodownload.org/wp-content/uploads/2014/05/accenture-logo-1-1.png" alt="" width="180" height="auto">
          </div>
        </div>
      </footer>
        `

        return view
    },
    after_render: async () => {

    }
}

export default Footer;